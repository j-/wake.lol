import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {
  type FC,
  type FormEvent,
  type FormEventHandler,
  useCallback,
  useId,
} from 'react';
import { useAutoDisableTimer } from './context/AutoDisableTimerContext';

export type AutoDisableTimerDialogProps = Omit<DialogProps, 'onSubmit'> & {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const nameSeconds = 'seconds';

export const AutoDisableTimerDialog: FC<AutoDisableTimerDialogProps> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const id = useId();
  const formId = `AutoDisableTimerDialog-${id}`;

  const { setAutoDisableTimer } = useAutoDisableTimer();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const secondsString = data.get(nameSeconds) as string;
    const seconds = Number(secondsString);
    if (isNaN(seconds) || seconds <= 0) {
      onClose?.(e, 'backdropClick');
    }
    setAutoDisableTimer(0, Date.now() + seconds * 1_000);
    onSubmit?.(e);
  }, [onClose, onSubmit, setAutoDisableTimer]);

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogTitle>Turn off automatically</DialogTitle>

      <DialogContent>
        <DialogContentText mb={4}>
          Enter the number of seconds to automatically disable the timer.
        </DialogContentText>

        <form id={formId} onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            label="Seconds"
            type="number"
            inputMode="numeric"
            name={nameSeconds}
            defaultValue={5}
            fullWidth
            margin="dense"
            variant="outlined"
            onKeyDown={(e) => e.stopPropagation()}
          />
        </form>
      </DialogContent>

      <DialogActions sx={{ m: 2 }}>
        <Button onClick={(e) => onClose?.(e, 'backdropClick')}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" form={formId}>
          Set timer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
