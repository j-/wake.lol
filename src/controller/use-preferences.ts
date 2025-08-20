import { type Dispatch, type SetStateAction, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export type UsePreferences = () => UsePreferencesResult;

export type UsePreferencesResult = {
  shouldAcquireOnLoad: boolean;
  setShouldAcquireOnLoad: Dispatch<SetStateAction<boolean>>;
  shouldAcquireOnVisibilityChange: boolean;
  setShouldAcquireOnVisibilityChange: Dispatch<SetStateAction<boolean>>;
  shouldExpandUI: boolean;
  setShouldExpandUI: Dispatch<SetStateAction<boolean>>;
};

export const usePreferences: UsePreferences = () => {
  const [shouldAcquireOnLoad, setShouldAcquireOnLoad] =
    useLocalStorageState('shouldAcquireOnLoad', { defaultValue: false });

  const [shouldAcquireOnVisibilityChange, setShouldAcquireOnVisibilityChange] =
    useLocalStorageState('shouldAcquireOnVisibilityChange', { defaultValue: true });

  const [shouldExpandUI, setShouldExpandUI] =
    useLocalStorageState('shouldExpandUI', { defaultValue: false });

  const result = useMemo<UsePreferencesResult>(() => ({
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
  }), [
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
  ]);

  return result;
};
