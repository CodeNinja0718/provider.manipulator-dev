import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  menuCardHeader: {
    height: 40,
    margin: 'auto',
    borderTopLeftRadius: '30px',
    padding: '0px 20px',
    bgcolor: 'secondary.main',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'flex-end',
  },
  deleteBtn: {
    cursor: 'pointer',
  },
  updateScheduleBtn: {
    maxWidth: 323,
    minHeight: '100%',
    height: 40,
    width: '100%',
  },
  wrapper: {
    position: 'relative',
    maxWidth: {
      xs: '100%',
      tablet: 610,
    },
    margin: 'auto',
    mb: 20,
    boxShadow: '0px 3px 6px #00000029',
    borderTopLeftRadius: '30px',
  },
  statusBox: {
    border: '1px solid',
    borderColor: 'grullo',
    borderRadius: '5px',
    px: 11,
    py: 5,
  },
  statusDoubleBox: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    color: '#D8D8D8',
    fontWeight:'bold',

    '&.active': {
      '.posting' : {
        color: 'white',
        backgroundColor: 'spanishOrange',
        borderRadius: ' 5px  0  0 5px',
      },
      '.stopped' : {
        backgroundColor: '#eeeeee',  
        color: '#D8D8D8',
        borderRadius: '0 5px 5px 0',
      }
    },

    '&.unactive': {
      '.posting' : {
        color: '#D8D8D8',
        backgroundColor: '#eeeeee',  
        borderRadius: ' 5px  0  0 5px',
      },
      '.stopped' : {
        color: 'white',
        backgroundColor: 'graySolid',  
        borderRadius: '0 5px 5px 0',
      }
    },
  },
  statusBoxItem: {
    height: '100%',
    px: 12,
    py: 5,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
