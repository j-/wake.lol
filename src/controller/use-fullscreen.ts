import { type RefObject, useCallback, useMemo } from 'react';
import { exitFullscreen as exitFullscreenUtil } from '../fullscreen/exit-fullscreen';
import { requestFullscreen as requestFullscreenUtil } from '../fullscreen/request-fullscreen';
import { useFullscreenElement } from '../fullscreen/use-fullscreen-element';

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
  const fullscreenElement = useFullscreenElement();
  const isFullscreen = fullscreenElement === fullscreenRef.current;

  const requestFullscreen = useCallback<RequestFullscreen>(async () => {
    if (!fullscreenRef.current) {
      console.warn('Fullscreen request failed: fullscreenRef is not set.');
      return;
    }
    return requestFullscreenUtil(fullscreenRef.current);
  }, [fullscreenRef]);

  const exitFullscreen = useCallback<ExitFullscreen>(async () => {
    if (fullscreenElement) {
      return exitFullscreenUtil();
    }
  }, [fullscreenElement]);

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
