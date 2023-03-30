import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  layoutHeader: (theme) => ({
    flexDirection: 'row',
    padding: '0 20px',
    boxShadow: 'none',
    alignItems: 'center',
    background: theme.palette.headerGradient,
    position: 'fixed',
    top: 0,
    transition: 'transform 0.5s ease',
    justifyContent: {
      xs: 'space-between',
      tablet: 'end',
    },
    height: {
      xs: 67,
      tablet: 57,
    },
    transform: {
      xs: 'translateY(-67px)',
      tablet: 'translateY(0)',
    },
    '&[data-scroll=true]': {
      transform: 'translateY(0)',
    },
  }),

  cardLayoutHeader: {
    top: 0,
    boxShadow: 'none',
    padding: '0 15px 0 24px',
    zIndex: 1000,
    justifyContent: {
      xs: 'center',
      tablet: 'flex-end',
    },
    pb: {
      xs: 0,
      tablet: 22,
    },
    height: {
      xs: 67,
      tablet: 106,
    },
    position: {
      xs: 'fixed',
      tablet: 'relative',
    },
    background: (theme) => ({
      xs: theme.palette.headerGradient,
      tablet: 'transparent',
    }),
  },
  cardHeaderContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 950,
    margin: '0 auto',
  },
  logo: {
    color: {
      xs: 'white',
      tablet: 'secondary.main',
    },
    svg: {
      width: {
        xs: 115,
        tablet: 159,
      },
      height: {
        xs: 25,
        tablet: 34,
      },
    },
  },
  navBarMenus: {
    gap: 40,
  },
  navBarMenuItem: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    textDecoration: 'none',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
    svg: {
      fontSize: '20px !important',
      color: 'white',
    },
    '&[data-card=true]': {
      color: 'black',
      svg: {
        color: 'secondary.main',
      },
    },
  },
  hamburgerBtn: {
    p: 0,
    margin: 0,
    color: 'white',
    width: 50,
    height: 50,
    svg: {
      fontSize: 40,
    },
  },
};

export default styles;
