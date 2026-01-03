import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import Content from './content.mdx';
import { mdxComponents } from './mdx-components';
import { PreferencesAccordion } from './PreferencesAccordion';
import { PWAControls } from './PWAControls';

export const AppContent: FC = () => (
  <Stack maxWidth="70ch" my={4} mx="auto" gap={4}>
    <Box>
      <Content components={mdxComponents} />
    </Box>

    <PWAControls />

    <PreferencesAccordion />
  </Stack>
);
