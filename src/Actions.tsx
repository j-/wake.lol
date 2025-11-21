import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import { ActionButtonAutoDisableTimer } from './actions/ActionButtonAutoDisableTimer';
import { ActionButtonBattery } from './actions/ActionButtonBattery';
import { ActionButtonBlackScreen } from './actions/ActionButtonBlackScreen';
import { ActionButtonExpandCollapse } from './actions/ActionButtonExpandCollapse';
import { ActionButtonFullscreen } from './actions/ActionButtonFullscreen';
import { ActionButtonNewWindow } from './actions/ActionButtonNewWindow';
import { ActionButtonScroll } from './actions/ActionButtonScroll';
import { ActionButtonShowPiP } from './actions/ActionButtonShowPiP';
import { ActionButtonWakeLock } from './actions/ActionButtonWakeLock';
import { useBattery } from './context/BatteryManagerContext';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';

export const Actions: FC = () => {
  const document = useDocument();

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canPictureInPicture,
    canScroll,
    canStartTimer,
    isFullscreen,
  } = useAppContext();

  const { isPictureInPictureWindowOpen } = usePictureInPictureOpener();

  const battery = useBattery();

  const buttonWakeLock = <ActionButtonWakeLock />;

  const showButtonBlackScreen = (
    !isFullscreen &&
    typeof document.body.requestFullscreen === 'function'
  );

  const buttonBlackScreen = showButtonBlackScreen ? (
    <ActionButtonBlackScreen />
  ) : null;

  const showButtonScroll = canScroll;

  const buttonScroll = showButtonScroll ? (
    <ActionButtonScroll />
  ) : null;

  const showButtonShowPiP =
    canPictureInPicture && !isPictureInPictureWindowOpen;

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
    <Stack
      direction="row"
      gap={2}
      height={(theme) => theme.spacing(4)}
      alignItems="center"
      data-test-id="Actions"
    >
      <Stack
        direction="row"
        lineHeight={1}
        gap={{ xs: 0, sm: 1, md: 2 }}
      >
        {buttonWakeLock}
        {buttonBlackScreen}
      </Stack>

      <Stack
        direction="row"
        lineHeight={1}
        gap={{ xs: 0, sm: 1, md: 2 }}
        ml="auto"
      >
        {buttonScroll}
        {buttonBattery}
        {buttonShowPiP}
        {buttonNewWindow}
        {buttonAutoDisableTimer}
        {buttonExpandCollapse}
        {buttonFullscreen}
      </Stack>
    </Stack>
  );
};
