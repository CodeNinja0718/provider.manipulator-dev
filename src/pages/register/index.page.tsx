import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { TextField } from 'components/Form';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { useMutate } from 'hooks';
import authQuery from 'models/auth/query';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { RegisterFormValues } from './schema';
import schema from './schema';
import styles from './styles';

const RegisterPage = () => {
  const {
    mutateAsync: handeSendEmail,
    isLoading,
    isSuccess,
    reset,
  } = useMutate<RegisterFormValues>(authQuery.sendVerifyEmail);

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnSubmit: SubmitHandler<RegisterFormValues> = (
    values: RegisterFormValues,
  ) => {
    handeSendEmail(values);
  };

  const handleOnBack = () => {
    reset();
  };

  if (isSuccess) {
    return (
      <Stack sx={styles.registerFormWrapper} alignItems="center">
        <Typography variant="title" fontSize={24}>
          新規登録メール送信完了
        </Typography>
        <Typography
          fontSize={18}
          fontWeight="bold"
          textAlign="center"
          mb={56}
          mt={66}
        >
          メールに記載のURLから
          <br />
          新規登録を続けてください
        </Typography>
        <Typography
          color="primary"
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={handleOnBack}
        >
          {'< メールアドレスを再入力する'}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      sx={styles.registerFormWrapper}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Typography variant="title" fontSize={24} mb={{ xs: 54, tablet: 32 }}>
        新規登録
      </Typography>
      <TextField
        label="電話番号で登録"
        name="email"
        control={control}
        placeholder="sample@service.com"
      />
      <Typography
        fontSize={16}
        mt={{ xs: 0, tablet: 4 }}
        mb={{ xs: 24, tablet: 32 }}
      >
        会員登録することで、整体なびの<Link href="/">利用規約</Link>
        および<Link href="/">プライバシーポリシー</Link>に同意するものとします。
      </Typography>
      <LoadingButton
        size="medium"
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<ArrowRight />}
        loadingPosition="end"
        sx={styles.submitBtn}
        loading={isLoading}
      >
        同意して登録する
      </LoadingButton>
      <Link href="/login">ログインはこちら</Link>
    </Stack>
  );
};

RegisterPage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default RegisterPage;
