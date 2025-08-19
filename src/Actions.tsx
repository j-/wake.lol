import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {
  AppWindowMac as IconAppWindowMac,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Minimize as IconMinimize,
  Minimize2 as IconMinimize2,
} from 'lucide-react';
import { useState, type FC } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useAppContext } from './AppController';
import { FEATURES } from './constants';

export const Actions: FC = () => {
  const [isIdle, setIsIdle] = useState(false);

  const {
    canExpandCollapse,
    canFullscreen,
    canNewWindow,
    isExpanded,
    isFullyVisible,
    isFullscreen,
    isWakeLockEnabled,
    toggleExpandCollapseUI,
    toggleFullscreen,
    toggleWakeLock,
  } = useAppContext();

  useIdleTimer({
    timeout: 5_000,
    throttle: 500,
    onIdle: () => setIsIdle(true),
    onActive: () => setIsIdle(false),
  });

  const iconSize = isFullyVisible ? 32 : 24;
  const iconStyle = { transition: 'all 200ms ease-in-out' };

  const buttonStyle = {
    opacity: isIdle && isFullyVisible ? 0.1 : 1,
    transition: 'opacity 200ms ease-in-out',
  };

  return (
    <Stack direction="row" gap={4} height={(theme) => theme.spacing(4)} alignItems="center">
      <Box lineHeight={1}>
        <IconButton color="inherit" onClick={toggleWakeLock}>
          {isWakeLockEnabled ? (
            <IconEye size={iconSize} style={iconStyle} />
          ) : (
            <IconEyeClosed size={iconSize} style={iconStyle} />
          )}
        </IconButton>
      </Box>

      <Stack direction="row" lineHeight={1} gap={2} ml="auto">
        {canNewWindow ? (
          <IconButton color="inherit" sx={buttonStyle} onClick={() => {
            window.open(window.location.href, Date.now().toString(), FEATURES);
          }}>
            <IconAppWindowMac size={iconSize} style={iconStyle} />
          </IconButton>
        ) : null}

        {canExpandCollapse ? (
          <IconButton color="inherit" sx={buttonStyle} onClick={toggleExpandCollapseUI}>
            {isExpanded ? (
              <IconMinimize2 size={iconSize} style={iconStyle} />
            ) : (
              <IconMaximize2 size={iconSize} style={iconStyle} />
            )}
          </IconButton>
        ) : null}

        {canFullscreen ? (
          <IconButton color="inherit" sx={buttonStyle} onClick={toggleFullscreen}>
            {isFullscreen ? (
              <IconMinimize size={iconSize} style={iconStyle} />
            ) : (
              <IconMaximize size={iconSize} style={iconStyle} />
            )}
          </IconButton>
        ) : null}
      </Stack>
    </Stack>
  );
};
