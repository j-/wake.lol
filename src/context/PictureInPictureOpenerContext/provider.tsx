import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useCallback, useMemo, useState, type FC, type PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import { AppErrorBoundary } from '../../AppErrorBoundary';
import { AppController } from '../../controller/AppController';
import { theme } from '../../theme';
import { WakeActionsContainerInset0 } from '../../WakeActionsContainerInset0';
import { useWindow, WindowProvider } from '../WindowContext';
import {
  type OpenPictureInPictureWindow,
  PictureInPictureOpenerContext,
  type PictureInPictureOpenerContextType,
} from './context';

export const PictureInPictureOpenerProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const window = useWindow();
  const [pipWin, setPipWin] = useState<PictureInPictureWindow | null>(null);

  const openPictureInPictureWindow = useCallback<
    OpenPictureInPictureWindow
  >(async (options = {
    width: 100,
    height: 100,
  }) => {
    const pipWin = await window.documentPictureInPicture.requestWindow(options);

    const pipCache = createCache({
      key: 'mui-pip',
      prepend: true,
      container: pipWin.document.head,
    });

    const root = pipWin.document.createElement('div');
    root.id = 'root';

    pipWin.document.body.appendChild(root);

    createRoot(root).render(
      <CacheProvider value={pipCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppErrorBoundary>
            <WindowProvider window={pipWin.window}>
              <AppController isPiPWindow>
                <WakeActionsContainerInset0 />
              </AppController>
            </WindowProvider>
          </AppErrorBoundary>
        </ThemeProvider>
      </CacheProvider>,
    );

    pipWin.addEventListener('pagehide', () => {
      setPipWin(null);
    }, { once: true });

    setPipWin(pipWin);

    return pipWin;
  }, [window.documentPictureInPicture]);

  const value = useMemo<PictureInPictureOpenerContextType>(() => ({
    isPictureInPictureWindowOpen: pipWin !== null,
    openPictureInPictureWindow,
  }), [
    openPictureInPictureWindow,
    pipWin,
  ]);

  return (
    <PictureInPictureOpenerContext value={value}>
      {children}
    </PictureInPictureOpenerContext>
  );
};
