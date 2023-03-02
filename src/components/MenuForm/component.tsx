import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import MenuDetailSection from './Form/MenuDetailSection';
// import StaffSection from './Form/StaffSection';
import type { MenuFormValues } from './models/schema';
import schema from './models/schema';
import styles from './styles';

const Component = ({
  onSubmit,
  initialValues,
  loading = false,
}: {
  onSubmit: SubmitHandler<MenuFormValues>;
  initialValues: MenuFormValues;
  loading: boolean;
}) => {
  const [timeDisplay, setTimeDisplay] = useState(initialValues.timeDisplay);
  const { control, handleSubmit } = useForm<MenuFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー登録・編集</Typography>
      </Box>
      <Box sx={styles.sectionWrapper}>
        <Stack
          width="100%"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit((value) =>
            onSubmit({ ...value, timeDisplay }),
          )}
        >
          {/* Menu detail */}
          <MenuDetailSection
            control={control}
            initialValues={initialValues}
            timeDisplay={timeDisplay || false}
            onSetTimeDisplay={setTimeDisplay}
          />

          {/* Staff */}
          {/* <StaffSection control={control} /> */}

          <LoadingButton
            size="medium"
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<ArrowRight />}
            loadingPosition="end"
            sx={styles.submitBtn}
            loading={loading}
          >
            確認する
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Component;
