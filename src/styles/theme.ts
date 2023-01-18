/* eslint-disable unused-imports/no-unused-vars */
import type {
  PaletteOptions as MuiPaletteOptions,
  Shadows,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Noto_Sans_JP } from '@next/font/google';

import components from './components';

export const noto = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'japanese'],
  display: 'swap',
  fallback: ['sans-serif'],
});

declare module '@mui/material/styles' {
  interface Palette {
    white: string;
    button: string;
    backgroundColor: string;
    tertiary: string;
    heading: string;
  }

  interface PaletteOptions {
    white?: string;
    button?: string;
    backgroundColor: string;
    tertiary: string;
    heading: string;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    card: true;
    tablet: true;
  }
}

const palette: MuiPaletteOptions = {
  primary: {
    main: '#269271',
    contrastText: '#fff',
  },
  secondary: {
    main: '#ffff00',
  },
  tertiary: '#ffcd00',
  error: {
    main: '#e60012',
  },
  success: {
    main: '#51b873',
  },
  text: {
    primary: '#000',
  },
  heading: '#5a524f',
  white: '#fff',
  backgroundColor: '#f4f2f1',
  action: {
    hoverOpacity: 0.4,
  },
};

const basicTheme = createTheme({
  palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      card: 700,
      tablet: 768,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

// Create a theme instance.
const theme = createTheme({
  components,
  palette,
  typography: {
    fontFamily: noto.style.fontFamily,
    allVariants: {
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      lineHeight: 'normal',
    },
  },
  breakpoints: basicTheme.breakpoints,
  shadows: [
    ...createTheme({}).shadows.map((shadow, i) =>
      i === 0 ? '0 0 5px 0 rgba(0, 0, 0, 0.25);' : shadow,
    ),
  ] as Shadows,
  shape: {
    borderRadius: 8,
  },
});

// Responsive breakpoint
export const tabletDown = basicTheme.breakpoints.down('tablet'); // 768px

export default theme;
