import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

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
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialValues,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
  });

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
        確認画面へ
      </LoadingButton>
    </Stack>
  );
};

export default ProfileForm;
