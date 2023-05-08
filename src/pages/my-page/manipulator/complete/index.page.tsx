import ArrowRight from '@icons/arrow-right.svg';
import ListSvg from '@icons/icon_list.svg';
import { Button, Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import { useUser } from 'hooks';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import styles from './styles';

const ProfileCompletionPage = () => {
  const { data } = useUser();
  const salonList = data?.salon;
  const currentSalonId = useMemo(() => {
    return salonList?.[0]?.salonId || '';
  }, [salonList]);
  const router = useRouter();

  const goRegisterMenuScreen = () => {
    router.push({
      pathname: `/my-page/menu/register/${currentSalonId}`,
    });
  };

  const goAddManipulatorScreen = () => {
    router.push({
      pathname: '/my-page/manipulator/register',
    });
  };

  const goManipulatorListScreen = () => {
    router.push({
      pathname: '/my-page/manipulator',
    });
  };

  return (
    <Stack alignItems={'center'} sx={styles.profileCompletionContainer}>
      <Typography variant="title" fontSize={24} mb={{ xs: 32, tablet: 40 }}>
        整体師登録完了
      </Typography>
      <Typography
        fontSize={22}
        mb={{ xs: 64, tablet: 80 }}
        color={'secondary.main'}
        fontWeight={'bold'}
      >
        登録しました
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
          endIcon={<ArrowRight />}
          sx={styles.btn}
          onClick={goRegisterMenuScreen}
        >
          メニュー登録する
        </Button>
        <Button
          size="medium"
          variant="outlined"
          endIcon={<ArrowRight />}
          sx={styles.btn}
          onClick={goAddManipulatorScreen}
        >
          続けて整体師を登録する
        </Button>
      </Stack>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        gap={15}
        sx={styles.menuBtn}
        onClick={goManipulatorListScreen}
        mt={15}
      >
        <ListSvg />
        <Typography marginBottom={4} fontWeight={'bold'}>
          整体師一覧へ
        </Typography>
      </Stack>
    </Stack>
  );
};

ProfileCompletionPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout withSideMenu isCardLayout>
      {page}
    </Layout>
  );
};

export default ProfileCompletionPage;
