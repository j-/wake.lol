import useMediaQuery from '@mui/material/useMediaQuery';

export type DisplayMode =
  'browser' |
  'fullscreen' |
  'minimal-ui' |
  'picture-in-picture' |
  'standalone' |
  'window-controls-overlay';

export const useMatchesDisplayMode = (mode: DisplayMode) => {
  const query = `(display-mode: ${mode})`;
  return useMediaQuery(query);
};
