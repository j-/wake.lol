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
  const { isWakeLockEnabled, toggleWakeLock } = useAppContext();

  const { disableTime, disableType } = useAutoDisableTimer();

  const iconSize = 24;

  if (disableType === AutoDisableTimerType.CLOCK) {
    const timeString = new Date(disableTime).toLocaleTimeString();
    return (
      <ActionButton
        title={`Keeping screen awake until ${timeString}, click to disable`}
        onClick={toggleWakeLock}
      >
        <IconClockFading size={iconSize} />
      </ActionButton>
    );
  }

  if (disableType === AutoDisableTimerType.COUNTDOWN) {
    const timeString = new Date(disableTime).toLocaleTimeString();
    return (
      <ActionButton
        title={`Keeping screen awake until ${timeString}, click to disable`}
        onClick={toggleWakeLock}
      >
        <IconTimer size={iconSize} />
      </ActionButton>
    );
  }

  if (isWakeLockEnabled) {
    return (
      <ActionButton
        title="Keeping screen awake, click to disable"
        onClick={toggleWakeLock}
      >
        <IconEye size={iconSize} />
      </ActionButton>
    );
  }

  return (
    <ActionButton
      title="Click to keep screen awake"
      onClick={toggleWakeLock}
    >
      <IconEyeClosed size={iconSize} />
    </ActionButton>
  );
};
