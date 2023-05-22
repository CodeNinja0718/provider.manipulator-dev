import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  attachment: {
    color: 'black',
    fontSize: 14,
    p: { xs: 10 },
    bgcolor: 'nyanza',
    borderRadius: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    textDecorationColor: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    mb: 10,
  },
};

export default styles;
