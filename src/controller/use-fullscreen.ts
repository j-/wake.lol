import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDocument } from '../context/WindowContext';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = useCallback<RequestFullscreen>(async () => {
    if (!fullscreenRef.current) {
      console.warn('Fullscreen request failed: fullscreenRef is not set.');
      return;
    }
    if (fullscreenRef.current.requestFullscreen) {
      await fullscreenRef.current.requestFullscreen();
    } else {
      console.warn('Fullscreen request failed: no compatible method found.');
    }
  }, [fullscreenRef]);

  const exitFullscreen = useCallback<ExitFullscreen>(async () => {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else {
      console.warn('Exit fullscreen request failed: no compatible method found.');
    }
  }, [document]);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [document, fullscreenRef]);

  return result;
};
