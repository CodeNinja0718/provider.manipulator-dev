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
};

export default styles;
