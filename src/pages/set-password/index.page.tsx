import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { TextField } from 'components/Form';
import HelperText from 'components/Form/HelperText';
import Layout from 'components/Layout';
import { useMutate } from 'hooks';
import { isEmpty } from 'lodash';
import authQuery from 'models/auth/query';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { SetPasswordFormValues } from './schema';
import schema from './schema';
import styles from './styles';

const SetPasswordPage = ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const router = useRouter();
  const { owner } = router.query;
  const isOwner = typeof owner === 'string' && owner === 'true';

  const { mutateAsync: handleRegister, isLoading: isRegisterLoading } =
    useMutate<{
      email: string;
      password: string;
      token: string;
    }>(authQuery.register);

  const { mutateAsync: handleSetPassword, isLoading: isSetPasswordLoading } =
    useMutate<{
      password: string;
      token: string;
    }>(authQuery.setPassword);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnSubmit: SubmitHandler<SetPasswordFormValues> = (values) => {
    if (isOwner) {
      handleRegister(
        {
          token,
          email,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.replace('/login');
          },
        },
      );
    } else {
      handleSetPassword(
        {
          token,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.replace('/login');
          },
        },
      );
    }
  };

  return (
    <Stack
      sx={styles.setPasswordFormWrapper}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Typography variant="title" fontSize={24} mt={26} mb={32}>
        パスワードを変更する
      </Typography>
      <TextField
        label="新しいパスワード"
        name="password"
        control={control}
        placeholder="新しいパスワードを入力"
        type="password"
      />
      <TextField
        label="新しいパスワード（確認）"
        name="confirmPassword"
        control={control}
        placeholder="新しいパスワード（確認）を入力"
        type="password"
      />
      {isEmpty(errors) && (
        <List sx={styles.passwordTextRule}>
          <ListItem>
            <ListItemText primary="最低8文字" />
          </ListItem>
          <ListItem>
            <ListItemText primary="小文字と大文字ともに1文字以上" />
          </ListItem>
          <ListItem>
            <ListItemText primary="数字か記号のどちからを1文字以上" />
          </ListItem>
        </List>
      )}
      <List sx={styles.passwordTextRule}>
        {errors?.password?.message
          ? errors.password.message.split('\n').map((str, index) => (
              <ListItem key={`paddword-error-${index}`}>
                <HelperText error={str} fixed={!!str} />
              </ListItem>
            ))
          : errors?.confirmPassword?.message &&
            errors.confirmPassword.message
              .split('\n')
              .map((confirmStr, index) => (
                <ListItem key={`passwordConfirm-error-${index}`}>
                  <HelperText error={confirmStr} fixed={!!confirmStr} />
                </ListItem>
              ))}
      </List>
      <LoadingButton
        size="medium"
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<ArrowRight />}
        loadingPosition="end"
        sx={styles.submitBtn}
        loading={isRegisterLoading || isSetPasswordLoading}
      >
        情報更新する
      </LoadingButton>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { token, email } = query;
    if (
      !token ||
      !email ||
      typeof token !== 'string' ||
      typeof email !== 'string'
    ) {
      return {
        notFound: true,
      };
    }
    // Verify token before entering page
    // await api.post('VERIFY_TOKEN_URL', { token });
    return {
      props: {
        token,
        email: email.replace(/\s/g, '+'),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

SetPasswordPage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default SetPasswordPage;
