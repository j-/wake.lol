import { useWindow } from './context/WindowContext';

export const useIsTopLevelBrowsingContext = () => {
  const window = useWindow();
  return window === window.top;
};
