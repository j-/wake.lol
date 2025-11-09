import { createContext, useContext, type RefObject } from 'react';
import { DEFAULT_THEME_COLOR } from '../constants';
import type {
  CollapseUI,
  ExpandUI,
  ToggleExpandCollapseUI,
} from './use-expand-collapse-ui';
import type {
  ExitFullscreen,
  RequestFullscreen,
  ToggleFullscreen,
} from './use-fullscreen';
import { type UsePreferencesResult } from './use-preferences';
import type {
  ReleaseWakeLock,
  RequestWakeLock,
  ToggleWakeLock,
} from './use-wake-lock';

export type AppContextType = UsePreferencesResult & {
  canExpandCollapse: boolean;
  canFullscreen: boolean;
  canNewWindow: boolean;
  canPictureInPicture: boolean;
  canScroll: boolean;
  collapseUI: CollapseUI;
  exitFullscreen: ExitFullscreen;
  expandUI: ExpandUI;
  fullscreenRef?: RefObject<HTMLElement | null>;
  isExpanded: boolean;
  isFullscreen: boolean;
  isFullyVisible: boolean;
  isIdle: boolean;
  isWakeLockEnabled: boolean;
  releaseWakeLock: ReleaseWakeLock;
  resetThemeColor: () => void;
  requestFullscreen: RequestFullscreen;
  requestWakeLock: RequestWakeLock;
  toggleExpandCollapseUI: ToggleExpandCollapseUI;
  toggleFullscreen: ToggleFullscreen;
  toggleWakeLock: ToggleWakeLock;
};

let didAccessDefaultAppContext = false;

const defaultAppContext = new Proxy<AppContextType>({
  canExpandCollapse: false,
  canFullscreen: false,
  canNewWindow: false,
  canPictureInPicture: false,
  canScroll: false,
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
  isIdle: false,
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
  resetThemeColor: () => {
    console.error('Default resetThemeColor called, this may indicate a missing AppController provider.');
  },
  setShouldAcquireOnLoad: () => {
    console.error('Default setShouldAcquireOnLoad called, this may indicate a missing AppController provider.');
  },
  setShouldAcquireOnVisibilityChange: () => {
    console.error('Default setShouldAcquireOnVisibilityChange called, this may indicate a missing AppController provider.');
  },
  setShouldExpandUI: () => {
    console.error('Default setShouldExpandUI called, this may indicate a missing AppController provider.');
  },
  setShouldOpenPiPOnInactive: () => {
    console.error('Default setShouldOpenPiPOnInactive called, this may indicate a missing AppController provider.');
  },
  setThemeColor: () => {
    console.error('Default setThemeColor called, this may indicate a missing AppController provider.');
  },
  shouldAcquireOnLoad: false,
  shouldAcquireOnVisibilityChange: true,
  shouldExpandUI: false,
  shouldOpenPiPOnInactive: false,
  themeColor: DEFAULT_THEME_COLOR,
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppController');
  }
  return context;
};
