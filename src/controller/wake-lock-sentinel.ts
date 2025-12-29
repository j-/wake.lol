import { getWakeLockScreenSentinel } from './wake-lock-screen-sentinel';
import { getWakeLockVideoSentinel } from './wake-lock-video-sentinel';

export const getWakeLockSentinel = async (
  navigator: Navigator,
  document: Document,
) => {
  try {
    return await getWakeLockScreenSentinel(navigator, document);
  } catch {
    return await getWakeLockVideoSentinel(navigator, document);
  }
};
