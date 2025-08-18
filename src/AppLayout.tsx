import Box, { BoxProps } from '@mui/material/Box';
import type { FC, ReactNode } from 'react';

export type AppLayoutProps = BoxProps & {
  slotHeader?: ReactNode;
  slotActions?: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({
  slotHeader,
  slotActions,
  children,
  ...props
}) => (
  <Box m={2} sx={(theme) => ({
    '--header-height': theme.spacing(14),
    '--container-height': `calc(100vh - var(--header-height))`,
    '--peek-height': theme.spacing(6),
  })} {...props}>
    <Box p={2} sx={(theme) => ({
      height: theme.spacing(10),
    })}>
      {slotHeader}
    </Box>

    <Box sx={{
      position: 'sticky',
      top: 'calc(var(--peek-height) - var(--container-height))',
      height: 'var(--container-height)',
      borderRadius: 2,
      display: 'grid',
      contain: 'strict',
    }}>
      {slotActions}
    </Box>

    <Box p={2}>
      {children}
    </Box>
  </Box>
);
