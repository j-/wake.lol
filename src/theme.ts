import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
  }

  interface PaletteOptions {
    muted?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        // Light grey in light mode.
        muted: { main: grey[100] },
      },
    },
    dark: {
      palette: {
        // Dark grey in dark mode.
        muted: { main: grey[900] },
      },
    },
  },
});
