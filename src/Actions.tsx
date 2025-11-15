import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import type { LucideProps } from 'lucide-react';
import { type FC } from 'react';
import { ActionButton } from './ActionButton';
import { ID_BELOW_THE_FOLD } from './constants';
import { useAutoDisableTimer } from './context/AutoDisableTimerContext';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  IconAppWindowPlatform,
  IconEllipsis,
  IconExpandCollapse,
  IconEyeOpenClosed,
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
    isExpanded,
    isFullscreen,
    isWakeLockEnabled,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  } = useAppContext();

  const {
    isPictureInPictureWindowOpen,
    openPictureInPictureWindow,
  } = usePictureInPictureOpener();

  const { openNewWindow } = useNewWindowOpener();

  const { showDialog } = useAutoDisableTimer();

  // const iconSize = isFullyVisible ? 32 : 24;
  const iconSize = 24;
  const iconStyle: LucideProps['style'] = {
    transition: 'all 200ms ease-in-out',
  };

  const buttonWakeLock = (
    <ActionButton
      title={
        isWakeLockEnabled ?
          'Wake lock is enabled, click to disable' :
          'Wake lock is disabled, click to enable'
      }
      onClick={toggleWakeLock}
    >
      <IconEyeOpenClosed
        isWakeLockEnabled={isWakeLockEnabled}
        size={iconSize}
        style={iconStyle}
      />
    </ActionButton>
  );

  const showButtonScroll = canScroll;

  const buttonScroll = !showButtonScroll ? null : (
    <ActionButton
      title="More info and settings"
      onClick={() => {
        document.getElementById(ID_BELOW_THE_FOLD)
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <IconEllipsis size={iconSize} style={iconStyle} />
    </ActionButton>
  );

  const showButtonPictureInPicture =
    canPictureInPicture && !isPictureInPictureWindowOpen;

  const buttonPictureInPicture = !showButtonPictureInPicture ? null : (
    <ActionButton
      title="Open in picture-in-picture window [p]"
      onClick={() => openPictureInPictureWindow()}
    >
      <IconPictureInPicture size={iconSize} style={iconStyle} />
    </ActionButton>
  );

  const showButtonNewWindow = canNewWindow;

  const buttonNewWindow = !showButtonNewWindow ? null : (
    <ActionButton
      title="Open in new window [n]"
      onClick={() => openNewWindow()}
    >
      <IconAppWindowPlatform size={iconSize} style={iconStyle} />
    </ActionButton>
  );

  const showAutoDisableTimer = canStartTimer;

  const buttonAutoDisableTimer = !showAutoDisableTimer ? null : (
    <ActionButton
      title="Automatically disable wake lock"
      onClick={showDialog}
    >
      <IconHourglass size={iconSize} style={iconStyle} />
    </ActionButton>
  );

  const showButtonExpandCollapse = canExpandCollapse;

  const buttonExpandCollapse = !showButtonExpandCollapse ? null : (
    <ActionButton
      title={isExpanded ? 'Collapse UI [t]' : 'Expand UI [t]'}
      onClick={toggleExpandCollapseUI}
    >
      <IconExpandCollapse
        isExpanded={isExpanded}
        size={iconSize}
        style={iconStyle}
      />
    </ActionButton>
  );

  const showButtonFullscreen = canFullscreen;

  const buttonFullscreen = !showButtonFullscreen ? null : (
    <ActionButton
      title={isFullscreen ? 'Exit fullscreen [f]' : 'Enter fullscreen [f]'}
      onClick={toggleFullscreen}
    >
      <IconMaximizeMinimize
        isMaximized={isFullscreen}
        size={iconSize}
        style={iconStyle}
      />
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

      <Stack direction="row" lineHeight={1} gap={2} ml="auto">
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
