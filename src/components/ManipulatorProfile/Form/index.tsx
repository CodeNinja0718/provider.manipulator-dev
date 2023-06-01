import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import BasicInfoSection from 'components/ManipulatorProfile/Form/BasicInfoSection';
import ProfileSection from 'components/ManipulatorProfile/Form/ProfileSection';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import SymptomsSection from 'components/ManipulatorProfile/Form/SymptomsSection';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import schema from './schema';
import styles from './styles';
import WorkTimeSection from './WorkTimeSection';

interface ProfileFormProps {
  initialValues: ManipulatorProfileValues;
  onSubmit: SubmitHandler<ManipulatorProfileValues>;
  isEditScreen?: boolean;
  onCancel?: () => void;
}

const ManipulatorProfile = ({
  onSubmit,
  onCancel,
  initialValues,
  isEditScreen = false,
}: ProfileFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ManipulatorProfileValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Stack
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      gap={8}
      sx={styles.profileFormWrapper}
    >
      <Stack sx={styles.sectionContentWrapper}>
        <BasicInfoSection control={control} isEditScreen={isEditScreen} />
        <ProfileSection control={control} initialValues={initialValues} />
        <SymptomsSection control={control} />

        <WorkTimeSection
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
      </Stack>

      <Stack spacing={20}>
        <LoadingButton
          size="medium"
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<ArrowRight />}
          loadingPosition="end"
          sx={styles.button}
        >
          確認画面へ
        </LoadingButton>
        {onCancel && (
          <LoadingButton
            variant="outlined"
            sx={styles.button}
            startIcon={<ArrowLeft />}
            onClick={onCancel}
          >
            戻る
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
};
export default ManipulatorProfile;
