import { useCallback, useEffect, useState } from 'react';

type UseIsWakeLockEnabled = (options: UseIsWakeLockEnabledOptions) => boolean;

type UseIsWakeLockEnabledOptions = {
  sentinel: WakeLockSentinel | null;
};

export const useIsWakeLockEnabled: UseIsWakeLockEnabled = ({ sentinel }) => {
  const initIsWakeLockEnabled = useCallback(() => {
    return sentinel != null && !sentinel.released;
  }, [sentinel]);

  const [isWakeLockEnabled, setIsWakeLockEnabled] =
    useState(initIsWakeLockEnabled);

  const updateIsWakeLockEnabled = useCallback(() => {
    setIsWakeLockEnabled(initIsWakeLockEnabled);
  }, [initIsWakeLockEnabled]);

  useEffect(() => {
    updateIsWakeLockEnabled();
    if (!sentinel) return;
    sentinel.addEventListener('release', updateIsWakeLockEnabled);
    return () => {
      sentinel.removeEventListener('release', updateIsWakeLockEnabled);
    };
  }, [sentinel, updateIsWakeLockEnabled]);

  return isWakeLockEnabled;
};
