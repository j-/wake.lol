import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type FallbackRender } from '@sentry/react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { storage } from './controller/use-preferences';

export const AppFallback: FallbackRender = ({
  error,
  resetError,
}) => {
  const { updateServiceWorker } = useRegisterSW();

  return (
    <Stack spacing={2} sx={{ width: '60ch', px: 2, my: 10, mx: 'auto' }}>
      <Typography component="h1" variant="h4">Something went wrong</Typography>

      <Typography>
        The application has encountered an unexpected error and failed to initialize.
      </Typography>

      <Stack direction="row" spacing={2} py={4}>
        <Button
          variant="contained"
          onClick={resetError}
        >
          Try again
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            window.location.reload();
          }}
        >
          Reload application
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            try {
              storage.clear();
            } catch {}
            try {
              updateServiceWorker();
            } catch {}
            /* eslint-disable no-restricted-globals */
            // @ts-expect-error Force reload.
            window.location.reload(true);
            /* eslint-enable no-restricted-globals */
          }}
        >
          Clear site data
        </Button>
      </Stack>

      <details>
        <Box component="summary" sx={{
          fontWeight: 'bold',
          color: 'grey.700',
          cursor: 'pointer',
        }}>
          Error details
        </Box>

        <Paper component="pre" sx={{
          overflowX: 'auto',
          p: 2,
        }}>
          {error instanceof Error ? error.stack : String(error)}
        </Paper>
      </details>
    </Stack>
  );
};
