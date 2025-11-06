export const getWakeLockScreenSentinel = (navigator: Navigator) =>
  navigator.wakeLock.request('screen');
