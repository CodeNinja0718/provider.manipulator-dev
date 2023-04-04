import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  reservationCartWrapper: {
    p: '20px',
    '&:nth-of-type(even)': {
      backgroundColor: 'cream',
    },
  },
  button: {
    width: 84,
    '& .MuiButton-endIcon': {
      right: 6,
    },
    '& .MuiButton-startIcon': {
      right: 0,
      left: 6,
      svg: {
        width: 16,
        height: 16,
      },
    },
    '&.btn-done': {
      color: 'white',
      boxShadow: 0,
      backgroundColor: '#929292',
      px: 10,

      '& .MuiButton-startIcon': {
        position: 'relative',
        left: 'initial',
        right: 'initial',
        marginRight: 4,
      },
    },
  },
  scheduleIcon: {
    pt: { xs: 2, tablet: 3 },
    svg: {
      width: 20,
      height: 20,
      path: { fill: '#6b6b6b !important' },
    },
  },
};

export default styles;
