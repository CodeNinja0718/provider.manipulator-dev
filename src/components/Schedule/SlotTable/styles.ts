import type { SxProps } from '@mui/material';

const styles: Record<string, SxProps> = {
  slotTableWrapper: {
    position: 'relative',
  },
  manipulatorName: {
    backgroundColor: 'secondary.main',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    '.MuiTypography-root': {
      fontSize: 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      wordBreak: 'break-all',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
    },
  },
  slotColumn: {
    flex: '0 0 63px',
    width: '100%',
    maxWidth: 63,
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
