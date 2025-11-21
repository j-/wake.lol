import { type FC } from 'react';
import { useAutoDisableTimer } from '../context/AutoDisableTimerContext';
import { useAppContext } from '../controller';
import { IconHourglass } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonAutoDisableTimer: FC = () => {
  const { exitFullscreen } = useAppContext();
  const { showDialog } = useAutoDisableTimer();

  return (
    <ActionButton
      title="Automatically disable wake lock&hellip;"
      onClick={() => {
        exitFullscreen();
        showDialog();
      }}
    >
      <IconHourglass />
    </ActionButton>
  );
};
