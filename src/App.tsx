import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Actions } from './Actions';

const App: FC = () => {
  return (
    <Box m={2} sx={(theme) => ({
      '--header-height': theme.spacing(14),
      '--container-height': `calc(100vh - var(--header-height))`,
      '--peek-height': theme.spacing(6),
    })}>
      <Box p={2} sx={(theme) => ({
        height: theme.spacing(10),
      })}>
        <Typography component="h1" variant='h4'>wake.lol</Typography>
      </Box>

      <Box sx={(theme) => ({
        position: 'sticky',
        top: 'calc(var(--peek-height) - var(--container-height))',
        height: 'var(--container-height)',
        background: 'hsl(100, 80%, 80%)',
        borderRadius: 2,
        color: theme.palette.getContrastText('hsl(100, 80%, 80%)'),
      })}>
        <Box sx={{
          position: 'sticky',
          top: 0,
          height: 'var(--peek-height)',
          padding: 2,
        }}>
          <Actions />
        </Box>
      </Box>

      <Box p={2}>
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
      </Box>
    </Box>
  );
};

export default App;
