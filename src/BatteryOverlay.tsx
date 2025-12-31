import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC } from 'react';
import { ActionButtonBattery } from './actions/action-battery';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const BatteryOverlay: FC = () => {
  const { showBattery, isFullyVisible } = useAppContext();
  const { bgColor } = useSchemeColors();
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  const fadeIn = showBattery && isFullyVisible;
  const backdropOpen = fadeIn && isExtraSmall;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Fade in={fadeIn} timeout={200} mountOnEnter unmountOnExit>
        <Box
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 2,
          })}
        >
          <ActionButtonBattery size='max(20vmin, 2rem)' />
        </Box>
      </Fade>

      <Backdrop
        open={backdropOpen}
        sx={(theme) => ({
          bgcolor: bgColor,
          zIndex: theme.zIndex.drawer + 1,
        })}
      />
    </Box>
  );
};
