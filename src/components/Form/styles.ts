const styles = {
  formControlWrapper: {},

  formLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    mb: 6,
    '.required-mark': {
      fontSize: 14,
      borderRadius: '5px',
      padding: '1px 6px',
      backgroundColor: 'chamoisee',
      color: 'white',
      ml: 12,
    },
  },

  formHelper: {
    fontSize: 14,
    margin: 0,
    '&[data-fixed=true]': {
      minHeight: 24,
    },
  },

  selectInput: {
    backgroundColor: 'white',
    input: {
      height: '100%',
    },
    '.MuiSelect-select': {
      padding: '15px 14px',
    },
    '.MuiSelect-icon': {
      top: 'calc(50% - 14px)',
      right: 9,
      padding: 4,
      width: 28,
      height: 28,
      svg: {
        width: 18,
        height: 18,
      },
    },
  },

  autocompleteInput: {
    borderRadius: '5px',
    '&[data-disabled=true]': {
      backgroundColor: 'action.disabledBackground',
    },
    '.MuiAutocomplete-popupIndicator': {
      padding: 4,
      width: 28,
      height: 28,
      svg: {
        width: 18,
        height: 18,
      },
    },
    input: {
      '&::placeholder': {
        color: 'placeholder',
        opacity: 1,
      },
    },
  },

  upload: {
    backgroundColor: 'brightGraySolid',
    '.image-preview-wrapper': {
      width: '100%',
      height: '100%',
      p: '20px 18px',
      '.image-preview-item': {
        overflow: 'hidden',
        paddingTop: 'calc(9 / 16 * 100%)',
        width: '100%',
        position: 'relative',
        backgroundColor: 'white',
      },
    },
    '.document-preview-item': {
      color: 'black',
      width: '100%',
      fontSize: 14,
      p: 11,
      bgcolor: 'nyanza',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      a: {
        color: 'black',
        pl: 10,
      },
    },
    '.delete-btn': {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: '0 0 0 10px',
      width: 40,
      height: 40,
    },
    '.upload-btn': {
      backgroundColor: 'white',
      maxWidth: 226,
      width: '100%',
      m: '20px 18px',
      gap: 8,
      svg: {
        width: 18,
        height: 18,
      },
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
      padding: 15,
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
    '& .MuiInputBase-input': {
      padding: '15px 14px',
    },
  },
  adornmentPassword: {
    mr: '4px',
  },
} as const;

export default styles;
