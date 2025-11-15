import { useContext } from 'react';
import { AutoDisableTimerContext } from './context';

export const useAutoDisableTimer = () => {
  const context = useContext(AutoDisableTimerContext);
  if (!context) {
    throw new Error(
      'useAutoDisableTimer must be used within a AutoDisableTimerContext',
    );
  }
  return context;
};
