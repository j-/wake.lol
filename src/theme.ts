import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
  }

  interface PaletteOptions {
    muted?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    fontFamilyMonospace: React.CSSProperties['fontFamily'];
  }

  interface TypographyVariantsOptions {
    fontFamilyMonospace: React.CSSProperties['fontFamily'];
  }
}

export const theme = createTheme({
  cssVariables: true,
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
