import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  collapseHeaderWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    p: '20px 0',
    cursor: 'pointer',
  },
  avatar: {
    width: 35,
    height: 35,
  },
};

export default styles;
