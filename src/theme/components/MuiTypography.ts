const MuiTypography = {
  defaultProps: {
    fontFamily: 'inherit',
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body1: 'p',
      body2: 'span',
      title: 'h1',
      subtitle1: 'h3',
    },
  },
  variants: [
    {
      props: {
        variant: 'title',
      },
      style: {
        position: 'relative',
        color: '#333333',
        fontSize: 24,
        '&::after': {
          content: '""',
          background: 'linear-gradient(to right, #a2cb30, #5f993c)',
          position: 'absolute',
          bottom: -9,
          left: 0,
          height: 6,
          width: '100%',
          borderRadius: 3,
          transform: 'translateY(50%)',
        },
      },
    },
    {
      props: {
        variant: 'titleWhite',
      },
      style: {
        position: 'relative',
        color: 'white',
        fontSize: 24,
        '&::after': {
          content: '""',
          background: 'white',
          position: 'absolute',
          bottom: -9,
          left: 0,
          height: 6,
          width: '100%',
          borderRadius: 3,
          transform: 'translateY(50%)',
        },
      },
    },
    {
      props: {
        variant: 'subtitle1',
      },
      style: {
        color: '#eb6600',
        fontSize: 18,
      },
    },
  ],
};

export default MuiTypography;
