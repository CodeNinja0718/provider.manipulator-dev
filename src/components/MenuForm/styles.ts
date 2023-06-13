import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  wrapper: {
    px: { xs: 0, tablet: 60 },
    py: { xs: 35, tablet: 60 },
    pb: { xs: 40, tablet: 54 },
    '.field': {
      '> input': {
        py: 13.5,
      },
    },
  },
  submitBtn: {
    maxWidth: { xs: 'calc(100% - 40px)', tablet: 323 },
    width: '100%',
    m: 'auto',
    mt: 0,
  },
  sectionWrapper: {
    mt: 55,
    '& .customSectionClass': {
      width: '100%',
    },
    '& .customContentClass': {
      px: 0,
    },
    '& label.MuiFormControlLabel-root': {
      display: 'flex',
      alignItems: 'center',
      px: 13,
      py: 12,
      mt: 10,
      background: (theme: Theme) => theme.palette.nyanza,
      borderRadius: '5px',

      '& .MuiTypography-root': {
        fontWeight: 600,
      },
    },
    '& .customRadio': {
      width: '100%',
      justifyContent: 'space-between',
      label: {
        width: 'calc(50% - 4px)',
        ml: 0,
        mr: 0,
        background: '#eeeeee',

        '&.active': {
          background: (theme: Theme) => theme.palette.nyanza,
        },

        '& .MuiButtonBase-root': {
          padding: 0,
          svg: {
            width: 18,
            height: 18,
            mr: 20,
          },
        },
      },
    },
    '& label.checkboxControlWrapper': {
      position: 'absolute',
      left: 110,
      top: '50%',
      m: 0,
      p: 0,
      background: 'none',
      transform: 'translateY(-50%)',
      '& .MuiTypography-root': {
        fontWeight: 400,
      },
    },
    '& .noSpacingCheckbox': {
      '& label.MuiFormControlLabel-root': {
        mt: 0,
      },
    },
    '& .activeTheme': {
      '& label.MuiFormControlLabel-root': {
        background: (theme: Theme) => theme.palette.brightGraySolid,

        '&.active': {
          background: (theme: Theme) => theme.palette.nyanza,
        },
      },
    },
  },
  sectionItem: {
    width: '100%',
    pt: 20,
    pb: 17,
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
  checkboxArea: {
    '> div': { width: '100%' },
    '.MuiButtonBase-root': {
      pt: 0,
      pr: 0,
      '& svg': {
        width: 16,
        height: 16,
        mr: 9,
      },
    },
    '> .MuiTypography-root': {
      lineHeight: 1,
    },
  },
  unitLabel: {
    fontWeight: 400,
    ml: 7,
  },
  selectWrapper: {
    display: 'flex',
    alignItems: 'center',
    mb: 24,
    '.MuiSelect-icon': {
      padding: 6,
    },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
