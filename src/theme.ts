import { grey } from '@mui/material/colors';
import { extendTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    enabled: Palette['primary'];
    muted: Palette['primary'];
  }

  interface PaletteOptions {
    enabled?: PaletteOptions['primary'];
    muted?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    fontFamilyMonospace: React.CSSProperties['fontFamily'];
  }

  interface TypographyVariantsOptions {
    fontFamilyMonospace: React.CSSProperties['fontFamily'];
  }
}

const defaultEnabledColor = 'hsl(100, 80%, 80%)';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        enabled: { main: defaultEnabledColor },
        // Light grey in light mode.
        muted: { main: grey[100] },
      },
    },
    dark: {
      palette: {
        enabled: { main: defaultEnabledColor },
        // Dark grey in dark mode.
        muted: { main: grey[900] },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
});
