import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  linkStyle: {
    alignItems: 'center',
    cursor: 'pointer',
    svg: {
      width: 10,
      height: 10,
      color: 'graySolid',
      transform: 'rotate(180deg)',
    },
    display: { xs: 'inline-flex', tablet: 'inline-flex' },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
