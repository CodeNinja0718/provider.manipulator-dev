import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  paper: {
    width: 'calc(100% - 50px)',
    maxHeight: 'calc(100% - 50px)',
    borderRadius: '10px',
    margin: 25,
    maxWidth: 325,
  },
  title: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'secondary.main',
    color: 'white',
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  closeIcon: {
    position: 'absolute',
    right: 8,
    top: 1,
    color: 'white',
  },
  contentWrapper: {
    padding: '20px !important',
  },
  contentTextOnly: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  actionWrapper: {
    padding: 20,
    flexDirection: 'column',
    gap: 12,
    '>:not(:first-of-type)': {
      margin: 0,
    },
    '.action-btn': {
      maxWidth: 226,
      gap: 10,
    },
    '.cancel-btn': {
      color: 'graySolid',
    },
  },
};

export default styles;
