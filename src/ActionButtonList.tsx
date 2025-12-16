import { type FC } from 'react';
import { ActionButtonAutoDisableTimer } from './actions/action-auto-disable-timer';
import { ActionButtonBattery } from './actions/action-battery';
import { ActionButtonExpandCollapse } from './actions/action-expand-collapse';
import { ActionButtonFullscreen } from './actions/action-fullscreen';
import { ActionButtonNewWindow } from './actions/action-new-window';
import { ActionButtonScroll } from './actions/action-scroll';
import { ActionButtonShowPiP } from './actions/action-show-pip';
import { useBattery } from './context/BatteryManagerContext';
import { useAppContext } from './controller';
import { useShowButtonShowPiP } from './use-show-button-show-pip';

export const ActionButtonList: FC = () => {
  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canScroll,
    canStartTimer,
  } = useAppContext();

  const battery = useBattery();

  const showButtonScroll = canScroll;

  const buttonScroll = showButtonScroll ? (
    <ActionButtonScroll />
  ) : null;

  const showButtonShowPiP = useShowButtonShowPiP();

  const buttonShowPiP = showButtonShowPiP ? (
    <ActionButtonShowPiP />
  ) : null;

  const showButtonNewWindow = canNewWindow;

  const buttonNewWindow = showButtonNewWindow ? (
    <ActionButtonNewWindow />
  ) : null;

  const showAutoDisableTimer = canStartTimer;

  const buttonAutoDisableTimer = showAutoDisableTimer ? (
    <ActionButtonAutoDisableTimer />
  ) : null;

  const showButtonExpandCollapse = canExpandCollapse;

  const buttonExpandCollapse = showButtonExpandCollapse ? (
    <ActionButtonExpandCollapse />
  ) : null;

  const showButtonFullscreen = canFullscreen;

  const buttonFullscreen = showButtonFullscreen ? (
    <ActionButtonFullscreen />
  ) : null;

  const buttonBattery = battery && (battery.level < 1 || !battery.charging) ? (
    <ActionButtonBattery />
  ) : null;

  return (
    <>
      {buttonFullscreen}
      {buttonExpandCollapse}
      {buttonAutoDisableTimer}
      {buttonNewWindow}
      {buttonShowPiP}
      {buttonBattery}
      {buttonScroll}
    </>
  );
};
