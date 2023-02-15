import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { TextField } from 'components/Form';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CompleteProfileFormValues } from './schema';
import schema from './schema';
import SectionWrapper from './SectionWrapper';
import styles from './styles';

const ProfileComponent = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: SubmitHandler<CompleteProfileFormValues>;
  initialValues: CompleteProfileFormValues;
}) => {
  const { control, handleSubmit } = useForm<CompleteProfileFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  return (
    <Box>
      <Box sx={styles.wrapper}>
        <Stack
          width="100%"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="title">整体師登録</Typography>
          <Box sx={styles.container} width="inherit">
            {/* Section Chiropractic */}
            <SectionWrapper title="整体院情報">
              <TextField
                label="氏名"
                name="name"
                control={control}
                placeholder="氏名"
                required
              />
            </SectionWrapper>
            {/* Section Account Information */}
            <SectionWrapper title="口座情報">
              <Box>This is text</Box>
            </SectionWrapper>
            {/* Section Business Hours */}
            <SectionWrapper title="営業時間">
              <Box>This is text</Box>
            </SectionWrapper>
          </Box>

          <LoadingButton
            size="medium"
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<ArrowRight />}
            loadingPosition="end"
            sx={styles.submitBtn}
          >
            変更する
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileComponent;
