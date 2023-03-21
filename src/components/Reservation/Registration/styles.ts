import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  dateControl: {
    '.MuiInputAdornment-root': {
      paddingRight: 16,
    },
  },
  button: {
    maxWidth: 323,
    width: '100%',
    m: 'auto',
  },
  buttonBox: {
    width: '100%',
    textAlign: 'center',
    mt: 70,
    px: { xs: 20, tablet: 0 },
  },
  wrapper: {
    px: { xs: 20, tablet: 0 },
    width: '100%',
  },
  couponWrapper: {
    width: 335,
    boxShadow: 2,
    borderTopLeftRadius: '30px',
    overflow: 'hidden',
    color: 'black',
    mb: 20,
  },
  couponHeader: {
    backgroundColor: 'secondary.main',
    color: 'white',
    p: '10px 20px',
  },
  couponLabel: {
    border: '1px solid #ea6500',
    borderRadius: '5px',
    p: '10px 15px',
    color: '#ea6500',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  },
  numberField: {
    width: 90,
    height: 40,
    fontWeight: 'bold',
    mr: 10,
    '& .MuiNumberInput-stepper': {
      gap: 3,
      mr: 8.5,
      justifyContent: 'center',
    },
    '& .MuiInputBase-input': {
      pr: 0,
    },
  },
  labelStyle: {
    fontWeight: 600,
    fontSize: 16,
  },
  labelStyleSpec: {
    fontWeight: 600,
    fontSize: 16,
    mt: 7,
  },
  labelTime: {
    width: 100,
    label: {
      opacity: 0,
      display: { xs: 'none', tablet: 'initial' },
    },
  },
};

export default styles;
