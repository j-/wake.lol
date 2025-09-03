import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { Preferences } from './Preferences';

export const PreferencesAccordion: FC = () => (
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
);
