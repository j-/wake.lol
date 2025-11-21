import { type FC } from 'react';
import { useAppContext } from '../controller';
import { IconMaximizeMinimize } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonFullscreen: FC = () => {
  const { isFullscreen, toggleFullscreen } = useAppContext();

  return (
    <ActionButton
      title={isFullscreen ? 'Exit fullscreen [f]' : 'Enter fullscreen [f]'}
      onClick={toggleFullscreen}
    >
      <IconMaximizeMinimize isMaximized={isFullscreen} />
    </ActionButton>
  );
};
