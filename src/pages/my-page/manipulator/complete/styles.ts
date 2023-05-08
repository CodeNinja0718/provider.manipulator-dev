import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  profileCompletionContainer: {
    maxWidth: 610,
    margin: {
      xs: '45px auto',
      tablet: '59px auto 64px',
    },
    padding: '0 20px',
  },
  btn: {
    maxWidth: { xs: undefined, tablet: 323 },
    width: '100%',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  menuBtn: {
    cursor: 'pointer',
    fontSize: 16,
    paddingLeft: 20,
    color: 'black',
    fontWeight: 'bold',
    background: 'white !important',
    '&:hover': {
      color: 'secondary.main',
    },
    '&.Mui-selected': {
      color: 'secondary.main',
    },
    svg: {
      color: 'secondary.main',
      width: 20,
    },
  },
};

export default styles;
