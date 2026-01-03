import Box, { type BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const SchemeColorBox = forwardRef<HTMLElement, BoxProps>(({
  sx,
  ...props
}, ref) => {
  const { isWakeLockEnabledOptimistic: isWakeLockEnabled } = useAppContext();
  const { color, bgColor } = useSchemeColors();

  return (
    <Box
      ref={ref}
      sx={[
        {
          backgroundColor: 'muted.main',
          transition: (theme) => theme.transitions.create(['background-color', 'color']),
          position: 'relative',
        },

        isWakeLockEnabled ? {
          color,
          backgroundColor: bgColor,
        } : null,

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
});
