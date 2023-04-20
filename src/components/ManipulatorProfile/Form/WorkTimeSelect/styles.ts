import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  WorkTimeSelectWrapper: {
    '.MuiOutlinedInput-input': {
      background: 'white !important',
      '&.Mui-disabled': {
        opacity: 0.8,
      },
    },
  },
  holiydayCheckboxWrapper: {
    backgroundColor: '#929292',
    minWidth: 100,
    color: 'white',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 17px',
    borderRadius: '30px',
    cursor: 'pointer',
    '&[data-checked=true]': {
      backgroundColor: 'secondary.main',
    },
  },
  checkbox: {
    padding: 0,
  },
};

export default styles;
