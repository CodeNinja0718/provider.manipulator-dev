import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  profileFormWrapper: {
    width: '100%',
  },
  sectionContentWrapper: {
    maxWidth: 570,
    width: '100%',
    margin: '0 auto',
    paddingTop: 20,
  },
  addressSearchBtn: {
    maxWidth: 100,
    padding: '0 8px',
    width: '100%',
    mt: 8,
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
  submitBtn: {
    maxWidth: 323,
    width: '100%',
    marginTop: 20,
  },
};

export default styles;
