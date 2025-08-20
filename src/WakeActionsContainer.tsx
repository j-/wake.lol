import Box from '@mui/material/Box';
import { type ResponsiveStyleValue } from '@mui/system';
import { type FC } from 'react';
import { Actions } from './Actions';
import { useAppContext } from './controller';
import { booleanSerializer, STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD } from './controller/use-preferences';
import { HideCursorOnIdle } from './HideCursorOnIdle';

type WakeActionsContainerProps = {
  actionsHeight: ResponsiveStyleValue<number | string>;
};

const INTEND_TO_LOCK = (() => {
  try {
    const item = localStorage.getItem(STORAGE_KEY_SHOULD_ACQUIRE_ON_LOAD);
    return item ? booleanSerializer.parse(item) : false;
  } catch {
    return false;
  }
})();

export const WakeActionsContainer: FC<WakeActionsContainerProps> = ({
  actionsHeight,
}) => {
  const { fullscreenRef, isWakeLockEnabled } = useAppContext();
  const bgColor = 'hsl(100, 80%, 80%)';

  return (
    <Box ref={fullscreenRef} sx={[
      {
        backgroundColor: 'muted.main',
        transition: 'background-color 200ms ease-in-out',
      },

      // Optimistically render enabled style if page is still loading but we
      // expect the lock to be acquired automatically.
      isWakeLockEnabled || (INTEND_TO_LOCK && document.readyState === 'interactive') ? (theme) => ({
        color: theme.palette.getContrastText(bgColor),
        backgroundColor: bgColor,
      }) : null,
    ]}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        height: actionsHeight,
        padding: 2,
      }}>
        <Actions />
      </Box>

      <HideCursorOnIdle />
    </Box>
  );
};
