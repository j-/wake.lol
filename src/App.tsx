import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { AppLayout } from './AppLayout';
import { useAppContext } from './controller';
import { Preferences } from './Preferences';
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="App-preferences-content"
          id="App-preferences-header"
        >
          <Typography component="span">Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Preferences />
        </AccordionDetails>
      </Accordion>

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
