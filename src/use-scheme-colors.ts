import { type CssVarsTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useAppContext } from './controller';
import { usePreferences } from './controller/use-preferences';

export const useSchemeColors = () => {
  const {
    isWakeLockEnabledActual,
    isWakeLockEnabledOptimistic,
  } = useAppContext();
  const { themeColor: bgColorEnabled } = usePreferences();
  const theme = useTheme<CssVarsTheme>();
  const { colorScheme } = useColorScheme();

  const scheme = (colorScheme ?? theme.palette.mode) as 'light' | 'dark';
  const bgColorDisabled = theme.colorSchemes?.[scheme]?.palette.muted.main ?? theme.palette.muted.main;

  const bgColorActual = isWakeLockEnabledActual ? bgColorEnabled : bgColorDisabled;
  const colorActual = (() => {
    try {
      return theme.palette.getContrastText(bgColorActual);
    } catch {
      return theme.palette.text.primary;
    }
  })();

  const bgColorOptimistic = isWakeLockEnabledOptimistic ? bgColorEnabled : bgColorDisabled;
  const colorOptimistic = (() => {
    try {
      return theme.palette.getContrastText(bgColorOptimistic);
    } catch {
      return theme.palette.text.primary;
    }
  })();

  return useMemo(() => ({
    bgColorActual,
    bgColorOptimistic,
    bgColor: bgColorOptimistic,
    bgColorEnabled,
    bgColorDisabled,
    colorActual,
    colorOptimistic,
    color: colorOptimistic,
  }), [
    bgColorActual,
    bgColorOptimistic,
    bgColorEnabled,
    bgColorDisabled,
    colorActual,
    colorOptimistic,
  ]);
};
