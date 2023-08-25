import { useCallback, useEffect, useMemo, useState } from 'react';

export const useColors = () => {
  const [colorActive, setColorActive] = useState('');
  const [colorInactive, setColorInactive] = useState('');

  const setColorsByElement = useCallback((element: HTMLElement) => {
    const style = getComputedStyle(element);
    const colorActive = style.getPropertyValue('--color-active');
    const colorInactive = style.getPropertyValue('--color-inactive');
    setColorActive(colorActive);
    setColorInactive(colorInactive);
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

  return { colorActive, colorInactive };
};
