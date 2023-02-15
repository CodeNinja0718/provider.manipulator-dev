import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    background: (theme: Theme) => theme.palette.secondary.main,
  },
  text: {
    fontSize: 18,
    py: 14,
    px: 15,
    color: 'white',
    fontWeight: 600,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
