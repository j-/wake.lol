import { useContext } from 'react';
import { BlackScreenContext } from './context';

export const useBlackScreen = () => {
  const context = useContext(BlackScreenContext);
  if (!context) {
    throw new Error(
      'useBlackScreen must be used within a BlackScreenContext',
    );
  }
  return context;
};
