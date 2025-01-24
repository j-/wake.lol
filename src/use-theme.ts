import { useCallback, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import {
  THEME_COUNT,
  THEME_INDEX_DATASET_KEY,
  THEME_INDEX_STORAGE_KEY,
} from './constants';

const nextThemeIndex = (themeIndex: number | undefined) => {
  if (themeIndex == null) return 1;
  if (themeIndex >= THEME_COUNT) return undefined;
  return themeIndex + 1;
};

export const useTheme = () => {
  const [themeIndex, setThemeIndex] =
    useLocalStorageState<number>(THEME_INDEX_STORAGE_KEY);

  const next = useCallback(() => {
    setThemeIndex(nextThemeIndex);
    return nextThemeIndex(themeIndex);
  }, [setThemeIndex, themeIndex]);

  useEffect(() => {
    if (themeIndex) {
      document.documentElement.dataset[THEME_INDEX_DATASET_KEY] = String(themeIndex);
    } else {
      delete document.documentElement.dataset[THEME_INDEX_DATASET_KEY];
    }
  }, [themeIndex]);

  return { index: themeIndex, next };
};
