import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  reservationDetailWrapper: {
    p: { xs: 0, tablet: 20 },
  },
  buttonViewDetail: {
    maxWidth: 256,
    height: 40,
    minHeight: 40,
    width: '100%',
    m: 'auto',
    mt: { xs: 20, tablet: 40 },
    fontSize: 16,
  },
  button: {
    maxWidth: 323,
    width: '100%',
    m: 'auto',
  },
  contentBox: {
    px: { xs: 0, tablet: 40 },
    py: 40,
    pt: { xs: 46, tablet: 40 },
    gap: 40,
  },
  backButtonBox: {
    p: { xs: 15, tablet: 0 },
  },
  title: {
    m: '24px 0px 0',
  },
};

export default styles;
