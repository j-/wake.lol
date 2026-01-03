import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useCallback, useMemo, useState, type FC, type PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import { track } from '../../track';
import { useWindow } from '../WindowContext';
import {
  PictureInPictureOpenerContext,
  type OpenPictureInPictureWindow,
  type PictureInPictureOpenerContextType,
} from './context';

export type PiPComponentProps = {
  window: Window;
};

export type PiPComponent = FC<PiPComponentProps>;

export type PictureInPictureOpenerProviderProps = PropsWithChildren<{
  PiPComponent: PiPComponent;
}>;

export const PictureInPictureOpenerProvider: FC<
  PictureInPictureOpenerProviderProps
> = ({
  PiPComponent,
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

    const parent = pipWin.document.createElement('div');
    parent.id = 'root';

    pipWin.document.body.appendChild(parent);

    const root = createRoot(parent);

    root.render(
      <CacheProvider value={pipCache}>
        <PiPComponent window={pipWin as Window} />
      </CacheProvider>,
    );

    pipWin.addEventListener('pagehide', () => {
      root.unmount();
      setPipWin(null);
      track('released');
    }, { once: true });

    setPipWin(pipWin);

    return pipWin;
  }, [PiPComponent, window.documentPictureInPicture]);

  const value = useMemo<PictureInPictureOpenerContextType>(() => ({
    isPictureInPictureWindowOpen: pipWin != null,
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
