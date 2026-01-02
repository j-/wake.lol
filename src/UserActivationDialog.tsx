import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { type FC } from 'react';
import { useAppContext } from './controller';
import { useSchemeColors } from './use-scheme-colors';

export const UserActivationDialog: FC = () => {
  const { invokeUserActivation, requiresUserActivation } = useAppContext();
  const { bgColorEnabled } = useSchemeColors();

  return (
    <>
      <Backdrop
        open={requiresUserActivation}
        sx={{ zIndex: (theme) => theme.zIndex.modal - 1 }}
        onClick={invokeUserActivation}
      />

      <Fade appear={false} in={requiresUserActivation}>
        <Paper
          role="dialog"
          aria-modal="false"
          aria-label="User activation warning"
          square
          variant="outlined"
          tabIndex={-1}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            p: 2,
            borderWidth: 0,
            borderTopWidth: 1,
            zIndex: (theme) => theme.zIndex.modal,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
            gap={2}
          >
            <Box
              flexShrink={1}
              alignSelf={{ xs: 'flex-start', sm: 'center' }}
            >
              <Typography fontWeight="bold">
                User activation required
              </Typography>

              <Typography variant="body2">
                Unable to automatically lock the screen without user activation.
                Please click or tap the page to proceed.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'row-reverse', sm: 'row' }}
              gap={2}
              flexShrink={0}
              alignSelf={{ xs: 'flex-end', sm: 'center' }}
            >
              <TrapFocus open={requiresUserActivation}>
                <Button
                  size="small"
                  onClick={invokeUserActivation}
                  variant="contained"
                  sx={{ bgcolor: bgColorEnabled }}
                  autoFocus
                >
                  Proceed
                </Button>
              </TrapFocus>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </>
  );
};
