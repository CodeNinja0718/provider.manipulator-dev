import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  reservationWrapper: {
    px: { xs: 0, tablet: 60 },
    py: 60,
  },
  wrapper: {
    height: { xs: 'initial', tablet: '80vh' },
  },
  labelText: {
    color: 'secondary.main',
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 10,
  },
  nameSelect: {
    marginBottom: 40,
    '.MuiSelect-icon': {
      top: 'calc(50% - 12px)',
      right: 9,
      padding: 4,
      width: 24,
      height: 24,
      svg: {
        width: 18,
        height: 18,
      },
    },
  },
  placeholder: {
    color: '#999999',
  },
};

export default styles;
