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
  isWakeLockEnabled: boolean;
  requestWakeLock?: RequestWakeLock;
  releaseWakeLock?: ReleaseWakeLock;
  toggleWakeLock?: ToggleWakeLock;
};

let didAccessDefaultAppContext = false;

const defaultAppContext = new Proxy<AppContextType>({
  isWakeLockEnabled: false,
  requestWakeLock: async () => {
    console.warn('Default requestWakeLock called, this may indicate a missing AppController provider.');
    return null;
  },
  releaseWakeLock: async () => {
    console.warn('Default releaseWakeLock called, this may indicate a missing AppController provider.');
  },
  toggleWakeLock: async () => {
    console.warn('Default toggleWakeLock called, this may indicate a missing AppController provider.');
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

  const contextValue = useMemo<AppContextType>(() => ({
    isWakeLockEnabled,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  }), [isWakeLockEnabled, requestWakeLock, releaseWakeLock, toggleWakeLock]);

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
