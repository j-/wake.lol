import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import {
  type FC,
  type FormEvent,
  type FormEventHandler,
  type ReactNode,
  useCallback,
  useId,
  useState,
} from 'react';
import { AutoDisableTimerType, useAutoDisableTimer } from './context/AutoDisableTimerContext';
import { useAppContext } from './controller';

export type AutoDisableTimerDialogProps = Omit<DialogProps, 'onSubmit'> & {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const nameTime = 'time';
const nameQuick = 'quick';
const nameHours = 'hours';
const nameMinutes = 'minutes';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...props }) => (
  <div role="tabpanel" hidden={value !== index} {...props}>
    {value === index && <Box>{children}</Box>}
  </div>
);

export const AutoDisableTimerDialog: FC<AutoDisableTimerDialogProps> = ({
  onSubmit,
  onClose,
  ...props
}) => {
  const id = useId();
  const formId = `AutoDisableTimerDialog-${id}`;
  const quickId = `${formId}-quick`;
  const [timerType, setTimerType] = useState(AutoDisableTimerType.CLOCK);

  const { isWakeLockEnabled, requestWakeLock } = useAppContext();
  const { setAutoDisableTimer } = useAutoDisableTimer();

  const handleSubmitClock = useCallback<
    FormEventHandler<HTMLFormElement>
  >(async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const quick = data.get(nameQuick) as string;

    if (quick) {
      const timerTime = Date.now() + Number(quick);

      setAutoDisableTimer(
        AutoDisableTimerType.COUNTDOWN,
        timerTime,
      );

      if (!isWakeLockEnabled) await requestWakeLock();

      onSubmit?.(e);
      return;
    }

    const time = data.get(nameTime) as string;

    if (!time) {
      onClose?.(e, 'backdropClick');
      return;
    }

    const [hoursString, minutesString] = time.split(':');
    const hours = Number(hoursString) ?? 0;
    const minutes = Number(minutesString) ?? 0;

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0) {
      onClose?.(e, 'backdropClick');
      return;
    }

    const nowDate = new Date();
    const candidateDate = new Date(nowDate);
    candidateDate.setHours(hours, minutes, 0, 0);

    if (candidateDate <= nowDate) {
      candidateDate.setDate(candidateDate.getDate() + 1);
    }

    setAutoDisableTimer(
      AutoDisableTimerType.CLOCK,
      candidateDate.getTime(),
    );

    if (!isWakeLockEnabled) await requestWakeLock();

    onSubmit?.(e);
  }, [
    isWakeLockEnabled,
    onClose,
    onSubmit,
    requestWakeLock,
    setAutoDisableTimer,
  ]);

  const handleSubmitTimer = useCallback<
    FormEventHandler<HTMLFormElement>
  >(async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const quick = data.get(nameQuick) as string;

    if (quick) {
      const timerTime = Date.now() + Number(quick);

      setAutoDisableTimer(
        AutoDisableTimerType.COUNTDOWN,
        timerTime,
      );

      if (!isWakeLockEnabled) await requestWakeLock();

      onSubmit?.(e);
      return;
    }

    const hoursString = data.get(nameHours) as string;
    const minutesString = data.get(nameMinutes) as string;

    const hours = Number(hoursString) ?? 0;
    const minutes = Number(minutesString) ?? 0;

    if (isNaN(hours) || hours < 0 || isNaN(minutes) || minutes < 0) {
      onClose?.(e, 'backdropClick');
      return;
    }

    const seconds = minutes * 60 + hours * 60 * 60;

    if (seconds <= 0) {
      onClose?.(e, 'backdropClick');
      return;
    }

    const deltaMilliseconds = seconds * 1_000;
    const timerTime = Date.now() + deltaMilliseconds;

    setAutoDisableTimer(
      AutoDisableTimerType.COUNTDOWN,
      timerTime,
    );

    if (!isWakeLockEnabled) await requestWakeLock();

    onSubmit?.(e);
  }, [
    isWakeLockEnabled,
    onClose,
    onSubmit,
    requestWakeLock,
    setAutoDisableTimer,
  ]);

  return (
    <Dialog fullWidth {...props} onClose={onClose}>
      <DialogTitle>Turn off automatically</DialogTitle>

      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={timerType}
            onChange={(_, timerType) => setTimerType(timerType)}
          >
            <Tab value={AutoDisableTimerType.CLOCK} label="Clock" />
            <Tab value={AutoDisableTimerType.COUNTDOWN} label="Countdown" />
          </Tabs>
        </Box>

        <TabPanel value={timerType} index={AutoDisableTimerType.CLOCK}>
          <DialogContentText mb={4}>
            Keep the screen awake until&hellip;
          </DialogContentText>

          <form id={formId} onSubmit={handleSubmitClock}>
            <TextField
              autoFocus
              label="Time"
              type="time"
              name={nameTime}
              fullWidth
              margin="dense"
              variant="outlined"
              onKeyDown={(e) => e.stopPropagation()}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </form>
        </TabPanel>

        <TabPanel value={timerType} index={AutoDisableTimerType.COUNTDOWN}>
          <DialogContentText mb={4}>
            Keep the screen awake until this much time has lapsed.
          </DialogContentText>

          <form id={formId} onSubmit={handleSubmitTimer}>
            <Stack direction="row" gap={2}>
              <TextField
                required
                label="Hours"
                type="number"
                inputMode="numeric"
                name={nameHours}
                defaultValue={0}
                fullWidth
                margin="dense"
                variant="outlined"
                onKeyDown={(e) => e.stopPropagation()}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 99,
                    step: 1,
                  },
                }}
              />

              <TextField
                required
                label="Minutes"
                type="number"
                inputMode="numeric"
                name={nameMinutes}
                defaultValue={0}
                fullWidth
                margin="dense"
                variant="outlined"
                onKeyDown={(e) => e.stopPropagation()}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 60,
                    step: 1,
                  },
                }}
              />
            </Stack>
          </form>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ m: 2 }}>
        <FormControl sx={{ mr: 'auto', minWidth: 120 }} size="small">
          <InputLabel variant="standard" htmlFor={quickId}>
            Quick select
          </InputLabel>

          <NativeSelect
            defaultValue=""
            onChange={(e) => {
              e.currentTarget.form?.requestSubmit();
            }}
            inputProps={{
              id: quickId,
              form: formId,
              name: nameQuick,
            }}
          >
            <option value=""></option>
            <option value={1 * 10 * 60_000}>10 minutes</option>
            <option value={1 * 30 * 60_000}>30 minutes</option>
            <option value={1 * 60 * 60_000}>1 hour</option>
            <option value={2 * 60 * 60_000}>2 hours</option>
            <option value={4 * 60 * 60_000}>4 hours</option>
            <option value={8 * 60 * 60_000}>8 hours</option>
            <option value={12 * 60 * 60_000}>12 hours</option>
          </NativeSelect>
        </FormControl>

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
