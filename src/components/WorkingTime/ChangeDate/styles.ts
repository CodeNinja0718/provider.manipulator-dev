import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  dateControl: {
    maxWidth: 186,
    '.MuiInputAdornment-root': {
      paddingRight: 16,
    },
  },
  navRow: {
    padding: '16px 0',
    borderBottomColor: 'action.disabledBackground',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
