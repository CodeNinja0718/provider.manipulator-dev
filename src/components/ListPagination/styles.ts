import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  container: (theme: Theme) => ({
    '& button': {
      height: '48px',
      width: '48px',
      borderRadius: '50%',
      mx: '4px',
      color: 'neutral7',
      bgcolor: 'white',
      fontSize: '16px',
      fontWeight: 500,
      '&.Mui-disabled': {
        opacity: 0.38,
      },
      '&.MuiPaginationItem-root.Mui-selected': {
        backgroundColor: 'secondary.main',
        color: 'white',
      },
      [theme.breakpoints.down('tablet')]: {
        height: '32px',
        width: '32px',
        fontSize: '12px',
      },
    },
  }),
} as Record<string, SxProps<Theme>>;

export default styles;
