import { useEffect, useState } from 'react';
import type { RequestWakeLock } from './context';

export type UseAutoAcquireWakeLockOnLoad =
  (params: UseAutoAcquireWakeLockOnLoadParams) => void;

export type UseAutoAcquireWakeLockOnLoadParams = {
  shouldAcquireOnLoad: boolean;
  requestWakeLock: RequestWakeLock;
};

export const useAutoAcquireWakeLockOnLoad: UseAutoAcquireWakeLockOnLoad = ({
  shouldAcquireOnLoad,
  requestWakeLock,
}) => {
  const [didInit, setDidInit] = useState(false);

  // Acquire wake lock on load.
  useEffect(() => {
    if (!shouldAcquireOnLoad || didInit) return;

    const handleVisibilitychange = async () => {
      if (document.visibilityState === 'visible') {
        await requestWakeLock();
        setDidInit(true);
      }
    };

    handleVisibilitychange();

    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [didInit, requestWakeLock, shouldAcquireOnLoad]);
};
