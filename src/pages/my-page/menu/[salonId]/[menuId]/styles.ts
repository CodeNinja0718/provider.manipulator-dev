import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  loadingBox: {
    display: 'flex',
    width: '100%',
    minHeight: { xs: 500, tablet: 1012 },
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50,
    color: (theme: Theme) => theme.palette.primary,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
