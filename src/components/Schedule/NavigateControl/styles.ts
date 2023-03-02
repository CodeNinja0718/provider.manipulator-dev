import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  navigateControlWrapper: {
    width: '100%',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'graySolid',
    fontSize: 14,
    svg: {
      width: 14,
      height: 14,
    },
    '&:hover': {
      color: 'primary.main',
      textDecoration: 'underline',
    },
    '&[data-disabled=true]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
};

export default styles;
