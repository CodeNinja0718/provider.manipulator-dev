import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  button: {
    maxWidth: 323,
    width: '100%',
    m: 'auto',
    mt: 55,

    '&.sectionButton': {
      mt: 20,
    },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
