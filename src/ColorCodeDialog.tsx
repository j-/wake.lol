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

export type ColorCodeDialogProps = Omit<DialogProps, 'onSubmit'> & {
  colorCode: string;
  onSubmit: (event: FormEvent<HTMLFormElement>, colorCode: string) => void;
};

export const ColorCodeDialog: FC<ColorCodeDialogProps> = ({
  colorCode,
  onSubmit,
  onClose,
  ...props
}) => {
  const id = useId();
  const formId = `ColorCodeDialog-${id}`;

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newColorCode = formData.get('color') as string;
    onSubmit(e, newColorCode);
  }, [onSubmit]);

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogTitle>Set theme color</DialogTitle>

      <DialogContent>
        <DialogContentText mb={4}>
          Enter a valid CSS color code (e.g. <code>#ff0000</code> or <code>rgb(255, 0, 0)</code>).
        </DialogContentText>

        <form id={formId} onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            label="Color code"
            type="text"
            name="color"
            defaultValue={colorCode}
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
          Set color
        </Button>
      </DialogActions>
    </Dialog>
  );
};
