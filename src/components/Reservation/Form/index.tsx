import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import BackButton from 'components/BackButton';
import CustomerDetail from 'components/Reservation/ReservationDetail/CustomerDetail';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import schema from 'components/Reservation/ReservationTreatment/models/schema';
import { useFetch, useList, useMutate, useUser } from 'hooks';
import type { IReservationItem } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import type { ICoupon, ICouponTicket } from 'models/tickets/interface';
import ticketQuery from 'models/tickets/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RESERVATION_STATUS } from 'utils/const';
import Helper from 'utils/helpers';

import ReservationForm from './ReservationForm';
import styles from './styles';

const Form = () => {
  const [isPaymentConfirmation, setIsPaymentConfirmation] = useState(false);
  const [treatmentData, setTreatmentData] = useState<TreatmentFormValues | any>(
    null,
  );

  const router = useRouter();
  const { data: user } = useUser();
  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.reservationDetail({
      id: router?.query?.reservationId,
      manipulatorId: user?._id,
      salonId: user?.salon[0]?.salonId,
    }),
  );

  const { list: couponList, isLoading: isCouponLoading } = useList<ICoupon>(
    ticketQuery.getCustomerCoupons({
      customerId: res?.customerId || '',
      type: 'Public',
    }),
  );

  const { list: ticketList, isLoading: isTicketLoading } =
    useList<ICouponTicket>(
      ticketQuery.getCustomerTickets({
        customerId: res?.customerId || '',
      }),
    );

  const {
    mutateAsync: handleReservationCompleted,
    isLoading: isSubmitLoading,
  } = useMutate(
    reservationQuery.reservationComplete(router?.query?.reservationId),
  );

  const {
    mutateAsync: handleReservationChange,
    isLoading: isBookingChangeLoading,
  } = useMutate(
    reservationQuery.reservationChange(router?.query?.reservationId),
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
          ticketUsed: res?.ticketUsed,
          couponInfo: couponList?.find(
            (coupon) => coupon.code === res?.couponInfo?.code,
          ),
        };

  const initialTreatmentValues: TreatmentFormValues = {
    price: treatmentData?.price || res?.plan?.menuInfo?.price || 0,
    treatmentInfo:
      treatmentData?.treatmentInfo || res?.treatmentInfo?.treatmentInfo || '',
    menuId: treatmentData?.menuId || res?.plan?.menuId,
    treatmentFile:
      treatmentData?.treatmentFile || res?.treatmentInfo?.treatmentFile || [],
    couponCode: treatmentData?.couponCode || res?.couponInfo?.code || '',
    priceType:
      treatmentData?.priceType ||
      (res?.ticketUsed ? 'ticket' : 'one-shot') ||
      'one-shot',
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

  const handleCompleteForm = (callback: () => void) => {
    const priceType = initialTreatmentValues?.priceType || 'one-shot';
    const menuId = initialTreatmentValues?.menuId;

    if (!menuId) {
      return;
    }

    const priceParams = (() => {
      if (priceType === 'ticket') {
        if (menuId === res?.plan.menuId && !!res?.ticketUsed) {
          return {};
        }

        return {
          ticketId: ticketList?.find((ticket) => ticket.menuId === menuId)
            ?.ticketId,
          ticketUse: 1,
        };
      }

      if (
        menuId === res?.plan.menuId &&
        res?.couponInfo?.code === initialTreatmentValues?.couponCode
      ) {
        return {};
      }

      return {
        amount: initialTreatmentValues?.price || 0,
        ...(!!initialTreatmentValues?.couponCode && {
          couponCode: initialTreatmentValues?.couponCode,
        }),
      };
    })();

    const file = initialTreatmentValues?.treatmentFile?.[0];
    const treatmentFileData = file
      ? {
          treatmentFile: {
            name: file?.originalName || '',
            objectKey: file?.key || '',
          },
        }
      : {};
    const registrationParams = {
      menuId: initialTreatmentValues?.menuId,
      reservationId: router?.query?.reservationId,
      customerName: res?.customerInfo?.name || '',
    };

    handleReservationChange(
      {
        menuId: initialTreatmentValues?.menuId,
        ...priceParams,
        treatmentInfo: initialTreatmentValues?.treatmentInfo,
        ...treatmentFileData,
      },
      {
        onSuccess: () => {
          handleReservationCompleted(
            {
              menuId: initialTreatmentValues?.menuId,
              treatmentInfo: initialTreatmentValues?.treatmentInfo,
              ...treatmentFileData,
            },
            {
              onSuccess: () => {
                callback();
                router.push(
                  `${Helper.parseURLByParams(
                    registrationParams,
                    `/my-page/reservation/complete-payment`,
                  )}`,
                );
              },
            },
          );
        },
      },
    );
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
            isSubmitLoading={isSubmitLoading || isBookingChangeLoading}
            couponList={couponList}
            ticketList={ticketList}
            isLoading={isCouponLoading || isTicketLoading}
            onSubmit={handleCompleteForm}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Form;
