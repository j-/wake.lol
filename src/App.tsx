import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { AppLayout } from './AppLayout';
import { AppMetadata } from './AppMetadata';
import { APP_NAME, BASE_URL } from './constants';
import Content from './content.mdx';
import { useAppContext } from './controller';
import { mdxComponents } from './mdx-components';
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
        <AppMetadata />
        {actionsContainer}
      </Box>
    );
  }

  const header = (
    <Typography component="h1" variant="h4">
      <Link href={BASE_URL} color="inherit" sx={{ textDecoration: 'none' }}>
        {APP_NAME}
      </Link>
    </Typography>
  );

  return (
    <AppLayout
      slotHeader={header}
      slotActions={actionsContainer}
    >
      <AppMetadata />
      <Box maxWidth="70ch" my={4} mx="auto">
        <Content components={mdxComponents} />

        <Box my={4}>
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
        </Box>
      </Box>
    </AppLayout>
  );
};

export default App;
