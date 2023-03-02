import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  scheduleListWrapper: {
    maxWidth: 610,
    padding: '0 20px',
    margin: {
      xs: '45px auto',
      tablet: '59px auto 64px',
    },
  },
  dateControl: {
    maxWidth: 186,
    '.MuiInputAdornment-root': {
      paddingRight: 16,
    },
  },
  updateScheduleBtn: {
    maxWidth: 323,
    width: '100%',
    margin: '20px 0 40px',
  },
  scheduleNote: {
    fontSize: 14,
    color: 'black',
    borderBottomColor: 'action.disabledBackground',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    padding: '0 8px 20px',
    span: {
      color: 'spanishOrange',
      backgroundColor: 'unbleachedSilk',
      borderColor: 'spanishOrange',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '0px 8px',
      marginRight: 8,
    },
  },
  navRow: {
    padding: '16px 0',
    borderBottomColor: 'action.disabledBackground',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
};

export default styles;
