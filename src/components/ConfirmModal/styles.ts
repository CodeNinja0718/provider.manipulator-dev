import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  paper: {
    borderRadius: 2,
    p: { xs: 2, tablet: 4 },
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'heading',
    fontSize: { xs: 18, tablet: 24 },
    mb: { xs: '12px', tablet: 3 },
  },
  icon: (theme) => ({
    mb: 2,
    svg: { width: 96, height: 96 },
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('tablet')]: {
      mb: 1,
      svg: {
        width: 80,
        height: 80,
      },
    },
  }),
  actionWrapper: (theme) => ({
    justifyContent: 'center',
    p: 0,
    mt: { xs: 4, tablet: 5 },
    '>:not(:first-of-type)': {
      ml: 3,
    },
    [theme.breakpoints.down('tablet')]: {
      '>:not(:first-of-type)': {
        ml: 1,
      },
      '&.vertical-button': {
        flexDirection: 'column-reverse',
        '& .MuiButtonBase-root': {
          fontSize: 14,
          '&:last-child': {
            ml: 0,
            mb: 1,
          },
        },
      },
    },
  }),
} as Record<string, SxProps<Theme>>;

export default styles;
