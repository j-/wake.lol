import { useDocument } from '../context/WindowContext';

export const useFullscreenEnabled = () => {
  const document = useDocument();
  return document.fullscreenEnabled;
};
