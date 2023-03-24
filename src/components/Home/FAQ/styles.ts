import type { SxProps, Theme } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  faqWrapper: {
    backgroundColor: 'white',
    padding: {
      xs: '20px 0 42px',
      tablet: '40px 0 100px',
    },
  },
  sectionImage: {
    position: 'relative',
    width: '100%',
    height: {
      xs: 263,
      tablet: 450,
    },
    mb: {
      xs: 40,
      tablet: 77,
    },
    img: {
      objectFit: 'cover',
      objectPosition: 'left',
    },
  },
  flowImaage: {
    position: 'relative',
    width: '100%',
    height: {
      xs: 308,
      tablet: 109,
    },
    mb: {
      xs: 58,
      tablet: 106,
    },
    img: {
      objectFit: 'contain',
    },
  },
  faqItem: {
    cursor: 'pointer',
    padding: '20px 20px 10px',
    gap: 10,
    '&:nth-of-type(2n)': {
      backgroundColor: 'cream',
    },
  },
  questionTitle: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '.end-icon': {
      width: 24,
      height: 24,
      color: 'primary.main',
      position: 'absolute',
      right: 0,
    },
  },
  answerContent: {
    color: 'black',
  },
};

export default styles;
