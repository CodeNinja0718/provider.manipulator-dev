import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import BackButton from 'components/BackButton';
import CustomerDetail from 'components/Reservation/ReservationDetail/CustomerDetail';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import schema from 'components/Reservation/ReservationTreatment/models/schema';
import { useFetch } from 'hooks';
import type { IReservationItem } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RESERVATION_STATUS } from 'utils/const';

import ReservationForm from './ReservationForm';
import styles from './styles';

const Form = () => {
  const [isPaymentConfirmation, setIsPaymentConfirmation] = useState(false);
  const [treatmentData, setTreatmentData] = useState<TreatmentFormValues | any>(
    null,
  );

  const router = useRouter();
  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.reservationDetail(router?.query?.reservationId),
  );

  const isShowTreatment = useMemo(() => {
    return router?.query?.isShowTreatment;
  }, [router]);

  // Reset Payement confirm
  useEffect(() => {
    if (!!isShowTreatment && isShowTreatment) setIsPaymentConfirmation(false);
  }, [isShowTreatment]);

  const renderTitleText = () => {
    if (res?.status === RESERVATION_STATUS.DONE) return '予約詳細';
    if (isPaymentConfirmation) return '決済';
    if (isShowTreatment) return '施術完了';
    return '予約詳細';
  };

  const reservationData =
    isShowTreatment && !isPaymentConfirmation
      ? {
          salonInfo: res?.salonInfo,
          status: res?.status,
        }
      : {
          ...res?.result,
          startTime: res?.startTime,
          endTime: res?.endTime,
          salonInfo: res?.salonInfo,
          status: res?.status,
        };
  const initialTreatmentValues = {
    price: treatmentData?.price || res?.plan?.menuInfo?.price,
    treatmentInfo:
      treatmentData?.treatmentInfo || res?.treatmentInfo?.treatmentInfo || '',
    menuId: treatmentData?.menuId || res?.plan?.menuId,
    treatmentFile:
      treatmentData?.treatmentFile || res?.treatmentInfo?.treatmentFile || [],
  };

  const { control, handleSubmit, setValue } = useForm<TreatmentFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialTreatmentValues,
  });

  const handleSubmitTreatmentForm = (value: TreatmentFormValues) => {
    if (value) {
      setIsPaymentConfirmation(true);
      setTreatmentData(value);
    }
  };

  const handleBackTreatmentForm = (value: TreatmentFormValues) => {
    setIsPaymentConfirmation(false);
    setTreatmentData(value);
  };

  return (
    <Box sx={styles.reservationDetailWrapper}>
      {!isShowTreatment && (
        <Box sx={styles.backButtonBox}>
          <BackButton />
        </Box>
      )}
      <Box display="flex" justifyContent="center" sx={styles.title}>
        <Typography variant="title">{renderTitleText()}</Typography>
      </Box>

      <Box display="flex" flexDirection="column" sx={styles.contentBox}>
        {/* Customer Info */}
        <Box>
          <CustomerDetail {...res?.customerInfo} />
        </Box>

        {/* Reservation Info/ Treatment Info/ Confirm Payment */}
        <Stack
          width="100%"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit((value) => {
            handleSubmitTreatmentForm(value);
          })}
        >
          <ReservationForm
            isShowTreatment={isShowTreatment}
            isPaymentConfirmation={isPaymentConfirmation}
            control={control}
            setValue={setValue}
            reservationData={reservationData}
            initialTreatmentValues={initialTreatmentValues}
            onBackTreatmentForm={handleBackTreatmentForm}
            treatmentData={treatmentData}
            customerInfo={res?.customerInfo}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Form;
