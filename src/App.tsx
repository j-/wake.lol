import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { AppLayout } from './AppLayout';
import { AppMetadata } from './AppMetadata';
import { APP_NAME, BASE_URL, SKEOH_URL } from './constants';
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

  const header = (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography component="h1" variant="h4">
        <Link href={BASE_URL} color="inherit" sx={{ textDecoration: 'none' }}>
          {APP_NAME}
        </Link>
      </Typography>

      <Link
        href={SKEOH_URL}
        color="inherit"
        underline="none"
        target="_blank"
        sx={{
          opacity: 0.5,
          transition: 'opacity 200ms',
          '&:hover, &:focus': {
            opacity: 1,
          },
        }}
      >
        skeoh.com
      </Link>
    </Box>
  );

  return (
    <AppLayout
      slotHeader={header}
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
