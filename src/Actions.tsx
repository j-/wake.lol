import Box from '@mui/material/Box';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import {
  AppWindowMac as IconAppWindowMac,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Minimize as IconMinimize,
  Minimize2 as IconMinimize2,
  type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';
import { FEATURES } from './constants';
import { useAppContext } from './controller';

export const Actions: FC = () => {
  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    isExpanded,
    isFullyVisible,
    isFullscreen,
    isIdle,
    isWakeLockEnabled,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  } = useAppContext();

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
    <Stack direction="row" gap={4} height={(theme) => theme.spacing(4)} alignItems="center">
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
            {isWakeLockEnabled ? (
              <IconEye size={iconSize} style={iconStyle} />
            ) : (
              <IconEyeClosed size={iconSize} style={iconStyle} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Stack direction="row" lineHeight={1} gap={2} ml="auto">
        {canNewWindow ? (
          <Tooltip
            title="Open in new window"
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={() => {
              window.open(window.location.href, Date.now().toString(), FEATURES);
            }}>
              <IconAppWindowMac size={iconSize} style={iconStyle} />
            </IconButton>
          </Tooltip>
        ) : null}

        {canExpandCollapse ? (
          <Tooltip
            title={isExpanded ? 'Collapse UI' : 'Expand UI'}
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={toggleExpandCollapseUI}>
              {isExpanded ? (
                <IconMinimize2 size={iconSize} style={iconStyle} />
              ) : (
                <IconMaximize2 size={iconSize} style={iconStyle} />
              )}
            </IconButton>
          </Tooltip>
        ) : null}

        {canFullscreen ? (
          <Tooltip
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            slotProps={tooltipSlotProps}
          >
            <IconButton sx={buttonStyle} onClick={toggleFullscreen}>
              {isFullscreen ? (
                <IconMinimize size={iconSize} style={iconStyle} />
              ) : (
                <IconMaximize size={iconSize} style={iconStyle} />
              )}
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Stack>
  );
};
