import Menu from '@mui/material/Menu';
import { type RefObject } from 'react';
import { ActionMenuItemAutoDisableTimer } from './actions/action-auto-disable-timer';
import { ActionMenuItemBattery } from './actions/action-battery';
import { ActionMenuItemBlackScreen } from './actions/action-black-screen';
import { ActionMenuItemExpandCollapse } from './actions/action-expand-collapse';
import { ActionMenuItemFullscreen } from './actions/action-fullscreen';
import { ActionMenuItemNewWindow } from './actions/action-new-window';
import { ActionMenuItemScroll } from './actions/action-scroll';
import { ActionMenuItemShowPiP } from './actions/action-show-pip';
import { useBattery } from './context/BatteryManagerContext';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useAppContext } from './controller';
import { useTooltipContainer } from './use-tooltip-container';

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
  const tooltipContainer = useTooltipContainer();

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canPictureInPicture,
    canScroll,
    canStartTimer,
  } = useAppContext();

  const { isPictureInPictureWindowOpen } = usePictureInPictureOpener();

  const battery = useBattery();

  const showButtonScroll = canScroll;

  const itemScroll = showButtonScroll ? (
    <ActionMenuItemScroll onClick={onClose} />
  ) : null;

  const showButtonShowPiP =
    canPictureInPicture && !isPictureInPictureWindowOpen;

  const itemShowPiP = showButtonShowPiP ? (
    <ActionMenuItemShowPiP onClick={onClose} />
  ) : null;

  const showButtonNewWindow = canNewWindow;

  const itemNewWindow = showButtonNewWindow ? (
    <ActionMenuItemNewWindow onClick={onClose} />
  ) : null;

  const showAutoDisableTimer = canStartTimer;

  const itemAutoDisableTimer = showAutoDisableTimer ? (
    <ActionMenuItemAutoDisableTimer onClick={onClose} />
  ) : null;

  const showButtonExpandCollapse = canExpandCollapse;

  const itemExpandCollapse = showButtonExpandCollapse ? (
    <ActionMenuItemExpandCollapse onClick={onClose} />
  ) : null;

  const showButtonFullscreen = canFullscreen;

  const itemFullscreen = showButtonFullscreen ? (
    <ActionMenuItemFullscreen onClick={onClose} />
  ) : null;

  const itemBlackScreen = <ActionMenuItemBlackScreen onClick={onClose} />;

  const itemBattery = battery && (battery.level < 1 || !battery.charging) ? (
    <ActionMenuItemBattery onClick={onClose} />
  ) : null;

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
      container={tooltipContainer}
      transitionDuration={0}
    >
      {itemFullscreen}
      {itemExpandCollapse}
      {itemAutoDisableTimer}
      {itemNewWindow}
      {itemShowPiP}
      {itemBlackScreen}
      {itemBattery}
      {itemScroll}
    </Menu>
  );
};
