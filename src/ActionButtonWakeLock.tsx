import type { LucideProps } from 'lucide-react';
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
  IconEyeOpenClosed,
  IconTimer,
} from './icons';

export const ActionButtonWakeLock: FC = () => {
  const { isWakeLockEnabled, toggleWakeLock } = useAppContext();

  const { disableTime, disableType } = useAutoDisableTimer();

  const iconSize = 24;
  const iconStyle: LucideProps['style'] = {
    transition: 'all 200ms ease-in-out',
  };

  if (disableType === AutoDisableTimerType.CLOCK) {
    const timeString = new Date(disableTime).toLocaleTimeString();
    return (
      <ActionButton
        title={`Keeping screen awake until ${timeString}, click to disable`}
        onClick={toggleWakeLock}
      >
        <IconClockFading
          size={iconSize}
          style={iconStyle}
        />
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
        <IconTimer
          size={iconSize}
          style={iconStyle}
        />
      </ActionButton>
    );
  }

  if (isWakeLockEnabled) {
    return (
      <ActionButton
        title="Keeping screen awake, click to disable"
        onClick={toggleWakeLock}
      >
        <IconEye
          size={iconSize}
          style={iconStyle}
        />
      </ActionButton>
    );
  }

  return (
    <ActionButton
      title="Click to keep screen awake"
      onClick={toggleWakeLock}
    >
      <IconEyeOpenClosed
        isWakeLockEnabled={isWakeLockEnabled}
        size={iconSize}
        style={iconStyle}
      />
    </ActionButton>
  );
};
