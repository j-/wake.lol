import { type FC } from 'react';
import { IconAppWindowPlatform } from '../icons';
import { useNewWindowOpener } from '../use-new-window-opener';
import { ActionButton } from './ActionButton';

export const ActionButtonNewWindow: FC = () => {
  const { openNewWindow } = useNewWindowOpener();

  return (
    <ActionButton
      title="Open in new window [n]"
      onClick={() => openNewWindow()}
    >
      <IconAppWindowPlatform />
    </ActionButton>
  );
};
