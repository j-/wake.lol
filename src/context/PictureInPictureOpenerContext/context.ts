import { createContext } from 'react';

export type OpenPictureInPictureWindow = (
  options?: RequestPictureInPictureWindowOptions,
) => Promise<PictureInPictureWindow>;

export type PictureInPictureOpenerContextType = {
  isPictureInPictureWindowOpen: boolean;
  openPictureInPictureWindow: OpenPictureInPictureWindow;
};

export const PictureInPictureOpenerContext = createContext<
  PictureInPictureOpenerContextType
>({
  isPictureInPictureWindowOpen: false,
  openPictureInPictureWindow: async () => {
    throw new Error(
      'openPictureInPictureWindow must be used within a PictureInPictureOpenerContext',
    );
  },
});

PictureInPictureOpenerContext.displayName = 'PictureInPictureOpenerContext';
