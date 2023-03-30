import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  workingTimeWrapper: {
    maxWidth: 570,
    width: '100%',
    margin: '0 auto',
    padding: {
      xs: '60px 0',
      tablet: '64px 0',
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
    marginBottom: 16,
  },
  loadingBox: {
    display: 'flex',
    width: '100%',
    height: 282,
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
