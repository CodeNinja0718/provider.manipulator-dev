import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  reservationHeaderWrapper: {
    width: '100%',
    color: 'white',
    backgroundColor: 'secondary.main',
    justifyContent: 'center',
    alignItems: 'center',
    p: '10px 20px',
    cursor: 'pointer',
  },
};

export default styles;
