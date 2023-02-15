const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      padding: 0,
      borderRadius: 5,
      backgroundColor: 'transparent',
      '&:not(.Mui-error):not(.Mui-disabled)': {
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#249287',
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
      fontSize: 16,
      '&.Mui-disabled': {
        backgroundColor: '#cccccc',
      },
    },
    notchedOutline: {
      padding: 0,
      borderWidth: '1px',
      border: '1px solid #ac9b93',
    },
  },
  variants: [
    {
      props: {
        size: 'medium',
      },
      style: {
        input: {
          padding: 15,
          borderRadius: 5,
        },
      },
    },
  ],
};

export default MuiOutlinedInput;
