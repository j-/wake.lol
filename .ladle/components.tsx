
import type { GlobalProvider } from "@ladle/react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';
import '../src/index.css';

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ThemeProvider
    key={globalState.theme}
    theme={theme}
    defaultMode={globalState.theme === 'auto' ? 'system' : globalState.theme}
  >
    <CssBaseline />
    {children}
  </ThemeProvider>
);
