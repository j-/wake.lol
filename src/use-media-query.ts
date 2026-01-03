// eslint-disable-next-line no-restricted-imports
import useMediaQueryMUI from '@mui/material/useMediaQuery';
import { useWindow } from './context/WindowContext';

export const useMediaQuery: typeof useMediaQueryMUI = (query, options) => {
  const window = useWindow();
  return useMediaQueryMUI(query, {
    matchMedia: window.matchMedia.bind(window),
    ...options,
  });
};
