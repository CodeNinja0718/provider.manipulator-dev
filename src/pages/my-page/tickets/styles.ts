import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  ticketListContainer: {
    px: { xs: 0, tablet: 60 },
    py: 60,
    pb: 54,
    overflow: 'hidden',

    '.ticket-list': {
      py: 24,
    },
  },
  searchWrapper: {
    px: { xs: 20, tablet: 0 },
  },
  inputIcon: {
    p: 16,
    color: 'gray',
  },
};

export default styles;
