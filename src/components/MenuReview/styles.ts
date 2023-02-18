import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  wrapper: {
    px: { xs: 0, tablet: 60 },
    py: { xs: 35, tablet: 60 },
    pb: { xs: 40, tablet: 54 },

    '& .MuiFormControlLabel-root': {
      background: (theme: Theme) => theme.palette.nyanza,
      m: 0,
      py: 2,
      pr: 13,
      pl: 4,
      borderRadius: '5px',
    },
  },
  horizontalBox: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',

    '& .MuiFormControlLabel-root': {
      width: { xs: '100%', tablet: 'calc(50% - 5px)' },
    },

    '&.no-wrap': {
      flexWrap: 'nowrap',
    },
  },
  sectionWrapper: {
    display: 'flex',
    mt: 55,
    gap: 20,
    flexDirection: 'column',
  },
  sectionItem: {
    width: '100%',
    pt: 16,
    pb: 0,
    px: { xs: 20, tablet: 0 },
  },
  itemRow: {
    borderBottom: '1px solid',
    borderColor: (theme: Theme) => theme.palette.action.disabledBackground,
    pb: 14,
    '&.borderNone': {
      border: 'none',
    },
  },
  submitBtn: {
    maxWidth: { xs: 'calc(100% - 40px)', tablet: 323 },
    width: '100%',
    m: 'auto',
    mt: 6,
  },
} as Record<string, SxProps<Theme>>;

export default styles;
