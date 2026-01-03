import Box from '@mui/material/Box';
import { type FC } from 'react';
import { Actions } from './Actions';
import { BatteryOverlay } from './BatteryOverlay';
import { useAppContext } from './controller';
import { HideCursorOnIdle } from './HideCursorOnIdle';
import { SchemeColorBox } from './SchemeColorBox';

export const WakeActionsContainerInset0: FC = () => {
  const { fullscreenRef } = useAppContext();

  return (
    <SchemeColorBox
      ref={fullscreenRef}
      sx={{
        position: 'absolute',
        inset: 0,
      }}
      data-testId="WakeActionsContainerInset0"
    >
      <Box sx={{
        padding: {
          xs: 1,
          sm: 2,
          zIndex: 2,
        },
      }}>
        <Actions />
      </Box>

      <BatteryOverlay />

      <HideCursorOnIdle />
    </SchemeColorBox>
  );
};
