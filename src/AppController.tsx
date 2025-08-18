import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getWakeLockSentinel } from './wake-lock-sentinel';

export type RequestWakeLock = () => Promise<WakeLockSentinel | null>;
export type ReleaseWakeLock = () => Promise<void>;
export type ToggleWakeLock = () => Promise<WakeLockSentinel | null | void>;

export type AppContextType = {
  canExpandCollapse: boolean;
  isExpanded: boolean;
  isWakeLockEnabled: boolean;
  expandUI: () => void;
  collapseUI: () => void;
  toggleExpandCollapseUI: () => void;
  requestWakeLock: RequestWakeLock;
  releaseWakeLock: ReleaseWakeLock;
  toggleWakeLock: ToggleWakeLock;
};

let didAccessDefaultAppContext = false;

const defaultAppContext = new Proxy<AppContextType>({
  canExpandCollapse: false,
  isExpanded: false,
  isWakeLockEnabled: false,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);

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

  const contextValue = useMemo<AppContextType>(() => ({
    isExpanded,
    canExpandCollapse: true,
    isWakeLockEnabled,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  }), [
    isExpanded,
    isWakeLockEnabled,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  ]);

  useEffect(() => {
    if (!sentinel) return;
    const handler = () => {
      if (sentinel.released) {
        setSentinel(null);
      }
    };
    sentinel.addEventListener('release', handler);
    return () => {
      sentinel.removeEventListener('release', handler);
    };
  }, [sentinel]);

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
