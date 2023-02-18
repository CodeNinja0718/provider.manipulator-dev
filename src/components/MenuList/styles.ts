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
} as Record<string, SxProps<Theme>>;

export default styles;
