import { useCallback, useMemo } from 'react';
import { FEATURES } from './constants';
import { useWindow } from './context/WindowContext';

export const useNewWindowOpener = () => {
  const window = useWindow();

  const openNewWindow = useCallback(() => {
    window.open(window.location.href, Date.now().toString(), FEATURES);
  }, [window]);

  return useMemo(() => ({ openNewWindow }), [openNewWindow]);
};
