import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import AreaStationSection from './AreaStationSection';
import BankInfoSection from './BankInfoSection';
import BasicInfoSection from './BasicInfoSection';
import type { ProfileFormValues } from './schema';
import schema from './schema';
import styles from './styles';
import WorkTimeSection from './WorkTimeSection';

interface ProfileFormProps {
  onSubmit: SubmitHandler<ProfileFormValues>;
  initialValues: ProfileFormValues;
  loading?: boolean;
  handleCancel?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialValues,
  loading,
  handleCancel,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
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
      <BasicInfoSection
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <AreaStationSection
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
      />
      <BankInfoSection
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <WorkTimeSection
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
      />
      <Stack sx={styles.actionBtnGroup} gap={20} mt={20}>
        <LoadingButton
          size="medium"
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<ArrowRight />}
          loadingPosition="end"
          loading={loading}
        >
          登録する
        </LoadingButton>
        {handleCancel && (
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={loading}
            startIcon={<ArrowLeft />}
            onClick={handleCancel}
          >
            戻る
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
};

export default ProfileForm;
