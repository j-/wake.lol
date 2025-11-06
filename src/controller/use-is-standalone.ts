import { useEffect, useState } from 'react';
import { useWindow } from '../context/WindowContext';

const QUERY = '(display-mode: standalone)';

export const useIsStandalone = () => {
  const window = useWindow();

  const [isStandalone, setIsStandalone] = useState(() => (
    typeof window === 'undefined' ?
      false :
      window.matchMedia(QUERY).matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setIsStandalone(mediaQuery.matches);
    const changeHandler = () => setIsStandalone(mediaQuery.matches);
    mediaQuery.addEventListener('change', changeHandler);
    return () => {
      mediaQuery.removeEventListener('change', changeHandler);
    };
  }, [window]);

  return isStandalone;
};
