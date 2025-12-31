import { type CssVarsTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { type FC } from 'react';
import { AppIcon } from './AppIcon';
import { APP_NAME } from './constants';
import { useAppContext } from './controller';
import { usePreferences } from './controller/use-preferences';

export const AppMetadata: FC = () => {
  const { isWakeLockEnabled } = useAppContext();
  const { themeColor: bgColorEnabled } = usePreferences();
  const theme = useTheme<CssVarsTheme>();
  const { colorScheme } = useColorScheme();

  // With `cssVariables: true` + `colorSchemes`, `theme.palette.*` reflects the static theme
  // (typically the default/light scheme). Use the active color scheme instead.
  const scheme = (colorScheme ?? theme.palette.mode) as 'light' | 'dark';
  const bgColorDisabled = theme.colorSchemes?.[scheme]?.palette.muted.main ?? theme.palette.muted.main;

  const themeColor = isWakeLockEnabled ? bgColorEnabled : bgColorDisabled;
  const iconColor = (() => {
    try {
      return theme.palette.getContrastText(themeColor);
    } catch {
      return theme.palette.text.primary;
    }
  })();

  const title = `${APP_NAME} – ${isWakeLockEnabled ? 'keeping your screen awake' :
    'not keeping your screen awake'}`;

  return (
    <>
      <title>{title}</title>
      <meta name="theme-color" content={themeColor} />
      <AppIcon isActive={isWakeLockEnabled} color={iconColor} bgColor={themeColor} />
    </>
  );
};
