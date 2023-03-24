import ArrowRight from '@icons/arrow-right.svg';
import IconChat from '@icons/icon_chat.svg';
import HomeLogo from '@icons/logo_home.svg';
import { Box, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles';

const MEDAL_IMAGES = [
  '/images/medal_free.webp',
  '/images/medal_guarantee.webp',
  '/images/medal_creditcard.webp',
];

const TopBanner = () => {
  return (
    <Box component="section" sx={styles.topBannerWrapper}>
      <Image
        src="/images/home_banner.png"
        alt="Banner image"
        fill
        className="top-banner-img"
        quality={80}
      />
      <Stack sx={styles.bannerContent}>
        <HomeLogo />
        <Stack
          direction={{
            xs: 'column-reverse',
            tablet: 'row',
          }}
          alignItems="center"
          justifyContent="space-between"
          gap={22}
          width="100%"
        >
          <Stack
            width="100%"
            alignItems={{
              xs: 'center',
              tablet: 'start',
            }}
            gap={{ xs: 20, tablet: 15 }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<IconChat />}
              endIcon={<ArrowRight />}
              sx={styles.actionBtn}
              className="chat-btn"
            >
              無料相談
            </Button>
            <Button
              variant="contained"
              fullWidth
              endIcon={<ArrowRight />}
              sx={styles.actionBtn}
              href="/login"
              component={Link}
            >
              新規登録・ログイン
            </Button>
          </Stack>
          <Stack direction="row" sx={styles.medalList}>
            {MEDAL_IMAGES.map((url) => (
              <Image
                key={url}
                src={url}
                alt="Medal image"
                className="medal-img"
                width={129}
                height={129}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopBanner;
