import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppController } from './controller/AppController';
import './index.css';
import { theme } from './theme';

// eslint-disable-next-line no-restricted-globals
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppController>
        <App />
      </AppController>
    </ThemeProvider>
  </React.StrictMode>,
);
