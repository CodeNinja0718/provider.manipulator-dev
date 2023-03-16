import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  contentWarpper: {
    width: '100%',
    color: 'black',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    m: '24px 0px 0',
  },
  button: {
    maxWidth: 323,
    width: '100%',
    m: 'auto 0',
    mt: 30,
    mb: 0,
  },
};

export default styles;
