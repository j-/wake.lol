import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC } from 'react';
import { ActionButtonBattery } from './actions/action-battery';
import { useAppContext } from './controller';

export const BatteryOverlay: FC = () => {
  const { showBattery } = useAppContext();
  const theme = useTheme();
  const isSmallOrUp = useMediaQuery(theme.breakpoints.up('sm'));

  const show = showBattery && isSmallOrUp;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        zIndex: 1,
      }}
    >
      <Fade in={show} timeout={200} mountOnEnter unmountOnExit>
        <ActionButtonBattery size='20vmin' />
      </Fade>
    </Box>
  );
};
