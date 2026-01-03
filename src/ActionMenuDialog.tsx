import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { type PropsWithChildren, type FC } from 'react';
import { useTooltipContainer } from './use-tooltip-container';

export type ActionMenuDialogProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export const ActionMenuDialog: FC<ActionMenuDialogProps> = ({
  open,
  onClose,
  children,
}) => {
  const tooltipContainer = useTooltipContainer();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      transitionDuration={0}
      container={tooltipContainer}
    >
      <DialogContent sx={{ p: 0 }}>
        <MenuList disablePadding dense>
          <MenuItem onClick={onClose}>
            <ListItemText>Close</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              Esc
            </Typography>
          </MenuItem>
          {children}
        </MenuList>
      </DialogContent>
    </Dialog>
  );
};
