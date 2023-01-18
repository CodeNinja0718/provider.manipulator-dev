import { ArrowUpward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { tabletDown } from 'styles/theme';

import styles from './styles';

const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

export default function Layout({
  children,
  showFooter = true,
}: {
  children: ReactNode;
  showFooter?: boolean;
}) {
  const pageHeight =
    typeof document !== 'undefined' ? document.body.scrollHeight : 0;

  const [opacity, setOpacity] = useState(0);
  const [bottom] = useState(24);
  const { scrollY } = useScroll({
    offset: ['0px start', `${pageHeight - 67}px end`],
  });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > document.documentElement.clientHeight) {
        setOpacity(1);
      } else setOpacity(0);
    });
  }, [scrollY]);

  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <Box
        component="main"
        sx={{
          ...styles.main,
          minHeight: {
            xs: `calc(100vh - 136px)`,
            tablet: showFooter ? `calc(100vh - 273px)` : `calc(100vh - 77px)`,
          },
          [tabletDown]: {
            minHeight: showFooter
              ? `calc(100vh - 273px)`
              : `calc(100vh - 77px)`,
          },
        }}
      >
        {children}
      </Box>

      <IconButton
        sx={
          [
            styles.fabButton,
            {
              opacity,
              pointerEvents: opacity === 1 ? 'normal' : 'none',
              bottom,
              transform: `scale(${opacity ? 1 : 0})`,
            },
          ] as never
        }
        color="primary"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <ArrowUpward />
      </IconButton>
      {showFooter && <Footer />}
    </div>
  );
}
