import type { SxProps, Theme } from '@mui/material';
import { kiwi } from 'theme';

const styles: Record<string, SxProps<Theme>> = {
  featureWrapper: {
    backgroundColor: 'white',
    padding: {
      xs: '40px 18px 20px',
      tablet: '90px 18px',
    },
  },
  title: {
    fontFamily: kiwi.style.fontFamily,
    fontWeight: 'bold',
    transform: 'matrix(1, -0.03, 0.03, 1, 0, 0)',
  },
  featureList: {
    maxWidth: 1000,
    width: '100%',
    gap: 20,
    '& > *': {
      flex: '1 1 33.33%',
    },
  },
  featureItem: {
    padding: 18,
    border: '1px solid',
    borderColor: 'primary.main',
    svg: {
      flexShrink: 0,
      width: 42,
      height: 42,
    },
    img: {
      objectFit: 'contain',
    },
  },
};

export default styles;
