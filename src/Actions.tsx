import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import { flushSync } from 'react-dom';
import { ActionButton } from './ActionButton';
import { ActionButtonWakeLock } from './ActionButtonWakeLock';
import { ID_BELOW_THE_FOLD } from './constants';
import { useAutoDisableTimer } from './context/AutoDisableTimerContext';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  IconAppWindowPlatform,
  IconEllipsis,
  IconExpandCollapse,
  IconHourglass,
  IconMaximizeMinimize,
  IconPictureInPicture,
} from './icons';
import { useNewWindowOpener } from './use-new-window-opener';

export const Actions: FC = () => {
  const document = useDocument();

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canPictureInPicture,
    canScroll,
    canStartTimer,
    collapseUI,
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

  const buttonWakeLock = <ActionButtonWakeLock />;

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
      title="Automatically disable wake lock"
      onClick={showDialog}
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

  return (
    <Stack
      direction="row"
      gap={4}
      height={(theme) => theme.spacing(4)}
      alignItems="center"
      data-test-id="Actions"
    >
      <Box lineHeight={1}>
        {buttonWakeLock}
      </Box>

      <Stack
        direction="row"
        lineHeight={1}
        gap={{ xs: 0, sm: 1, md: 2 }}
        ml="auto"
      >
        {buttonScroll}
        {buttonPictureInPicture}
        {buttonNewWindow}
        {buttonAutoDisableTimer}
        {buttonExpandCollapse}
        {buttonFullscreen}
      </Stack>
    </Stack>
  );
};
