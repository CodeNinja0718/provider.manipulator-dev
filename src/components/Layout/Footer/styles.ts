import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  footerLayoutWrapper: {
    color: 'white',
    bgcolor: 'grown',
    padding: 16,
    p: '0 28px 26px',
    width: '100%',
    minHeight: '210px',
  },
  social: {
    margin: {
      xs: '29px 0 40px',
      tablet: '37px 0 48px',
    },
    justifyContent: 'center',
  },
};

export default styles;
