import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { AutoDisableTimerDialog } from '../../AutoDisableTimerDialog';
import { useAppContext } from '../../controller';
import { useNavigator } from '../WindowContext';
import {
  AutoDisableTimerContext,
  DEFAULT_AUTO_DISABLE_TIMER_STATE,
  type AutoDisableTimerContextType,
  type AutoDisableTimerState,
  type ClearAutoDisableTimer,
  type SetAutoDisableTimer,
} from './context';

const initialState = DEFAULT_AUTO_DISABLE_TIMER_STATE;

export type AutoDisableTimerProps = PropsWithChildren & {
  interval?: number;
};

/** Must be mounted within `AppController`. */
export const AutoDisableTimer: FC<AutoDisableTimerProps> = ({
  interval = 500,
  children,
}) => {
  const navigator = useNavigator();

  const [state, setState] = useState<AutoDisableTimerState>(initialState);
  const [show, setShow] = useState(false);

  const { disableTime } = state;

  const { isWakeLockEnabledOptimistic: isWakeLockEnabled, releaseWakeLock } = useAppContext();

  const setAutoDisableTimer = useCallback<SetAutoDisableTimer>((
    disableType,
    disableTime,
  ) => {
    setState({ disableType, disableTime });
  }, []);

  const clearAutoDisableTimer = useCallback<ClearAutoDisableTimer>(() => {
    setState(initialState);
  }, []);

  const showDialog = useCallback(() => {
    setShow(true);
  }, []);

  const hideDialog = useCallback(() => {
    setShow(false);
  }, []);

  const value = useMemo<AutoDisableTimerContextType>(() => ({
    ...state,
    setAutoDisableTimer,
    clearAutoDisableTimer,
    showDialog,
    hideDialog,
  }), [
    state,
    setAutoDisableTimer,
    clearAutoDisableTimer,
    showDialog,
    hideDialog,
  ]);

  useEffect(() => {
    if (!isWakeLockEnabled || !disableTime) return;

    const clock = setInterval(() => {
      if (Date.now() < disableTime) return;

      releaseWakeLock();
      clearAutoDisableTimer();
      navigator.vibrate?.([1000]);
    }, interval);

    return () => {
      clearInterval(clock);
    };
  }, [
    clearAutoDisableTimer,
    disableTime,
    interval,
    isWakeLockEnabled,
    navigator,
    releaseWakeLock,
  ]);

  return (
    <AutoDisableTimerContext value={value}>
      <AutoDisableTimerDialog
        open={show}
        onClose={() => setShow(false)}
        onSubmit={() => setShow(false)}
      />

      {children}
    </AutoDisableTimerContext>
  );
};
