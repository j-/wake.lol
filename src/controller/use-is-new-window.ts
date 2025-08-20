import { useMemo } from 'react';

export const useIsNewWindow = () => {
  return useMemo(() => {
    return !window.statusbar.visible;
  }, []);
};
