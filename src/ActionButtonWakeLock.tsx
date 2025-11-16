import { type FC } from 'react';
import { ActionButton } from './ActionButton';
import {
  AutoDisableTimerType,
  useAutoDisableTimer,
} from './context/AutoDisableTimerContext';
import { useAppContext } from './controller';
import {
  IconClockFading,
  IconEye,
  IconEyeClosed,
  IconTimer,
} from './icons';

export const ActionButtonWakeLock: FC = () => {
  const {
    isWakeLockEnabled,
    releaseWakeLock,
    requestWakeLock,
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

  if (isWakeLockEnabled) {
    return (
      <ActionButton
        title="Keeping screen awake, click to disable"
        onClick={releaseWakeLock}
      >
        <IconEye />
      </ActionButton>
    );
  }

  return (
    <ActionButton
      title="Click to keep screen awake"
      onClick={requestWakeLock}
    >
      <IconEyeClosed />
    </ActionButton>
  );
};
