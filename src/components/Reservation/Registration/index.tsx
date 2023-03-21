import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import BasicInfoForm from './BasicInfoForm';
import type { RegistrationFormValues } from './models/schema';
import schema from './models/schema';
import PriceInfo from './PriceInfo';
import ReservationForm from './ReservationForm';
import styles from './styles';

interface IRegistration {}

const Registration: React.FC<IRegistration> = () => {
  const { control, handleSubmit } = useForm<RegistrationFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {},
  });
  const handleOnSubmit: SubmitHandler<RegistrationFormValues> = (
    values: RegistrationFormValues,
  ) => {
    console.log('valuesvalues', values);
  };
  return (
    <Box
      color={'black'}
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <BasicInfoForm control={control} />
      <ReservationForm control={control} />
      <PriceInfo />
      <Box sx={styles.buttonBox}>
        <LoadingButton
          size="medium"
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<ArrowRight />}
          loadingPosition="end"
          sx={styles.button}
        >
          この内容で予約登録する
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default Registration;
