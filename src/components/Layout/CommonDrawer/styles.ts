import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  drawerContainer: (theme) => ({
    maxWidth: 375,
    width: '100%',
    background: theme.palette.headerGradient,
    paddingLeft: 21,
  }),
  drawerHeader: {
    padding: '18px 18px 18px 0',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .logo': {
      color: 'white',
      svg: {
        width: 115,
        height: 25,
      },
    },
  },
  closeButton: {
    display: 'flex',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    svg: {
      width: 32,
      height: 32,
    },
  },
  drawerContent: {
    pt: 54,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    width: '100%',
    height: '100%',
    a: {
      textDecoration: 'none',
    },
  },
  menuBtn: {
    fontSize: 16,
    padding: '8px 8px 8px 40px',
    color: 'black',
    background: 'white !important',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04) !important',
    },
    '&.Mui-selected': {
      color: 'secondary.main',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginRight: 20,
    },
    svg: {
      color: 'secondary.main',
      width: 20,
      height: 20,
    },
    '&.logout': {
      color: 'graySolid',
      svg: {
        color: 'graySolid',
      },
    },
  },
  drawerFooter: {
    height: 73,
    paddingRight: 18,
    svg: {
      color: 'white',
    },
  },
};

export default styles;
