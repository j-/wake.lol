import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState, type FC } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const PWAControls: FC = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log('[SW] Worker registered', swUrl, r);
    },
    onRegisterError(error) {
      console.error('[SW] Error registering worker', error);
    },
    onNeedRefresh() {
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(needRefresh);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      message={
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">
            A new version of the app is available. Please reload to update.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </Button>
        </Stack>
      }
    />
  );
};
