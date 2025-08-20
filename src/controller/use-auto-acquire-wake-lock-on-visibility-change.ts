import { useEffect } from 'react';
import type { RequestWakeLock } from './use-wake-lock';

export type UseAutoAcquireWakeLockOnVisibilityChange =
  (params: UseAutoAcquireWakeLockOnVisibilityChangeParams) => void;

export type UseAutoAcquireWakeLockOnVisibilityChangeParams = {
  shouldAcquireOnVisibilityChange: boolean;
  didReleaseAutomatically: boolean;
  requestWakeLock: RequestWakeLock;
};

export const useAutoAcquireWakeLockOnVisibilityChange: UseAutoAcquireWakeLockOnVisibilityChange = ({
  shouldAcquireOnVisibilityChange,
  didReleaseAutomatically,
  requestWakeLock,
}) => {
  // Acquire wake lock on visibility change.
  useEffect(() => {
    if (!shouldAcquireOnVisibilityChange || !didReleaseAutomatically) return;

    const handleVisibilitychange = async () => {
      if (shouldAcquireOnVisibilityChange && document.visibilityState === 'visible') {
        await requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [shouldAcquireOnVisibilityChange, didReleaseAutomatically, requestWakeLock]);
};
