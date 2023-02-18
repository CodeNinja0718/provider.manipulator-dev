import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  sideMenuContainer: {
    padding: '30px 0 30px 20px',
    width: { xs: '100%', tablet: '260px' },
    background: 'linear-gradient(to bottom, #a3cc30, #5e983c)',
    height: '100%',
  },
  sideMenuWrapper: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    padding: '30px 0',
  },
  title: (theme) => ({
    color: 'secondary.main',
    fontSize: 18,
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    ml: 20,
    pb: 10,
  }),
  menuList: {
    mt: 10,
    a: {
      textDecoration: 'none',
    },
  },
  menuBtn: {
    fontSize: 16,
    padding: '6px 0 6px 25px',
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

    '&.menuGreyBtn': {
      color: 'graySolid',
      '& svg': { color: 'graySolid' },
    },
  },
};

export default styles;
