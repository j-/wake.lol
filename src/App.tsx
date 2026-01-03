import Box from '@mui/material/Box';
import { type FC } from 'react';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppLayout } from './AppLayout';
import { AppMetadata } from './AppMetadata';
import { useAppContext } from './controller';
import { UserActivationDialog } from './UserActivationDialog';
import { WakeActionsContainer } from './WakeActionsContainer';
import { WakeActionsContainerInset0 } from './WakeActionsContainerInset0';

const App: FC = () => {
  const { isExpanded } = useAppContext();

  if (isExpanded) {
    return (
      <Box sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
      }}>
        <AppMetadata />
        <WakeActionsContainerInset0 />
        <UserActivationDialog />
      </Box>
    );
  }

  return (
    <AppLayout
      slotHeader={<AppHeader />}
      slotActions={<WakeActionsContainer actionsHeight="var(--peek-height)" />}
    >
      <AppMetadata />
      <AppContent />
      <UserActivationDialog />
    </AppLayout>
  );
};

export default App;
