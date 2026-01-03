import Box from '@mui/material/Box';
import { type ResponsiveStyleValue } from '@mui/system';
import { type FC } from 'react';
import { Actions } from './Actions';
import { BatteryOverlay } from './BatteryOverlay';
import { useAppContext } from './controller';
import { HideCursorOnIdle } from './HideCursorOnIdle';
import { SchemeColorBox } from './SchemeColorBox';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const { fullscreenRef } = useAppContext();

  return (
    <SchemeColorBox
      ref={fullscreenRef}
      data-testid="WakeActionsContainer"
    >
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
    </SchemeColorBox>
  );
};
