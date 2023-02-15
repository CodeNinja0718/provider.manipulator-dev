import type { PaletteOptions as MuiPaletteOptions } from '@mui/material';
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
    black: string;
    button: string;
    backgroundColor: string;
    heading: string;
    grown: string;
    grownText: string;
    gray: string;
    graySolid: string;
    pink: string;
    cream: string;
    placeholder: string;
    grayText: string;
    grullo: string;
    headerGradient: string;
    chamoisee: string;
  }

  interface PaletteOptions {
    white?: string;
    black?: string;
    grown?: string;
    grownText?: string;
    button?: string;
    backgroundColor: string;
    heading: string;
    gray?: string;
    graySolid?: string;
    pink?: string;
    cream?: string;
    placeholder?: string;
    grayText?: string;
    grullo?: string;
    headerGradient?: string;
    chamoisee?: string;
  }

  interface TypographyVariants {
    title: React.CSSProperties;
    titleWhite: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    titleWhite?: React.CSSProperties;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    tablet: true;
    normalTablet: true;
    mobile: true;
    normalMobile: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    titleWhite: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    xs: true;
  }
  interface ButtonPropsColorOverrides {
    orange: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    orange: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    orange: true;
  }
}

const palette: MuiPaletteOptions = {
  primary: {
    main: '#249287',
    contrastText: '#fff',
  },
  secondary: {
    main: '#659d3b',
    contrastText: '#fff',
  },
  error: {
    main: '#d42828',
  },
  success: {
    main: '#51b873',
  },
  headerGradient: ' linear-gradient(to bottom, #a3cc30, #5e983c)',
  cream: '#fcf7f4',
  gray: '#707070',
  graySolid: '#666666',
  grayText: '#6b6b6b',
  pink: '#efe6df',
  heading: '#5a524f',
  grown: '#413732',
  grownText: '#63564d',
  placeholder: '#999999',
  white: '#fff',
  black: '#333333',
  backgroundColor: '#f4f2f1',
  grullo: '#ac9b93',
  chamoisee: '#9c795e',
  action: {
    hoverOpacity: 0.04,
    disabledBackground: '#cccccc',
  },
};

// Create a theme instance.
const theme = createTheme({
  components,
  palette,
  typography: {
    allVariants: {
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      lineHeight: 'normal',
    },
    fontFamily: `HiraginoKakuGothicPro,${noto.style.fontFamily}`,
  },
  breakpoints: {
    values: {
      xs: 0,
      normalMobile: 375,
      mobile: 426,
      sm: 600,
      tablet: 768,
      md: 900,
      normalTablet: 1024,
      lg: 1200,
      xl: 1440,
    },
  },
  spacing: (factor: number) => `${factor}px`,
  shape: {
    borderRadius: 0,
  },
});

export default theme;
