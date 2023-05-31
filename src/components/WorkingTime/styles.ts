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
    position: 'relative',
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
  navLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'graySolid',
    cursor: 'pointer',
    fontSize: 14,
    svg: {
      width: 14,
      height: 14,
    },
    '&:hover': {
      color: 'primary.main',
      textDecoration: 'underline',
    },
    '&[data-disabled=true]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    position: 'absolute',
    left: -32,
    top: 21,
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
} as Record<string, SxProps<Theme>>;

export default styles;
