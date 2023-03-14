import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  feeWrapper: {
    color: 'black',
    p: { xs: 20 },
    bgcolor: 'cream',
    borderRadius: '10px',
    mt: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    mb: 10,
  },
};

export default styles;
