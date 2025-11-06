import { useEffect, useState } from 'react';
import type { RequestWakeLock } from './use-wake-lock';
import { useDocument } from '../context/WindowContext';

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
  const document = useDocument();
  const [didInit, setDidInit] = useState(false);

  // Acquire wake lock on load.
  useEffect(() => {
    if (didInit) return;

    const handleVisibilitychange = async () => {
      if (document.visibilityState === 'visible') {
        if (shouldAcquireOnLoad) {
          await requestWakeLock();
        }
        setDidInit(true);
      }
    };

    handleVisibilitychange();

    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [didInit, document, requestWakeLock, shouldAcquireOnLoad]);
};
