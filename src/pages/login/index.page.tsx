import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Container } from '@mui/material';
import { TextField } from 'components/Form';
import Layout from 'components/Layout';
import { useMutate, useUser } from 'hooks';
import type { LoginResponse } from 'models/auth/interface';
import authQuery from 'models/auth/query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Helper from 'utils/helpers';

import type { LoginFormValues } from './schema';
import schema from './schema';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const { replace } = useRouter();
  const { refetch: refetchUser } = useUser({ enabled: false });
  const { mutateAsync: login, isLoading } = useMutate<
    LoginFormValues,
    LoginResponse
  >(authQuery.login);

  const handleLogin = (values: LoginFormValues) => {
    login(
      { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: (data) => {
          Helper.setToken(data.token);
          refetchUser();
          replace('/');
        },
      },
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLogin)}>
      <Container maxWidth="lg">
        <TextField
          size="large"
          label="メールアドレス"
          name="email"
          control={control}
        />
        <TextField
          size="large"
          label="パスワード"
          name="password"
          control={control}
          type="password"
        />
        <LoadingButton
          size="large"
          loading={isLoading}
          color="primary"
          variant="contained"
          type="submit"
        >
          パスワードをリセットする
        </LoadingButton>
      </Container>
    </Box>
  );
};

LoginPage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default LoginPage;
