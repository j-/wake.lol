import { getWakeLockScreenSentinel } from './wake-lock-screen-sentinel';
import { getWakeLockVideoSentinel } from './wake-lock-video-sentinel';

export const getWakeLockSentinel = async (
  navigator: Navigator,
  document: Document,
) => {
  try {
    return 'wakeLock' in navigator ?
      await getWakeLockScreenSentinel(navigator) :
      await getWakeLockVideoSentinel(document);
  } catch {
    return getWakeLockVideoSentinel(document);
  }
};
