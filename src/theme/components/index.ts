import type { Theme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/system';

import MuiButton from './MuiButton';
import MuiOutlinedInput from './MuiOutlinedInput';
import MuiTypography from './MuiTypography';

const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    // Global CSS override
    styleOverrides: (theme: Theme) => `
      :root {
        --toastify-toast-width: 360px !important;
        --toastify-color-success: ${theme.palette.success.main} !important;
        --toastify-color-error: ${theme.palette.error.main} !important;
      }

      /** Classes for the displayed toast **/
      .Toastify__toast {
        padding: 16px;
        border-radius: 8px;
      }
      
      .Toastify__toast-body {
        padding: 0;
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      }
      
      /** Used to position the icon **/
      .Toastify__toast-icon {
        width: 24px;
      }
      
      @media only screen and (max-width: 480px) {
        .Toastify__toast-container {
          padding: 8px;
        }
      }

      .pointer, a {
        cursor: pointer;
      }

      a {
        color: ${theme.palette.primary.main};
      }
      
      .scale {
        transition: all 0.2s ease-in-out
      }
      .scale:hover {
        transform: scale(1.04)
      }
      
      .line-clamp {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
      }
      
      .two-line {
        -webkit-line-clamp: 2;
      }
      
      .three-line {
        -webkit-line-clamp: 3;
      }
      
      .four-line {
        -webkit-line-clamp: 4;
      }
      
      .five-line {
        -webkit-line-clamp: 5;
      }
      
      .break-word {
        word-break: break-word;
      }
      
      .break-all {
        word-break: break-all;
      }
      
      .fit-content {
        width: fit-content;
      }
      
      .inline-block {
        display: inline-block;
      }
    `,
  },
  MuiOutlinedInput,
  MuiButton,
  MuiTypography,
};

export default components;
