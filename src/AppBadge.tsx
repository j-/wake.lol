import { useCallback, useEffect, type FC } from 'react';
import { useNavigator } from './context/WindowContext';

export const AppBadge: FC<{ isInactive: boolean }> = ({ isInactive }) => {
  const navigator = useNavigator();

  const showBadge = useCallback(async () => {
    try {
      if (typeof navigator.setAppBadge === 'function') {
        await navigator.setAppBadge();
      }
    } catch {}
  }, [navigator]);

  const hideBadge = useCallback(async () => {
    try {
      if (typeof navigator.setAppBadge === 'function') {
        await navigator.setAppBadge(0);
      }
    } catch {}
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
