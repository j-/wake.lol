import Box from '@mui/material/Box';
import { type ResponsiveStyleValue } from '@mui/system';
import { type FC } from 'react';
import { Actions } from './Actions';
import { useAppContext } from './controller';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const { fullscreenRef, isWakeLockEnabled } = useAppContext();
  const bgColor = 'hsl(100, 80%, 80%)';

  return (
    <Box ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: 'background-color 200ms ease-in-out',
      },

      isWakeLockEnabled ? (theme) => ({
        color: theme.palette.getContrastText(bgColor),
        backgroundColor: bgColor,
      }) : null,
    ]}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        height: actionsHeight,
        padding: 2,
      }}>
        <Actions />
      </Box>
    </Box>
  );
};
