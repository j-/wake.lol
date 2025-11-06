import { useMemo } from 'react';
import { useWindow } from '../context/WindowContext';

export const useIsNewWindow = () => {
  const window = useWindow();

  return useMemo(() => !window.statusbar.visible, [window]);
};
