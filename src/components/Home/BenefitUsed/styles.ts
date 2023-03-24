import type { SxProps, Theme } from '@mui/material';
import { kiwi } from 'theme';

const styles: Record<string, SxProps<Theme>> = {
  benefitUsedWrapper: {
    backgroundColor: 'white',
    paddingTop: {
      xs: 246,
      tablet: 95,
    },
  },
  titleWrapper: {
    position: 'relative',
    svg: {
      width: {
        xs: 115,
        tablet: 180,
      },
      height: {
        xs: 115,
        tablet: 180,
      },
      position: {
        xs: 'relative',
        tablet: 'absolute',
      },
      bottom: 0,
      left: {
        xs: 0,
        tablet: 'calc(50% + 250px)',
      },
    },
  },
  title: {
    fontFamily: kiwi.style.fontFamily,
    fontWeight: 'bold',
    transform: 'matrix(1, -0.03, 0.03, 1, 0, 0)',
  },
  benfefitContentWrapper: {
    padding: {
      xs: '20px 18px',
      tablet: '70px 18px',
    },
    background: 'url("/images/feature_bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  benefitContentList: {
    maxWidth: 1000,
    margin: '0 auto',
    '& > *': {
      flex: '1 1 calc(50% - 10px)',
    },
  },
  benefitContentItem: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      tablet: 'row',
    },
    flexGrow: 1,
    gap: 12,
    padding: 30,
    borderRadius: '30px 0px 10px 0px',
    backgroundColor: 'white',
    '.item-logo': {
      width: 40,
      height: 40,
      flexShrink: 0,
      position: {
        xs: 'absolute',
        tablet: 'relative',
      },
    },
    '.customer-icon': {
      width: 134,
      height: 101,
      flexShrink: 0,
      alignSelf: {
        xs: 'center',
        tablet: 'start',
      },
    },
    '.title': {
      padding: {
        xs: '0 0 0 44px',
        tablet: 0,
      },
      textAlign: {
        xs: 'center',
        tablet: 'left',
      },
      marginBottom: {
        xs: 4,
        tablet: 0,
      },
      span: {
        display: {
          xs: 'block',
          tablet: 'inline',
        },
        fontFamily: kiwi.style.fontFamily,
        color: '#f2385e',
      },
    },
  },
  checkNote: {
    display: 'flex',
    paddingLeft: {
      xs: 12,
      tablet: 0,
    },
    svg: {
      marginTop: 6,
      marginRight: 4,
      color: 'primary.main',
      width: 18,
      height: 18,
    },
  },
};

export default styles;
