import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
  type RefObject
} from 'react';
import { flushSync } from 'react-dom';
import {
  useFullscreen,
  type ExitFullscreen,
  type RequestFullscreen,
  type ToggleFullscreen,
} from './use-fullscreen';
import { useIsNewWindow } from './use-is-new-window';
import { useIsWakeLockEnabled } from './use-is-wake-lock-enabled';
import { getWakeLockSentinel } from './wake-lock-sentinel';

const enableIntersectionObserver = false;

export type RequestWakeLock = () => Promise<WakeLockSentinel | null>;
export type ReleaseWakeLock = () => Promise<void>;
export type ToggleWakeLock = () => Promise<WakeLockSentinel | null | void>;

export type AppContextType = {
  fullscreenRef?: RefObject<HTMLElement | null>;
  canExpandCollapse: boolean;
  isExpanded: boolean;
  isFullyVisible: boolean;
  isWakeLockEnabled: boolean;
  canFullscreen: boolean;
  isFullscreen: boolean;
  canNewWindow: boolean;
  expandUI: () => void;
  collapseUI: () => void;
  toggleExpandCollapseUI: () => void;
  requestWakeLock: RequestWakeLock;
  releaseWakeLock: ReleaseWakeLock;
  toggleWakeLock: ToggleWakeLock;
  requestFullscreen: RequestFullscreen;
  exitFullscreen: ExitFullscreen;
  toggleFullscreen: ToggleFullscreen;
};

let didAccessDefaultAppContext = false;

const defaultAppContext = new Proxy<AppContextType>({
  canExpandCollapse: false,
  canFullscreen: false,
  canNewWindow: false,
  collapseUI: () => {
    console.error('Default collapseUI called, this may indicate a missing AppController provider.');
  },
  exitFullscreen: async () => {
    console.error('Default exitFullscreen called, this may indicate a missing AppController provider.');
  },
  expandUI: () => {
    console.error('Default expandUI called, this may indicate a missing AppController provider.');
  },
  fullscreenRef: undefined,
  isExpanded: false,
  isFullyVisible: false,
  isFullscreen: false,
  isWakeLockEnabled: false,
  releaseWakeLock: async () => {
    console.error('Default releaseWakeLock called, this may indicate a missing AppController provider.');
  },
  requestFullscreen: async () => {
    console.error('Default requestFullscreen called, this may indicate a missing AppController provider.');
  },
  requestWakeLock: async () => {
    console.error('Default requestWakeLock called, this may indicate a missing AppController provider.');
    return null;
  },
  toggleExpandCollapseUI: () => {
    console.error('Default toggleExpandCollapseUI called, this may indicate a missing AppController provider.');
  },
  toggleFullscreen: async () => {
    console.error('Default toggleFullscreen called, this may indicate a missing AppController provider.');
  },
  toggleWakeLock: async () => {
    console.error('Default toggleWakeLock called, this may indicate a missing AppController provider.');
    return null;
  },
}, {
  get: (target, prop) => {
    if (!didAccessDefaultAppContext) {
      console.warn(
        'Accessing default AppContext, this may indicate a missing AppController provider.',
      );
      didAccessDefaultAppContext = true;
    }
    return Reflect.get(target, prop);
  },
});

export const AppContext = createContext<AppContextType>(defaultAppContext);

export const AppController: FC<PropsWithChildren> = ({ children }) => {
  const fullscreenRef = useRef<HTMLElement>(null);

  const [isFullyVisible, setIsFullyVisible] = useState(enableIntersectionObserver);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);
  const [didRelease, setDidRelease] = useState(false);
  const [didInit, setDidInit] = useState(false);

  const isNewWindow = useIsNewWindow();

  const {
    isFullscreen,
    exitFullscreen,
    requestFullscreen,
    toggleFullscreen,
  } = useFullscreen({ fullscreenRef });

  const canExpandCollapse = !isFullscreen;
  const canFullscreen = true;
  const shouldReacquireWakeLock = true;
  const shouldAcquireOnLoad = true;

  const isWakeLockEnabled = useIsWakeLockEnabled({ sentinel });

  const releaseWakeLock = useCallback<ReleaseWakeLock>(async () => {
    if (sentinel) {
      await sentinel.release();
      setSentinel(null);
    }
  }, [sentinel]);

  const requestWakeLock = useCallback<RequestWakeLock>(async () => {
    if (sentinel) {
      await releaseWakeLock();
    }
    const newSentinel = await getWakeLockSentinel();
    setSentinel(newSentinel);
    return newSentinel;
  }, [releaseWakeLock, sentinel]);

  const toggleWakeLock = useCallback<ToggleWakeLock>(async () => {
    if (sentinel) {
      await releaseWakeLock();
    } else {
      return await requestWakeLock();
    }
  }, [releaseWakeLock, requestWakeLock, sentinel]);

  const expandUI = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapseUI = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const toggleExpandCollapseUI = useCallback(() => {
    if (isExpanded) {
      collapseUI();
    } else {
      expandUI();
    }
  }, [isExpanded, expandUI, collapseUI]);

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
    if (!sentinel) return;
    const handleSentinelRelease = async () => {
      if (sentinel.released) {
        setSentinel(null);
        setDidRelease(true);
      }
    };
    sentinel.addEventListener('release', handleSentinelRelease);
    return () => {
      sentinel.removeEventListener('release', handleSentinelRelease);
    };
  }, [sentinel, shouldReacquireWakeLock]);

  useEffect(() => {
    if (!shouldReacquireWakeLock || !didRelease) return;
    const handleVisibilitychange = () => {
      if (shouldReacquireWakeLock && document.visibilityState === 'visible') {
        flushSync(() => {
          requestWakeLock().then((newSentinel) => {
            if (newSentinel) {
              setSentinel(newSentinel);
              setDidRelease(false);
            }
          });
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [didRelease, fullscreenRef, requestWakeLock, shouldReacquireWakeLock]);

  useEffect(() => {
    if (!shouldAcquireOnLoad || didInit) return;
    const handleVisibilitychange = () => {
      if (document.visibilityState === 'visible') {
        flushSync(() => {
          requestWakeLock().then((newSentinel) => {
            if (newSentinel) {
              setSentinel(newSentinel);
              setDidRelease(false);
              setDidInit(true);
            }
          });
        });
      }
    };
    handleVisibilitychange();
    document.addEventListener('visibilitychange', handleVisibilitychange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange);
    };
  }, [didInit, requestWakeLock, shouldAcquireOnLoad]);

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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppController');
  }
  return context;
};
