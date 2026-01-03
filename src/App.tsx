import Box from '@mui/material/Box';
import { type FC } from 'react';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppLayout } from './AppLayout';
import { AppMetadata } from './AppMetadata';
import { useAppContext } from './controller';
import { UserActivationDialog } from './UserActivationDialog';
import { WakeActionsContainer } from './WakeActionsContainer';

const App: FC = () => {
  const { isExpanded } = useAppContext();

  const userActivationDialog = (
    <UserActivationDialog />
  );

  const actionsContainer = (
    <WakeActionsContainer
      key="actions-container"
      actionsHeight="var(--peek-height)"
    />
  );

  if (isExpanded) {
    return (
      <Box sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
      }}>
        <AppMetadata />
        {userActivationDialog}
        {actionsContainer}
      </Box>
    );
  }

  return (
    <AppLayout
      slotHeader={<AppHeader />}
      slotActions={actionsContainer}
    >
      <AppMetadata />
      <AppContent />
      {userActivationDialog}
    </AppLayout>
  );
};

export default App;
