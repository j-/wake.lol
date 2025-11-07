import Box, { type BoxProps } from '@mui/material/Box';
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
    '--container-height': `calc(100svh - var(--header-height))`,
    '--peek-height': theme.spacing(8),
  })} {...props}>
    <Box py={2} px={3} sx={(theme) => ({
      height: theme.spacing(10),
    })}>
      {slotHeader}
    </Box>

    <Box sx={(theme) => ({
      position: 'sticky',
      top: 'calc(var(--peek-height) - var(--container-height))',
      height: 'var(--container-height)',
      borderRadius: 2,
      display: 'grid',
      contain: 'strict',
      zIndex: theme.zIndex.appBar,
    })}>
      {slotActions}
    </Box>

    <Box p={3}>
      {children}
    </Box>
  </Box>
);
