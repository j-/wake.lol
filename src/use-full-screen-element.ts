import { useEffect, useState } from 'react';
import { useDocument } from './context/WindowContext';

export const useFullScreenElement = () => {
  const document = useDocument();

  const [fullscreenElement, setFullscreenElement] = useState(() => {
    return document.fullscreenElement;
  });

  useEffect(() => {
    const handler = () => {
      setFullscreenElement(document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
    };
  }, [document]);

  return fullscreenElement;
};
