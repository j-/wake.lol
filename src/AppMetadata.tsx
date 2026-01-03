import { type FC } from 'react';
import { AppBadge } from './AppBadge';
import { AppIcon } from './AppIcon';
import { APP_NAME } from './constants';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const AppMetadata: FC = () => {
  const { isWakeLockEnabledActual: isWakeLockEnabled } = useAppContext();
  const {
    colorActual,
    bgColorActual,
    bgColorOptimistic,
  } = useSchemeColors();

  const title = `${APP_NAME} – ${isWakeLockEnabled ? 'keeping your screen awake' :
    'not keeping your screen awake'}`;

  return (
    <>
      <title>{title}</title>
      <meta name="theme-color" content={bgColorOptimistic} />
      <AppIcon isActive={isWakeLockEnabled} color={colorActual} bgColor={bgColorActual} />
      <AppBadge isActive={isWakeLockEnabled} />
    </>
  );
};
