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
    },
  },
};

export default styles;
