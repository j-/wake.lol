import { type FC } from 'react';
import {
  AutoDisableTimerType,
  useAutoDisableTimer,
} from '../context/AutoDisableTimerContext';
import { useAppContext } from '../controller';
import {
  IconClockFading,
  IconEye,
  IconEyeClosed,
  IconTimer,
} from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonWakeLock: FC = () => {
  const {
    isWakeLockEnabledOptimistic: isWakeLockEnabled,
    releaseWakeLock,
    toggleWakeLock,
  } = useAppContext();

  const {
    disableTime,
    disableType,
    clearAutoDisableTimer,
  } = useAutoDisableTimer();

  if (disableType === AutoDisableTimerType.CLOCK) {
    const timeString = new Date(disableTime).toLocaleTimeString();
    return (
      <ActionButton
        title={`Keeping screen awake until ${timeString}, click to disable`}
        onClick={() => {
          clearAutoDisableTimer();
          releaseWakeLock();
        }}
      >
        <IconClockFading />
      </ActionButton>
    );
  }

  if (disableType === AutoDisableTimerType.COUNTDOWN) {
    const timeString = new Date(disableTime).toLocaleTimeString();
    return (
      <ActionButton
        title={`Keeping screen awake until ${timeString}, click to disable`}
        onClick={() => {
          clearAutoDisableTimer();
          releaseWakeLock();
        }}
      >
        <IconTimer />
      </ActionButton>
    );
  }

  return (
    <ActionButton
      title={
        isWakeLockEnabled ?
          "Keeping screen awake, click to disable" :
          "Click to keep screen awake"
      }
      onClick={toggleWakeLock}
    >
      {isWakeLockEnabled ? <IconEye /> : <IconEyeClosed />}
    </ActionButton>
  );
};
