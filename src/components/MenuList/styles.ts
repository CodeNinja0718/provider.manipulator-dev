import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  wrapper: {
    px: { xs: 0, tablet: 60 },
    py: 60,
    pb: 54,

    '.customHeadingClass': {
      background: (theme: Theme) => theme.palette.placeholder,
    },
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    mb: 30,
    fontSize: 24,
  },
  labelText: {
    color: 'secondary.main',
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 10,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
