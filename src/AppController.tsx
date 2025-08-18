import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { getWakeLockSentinel } from './wake-lock-sentinel';

export type RequestWakeLock = () => Promise<WakeLockSentinel | null>;
export type ReleaseWakeLock = () => Promise<void>;
export type ToggleWakeLock = () => Promise<WakeLockSentinel | null | void>;
export type RequestFullscreen = () => Promise<void>;
export type ExitFullscreen = () => Promise<void>;
export type ToggleFullscreen = () => Promise<void>;

export type AppContextType = {
  fullscreenRef?: RefObject<HTMLElement | null>;
  canExpandCollapse: boolean;
  isExpanded: boolean;
  isWakeLockEnabled: boolean;
  canFullscreen: boolean;
  isFullscreen: boolean;
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
  fullscreenRef: undefined,
  canExpandCollapse: false,
  isExpanded: false,
  isWakeLockEnabled: false,
  canFullscreen: false,
  isFullscreen: false,
  expandUI: () => {
    console.error('Default expandUI called, this may indicate a missing AppController provider.');
  },
  collapseUI: () => {
    console.error('Default collapseUI called, this may indicate a missing AppController provider.');
  },
  toggleExpandCollapseUI: () => {
    console.error('Default toggleExpandCollapseUI called, this may indicate a missing AppController provider.');
  },
  requestWakeLock: async () => {
    console.error('Default requestWakeLock called, this may indicate a missing AppController provider.');
    return null;
  },
  releaseWakeLock: async () => {
    console.error('Default releaseWakeLock called, this may indicate a missing AppController provider.');
  },
  toggleWakeLock: async () => {
    console.error('Default toggleWakeLock called, this may indicate a missing AppController provider.');
    return null;
  },
  requestFullscreen: async () => {
    console.error('Default requestFullscreen called, this may indicate a missing AppController provider.');
  },
  exitFullscreen: async () => {
    console.error('Default exitFullscreen called, this may indicate a missing AppController provider.');
  },
  toggleFullscreen: async () => {
    console.error('Default toggleFullscreen called, this may indicate a missing AppController provider.');
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

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);

  const canExpandCollapse = !isFullscreen;
  const canFullscreen = true;

  const isWakeLockEnabled = useMemo(() => {
    return sentinel != null && !sentinel.released;
  }, [sentinel]);

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
  }, []);

  const toggleFullscreen = useCallback<ToggleFullscreen>(() => {
    if (isFullscreen) {
      return exitFullscreen();
    } else {
      return requestFullscreen();
    }
  }, [isFullscreen, requestFullscreen, exitFullscreen]);

  const contextValue = useMemo<AppContextType>(() => ({
    fullscreenRef,
    isExpanded,
    canExpandCollapse,
    isWakeLockEnabled,
    canFullscreen,
    isFullscreen,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
  }), [
    fullscreenRef,
    isExpanded,
    canExpandCollapse,
    isWakeLockEnabled,
    canFullscreen,
    isFullscreen,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
  ]);

  useEffect(() => {
    if (!sentinel) return;
    const handleSentinelRelease = () => {
      if (sentinel.released) {
        setSentinel(null);
      }
    };
    sentinel.addEventListener('release', handleSentinelRelease);
    return () => {
      sentinel.removeEventListener('release', handleSentinelRelease);
    };
  }, [sentinel]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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
