import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  profileFormWrapper: {
    width: '100%',
  },
  sectionContentWrapper: {
    maxWidth: 610,
    width: '100%',
    margin: '0 auto',
    paddingTop: 20,
    px: 20,
    '&[data-worktime=true]': {
      maxWidth: 570,
      px: 0,
    },
  },

  addressSearchBtn: {
    maxWidth: 100,
    padding: '0 8px',
    width: '100%',
    mt: 8,
  },

  stationCheckboxWrapper: {
    maxWidth: 334,
    height: 249,
    borderRadius: '5px',
    border: '1px solid #AC9B93',
  },
  checkboxSideContent: {
    flex: '0 0 44px',
    backgroundColor: '#E3F5D6',
    borderRadius: '5px 0 0 5px',
    borderRight: '1px solid #AC9B93',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    pt: 8,
    '.back-btn': {
      height: 32,
      width: 32,
      svg: {
        width: 16,
        height: 16,
      },
    },
  },
  stationList: {
    flex: '1 1 auto',
    overflow: 'auto',
  },
  stationItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #AC9B93',
    padding: '8px 16px',
    gap: 8,
    cursor: 'pointer',
    '&:last-of-type': {
      border: 0,
    },
  },

  workTimeNote: {
    padding: '0 20px',
    color: 'black',
    mb: 16,
    span: {
      color: '#f2385e',
      fontWeight: 'bold',
    },
  },
  workTimeItemWrapper: {
    padding: '20px 0 20px 20px',
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
