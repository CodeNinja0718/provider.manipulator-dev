import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  headerWrapper: {
    bgcolor: 'secondary.main',
    px: 20,
    py: 16,
    color: 'white',
  },
  arrow: {
    transition: 'transform 300ms',
  },
  remaining: {
    border: '1px solid',
    borderColor: 'spanishOrange',
    px: 10,
    py: 12,
    borderRadius: '8px',
  },
  ticketCardContainer: {
    px: { xs: 20, tablet: 0 },
  },
};

export default styles;
