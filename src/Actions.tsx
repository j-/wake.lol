import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import { flushSync } from 'react-dom';
import { ActionButton } from './ActionButton';
import { ActionButtonWakeLock } from './ActionButtonWakeLock';
import { ID_BELOW_THE_FOLD } from './constants';
import { useAutoDisableTimer } from './context/AutoDisableTimerContext';
import { useBattery } from './context/BatteryManagerContext';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useDocument, useOpener } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  IconAppWindowPlatform,
  IconBattery,
  IconColorSwatch,
  IconEllipsis,
  IconExpandCollapse,
  IconHourglass,
  IconMaximizeMinimize,
  IconPictureInPicture,
} from './icons';
import { useNewWindowOpener } from './use-new-window-opener';

export const Actions: FC = () => {
  const document = useDocument();
  const opener = useOpener();

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canPictureInPicture,
    canScroll,
    canStartTimer,
    collapseUI,
    exitFullscreen,
    isExpanded,
    isFullscreen,
    toggleExpandCollapseUI,
    toggleFullscreen,
  } = useAppContext();

  const {
    isPictureInPictureWindowOpen,
    openPictureInPictureWindow,
  } = usePictureInPictureOpener();

  const { openNewWindow } = useNewWindowOpener();

  const { showDialog } = useAutoDisableTimer();

  const battery = useBattery();

  const buttonWakeLock = <ActionButtonWakeLock />;

  const showButtonBlack = true;

  const buttonBlack = !showButtonBlack ? null : (
    <ActionButton
      title="Make screen black"
      onClick={() => {
        const div = document.createElement('div');
        div.style.backgroundColor = 'black';
        document.body.appendChild(div);
        div.requestFullscreen();
        document.addEventListener('fullscreenchange', () => {
          if (document.fullscreenElement !== div) {
            document.body.removeChild(div);
          }
        }, { once: true });
      }}
    >
      <IconColorSwatch fill="#0006" />
    </ActionButton>
  );

  const showButtonScroll = canScroll;

  const buttonScroll = !showButtonScroll ? null : (
    <ActionButton
      title="More info and settings"
      onClick={() => {
        flushSync(() => collapseUI());
        document.getElementById(ID_BELOW_THE_FOLD)
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <IconEllipsis />
    </ActionButton>
  );

  const showButtonPictureInPicture =
    canPictureInPicture && !isPictureInPictureWindowOpen;

  const buttonPictureInPicture = !showButtonPictureInPicture ? null : (
    <ActionButton
      title="Open in picture-in-picture window [p]"
      onClick={() => openPictureInPictureWindow()}
    >
      <IconPictureInPicture />
    </ActionButton>
  );

  const showButtonNewWindow = canNewWindow;

  const buttonNewWindow = !showButtonNewWindow ? null : (
    <ActionButton
      title="Open in new window [n]"
      onClick={() => openNewWindow()}
    >
      <IconAppWindowPlatform />
    </ActionButton>
  );

  const showAutoDisableTimer = canStartTimer;

  const buttonAutoDisableTimer = !showAutoDisableTimer ? null : (
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

  const showButtonExpandCollapse = canExpandCollapse;

  const buttonExpandCollapse = !showButtonExpandCollapse ? null : (
    <ActionButton
      title={isExpanded ? 'Collapse UI [t]' : 'Expand UI [t]'}
      onClick={toggleExpandCollapseUI}
    >
      <IconExpandCollapse isExpanded={isExpanded} />
    </ActionButton>
  );

  const showButtonFullscreen = canFullscreen;

  const buttonFullscreen = !showButtonFullscreen ? null : (
    <ActionButton
      title={isFullscreen ? 'Exit fullscreen [f]' : 'Enter fullscreen [f]'}
      onClick={toggleFullscreen}
    >
      <IconMaximizeMinimize isMaximized={isFullscreen} />
    </ActionButton>
  );

  const buttonBattery = !battery || (battery.charging && battery.level >= 1) ? null : (
    <ActionButton
      title={`Battery ${battery.charging ? 'charging' : 'discharging'} (${Math.ceil(battery.level * 100)}%)`}
      onClick={() => opener?.focus()}
    >
      <IconBattery charging={battery.charging} level={battery.level} />
    </ActionButton>
  );

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
        {buttonBlack}
      </Stack>

      <Stack
        direction="row"
        lineHeight={1}
        gap={{ xs: 0, sm: 1, md: 2 }}
        ml="auto"
      >
        {buttonScroll}
        {buttonBattery}
        {buttonPictureInPicture}
        {buttonNewWindow}
        {buttonAutoDisableTimer}
        {buttonExpandCollapse}
        {buttonFullscreen}
      </Stack>
    </Stack>
  );
};
