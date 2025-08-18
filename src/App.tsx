import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useAppContext } from './AppController';
import { AppLayout } from './AppLayout';
import { WakeActionsContainer } from './WakeActionsContainer';

const App: FC = () => {
  const { isExpanded } = useAppContext();

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
        <WakeActionsContainer
          actionsHeight="var(--peek-height)"
        />
      </Box>
    );
  }

  const header = (
    <Typography component="h1" variant="h4">wake.lol</Typography>
  );

  return (
    <AppLayout
      slotHeader={header}
      slotActions={actionsContainer}
    >
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </AppLayout>
  );
};

export default App;
