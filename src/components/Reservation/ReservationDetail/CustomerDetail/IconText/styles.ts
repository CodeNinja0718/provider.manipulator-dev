import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  buttonIcon: {
    height: '50px',
    width: '50px',
    flex: '0 0 50px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIconText: {
    display: 'inline-flex',
    marginBottom: '20px',
    cursor: 'pointer',
    flexDirection: {
      xs: 'column',
      tablet: 'column',
    },
    textAlign: {
      xs: 'center',
      tablet: 'left',
    },
    gap: {
      xs: '10px',
      tablet: '0',
    },
    alignItems: 'center',
  },
  buttonText: {},
};

export default styles;
