import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  contentWarpper: {
    width: '100%',
    color: 'black',
    paddingTop: 20,
    px: { xs: 20, tablet: 0 },
  },
  numberField: {
    width: 70,
    height: 40,
    fontWeight: 'bold',
    '& .MuiNumberInput-stepper': {
      gap: 3,
      mr: 8.5,
      justifyContent: 'center',
    },
    '& .MuiInputBase-input': {
      pr: 0,
    },
    '&.maxHeight': {
      height: 50,
    },
    '&.maxWidth': {
      // width: {
      //   xs: 120,
      //   tablet: 168,
      // },
      width: 168,
    },
  },
  unitLabel: {
    fontWeight: 400,
    ml: 7,
  },
  menuList: {
    minWidth: 'initial',
    maxWidth: 570,
  },
  menuItemSx: {
    whiteSpace: 'initial',
  },
  menuField: {
    maxWidth: 570,
  },
};

export default styles;
