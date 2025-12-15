import { useDocument } from './context/WindowContext';

export const useFullScreenEnabled = () => {
  const document = useDocument();
  return document.fullscreenEnabled;
};
