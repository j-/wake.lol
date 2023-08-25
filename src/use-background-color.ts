import { useCallback, useEffect, useState } from 'react';
import { CSS_VAR_BG } from './constants';

export const useBackgroundColor = () => {
  const [color, setColor] = useState('');

  const setColorsByElement = useCallback((element: HTMLElement) => {
    const style = getComputedStyle(element);
    const color = style.getPropertyValue(CSS_VAR_BG);
    setColor(color);
  }, []);

  const mutationCallback = useCallback<MutationCallback>((mutations) => {
    setColorsByElement(mutations[0].target as HTMLElement);
  }, [setColorsByElement]);

  useEffect(() => {
    setColorsByElement(document.documentElement);
  }, [setColorsByElement]);

  useEffect(() => {
    const mutationObserver = new MutationObserver(mutationCallback);

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => mutationObserver.disconnect();
  }, [mutationCallback]);

  return color;
};
