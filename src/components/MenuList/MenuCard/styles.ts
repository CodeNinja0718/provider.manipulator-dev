import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  menuCardWrapper: {
    marginBottom: 40,
  },
  menuCardHeader: {
    height: 40,
    borderTopLeftRadius: '30px',
    padding: '0px 20px',
    bgcolor: 'secondary.main',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  menuCardBody: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    py: 20,
    color: 'black',
    '& .MuiTypography-root': {
      fontSize: 16,
    },
  },
  textWrapper: {
    minWidth: 66,
  },
  button: {
    maxWidth: 256,
    height: 40,
    minHeight: 40,
    width: '100%',
    m: 'auto',
    mt: 30,
    fontSize: 16,
  },
  buttonDelete: {
    marginTop: 15,
    minWidth: 60,
    color: 'black',
    fontSize: 14,
    '& .MuiButton-startIcon': {
      position: 'relative',
      left: 'initial',
      marginRight: 10,
      svg: {
        width: 15,
        height: 18,
      },
    },
  },
  divider: {
    paddingTop: 10,
    marginRight: 20,
    display: { xs: 'block', tablet: 'none' },
  },
  lineCream: {
    py: { xs: 5, tablet: 10 },
    bgcolor: 'cream',
  },
} as Record<string, SxProps<Theme>>;

export default styles;
