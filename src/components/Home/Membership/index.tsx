import ArrowRight from '@icons/arrow-right.svg';
import IconChat from '@icons/icon_chat.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles';

const Feature = () => {
  return (
    <Box component="section" sx={styles.membershipWrapper}>
      <Stack component="section" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          gap={{ xs: 12, tablet: 20 }}
          mb={{ xs: 18, tablet: 23 }}
        >
          <Image
            src="/images/medal_free.webp"
            alt="Medal img"
            width={84}
            height={84}
            className="medal-img"
          />
          <Box>
            <Typography
              fontSize={{ xs: 20, tablet: 27 }}
              color="black"
              sx={styles.title}
            >
              <span>登録無料</span>でかんたん集客!
            </Typography>
            <Typography
              fontSize={{ xs: 20, tablet: 27 }}
              color="black"
              fontWeight="bold"
            >
              整体なびを試してみよう!
            </Typography>
          </Box>
        </Stack>
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
          component={Link}
          fullWidth
          href="/login"
          endIcon={<ArrowRight />}
          sx={styles.actionBtn}
        >
          新規登録・ログイン
        </Button>
      </Stack>
    </Box>
  );
};

export default Feature;
