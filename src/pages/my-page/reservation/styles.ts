import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  reservationWrapper: {
    px: { xs: 0, tablet: 60 },
    py: 60,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    mb: 30,
    fontSize: 24,
  },
};

export default styles;
