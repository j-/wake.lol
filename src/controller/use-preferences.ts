import useLocalStorageState from 'use-local-storage-state';
import { useMemo } from 'react';

export type UsePreferences = () => UsePreferencesResult;

export type UsePreferencesResult = {
  shouldAcquireOnLoad: boolean;
  setShouldAcquireOnLoad: (value: boolean) => void;
  shouldAcquireOnVisibilityChange: boolean;
  setShouldAcquireOnVisibilityChange: (value: boolean) => void;
};

export const usePreferences: UsePreferences = () => {
  const [shouldAcquireOnLoad, setShouldAcquireOnLoad] =
    useLocalStorageState('shouldAcquireOnLoad', { defaultValue: false });

  const [shouldAcquireOnVisibilityChange, setShouldAcquireOnVisibilityChange] =
    useLocalStorageState('shouldAcquireOnVisibilityChange', { defaultValue: true });


  const result = useMemo<UsePreferencesResult>(() => ({
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
  }), [
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
  ]);

  return result;
};
