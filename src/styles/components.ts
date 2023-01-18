import type { ThemeOptions } from '@mui/system';

const components: ThemeOptions['components'] = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '5px',
        backgroundColor: 'transparent',
        '&:not(.Mui-error):not(.Mui-disabled)': {
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#269271',
            },
          },
        },
        '& .MuiSelect-icon': {
          width: '24px',
          height: '24px',
          right: '12px',
          top: 'calc(50% - 12px)',
        },
      },
      input: {
        fontSize: 18,
      },
      notchedOutline: {
        padding: 0,
        borderWidth: '1px',
        border: '1px solid #000',
      },
    },
    variants: [
      {
        props: {
          size: 'medium',
        },
        style: {
          input: {
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: 16,
            '&.Mui-disabled': {
              backgroundColor: '#f6f8f9',
            },
          },
        },
      },
      {
        props: {
          size: 'large',
        },
        style: {
          input: {
            height: 24,
          },
        },
      },
    ],
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '5px',
      },
      sizeMedium: {
        lineHeight: '21px',
      },
      sizeLarge: {
        lineHeight: '24px',
        fontSize: 18,
      },
      containedPrimary: {
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.25)',
      },
      outlinedPrimary: {
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.25)',
      },
    },
    variants: [
      {
        props: {
          size: 'large',
          variant: 'contained',
          color: 'primary',
        },
        style: {
          padding: '22px 24px 23px',
        },
      },
      {
        props: {
          size: 'medium',
          variant: 'contained',
          color: 'primary',
        },
        style: {
          padding: '10px 8px 9px',
        },
      },
      {
        props: {
          size: 'medium',
          variant: 'outlined',
          color: 'primary',
        },
        style: {
          padding: '9px 7px 8px',
        },
      },
    ],
  },
};

export default components;
