import { useEffect, useMemo, useRef, useState, type FC, type PropsWithChildren } from 'react';
import { usePictureInPictureOpener } from '../context/PictureInPictureOpenerContext/hooks';
import { useDocument, useWindow } from '../context/WindowContext';
import { useFullscreenEnabled } from '../fullscreen/use-fullscreen-enabled';
import { useNewWindowOpener } from '../use-new-window-opener';
import { AppContext, type AppContextType } from './context';
import { useAutoOpenPiPWindowOnInactive } from './use-auto-open-pip-window-on-inactive';
import { useContainerVisibility } from './use-container-visibility';
import { useExpandCollapseUI } from './use-expand-collapse-ui';
import { useFullscreen } from './use-fullscreen';
import { useIsIdle } from './use-is-idle';
import { useIsNewWindow } from './use-is-new-window';
import { usePreferences } from './use-preferences';
import { useWakeLock } from './use-wake-lock';

const enableContainerVisibility = true;

export type AppControllerProps = PropsWithChildren<{
  isPiPWindow?: boolean;
}>;

export const AppController: FC<AppControllerProps> = ({
  isPiPWindow = false,
  children,
}) => {
  const fullscreenRef = useRef<HTMLElement>(null);

  const window = useWindow();
  const document = useDocument();
  const isNewWindow = useIsNewWindow();

  const [showBattery, setShowBattery] = useState(false);

  const {
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  } = useFullscreen({ fullscreenRef });

  const canExpandCollapse = !isFullscreen;
  const canFullscreen = useFullscreenEnabled();

  const {
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    shouldExpandUI,
    setShouldExpandUI,
    shouldOpenPiPOnInactive,
    setShouldOpenPiPOnInactive,
    themeColor,
    setThemeColor,
    resetThemeColor,
  } = usePreferences();

  const {
    isExpanded,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
  } = useExpandCollapseUI();

  const { isFullyVisible } = useContainerVisibility({
    containerRef: fullscreenRef,
    enableContainerVisibility,
  });

  const {
    isInactive: isWakeLockInactive,
    isLockedActual: isWakeLockEnabledActual,
    isLockedOptimistic: isWakeLockEnabledOptimistic,
    cancel: cancelUserActivation,
    userActivation: invokeUserActivation,
    requiresUserActivation,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  } = useWakeLock();

  const canPictureInPicture = (
    !!window.documentPictureInPicture &&
    !isPiPWindow &&
    !isFullscreen &&
    !isNewWindow
  );

  const { openPictureInPictureWindow } = usePictureInPictureOpener();
  const { openNewWindow } = useNewWindowOpener();

  useAutoOpenPiPWindowOnInactive({
    shouldAutoOpenPiPWindowOnInactive:
      canPictureInPicture && shouldOpenPiPOnInactive,
  });

  // Handle global keypresses for fullscreen toggle (f).
  useEffect(() => {
    if (!document.fullscreenEnabled) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'F11' || e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [document.fullscreenEnabled, toggleFullscreen, window]);

  // Handle global keypresses for expand/collapse toggle (t).
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 't') {
        e.preventDefault();
        toggleExpandCollapseUI();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleExpandCollapseUI, window]);

  // Handle global keypresses for show PiP window (p).
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'p') {
        e.preventDefault();
        openPictureInPictureWindow();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [openPictureInPictureWindow, window]);

  // Handle global keypresses for open in new window (n).
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'n') {
        e.preventDefault();
        openNewWindow();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [openNewWindow, window]);

  const isIdle = useIsIdle();

  const contextValue = useMemo<AppContextType>(() => ({
    canExpandCollapse: canExpandCollapse && !isNewWindow && !isPiPWindow,
    canFullscreen,
    canNewWindow: !isNewWindow && !isFullscreen && !isPiPWindow,
    canPictureInPicture,
    canScroll: !isNewWindow && !isFullscreen && !isPiPWindow,
    canStartTimer: !isNewWindow && !isPiPWindow,
    cancelUserActivation,
    collapseUI,
    exitFullscreen,
    expandUI,
    fullscreenRef,
    invokeUserActivation,
    isExpanded: isExpanded || isNewWindow || isPiPWindow,
    isFullscreen,
    isFullyVisible,
    isIdle,
    isNewWindow,
    isWakeLockEnabledActual,
    isWakeLockEnabledOptimistic,
    isWakeLockInactive,
    releaseWakeLock,
    requestFullscreen,
    requestWakeLock,
    requiresUserActivation,
    resetThemeColor,
    setShouldAcquireOnLoad,
    setShouldAcquireOnVisibilityChange,
    setShouldExpandUI,
    setShouldOpenPiPOnInactive,
    setThemeColor,
    shouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    shouldExpandUI,
    shouldOpenPiPOnInactive,
    setShowBattery,
    showBattery,
    themeColor,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  }), [
    canExpandCollapse,
    canFullscreen,
    canPictureInPicture,
    cancelUserActivation,
    collapseUI,
    exitFullscreen,
    expandUI,
    fullscreenRef,
    invokeUserActivation,
    isExpanded,
    isFullscreen,
    isFullyVisible,
    isIdle,
    isNewWindow,
    isPiPWindow,
    isWakeLockEnabledActual,
    isWakeLockEnabledOptimistic,
    isWakeLockInactive,
    releaseWakeLock,
    requestFullscreen,
    requestWakeLock,
    requiresUserActivation,
    resetThemeColor,
    setShouldAcquireOnLoad,
    setShouldAcquireOnVisibilityChange,
    setShouldExpandUI,
    setShouldOpenPiPOnInactive,
    setThemeColor,
    shouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    shouldExpandUI,
    shouldOpenPiPOnInactive,
    setShowBattery,
    showBattery,
    themeColor,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

AppController.displayName = 'AppController';
