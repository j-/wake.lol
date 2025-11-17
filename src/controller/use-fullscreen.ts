import { type RefObject, useCallback, useMemo } from 'react';
import { useDocument } from '../context/WindowContext';
import { useFullScreenElement } from '../use-full-screen-element';

export type RequestFullscreen = () => Promise<void>;
export type ExitFullscreen = () => Promise<void>;
export type ToggleFullscreen = () => Promise<void>;

export type UseFullscreen = (params: UseFullscreenParams) => UseFullscreenResult;

export type UseFullscreenParams = {
  fullscreenRef: RefObject<HTMLElement | null>;
};

export type UseFullscreenResult = {
  isFullscreen: boolean;
  requestFullscreen: RequestFullscreen;
  exitFullscreen: ExitFullscreen;
  toggleFullscreen: ToggleFullscreen;
};

export const useFullscreen: UseFullscreen = ({ fullscreenRef }) => {
  const document = useDocument();
  const fullscreenElement = useFullScreenElement();
  const isFullscreen = fullscreenElement === fullscreenRef.current;

  const requestFullscreen = useCallback<RequestFullscreen>(async () => {
    if (!fullscreenRef.current) {
      console.warn('Fullscreen request failed: fullscreenRef is not set.');
      return;
    }
    if (fullscreenRef.current.requestFullscreen) {
      await fullscreenRef.current.requestFullscreen();
    }
  }, [fullscreenRef]);

  const exitFullscreen = useCallback<ExitFullscreen>(async () => {
    if (fullscreenElement && typeof document.exitFullscreen === 'function') {
      await document.exitFullscreen();
    }
  }, [document, fullscreenElement]);

  const toggleFullscreen = useCallback<ToggleFullscreen>(() => {
    if (isFullscreen) {
      return exitFullscreen();
    } else {
      return requestFullscreen();
    }
  }, [isFullscreen, requestFullscreen, exitFullscreen]);

  const result = useMemo<UseFullscreenResult>(() => ({
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  }), [
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  ]);

  return result;
};
