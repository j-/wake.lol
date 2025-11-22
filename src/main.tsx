import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppErrorBoundary } from './AppErrorBoundary';
import { AutoDisableTimer } from './context/AutoDisableTimerContext';
import { BatteryProvider } from './context/BatteryManagerContext';
import { BlackScreenProvider } from './context/BlackScreenContext';
import { PictureInPictureOpenerProvider } from './context/PictureInPictureOpenerContext';
import { WindowProvider } from './context/WindowContext';
import { AppController } from './controller/AppController';
import './index.css';
import { theme } from './theme';
import { WakeActionsContainerInset0 } from './WakeActionsContainerInset0';

// eslint-disable-next-line no-restricted-globals
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppErrorBoundary>
        <PictureInPictureOpenerProvider PiPComponent={({ window }) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppErrorBoundary>
              <WindowProvider window={window}>
                <AppController isPiPWindow>
                  <BatteryProvider>
                    <BlackScreenProvider>
                      <WakeActionsContainerInset0 />
                    </BlackScreenProvider>
                  </BatteryProvider>
                </AppController>
              </WindowProvider>
            </AppErrorBoundary>
          </ThemeProvider>
        )}>
          <AppController>
            <AutoDisableTimer>
              <BatteryProvider>
                <BlackScreenProvider>
                  <App />
                </BlackScreenProvider>
              </BatteryProvider>
            </AutoDisableTimer>
          </AppController>
        </PictureInPictureOpenerProvider>
      </AppErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
