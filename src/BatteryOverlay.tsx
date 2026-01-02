import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC } from 'react';
import { ActionButtonBattery } from './actions/action-battery';
import { useWindow } from './context/WindowContext';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const BatteryOverlay: FC = () => {
  const { showBattery, isFullyVisible } = useAppContext();
  const { bgColor } = useSchemeColors();
  const theme = useTheme();

  const window = useWindow();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'), {
    matchMedia: window.matchMedia.bind(window),
  });

  const fadeIn = showBattery && isFullyVisible;
  const backdropOpen = fadeIn && isExtraSmall;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <Backdrop
        data-testid='battery-overlay-backdrop'
        open={backdropOpen}
        sx={(theme) => ({
          bgcolor: bgColor,
          zIndex: theme.zIndex.drawer + 1,
        })}
      />

      <Fade in={fadeIn} timeout={200} mountOnEnter unmountOnExit>
        <Box
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 2,
            pointerEvents: 'all',
          })}
        >
          <ActionButtonBattery size='max(20vmin, 2rem)' />
        </Box>
      </Fade>
    </Box>
  );
};
