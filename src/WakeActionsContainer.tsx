import Box from '@mui/material/Box';
import { type ResponsiveStyleValue } from '@mui/system';
import { type FC } from 'react';
import { Actions } from './Actions';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';
import {
  booleanSerializer,
  storage,
  STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD,
} from './controller/use-preferences';
import { HideCursorOnIdle } from './HideCursorOnIdle';
import { useSchemeColors } from './use-scheme-colors';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

const INTEND_TO_LOCK = (() => {
  try {
    const item = storage.getItem(STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD);
    return item ? booleanSerializer.parse(item) : false;
  } catch {
    return false;
  }
})();

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const document = useDocument();
  const { fullscreenRef, isWakeLockEnabled } = useAppContext();
  const { color, bgColor } = useSchemeColors();

  return (
    <Box ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: 'background-color 200ms ease-in-out',
      },

      // Optimistically render enabled style if page is still loading but we
      // expect the lock to be acquired automatically.
      isWakeLockEnabled || (INTEND_TO_LOCK && document.readyState === 'interactive') ? {
        color,
        backgroundColor: bgColor,
      } : null,
    ]}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        height: actionsHeight,
        py: 2,
        px: 3,
      }}>
        <Actions />
      </Box>

      <HideCursorOnIdle />
    </Box>
  );
};
