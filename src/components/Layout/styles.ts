import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  main: {
    backgroundColor: 'backgroundColor',
    minHeight: 'calc(100vh - 163px)',
    display: 'flex',
    flexDirection: 'column',
  },
  fabButton: {
    width: { xs: 40, tablet: 56 },
    height: { xs: 40, tablet: 56 },
    position: 'fixed',
    right: 24,
    zIndex: 2,
    transition: 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
    bgcolor: 'white',
    border: (theme) => `solid 2px ${theme.palette.primary.main}`,
    '&:hover': {
      bgcolor: 'white',
    },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
