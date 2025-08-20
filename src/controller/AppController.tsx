import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type PropsWithChildren
} from 'react';
import {
  AppContext,
  type AppContextType,
  type ReleaseWakeLock,
  type RequestWakeLock,
  type ToggleWakeLock,
} from './context';
import {
  useAutoAcquireWakeLockOnLoad,
} from './use-auto-acquire-wake-lock-on-load';
import {
  useAutoAcquireWakeLockOnVisibilityChange,
} from './use-auto-acquire-wake-lock-on-visibility-change';
import {
  useExpandCollapseUI
} from './use-expand-collapse-ui';
import {
  useFullscreen
} from './use-fullscreen';
import { useIsNewWindow } from './use-is-new-window';
import { useIsWakeLockEnabled } from './use-is-wake-lock-enabled';
import { getWakeLockSentinel } from './wake-lock-sentinel';

const enableIntersectionObserver = false;

export const AppController: FC<PropsWithChildren> = ({ children }) => {
  const fullscreenRef = useRef<HTMLElement>(null);

  const [isFullyVisible, setIsFullyVisible] = useState(enableIntersectionObserver);
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);
  const [didReleaseAutomatically, setDidReleaseAutomatically] = useState(false);

  const isNewWindow = useIsNewWindow();

  const {
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  } = useFullscreen({ fullscreenRef });

  const canExpandCollapse = !isFullscreen;
  const canFullscreen = true;

  const shouldAcquireOnLoad = true;
  const shouldAcquireOnVisibilityChange = true;

  const isWakeLockEnabled = useIsWakeLockEnabled({ sentinel });

  const releaseWakeLock = useCallback<ReleaseWakeLock>(async () => {
    if (sentinel) {
      await sentinel.release();
      setSentinel(null);
      setDidReleaseAutomatically(false);
    }
  }, [sentinel]);

  const requestWakeLock = useCallback<RequestWakeLock>(async () => {
    if (sentinel && !sentinel.released) {
      await releaseWakeLock();
    }
    const newSentinel = await getWakeLockSentinel();
    setSentinel(newSentinel);
    setDidReleaseAutomatically(false);
    return newSentinel;
  }, [releaseWakeLock, sentinel]);

  const toggleWakeLock = useCallback<ToggleWakeLock>(async () => {
    if (sentinel && !sentinel.released) {
      await releaseWakeLock();
      setDidReleaseAutomatically(false);
    } else {
      const newSentinel = await requestWakeLock();
      setDidReleaseAutomatically(false);
      return newSentinel;
    }
  }, [releaseWakeLock, requestWakeLock, sentinel]);

  const {
    isExpanded,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
  } = useExpandCollapseUI();

  useAutoAcquireWakeLockOnLoad({
    shouldAcquireOnLoad,
    requestWakeLock,
  });

  useAutoAcquireWakeLockOnVisibilityChange({
    shouldAcquireOnVisibilityChange,
    didReleaseAutomatically,
    requestWakeLock,
  });

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
    isNewWindow,
    isWakeLockEnabled,
    releaseWakeLock,
    requestFullscreen,
    requestWakeLock,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  ]);

  useEffect(() => {
    if (!sentinel || didReleaseAutomatically) return;
    const handleSentinelRelease = async () => {
      if (sentinel.released) {
        setDidReleaseAutomatically(true);
      }
    }
    sentinel.addEventListener('release', handleSentinelRelease);
    return () => {
      sentinel.removeEventListener('release', handleSentinelRelease);
    };
  }, [sentinel, didReleaseAutomatically]);

  useEffect(() => {
    if (!enableIntersectionObserver) return;

    const element = fullscreenRef?.current;
    if (!element) return;

    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setIsFullyVisible(entry.intersectionRatio >= 0.95);
    }, {
      root: null,
      threshold: [1, 0.95],
    });

    io.observe(element);

    return () => {
      io.disconnect();
    };
  }, [fullscreenRef]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
