import { type FC } from 'react';
import { AppIcon } from './AppIcon';
import { APP_NAME } from './constants';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const AppMetadata: FC = () => {
  const { isWakeLockEnabled } = useAppContext();
  const { color, bgColor } = useSchemeColors();

  const title = `${APP_NAME} – ${isWakeLockEnabled ? 'keeping your screen awake' :
    'not keeping your screen awake'}`;

  return (
    <>
      <title>{title}</title>
      <meta name="theme-color" content={bgColor} />
      <AppIcon isActive={isWakeLockEnabled} color={color} bgColor={bgColor} />
    </>
  );
};
