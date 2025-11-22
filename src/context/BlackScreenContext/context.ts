import { createContext } from 'react';

export type BlackScreenContextType = {
  isBlackScreenShown: boolean;
  showBlackScreen: () => void;
  hideBlackScreen: () => void;
};

export const BlackScreenContext = createContext<BlackScreenContextType | null>({
  isBlackScreenShown: false,
  showBlackScreen: () => {
    throw new Error(
      'showBlackScreen must be used within a BlackScreenContext',
    );
  },
  hideBlackScreen: () => {
    throw new Error(
      'hideBlackScreen must be used within a BlackScreenContext',
    );
  },
});

BlackScreenContext.displayName = 'BlackScreenContext';
