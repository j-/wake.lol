import Box from '@mui/material/Box';
import { type FC } from 'react';
import { Actions } from './Actions';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  booleanSerializer,
  storage,
  STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD,
  usePreferences,
} from './controller/use-preferences';
import { HideCursorOnIdle } from './HideCursorOnIdle';

const INTEND_TO_LOCK = (() => {
  try {
    const item = storage.getItem(STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD);
    return item ? booleanSerializer.parse(item) : false;
  } catch {
    return false;
  }
})();

export const WakeActionsContainerInset0: FC = () => {
  const document = useDocument();
  const { fullscreenRef, isWakeLockEnabled } = useAppContext();
  const { themeColor: bgColor } = usePreferences();

  return (
    <Box data-test-id="WakeActionsContainerInset0" ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: 'background-color 200ms ease-in-out',
        position: 'absolute',
        inset: 0,
      },

      // Optimistically render enabled style if page is still loading but we
      // expect the lock to be acquired automatically.
      isWakeLockEnabled || (INTEND_TO_LOCK && document.readyState === 'interactive') ? (theme) => ({
        color: theme.palette.getContrastText(bgColor),
        backgroundColor: bgColor,
      }) : null,
    ]}>
      <Box sx={{
        padding: {
          xs: 1,
          sm: 2,
        },
      }}>
        <Actions />
      </Box>

      <HideCursorOnIdle />
    </Box>
  );
};
