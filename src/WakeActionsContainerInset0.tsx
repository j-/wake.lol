import Box from '@mui/material/Box';
import { type FC } from 'react';
import { Actions } from './Actions';
import { BatteryOverlay } from './BatteryOverlay';
import { useAppContext } from './controller';
import { HideCursorOnIdle } from './HideCursorOnIdle';
import { useSchemeColors } from './use-scheme-colors';

export const WakeActionsContainerInset0: FC = () => {
  const { fullscreenRef, isWakeLockEnabledOptimistic: isWakeLockEnabled } = useAppContext();
  const { color, bgColor } = useSchemeColors();

  return (
    <Box data-test-id="WakeActionsContainerInset0" ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: (theme) => theme.transitions.create(['background-color', 'color']),
        position: 'absolute',
        inset: 0,
      },

      // Optimistically render enabled style if page is still loading but we
      // expect the lock to be acquired automatically.
      isWakeLockEnabled ? {
        color,
        backgroundColor: bgColor,
      } : null,
    ]}>
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
    </Box>
  );
};
