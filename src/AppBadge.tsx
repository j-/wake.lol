import { useCallback, useEffect, type FC } from 'react';
import { useNavigator } from './context/WindowContext';

export const AppBadge: FC<{ isActive: boolean }> = ({ isActive }) => {
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
    if (isActive) {
      void hideBadge();
    } else {
      void showBadge();
    }
  }, [isActive, showBadge, hideBadge]);

  return null;
};
