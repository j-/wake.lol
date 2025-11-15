import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { useAppContext } from '../../controller';
import {
  AutoDisableTimerContext,
  DEFAULT_AUTO_DISABLE_TIMER_STATE,
  type AutoDisableTimerContextType,
  type AutoDisableTimerState,
  type ClearAutoDisableTimer,
  type SetAutoDisableTimer,
} from './context';

const initialState = DEFAULT_AUTO_DISABLE_TIMER_STATE;

/** Must be mounted within `AppController`. */
export const AutoDisableTimer: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AutoDisableTimerState>(initialState);

  const { disableTime } = state;

  const { isWakeLockEnabled, releaseWakeLock } = useAppContext();

  const setAutoDisableTimer = useCallback<SetAutoDisableTimer>((
    disableType,
    disableTime,
  ) => {
    setState({ disableType, disableTime });
  }, []);

  const clearAutoDisableTimer = useCallback<ClearAutoDisableTimer>(() => {
    setState(initialState);
  }, []);

  const value = useMemo<AutoDisableTimerContextType>(() => ({
    ...state,
    setAutoDisableTimer,
    clearAutoDisableTimer,
  }), [
    state,
    setAutoDisableTimer,
    clearAutoDisableTimer,
  ]);

  useEffect(() => {
    if (!isWakeLockEnabled || !disableTime) return;

    const clock = setInterval(() => {
      if (Date.now() < disableTime) return;

      releaseWakeLock();
      clearAutoDisableTimer();
    }, 1_000);

    return () => {
      clearInterval(clock);
    };
  }, [clearAutoDisableTimer, disableTime, isWakeLockEnabled, releaseWakeLock]);

  return (
    <AutoDisableTimerContext value={value}>{children}</AutoDisableTimerContext>
  );
};
