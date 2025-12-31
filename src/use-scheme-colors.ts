import { type CssVarsTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useAppContext } from './controller';
import { usePreferences } from './controller/use-preferences';

export const useSchemeColors = () => {
  const { isWakeLockEnabled } = useAppContext();
  const { themeColor: bgColorEnabled } = usePreferences();
  const theme = useTheme<CssVarsTheme>();
  const { colorScheme } = useColorScheme();

  const scheme = (colorScheme ?? theme.palette.mode) as 'light' | 'dark';
  const bgColorDisabled = theme.colorSchemes?.[scheme]?.palette.muted.main ?? theme.palette.muted.main;

  const bgColor = isWakeLockEnabled ? bgColorEnabled : bgColorDisabled;
  const color = (() => {
    try {
      return theme.palette.getContrastText(bgColor);
    } catch {
      return theme.palette.text.primary;
    }
  })();

  return useMemo(() => ({
    bgColor,
    bgColorEnabled,
    bgColorDisabled,
    color,
  }), [
    bgColor,
    bgColorEnabled,
    bgColorDisabled,
    color,
  ]);
};
