import Box from '@mui/material/Box';
import { type ResponsiveStyleValue } from '@mui/system';
import { type FC } from 'react';
import { Actions } from './Actions';
import { BatteryOverlay } from './BatteryOverlay';
import { useAppContext } from './controller';
import { HideCursorOnIdle } from './HideCursorOnIdle';
import { useSchemeColors } from './use-scheme-colors';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const { fullscreenRef, isWakeLockEnabledOptimistic: isWakeLockEnabled } = useAppContext();
  const { color, bgColor } = useSchemeColors();

  return (
    <Box ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: 'background-color 200ms ease-in-out',
        position: 'relative',
      },

      isWakeLockEnabled ? {
        color,
        backgroundColor: bgColor,
      } : null,
    ]}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        height: actionsHeight,
        py: 2,
        px: 3,
        zIndex: 2,
      }}>
        <Actions />
      </Box>

      <BatteryOverlay />

      <HideCursorOnIdle />
    </Box>
  );
};
