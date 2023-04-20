import type { SxProps } from '@mui/material';
import theme from 'theme';

const styles: Record<string, SxProps> = {
  profileFormWrapper: {
    width: '100%',
  },
  sectionContentWrapper: {
    maxWidth: 610,
    width: '100%',
    margin: '0 auto',
    px: 20,
    '&[data-worktime=true]': {
      maxWidth: 570,
      px: 0,
    },
    [theme.breakpoints.down('tablet')]: {
      maxWidth: '100%',
    },
  },
  workTimeItemWrapper: {
    padding: '20px 0 20px 20px',
    '&:nth-of-type(2n)': {
      backgroundColor: 'cream',
    },
  },
  weekDayName: {
    flexShrink: '0',
    width: 50,
    height: 50,
    color: 'white',
    fontSize: 18,
    backgroundColor: 'secondary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
  basicInfoNote: {
    color: 'black',
    fontSize: 14,
    mt: 9,
    mb: 15,
  },
  checkboxArea: {
    '.MuiFormGroup-root': {
      px: 17,
      py: 9,
      backgroundColor: 'nyanza',
      borderRadius: '5px',
    },
    '.MuiButtonBase-root': {
      mt: 0,
    },
    '.MuiFormControlLabel-root': {
      display: 'flex',
      alignItems: 'center',
    },
    '.MuiFormHelperText-root': {
      display: 'none',
    },
  },
  checkboxGroup: {
    '&.customStyle': {
      '.MuiGrid-item': {
        label: {
          mr: 10,
        },

        '&:last-child': {
          label: {
            mr: 0,
          },
        },
      },
    },
    '.MuiFormGroup-root': {
      borderRadius: '5px',
    },
    '.MuiGrid-item': {
      label: {
        backgroundColor: 'brightGraySolid',
        px: 17,
        py: 9,

        '.MuiTypography-root': {
          fontSize: 14,
        },
      },
      '.active': {
        backgroundColor: 'nyanza',
      },
    },
    '.MuiButtonBase-root': {
      mt: 0,
    },
    '.MuiFormControlLabel-root': {
      display: 'flex',
      alignItems: 'center',
    },
    '.MuiFormHelperText-root': {
      display: 'none',
    },
    '&.noSpacing': {
      padding: 0,
    },
    '&.borderBottom': {
      borderBottom: '2px solid',
      borderColor: 'brightGraySolid',
      '&:last-child': {
        border: 'none',
      },
    },
  },
  button: {
    width: 323,
  },
};

export default styles;
