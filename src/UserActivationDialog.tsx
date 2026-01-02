import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useId, type FC } from 'react';
import { useAppContext } from './controller';

export const UserActivationDialog: FC = () => {
  const { invokeUserActivation, requiresUserActivation } = useAppContext();
  const id = useId();

  return (
    <Dialog
      open={requiresUserActivation}
      onClose={invokeUserActivation}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={`${id}-title`}>
        User activation required
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-description`}>
          Unable to automatically lock the screen without user activation. Please interact with the page (e.g., click a button) to proceed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={invokeUserActivation} autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
