import Menu from '@mui/material/Menu';
import { type RefObject } from 'react';
import { ActionMenuItemAutoDisableTimer } from './actions/action-auto-disable-timer';
import { ActionMenuItemBattery } from './actions/action-battery';
import { ActionMenuItemBlackScreen } from './actions/action-black-screen';
import { ActionMenuItemFullscreen } from './actions/action-fullscreen';
import { ActionMenuItemNewWindow } from './actions/action-new-window';
import { ActionMenuItemShowPiP } from './actions/action-show-pip';

export type ActionMenuProps<T extends HTMLElement> = {
  open: boolean;
  anchorRef: RefObject<T | null>;
  onClose: () => void;
};

export const ActionMenu = <T extends HTMLElement>({
  open,
  anchorRef,
  onClose,
}: ActionMenuProps<T>) => {
  return (
    <Menu
      anchorEl={() => anchorRef.current}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          sx: { width: 360, maxWidth: '100%' },
        },
      }}
    >
      <ActionMenuItemAutoDisableTimer onClick={onClose} />
      <ActionMenuItemBattery onClick={onClose} />
      <ActionMenuItemBlackScreen onClick={onClose} />
      <ActionMenuItemFullscreen onClick={onClose} />
      <ActionMenuItemNewWindow onClick={onClose} />
      <ActionMenuItemShowPiP onClick={onClose} />
    </Menu>
  );
};
