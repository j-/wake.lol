import { type Dispatch, type SetStateAction, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { DEFAULT_THEME_COLOR } from '../constants';

export type UsePreferences = () => UsePreferencesResult;

export type UsePreferencesResult = {
  shouldAcquireOnLoad: boolean;
  setShouldAcquireOnLoad: Dispatch<SetStateAction<boolean>>;
  shouldAcquireOnVisibilityChange: boolean;
  setShouldAcquireOnVisibilityChange: Dispatch<SetStateAction<boolean>>;
  shouldExpandUI: boolean;
  setShouldExpandUI: Dispatch<SetStateAction<boolean>>;
  themeColor: string;
  setThemeColor: Dispatch<SetStateAction<string>>;
  resetThemeColor: () => void;
};

export const storage = localStorage;

export const booleanSerializer = {
  stringify(value: unknown) {
    return value ? '1': '';
  },
  parse(value: string) {
    return !!value;
  },
};

export const STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD =
  'shouldAcquireOnLoad';

export const STORAGE_KEY_SHOULD_ACQUIRE_ON_VISIBILITY_CHANGE =
  'shouldAcquireOnVisibilityChange';

export const STORAGE_KEY_SHOULD_EXPAND_UI =
  'shouldExpandUI';

export const STORAGE_KEY_THEME_COLOR =
  'themeColor';

export const usePreferences: UsePreferences = () => {
  const [shouldAcquireOnLoad, setShouldAcquireOnLoad] =
    useLocalStorageState(STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD, {
      defaultValue: false,
      serializer: booleanSerializer,
    });

  const [shouldAcquireOnVisibilityChange, setShouldAcquireOnVisibilityChange] =
    useLocalStorageState(STORAGE_KEY_SHOULD_ACQUIRE_ON_VISIBILITY_CHANGE, {
      defaultValue: true,
      serializer: booleanSerializer,
    });

  const [shouldExpandUI, setShouldExpandUI] =
    useLocalStorageState(STORAGE_KEY_SHOULD_EXPAND_UI, {
      defaultValue: false,
      serializer: booleanSerializer,
    });

  const [themeColor, setThemeColor, { removeItem: resetThemeColor }] =
    useLocalStorageState(STORAGE_KEY_THEME_COLOR, {
      defaultValue: DEFAULT_THEME_COLOR,
    });

  const result = useMemo<UsePreferencesResult>(() => ({
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
    themeColor,
    setThemeColor,
    resetThemeColor,
  }), [
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
    themeColor,
    setThemeColor,
    resetThemeColor,
  ]);

  return result;
};
