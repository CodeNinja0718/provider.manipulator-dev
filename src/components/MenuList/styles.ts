import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  wrapper: {
    px: { xs: 0, tablet: 60 },
    py: 60,
    pb: 54,

    '.customHeadingClass': {
      background: (theme: Theme) => theme.palette.placeholder,
    },
    overflow: 'hidden',
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
  nameSelect: {
    '.MuiSelect-icon': {
      top: 'calc(50% - 12px)',
      right: 9,
      padding: 4,
      width: 24,
      height: 24,
      svg: {
        width: 18,
        height: 18,
      },
    },
  },
  placeholder: {
    color: '#999999',
  },
} as Record<string, SxProps<Theme>>;

export default styles;
