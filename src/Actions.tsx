import Box from '@mui/material/Box';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';
import { FEATURES, ID_BELOW_THE_FOLD } from './constants';
import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext/hooks';
import { useDocument, useWindow } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  IconAppWindowPlatform,
  IconEllipsis,
  IconExpandCollapse,
  IconEyeOpenClosed,
  IconMaximizeMinimize,
  IconPictureInPicture,
} from './icons';

export const Actions: FC = () => {
  const document = useDocument();
  const window = useWindow();

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    canPictureInPicture,
    canScroll,
    isExpanded,
    isFullyVisible,
    isFullscreen,
    isIdle,
    isWakeLockEnabled,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  } = useAppContext();

  const {
    isPictureInPictureWindowOpen,
    openPictureInPictureWindow,
  } = usePictureInPictureOpener();

  // const iconSize = isFullyVisible ? 32 : 24;
  const iconSize = 24;
  const iconStyle: LucideProps['style'] = {
    transition: 'all 200ms ease-in-out',
  };

  const buttonStyle: IconButtonProps['sx'] = {
    opacity: isIdle && isFullyVisible || isIdle && isExpanded ? 0.25 : 1,
    transition: 'opacity 200ms ease-in-out',
    color: 'inherit',
    '&:hover': {
      opacity: 1,
    },
  };

  const tooltipSlotProps: TooltipProps['slotProps'] = {
    popper: {
      container: document.fullscreenElement ?? document.body,
    },
  };

  return (
    <Stack
      direction="row"
      gap={4}
      height={(theme) => theme.spacing(4)}
      alignItems="center"
      data-test-id="Actions"
    >
      <Box lineHeight={1}>
        <Tooltip
          title={
            isWakeLockEnabled ?
              'Wake lock is enabled, click to disable' :
              'Wake lock is disabled, click to enable'
            }
          slotProps={tooltipSlotProps}
        >
          <IconButton sx={buttonStyle} onClick={toggleWakeLock}>
            <IconEyeOpenClosed
              isWakeLockEnabled={isWakeLockEnabled}
              size={iconSize}
              style={iconStyle}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack direction="row" lineHeight={1} gap={2} ml="auto">
        {canScroll ? (
          <Tooltip
            title="More info and settings"
            slotProps={tooltipSlotProps}
          >
            <IconButton
              sx={[
                buttonStyle,
                {
                  opacity: isFullyVisible ? buttonStyle.opacity : 0.25,
                  transition: 'opacity 200ms ease-in-out',
                },
              ]}
              onClick={() => {
                document.getElementById(ID_BELOW_THE_FOLD)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <IconEllipsis size={iconSize} style={iconStyle} />
            </IconButton>
          </Tooltip>
        ) : null}

        {canPictureInPicture && !isPictureInPictureWindowOpen ? (
          <Tooltip
            title="Open in picture-in-picture window"
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={() => {
              openPictureInPictureWindow({
                width: 100,
                height: 100,
              });
            }}>
              <IconPictureInPicture size={iconSize} style={iconStyle} />
            </IconButton>
          </Tooltip>
        ) : null}

        {canNewWindow ? (
          <Tooltip
            title="Open in new window"
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={() => {
              window.open(window.location.href, Date.now().toString(), FEATURES);
            }}>
              <IconAppWindowPlatform size={iconSize} style={iconStyle} />
            </IconButton>
          </Tooltip>
        ) : null}

        {canExpandCollapse ? (
          <Tooltip
            title={isExpanded ? 'Collapse UI [t]' : 'Expand UI [t]'}
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={toggleExpandCollapseUI}>
              <IconExpandCollapse
                isExpanded={isExpanded}
                size={iconSize}
                style={iconStyle}
              />
            </IconButton>
          </Tooltip>
        ) : null}

        {canFullscreen ? (
          <Tooltip
            title={isFullscreen ? 'Exit fullscreen [f]' : 'Enter fullscreen [f]'}
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={toggleFullscreen}>
              <IconMaximizeMinimize
                isMaximized={isFullscreen}
                size={iconSize}
                style={iconStyle}
              />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Stack>
  );
};
