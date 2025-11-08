import { useTheme } from '@mui/material/styles';
import { type FC } from 'react';
import { APP_NAME } from './constants';
import { useAppContext } from './controller';
import { usePreferences } from './controller/use-preferences';
import iconActive from '/active.svg?raw';
import iconInactive from '/inactive.svg?raw';

const iconActiveURL = `data:image/svg+xml;base64,${btoa(iconActive)}`;
const iconInactiveURL = `data:image/svg+xml;base64,${btoa(iconInactive)}`;

export const AppMetadata: FC = () => {
  const { isWakeLockEnabled } = useAppContext();
  const { themeColor: bgColorEnabled } = usePreferences();
  const theme = useTheme();

  const bgColorDisabled = theme.palette.background.default;
  const themeColor = isWakeLockEnabled ? bgColorEnabled : bgColorDisabled;

  const title = `${APP_NAME} – ${isWakeLockEnabled ? 'keeping your screen awake' :
    'not keeping your screen awake'}`;

  const icon = isWakeLockEnabled ? iconActiveURL : iconInactiveURL;

  return (
    <>
      <title>{title}</title>
      <meta name="theme-color" content={themeColor} />
      <link rel="icon" href={icon} />
    </>
  );
};
