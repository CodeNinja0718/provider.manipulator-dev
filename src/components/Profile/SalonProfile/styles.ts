import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  salonProfileWrapper: {
    width: '100%',
  },
  sectionContentWrapper: {
    maxWidth: 610,
    width: '100%',
    margin: '0 auto',
    px: 20,
    '&[data-worktime=true]': {
      maxWidth: 570,
      px: 0,
    },
  },
  fieldItemWrapper: {
    borderBottom: '1px solid #cccccc',
    paddingBottom: 12,
    '&:last-of-type': {
      border: 0,
    },
    '.label': {
      mb: 10,
    },
  },
  photoItemWrapper: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 'calc(9 / 16 * 100%)',
    backgroundColor: 'white',
    img: {
      objectFit: 'contain',
    },
  },
  workTimeItemWrapper: {
    padding: 20,
    '&:nth-of-type(2n)': {
      backgroundColor: 'cream',
    },
  },
  weekDayName: {
    flexShrink: '0',
    width: 53,
    height: 53,
    color: 'white',
    fontSize: 18,
    backgroundColor: 'secondary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
  actionBtnGroup: {
    maxWidth: 363,
    px: 20,
    width: '100%',
  },
};

export default styles;
