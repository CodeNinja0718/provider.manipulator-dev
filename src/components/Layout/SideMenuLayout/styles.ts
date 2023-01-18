import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  sideMenu: {
    flex: '1 0 auto',
    maxWidth: '232px',
    bgcolor: '#7d90b0',
    mr: { tablet: 2 },
    display: { sl: 'block', xs: 'none' },
  },
  listItem: {
    // p: 2,
  },
  link: {
    textDecoration: 'unset',
  },
  listItemButton: {
    p: 2,
    '& svg': {
      color: 'white',
      mr: 1,
    },
    '&.MuiListItemButton-root': {
      color: 'white',
    },
    '&.Mui-selected': {
      backgroundColor: 'secondary.main',
      color: 'heading',
      '& svg': {
        color: 'heading',
      },
      '&:hover': {
        bgcolor: 'secondary.main',
      },
    },
    '& .MuiListItemText-root': {
      '& .MuiListItemText-primary': {
        fontWeight: 500,
        fontSize: 14,
      },
    },
  },
  userName: {
    color: 'white',
    fontSize: 18,
    lineHeight: '27px',
  },
} as Record<string, SxProps<Theme>>;

export default styles;
