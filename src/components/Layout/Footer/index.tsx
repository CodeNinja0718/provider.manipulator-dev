import { Box, Stack, Typography } from '@mui/material';
import Link from 'components/Link';
import theme from 'theme';
import { FOOTER_ITEMS } from 'utils/const';

import SocialItem from './SocialItem';
import styles from './styles';

const Footer = () => {
  return (
    <Stack
      sx={styles.footerLayoutWrapper}
      justifyContent="end"
      alignItems="center"
      component="footer"
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={30}
        sx={{
          width: '100%',
          [theme.breakpoints.down('tablet')]: {
            justifyContent: 'flex-start',
            gap: '8px 0',
            '& > *': {
              flex: '0 1 50%',
            },
          },
        }}
      >
        {FOOTER_ITEMS.map((section, index) => (
          <Box key={index}>
            <Link
              color="primary.contrastText"
              key={section.href}
              href={`/${section.href}`}
              underline="hover"
              display="inline-flex"
              fontSize={14}
            >
              {section.label}
            </Link>
          </Box>
        ))}
      </Stack>

      <SocialItem style={styles.social} />

      <Typography textAlign="center" fontSize={14}>
        © 整体なび {new Date().getFullYear()}
      </Typography>
    </Stack>
  );
};

export default Footer;
