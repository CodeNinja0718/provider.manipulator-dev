import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  dateControl: {
    maxWidth: 186,
    '.MuiInputAdornment-root': {
      paddingRight: 16,
    },

    '.MuiInputBase-root': {
      borderRadius: '10px',
    },

    '.MuiInputBase-input': {
      padding: '10px 15px',
    },
  },
  navRow: {
    padding: '16px 0',
    borderBottomColor: 'action.disabledBackground',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  changeDateBox: {
    display: 'block',
    width: { xs: 320, mobile: 340 },
    margin: 'auto',
    px: { xs: 15, mobile: 0 },
    py: 0,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
