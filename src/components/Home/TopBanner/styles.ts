import type { SxProps, Theme } from '@mui/material';

const styles: Record<string, SxProps<Theme>> = {
  topBannerWrapper: {
    background: 'linear-gradient(to top, #a3cc30, #5e983c)',
    position: 'relative',
    height: {
      xs: 478,
      tablet: 552,
    },
    padding: '0 20px',
    '.top-banner-img': {
      objectFit: 'cover',
      padding: {
        xs: '10px 0 115px',
        tablet: '0 0 24px',
      },
      objectPosition: {
        xs: 'right -80px top 0',
        sm: 'right 0px top 0',
        tablet: 'center top',
      },
      borderRadius: {
        xs: '150px 0 150px 0',
        tablet: 0,
      },
    },
  },
  bannerContent: {
    maxWidth: 1020,
    gap: {
      xs: 16,
      tablet: 80,
    },
    margin: '0 auto',
    position: 'relative',
    width: {
      xs: 'auto',
      tablet: '100%',
    },
    height: {
      xs: 'auto',
      tablet: '100%',
    },
    alignItems: {
      xs: 'center',
      tablet: 'start',
    },
    justifyContent: {
      xs: 'end',
      tablet: 'center',
    },
    transform: {
      xs: 'translate(0, 57%)',
      tablet: 'none',
    },
    '& > svg': {
      width: {
        xs: 327,
        tablet: 419,
      },
      height: {
        xs: 160,
        tablet: 213,
      },
    },
  },
  medalList: {
    gap: {
      xs: 26,
      tablet: 10,
    },
    '.medal-img': {
      width: {
        xs: 110,
        tablet: 129,
      },
      height: {
        xs: 110,
        tablet: 129,
      },
      '&:first-of-type': {
        width: {
          xs: 125,
          tablet: 129,
        },
        height: {
          xs: 125,
          tablet: 129,
        },
        position: {
          xs: 'absolute',
          tablet: 'unset',
        },
        transform: {
          xs: 'translate(0, -50%)',
          tablet: 'none',
        },
        top: 0,
        left: '57%',
      },
    },
  },
  actionBtn: {
    maxWidth: {
      xs: 323,
      tablet: 404,
    },
    '&.chat-btn': {
      backgroundColor: 'spanishOrange',
    },
    '.MuiButton-startIcon': {
      svg: {
        width: 24,
        height: 24,
      },
    },
  },
};

export default styles;
