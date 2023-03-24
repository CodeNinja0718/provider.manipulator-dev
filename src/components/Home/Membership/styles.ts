import type { SxProps, Theme } from '@mui/material';
import { kiwi } from 'theme';

const styles: Record<string, SxProps<Theme>> = {
  membershipWrapper: {
    background: 'url("/images/membership_bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: {
      xs: '28px 20px 38px',
      tablet: '45px 20px',
    },
    '.medal-img': {
      width: {
        xs: 73,
        tablet: 84,
      },
      height: {
        xs: 73,
        tablet: 84,
      },
    },
  },
  title: {
    fontFamily: kiwi.style.fontFamily,
    span: {
      color: '#f2385e',
    },
  },
  actionBtn: {
    maxWidth: {
      xs: 323,
      tablet: 404,
    },
    '&.chat-btn': {
      backgroundColor: 'spanishOrange',
      mb: {
        xs: 15,
        tablet: 25,
      },
    },
    '.MuiButton-startIcon': {
      svg: {
        width: 24,
        height: 24,
      },
    },
  },
};

export default styles;
