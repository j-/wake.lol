import Box from '@mui/material/Box';
import type { FC } from 'react';
import { Actions } from './Actions';
import type { ResponsiveStyleValue } from '@mui/system';

type WakeActionsContainerProps = {
  bgColor: string;
  actionsHeight: ResponsiveStyleValue<number | string>;
};

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  bgColor,
  actionsHeight,
}) => {
  return (
    <Box sx={(theme) => ({
      background: bgColor,
      color: theme.palette.getContrastText(bgColor),
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
