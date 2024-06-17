import { getWakeLockScreenSentinel } from './wake-lock-screen-sentinel';
import { getWakeLockVideoSentinel } from './wake-lock-video-sentinel';

export const SENTINEL_TYPE = Symbol('sentinel_type');
export const SENTINEL_TYPE_SCREEN = 'screen';
export const SENTINEL_TYPE_VIDEO = 'video';

export type WakeLockSentinelWithType = WakeLockSentinel & {
  [SENTINEL_TYPE]: string;
};

export const getWakeLockSentinel = async () => (
  'wakeLock' in navigator ?
    Object.assign(await getWakeLockScreenSentinel(), {
      [SENTINEL_TYPE]: SENTINEL_TYPE_SCREEN,
    }) :
    Object.assign(await getWakeLockVideoSentinel(), {
      [SENTINEL_TYPE]: SENTINEL_TYPE_VIDEO,
    })
);
