import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  setPasswordFormWrapper: {
    maxWidth: 610,
    margin: {
      xs: '45px auto',
      tablet: '59px auto 64px',
    },
    padding: '0 20px',
    gap: 8,
  },
  submitBtn: {
    maxWidth: 323,
    width: '100%',
    marginTop: 32,
  },
  passwordTextRule: {
    width: '100%',
    '& li': {
      paddingBlock: '0px',
      '& span': {
        fontSize: '14px',
      },
    },
    '& li::before': {
      content: '"\\2022"',
      fontSize: '1rem',
      marginRight: '0.5rem',
      paddingBottom: '0.4em',
    },
  },
};

export default styles;
