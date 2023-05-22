import ArrowRight from '@icons/arrow-right.svg';
import { Button, Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './styles';

const ProfileCompletionPage = () => {
  const router = useRouter();

  const goAddManipulatorScreen = () => {
    router.push({
      pathname: '/my-page/manipulator/register',
    });
  };

  const goHomeScreen = () => {
    router.push({
      pathname: '/',
    });
  };

  return (
    <Stack alignItems={'center'} sx={styles.profileCompletionContainer}>
      <Typography variant="title" fontSize={24} mb={{ xs: 32, tablet: 40 }}>
        登録完了
      </Typography>
      <Typography
        fontSize={22}
        mb={{ xs: 64, tablet: 80 }}
        color={'secondary.main'}
        fontWeight={'bold'}
      >
        登録ありがとうございます
      </Typography>

      <Stack
        alignItems={'center'}
        flexDirection={'column'}
        alignSelf={'stretch'}
      >
        <Button
          size="medium"
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<ArrowRight />}
          sx={styles.btn}
          onClick={goAddManipulatorScreen}
        >
          整体師を登録する
        </Button>
        <Button
          size="medium"
          variant="outlined"
          type="submit"
          endIcon={<ArrowRight />}
          sx={styles.btn}
          onClick={goHomeScreen}
        >
          ホームへ
        </Button>
      </Stack>
    </Stack>
  );
};

ProfileCompletionPage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default ProfileCompletionPage;
