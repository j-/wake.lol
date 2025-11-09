import { useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { DEFAULT_THEME_COLOR } from '../constants';

export type UsePreferences = () => UsePreferencesResult;

export type UsePreferencesResult = ReturnType<typeof usePreferences>;

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

export const STORAGE_KEY_SHOULD_OPEN_PIP_ON_INACTIVE =
  'shouldOpenPiPOnInactive';

export const STORAGE_KEY_THEME_COLOR =
  'themeColor';

export const usePreferences = () => {
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

  const [shouldOpenPiPOnInactive, setShouldOpenPiPOnInactive] =
    useLocalStorageState(STORAGE_KEY_SHOULD_OPEN_PIP_ON_INACTIVE, {
      defaultValue: false,
      serializer: booleanSerializer,
    });

  const [themeColor, setThemeColor, { removeItem: resetThemeColor }] =
    useLocalStorageState(STORAGE_KEY_THEME_COLOR, {
      defaultValue: DEFAULT_THEME_COLOR,
    });

  const result = useMemo(() => ({
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
    shouldOpenPiPOnInactive,
    setShouldOpenPiPOnInactive,
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
    shouldOpenPiPOnInactive,
    setShouldOpenPiPOnInactive,
    themeColor,
    setThemeColor,
    resetThemeColor,
  ]);

  return result;
};
