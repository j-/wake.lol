import { useMemo, type FC, type PropsWithChildren } from 'react';
import { useNavigator } from '../WindowContext';
import { PlatformContext } from './context';
import { detectPlatform, type Platform } from './detect-platform';

export type PlatformProviderProps = PropsWithChildren<{
  platform?: Platform;
}>;

export const PlatformProvider: FC<PlatformProviderProps> = ({
  platform: platformOverride,
  children,
}) => {
  const navigator = useNavigator();

  const platform = useMemo(() => {
    return detectPlatform(
      navigator.platform,
      navigator.userAgent,
    );
  }, [navigator.platform, navigator.userAgent]);

  const value = platformOverride ?? platform;

  return <PlatformContext value={value}>{children}</PlatformContext>;
};
