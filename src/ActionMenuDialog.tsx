import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { ActionMenuItems } from './ActionMenuItems';

export type ActionMenuDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ActionMenuDialog: FC<ActionMenuDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      transitionDuration={0}
    >
      <DialogContent sx={{ p: 0 }}>
        <MenuList disablePadding dense>
          <MenuItem onClick={onClose}>
            <ListItemText>Close</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              Esc
            </Typography>
          </MenuItem>
          <ActionMenuItems onClose={onClose} />
        </MenuList>
      </DialogContent>
    </Dialog>
  );
};
