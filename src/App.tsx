import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import { AppHeader } from './AppHeader';
import { AppLayout } from './AppLayout';
import { AppMetadata } from './AppMetadata';
import Content from './content.mdx';
import { useAppContext } from './controller';
import { mdxComponents } from './mdx-components';
import { PreferencesAccordion } from './PreferencesAccordion';
import { PWAControls } from './PWAControls';
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
      {userActivationDialog}

      <Stack maxWidth="70ch" my={4} mx="auto" gap={4}>
        <Box>
          <Content components={mdxComponents} />
        </Box>

        <PWAControls />

        <PreferencesAccordion />
      </Stack>
    </AppLayout>
  );
};

export default App;
