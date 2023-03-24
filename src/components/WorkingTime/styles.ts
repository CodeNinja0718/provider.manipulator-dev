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
    marginBottom: 20,
  },
  loadingBox: {
    display: 'flex',
    width: '100%',
    height: '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50,
    color: (theme: Theme) => theme.palette.primary,
  },
  button: {
    maxWidth: { xs: 280, normalMobile: 323 },
    width: '100%',
    m: 'auto',
    mt: 55,
  },
  timeWrapper: {
    '& .MuiFormControl-fullWidth': {
      maxWidth: 123,
    },
    '& > div': {
      alignItems: { xs: 'start' },
      '& > div': {
        minWidth: { xs: 280, normalMobile: 340, tablet: 'auto' },
        backgroundColor: 'transparent',
        '&:last-child': {
          minWidth: { xs: 'auto' },
        },
      },
    },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
