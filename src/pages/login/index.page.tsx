import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { TextField } from 'components/Form';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { useMutate, useUser } from 'hooks';
import authQuery from 'models/auth/query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Helper from 'utils/helpers';

import type { LoginFormValues } from './schema';
import schema from './schema';
import styles from './styles';

const LoginPage = () => {
  const [remember, setRemember] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const router = useRouter();
  const { refetch: refetchUser } = useUser({ enabled: false });
  const { mutateAsync: login, isLoading } = useMutate<
    {
      identity: string;
      password: string;
    },
    {
      accessToken: string;
      refreshToken: string;
    }
  >(authQuery.login);

  const handleLogin = (values: LoginFormValues) => {
    login(
      { ...values, identity: values.email.toLowerCase() },
      {
        onSuccess: async (data) => {
          await Helper.setToken(
            {
              ...data,
              rememberLogin: remember ? 'true' : 'false',
            },
            remember,
          );
          await refetchUser();
          router.push('/my-page/reservation');
        },
      },
    );
  };

  return (
    <Stack
      sx={styles.loginFormWrapper}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Typography variant="title" fontSize={24} mb={{ xs: 63, tablet: 32 }}>
        ログイン
      </Typography>
      <TextField
        size="large"
        label="メールアドレス"
        placeholder="メールアドレス"
        name="email"
        control={control}
      />
      <TextField
        size="large"
        label="パスワード"
        placeholder="パスワード"
        name="password"
        control={control}
        type="password"
      />
      <FormControlLabel
        sx={styles.checkboxControlWrapper}
        control={
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            sx={styles.checkboxSx}
          />
        }
        label="ログイン状態を保持"
      />
      <LoadingButton
        size="medium"
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<ArrowRight />}
        loadingPosition="end"
        loading={isLoading}
        sx={styles.submitBtn}
      >
        ログインする
      </LoadingButton>
      <Link href="/register">新規登録はこちら</Link>
    </Stack>
  );
};

LoginPage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default LoginPage;
