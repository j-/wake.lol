import Menu from '@mui/material/Menu';
import { type PropsWithChildren, type RefObject } from 'react';
import { useTooltipContainer } from './use-tooltip-container';

export type ActionMenuProps<T extends HTMLElement> = PropsWithChildren<{
  open: boolean;
  anchorRef: RefObject<T | null>;
  onClose: () => void;
}>;

export const ActionMenu = <T extends HTMLElement>({
  open,
  anchorRef,
  onClose,
  children,
}: ActionMenuProps<T>) => {
  const tooltipContainer = useTooltipContainer();

  return (
    <Menu
      anchorEl={() => anchorRef.current}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          sx: { width: 360, maxWidth: '100%' },
        },
      }}
      container={tooltipContainer}
      transitionDuration={0}
    >
      {children}
    </Menu>
  );
};
