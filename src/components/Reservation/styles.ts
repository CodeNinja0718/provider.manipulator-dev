import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    mb: 30,
    fontSize: 24,
  },
  wrapper: {
    overflow: 'auto',
    height: { xs: 'initial', tablet: '80vh' },
  },
};

export default styles;
