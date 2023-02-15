import { ArrowUpward } from '@mui/icons-material';
import { Box, Card, IconButton, Stack } from '@mui/material';
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Header from './Header';
import styles from './styles';

const Footer = dynamic(() => import('./Footer'));
const SideMenu = dynamic(() => import('./SideMenu'));
const Drawer = dynamic(() => import('./CommonDrawer'));

export default function Layout({
  children,
  isCardLayout = false,
  withSideMenu = false,
}: {
  children: ReactNode;
  isCardLayout?: boolean;
  withSideMenu?: boolean;
}) {
  const pageHeight =
    typeof document !== 'undefined' ? document.body.scrollHeight : 0;

  const [opacity, setOpacity] = useState(0);
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

  const renderMainLayout = (content: ReactNode) => {
    if (isCardLayout && withSideMenu) {
      return (
        <Card sx={styles.cardLayout}>
          <Stack direction="row" sx={styles.sideMenuLayoutWrapper}>
            <SideMenu />
            {content}
          </Stack>
        </Card>
      );
    }
    if (isCardLayout) {
      return <Card sx={styles.cardLayout}>{content}</Card>;
    }
    return content;
  };

  return (
    <Box sx={styles.layoutContainer}>
      <Header isCardLayout={isCardLayout} />
      <Box component="main" sx={styles.mainContent} data-card={isCardLayout}>
        {renderMainLayout(children)}
      </Box>
      <Footer />
      <Drawer />
      <IconButton
        sx={[
          ...(Array.isArray(styles.fabButton)
            ? styles.fabButton
            : [styles.fabButton]),
          {
            opacity,
            pointerEvents: opacity === 1 ? 'normal' : 'none',
            transform: `scale(${opacity ? 1 : 0})`,
          },
        ]}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
}
