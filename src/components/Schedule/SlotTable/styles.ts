import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  slotTableWrapper: {
    position: 'relative',
  },
  manipulatorName: {
    position: 'relative',
    backgroundColor: 'secondary.main',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,

    '&.evenItem': {
      position: 'relative',
      backgroundColor: 'dollarBill',
    },

    '.MuiTypography-root': {
      fontSize: 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      wordBreak: 'break-word',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      textAlign: 'center',
    },
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
    '& .triangleIcon': {
      position: 'absolute',
      right: 5,
      bottom: 5,
      width: 0,
      height: 0,
      borderLeft: '9px solid transparent',
      borderRight: '0 solid transparent',
      borderBottom: '9px solid white',
    },
  },
  slotColumn: {
    flex: '1',
    width: '100%',
    maxWidth: 'calc((100vw - 82px) / 5)',
    '&:nth-of-type(2n)': {
      backgroundColor: '#f9f2ed',
    },
  },
  slotCell: {
    padding: 2,
    height: 40,
    minWidth: 'unset',
    minHeight: 'unset',
    borderRadius: 0,
    borderBottom: '1px solid #cccccc',
    overflow: 'visible',
    position: 'relative',
    '&.Mui-disabled': {
      '&[data-available=false]': {
        backgroundColor: '#6e6e6e',
      },
    },
  },
  slotBooked: {
    position: 'absolute',
    top: 2,
    color: 'spanishOrange',
    backgroundColor: 'unbleachedSilk',
    borderColor: 'spanishOrange',
    width: 'calc(100% - 4px)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
    alignItems: 'center',
    zIndex: 1,
    pointerEvents: 'normal',
  },
};

export default styles;
