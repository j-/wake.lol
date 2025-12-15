import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppErrorBoundary } from './AppErrorBoundary';
import { AutoDisableTimer } from './context/AutoDisableTimerContext';
import { BatteryProvider } from './context/BatteryManagerContext';
import { BlackScreenProvider } from './context/BlackScreenContext';
import { PictureInPictureOpenerProvider } from './context/PictureInPictureOpenerContext';
import { PlatformProvider } from './context/PlatformContext';
import { WindowProvider } from './context/WindowContext';
import { AppController } from './controller/AppController';
import './index.css';
import { theme } from './theme';
import { WakeActionsContainerInset0 } from './WakeActionsContainerInset0';

Sentry.init({
  enabled: import.meta.env.PROD,
  environment: import.meta.env.MODE,
  dsn: process.env.SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events.
  sendDefaultPii: true,
});

// eslint-disable-next-line no-restricted-globals
const root = createRoot(document.getElementById('root')!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
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
                      <PlatformProvider>
                        <WakeActionsContainerInset0 />
                      </PlatformProvider>
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
                  <PlatformProvider>
                    <App />
                  </PlatformProvider>
                </BlackScreenProvider>
              </BatteryProvider>
            </AutoDisableTimer>
          </AppController>
        </PictureInPictureOpenerProvider>
      </AppErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
