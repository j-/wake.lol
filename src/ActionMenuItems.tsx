import { type FC } from 'react';
import { ActionMenuItemAutoDisableTimer } from './actions/action-auto-disable-timer';
import { ActionMenuItemBattery } from './actions/action-battery';
import { ActionMenuItemBlackScreen } from './actions/action-black-screen';
import { ActionMenuItemExpandCollapse } from './actions/action-expand-collapse';
import { ActionMenuItemFullscreen } from './actions/action-fullscreen';
import { ActionMenuItemNewWindow } from './actions/action-new-window';
import { ActionMenuItemScroll } from './actions/action-scroll';
import { ActionMenuItemShowPiP } from './actions/action-show-pip';
import { useBattery } from './context/BatteryManagerContext';
import { useAppContext } from './controller';
import { useShowButtonBlackScreen } from './use-show-button-black-screen';
import { useShowButtonShowPiP } from './use-show-button-show-pip';

export type ActionMenuItemsProps = {
  onClose: () => void;
};

export const ActionMenuItems: FC<ActionMenuItemsProps> = ({
  onClose,
}) => {
  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canScroll,
    canStartTimer,
  } = useAppContext();

  const battery = useBattery();

  const showButtonScroll = canScroll;

  const itemScroll = showButtonScroll ? (
    <ActionMenuItemScroll onClick={onClose} />
  ) : null;

  const showButtonShowPiP = useShowButtonShowPiP();
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

  const showButtonBlackScreen = useShowButtonBlackScreen();
  const itemBlackScreen = showButtonBlackScreen ? (
    <ActionMenuItemBlackScreen onClick={onClose} />
  ) : null;

  const itemBattery = battery && (battery.level < 1 || !battery.charging) ? (
    <ActionMenuItemBattery onClick={onClose} />
  ) : null;

  return (
    <>
      {itemFullscreen}
      {itemExpandCollapse}
      {itemAutoDisableTimer}
      {itemNewWindow}
      {itemShowPiP}
      {itemBlackScreen}
      {itemBattery}
      {itemScroll}
    </>
  );
};
