import type { Theme } from '@mui/material/styles';

const styles = {
  formControlWrapper: {
    '.form-label': {
      position: 'relative',
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      transform: 'translate(0, 0) scale(1)',
      mb: 6,
    },
    '.required-mark': {
      fontSize: 14,
      borderRadius: '5px',
      padding: '1px 6px',
      backgroundColor: 'chamoisee',
      color: 'white',
      ml: 12,
    },
    '.form-error': {
      fontSize: 14,
      minHeight: 20,
      margin: 0,
    },
  },

  required: {
    backgroundColor: 'primary.main',
    color: 'white',
    padding: '0 6px',
    fontSize: 14,
    fontWeight: 500,
    borderRadius: '5px',
    ml: 8,
  },

  placeholder: {
    color: 'placeholder',
  },
  input: {
    width: 1,
    input: {
      '&::placeholder': {
        color: 'placeholder',
        opacity: 1,
      },
    },
    textarea: {
      '&::placeholder': {
        color: 'placeholder',
        opacity: 1,
      },
    },
  },
  datepicker: {
    '& .MuiInputBase-root': {
      '& .MuiInputAdornment-root': {
        pr: '12px',
        '& .MuiButtonBase-root': {
          p: '12px',
        },
      },
    },
  },
  imageContainerCycle: {
    width: 136,
    borderRadius: '50%',
    position: 'relative',
    aspectRatio: '1 / 1',
    '&:hover': {
      '.overlay': {
        opacity: 0.8,
        bgcolor: 'white',
      },
      button: {
        opacity: 1,
      },
    },
  },
  imageContainer: {
    width: 136,
    position: 'relative',
    aspectRatio: '1 / 1',
    '&:hover': {
      '.overlay': {
        opacity: 0.8,
        bgcolor: 'white',
      },
      button: {
        opacity: 1,
      },
    },
  },
  overlayContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    transition: '.3s ease',
    '.overlay': {
      height: '100%',
      opacity: 0,
      transition: '.3s ease',
      borderRadius: '4px',
      border: (theme: Theme) => `2px dashed ${theme.palette.primary.main}`,
    },
    '.delete-btn': {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'white',
      top: '50%',
      left: '50%',
      transition: '.3s ease',
      opacity: 0,
      svg: {
        width: 24,
        height: 24,
        color: 'primary.main',
      },
    },
  },
  overlayContainerCycle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    transition: '.3s ease',
    '.overlay': {
      height: '100%',
      opacity: 0,
      transition: '.3s ease',
      borderRadius: '50%',
      border: (theme: Theme) => `2px dashed ${theme.palette.primary.main}`,
    },
    '.delete-btn': {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'primary',
      top: '50%',
      left: '50%',
      transition: '.3s ease',
      opacity: 0,
      svg: {
        width: 32,
        height: 32,
        color: 'primary.main',
      },
    },
  },
  adornmentPassword: {
    mr: '4px',
  },
  errorContainer: (theme: Theme) => ({
    alignItems: 'center',
    flex: 1,
    svg: {
      width: 20,
      height: 20,
    },
    [theme.breakpoints.down('tablet')]: {
      svg: {
        width: 16,
        height: 16,
      },
    },
  }),
  clearButton: {
    position: 'absolute',
    transform: 'translate(0%, 0%)',
    right: 0,
    p: { xs: '10px', tablet: '12px' },
    svg: {
      color: 'primary.main',
      width: { xs: 20, tablet: 24 },
      height: { xs: 20, tablet: 24 },
    },
  },
} as const;

export default styles;
