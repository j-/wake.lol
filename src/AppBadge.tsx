import { useCallback, useEffect, type FC } from 'react';
import { useNavigator } from './context/WindowContext';

export const AppBadge: FC<{ isInactive: boolean }> = ({ isInactive }) => {
  const navigator = useNavigator();

  const showBadge = useCallback(async () => {
    if ('setAppBadge' in navigator) {
      await navigator.setAppBadge();
    }
  }, [navigator]);

  const hideBadge = useCallback(async () => {
    if ('setAppBadge' in navigator) {
      await navigator.setAppBadge(0);
    }
  }, [navigator]);

  useEffect(() => {
    if (isInactive) {
      void showBadge();
    } else {
      void hideBadge();
    }
  }, [isInactive, showBadge, hideBadge]);

  return null;
};
