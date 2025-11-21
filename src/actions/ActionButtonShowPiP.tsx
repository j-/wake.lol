import { type FC } from 'react';
import {
  usePictureInPictureOpener,
} from '../context/PictureInPictureOpenerContext';
import { IconPictureInPicture } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonShowPiP: FC = () => {
  const { openPictureInPictureWindow } = usePictureInPictureOpener();

  return (
    <ActionButton
      title="Open in picture-in-picture window [p]"
      onClick={() => openPictureInPictureWindow()}
    >
      <IconPictureInPicture />
    </ActionButton>
  );
};
