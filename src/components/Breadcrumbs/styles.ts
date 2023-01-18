import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  breadcrumb: {
    fontSize: '12px',
    '.MuiBreadcrumbs-separator': {
      mx: { xs: '4px', tablet: 1 },
      fontSize: { xs: 12, tablet: 18 },
    },
    '& li': {
      alignSelf: 'end',
      '&:last-child': {
        flex: 1,
      },

      svg: {
        width: { xs: 20, tablet: 24 },
        height: { xs: 17, tablet: 24 },
      },
    },
  },
  home: {
    fontSize: { xs: 12, tablet: 18 },
    display: 'flex',
    alignItems: 'center',
    color: 'hint',
  },
  activeItem: {
    color: 'hint',
    fontSize: { xs: 12, tablet: 18 },
  },
  inActiveItem: {
    color: 'hint',
    fontSize: { xs: 12, tablet: 18 },
  },
} as Record<string, SxProps<Theme>>;

export default styles;
