import { PreconditionFailedError } from '../errors';

export const getWakeLockScreenSentinel = (
  navigator: Navigator,
  document: Document,
) => {
  if (!(
    typeof navigator.wakeLock !== 'undefined' &&
    typeof navigator.wakeLock.request === 'function'
  )) {
    throw new PreconditionFailedError(
      'Screen wake lock API not available',
    );
  }

  const isDisallowed = (() => {
    try {
      return (
        typeof document.featurePolicy !== 'undefined' &&
        typeof document.featurePolicy.allowsFeature === 'function' &&
        !document.featurePolicy.allowsFeature('screen-wake-lock')
      );
    } catch {
      return null;
    }
  })();

  if (isDisallowed) {
    throw new PreconditionFailedError(
      'Screen wake lock API is disallowed in this context',
    );
  }

  return navigator.wakeLock.request('screen');
};
