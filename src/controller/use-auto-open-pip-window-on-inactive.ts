import { useEffect } from 'react';
import { usePictureInPictureOpener } from '../context/PictureInPictureOpenerContext/hooks';
import { useDocument } from '../context/WindowContext';

export type UseAutoOpenPiPWindowOnInactive =
  (params: UseAutoOpenPiPWindowOnInactiveParams) => void;

export type UseAutoOpenPiPWindowOnInactiveParams = {
  shouldAutoOpenPiPWindowOnInactive: boolean;
};

export const useAutoOpenPiPWindowOnInactive: UseAutoOpenPiPWindowOnInactive = ({
  shouldAutoOpenPiPWindowOnInactive,
}) => {
  const document = useDocument();
  const { openPictureInPictureWindow } = usePictureInPictureOpener();

  // Acquire wake lock on visibility change.
  useEffect(() => {
    if (!shouldAutoOpenPiPWindowOnInactive) return;

    const handleVisibilitychange = async () => {
      if (document.visibilityState === 'hidden') {
        await openPictureInPictureWindow();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [document, openPictureInPictureWindow, shouldAutoOpenPiPWindowOnInactive]);
};
