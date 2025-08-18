import Box from '@mui/material/Box';
import type { ResponsiveStyleValue } from '@mui/system';
import { useMemo, type FC } from 'react';
import { Actions } from './Actions';
import { useAppContext } from './AppController';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const { isWakeLockEnabled } = useAppContext();

  const bgColor = useMemo(() => {
    return isWakeLockEnabled ? 'hsl(100, 80%, 80%)' : 'hsl(0, 0%, 20%)';
  }, [isWakeLockEnabled]);

  return (
    <Box sx={(theme) => ({
      color: theme.palette.getContrastText(bgColor),
      backgroundColor: bgColor,
      transition: 'background-color 200ms ease-in-out',
    })}>
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
