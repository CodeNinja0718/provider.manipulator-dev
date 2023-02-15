import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  layoutContainer: {
    backgroundColor: 'white',
    backgroundImage: 'url(/images/main_bg.webp)',
    backgroundSize: 'contain',
    backgroundPosition: 'top center',
    position: 'relative',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: {
      xs: 'calc(100vh - 210px)',
      tablet: 'calc(100vh - 57px - 210px)',
    },
    marginTop: {
      xs: 0,
      tablet: 57,
    },
    '&[data-card=true]': {
      marginTop: {
        xs: 67,
        tablet: 0,
      },
      minHeight: {
        xs: 'calc(100vh - 67px - 210px)',
        tablet: 'calc(100vh - 106px - 210px)',
      },
    },
    '&.loading': {
      height: 'calc(100vh - 210px)',
      overflow: 'hidden',
    },
  },
  cardLayout: {
    padding: 0,
    maxWidth: 950,
    width: '100%',
    bgcolor: 'white',
    flexGrow: {
      xs: 1,
      tablet: 0,
    },
    margin: {
      xs: 0,
      tablet: '0 auto 90px',
    },
    boxShadow: {
      xs: 'none',
      tablet: '0 0 10px 0 rgba(0, 0, 0, 0.16)',
    },
  },
  sideMenuLayoutWrapper: {
    '& > *': {
      flex: '1 1 100%',
    },
    '& > *:first-of-type': {
      flex: '0 0 260px',
      height: 'auto',
      display: {
        xs: 'none',
        tablet: 'block',
      },
    },
  },
  fabButton: (theme: Theme) => ({
    width: 40,
    height: 40,
    position: 'fixed',
    right: { xs: 19, tablet: 34 },
    bottom: { xs: 15, tablet: 26 },
    zIndex: 2,
    transition: 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
    color: theme.palette.gray,
    bgcolor: 'white',
    '&:hover': {
      bgcolor: 'white',
    },
  }),
};

export default styles;
