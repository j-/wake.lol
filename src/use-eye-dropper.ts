import { useCallback, useMemo } from 'react';
import { useWindow } from './context/WindowContext';

export const useEyeDropper = () => {
  const window = useWindow();

  const eyeDropper = useMemo(() => {
    if (!window.EyeDropper) return null;
    return new window.EyeDropper();
  }, [window.EyeDropper]);

  const open = useCallback(
    async (options?: ColorSelectionOptions) => {
      if (!eyeDropper) throw new Error('Not supported');
      return eyeDropper.open(options);
    },
    [eyeDropper],
  );

  return useMemo(() => ({
    eyeDropper,
    open,
  }), [
    eyeDropper,
    open,
  ]);
};
