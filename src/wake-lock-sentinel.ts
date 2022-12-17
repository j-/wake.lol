import { getWakeLockScreenSentinel } from './wake-lock-screen-sentinel';
import { getWakeLockVideoSentinel } from './wake-lock-video-sentinel';

export const getWakeLockSentinel = () => (
  'wakeLock' in navigator ?
    getWakeLockScreenSentinel() :
    getWakeLockVideoSentinel()
);
