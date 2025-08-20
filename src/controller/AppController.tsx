import { useMemo, useRef, type FC, type PropsWithChildren } from 'react';
import { AppContext, type AppContextType, } from './context';
import {
  useAutoAcquireWakeLockOnLoad,
} from './use-auto-acquire-wake-lock-on-load';
import {
  useAutoAcquireWakeLockOnVisibilityChange,
} from './use-auto-acquire-wake-lock-on-visibility-change';
import { useContainerVisibility } from './use-container-visibility';
import { useExpandCollapseUI } from './use-expand-collapse-ui';
import { useFullscreen } from './use-fullscreen';
import { useIsNewWindow } from './use-is-new-window';
import { useIsWakeLockEnabled } from './use-is-wake-lock-enabled';
import { useWakeLock } from './use-wake-lock';
import { useIsIdle } from './use-is-idle';

const enableContainerVisibility = true;

export const AppController: FC<PropsWithChildren> = ({ children }) => {
  const fullscreenRef = useRef<HTMLElement>(null);

  const isNewWindow = useIsNewWindow();

  const {
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  } = useFullscreen({ fullscreenRef });

  const canExpandCollapse = !isFullscreen;
  const canFullscreen = document.fullscreenEnabled;

  const shouldAcquireOnLoad = true;
  const shouldAcquireOnVisibilityChange = true;

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
    sentinel,
    didReleaseAutomatically,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  } = useWakeLock();

  const isWakeLockEnabled = useIsWakeLockEnabled({ sentinel });

  useAutoAcquireWakeLockOnLoad({
    shouldAcquireOnLoad,
    requestWakeLock,
  });

  useAutoAcquireWakeLockOnVisibilityChange({
    shouldAcquireOnVisibilityChange,
    didReleaseAutomatically,
    requestWakeLock,
  });

  const isIdle = useIsIdle();

  const contextValue = useMemo<AppContextType>(() => ({
    canExpandCollapse: canExpandCollapse && !isNewWindow,
    canFullscreen,
    canNewWindow: !isNewWindow && !isFullscreen,
    collapseUI,
    exitFullscreen,
    expandUI,
    fullscreenRef,
    isExpanded: isExpanded || isNewWindow,
    isFullyVisible,
    isFullscreen,
    isIdle,
    isNewWindow,
    isWakeLockEnabled,
    releaseWakeLock,
    requestFullscreen,
    requestWakeLock,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  }), [
    canExpandCollapse,
    canFullscreen,
    collapseUI,
    exitFullscreen,
    expandUI,
    fullscreenRef,
    isExpanded,
    isFullyVisible,
    isFullscreen,
    isIdle,
    isNewWindow,
    isWakeLockEnabled,
    releaseWakeLock,
    requestFullscreen,
    requestWakeLock,
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
