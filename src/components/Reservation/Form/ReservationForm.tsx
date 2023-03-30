import { Box } from '@mui/material';
import { useMutate } from 'hooks';
import _omit from 'lodash/omit';
import type { ICustomerInfo, ISalonInfo } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import Helper from 'utils/helpers';

import type { TreatmentFormValues } from '../ReservationTreatment/models/schema';
import ButtonForm from './ButtonForm';
import SwitchForm from './SwitchForm';

interface IReservationForm {
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
  reservationData: ISalonInfo | TreatmentFormValues | any;
  onBackTreatmentForm: (value: TreatmentFormValues | any) => void;
  treatmentData?: TreatmentFormValues | any;
  customerInfo: ICustomerInfo;
}

const ReservationForm = ({
  isShowTreatment,
  isPaymentConfirmation,
  control,
  initialTreatmentValues,
  reservationData,
  setValue,
  onBackTreatmentForm,
  treatmentData,
  customerInfo,
}: IReservationForm) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  /**
   * isShowTreatment: Show treatment form
   * isPaymentConfirmation: Show on Payment confirmation form
   */
  const { mutateAsync: handleReservationCompleted, isLoading } = useMutate(
    reservationQuery.reservationComplete(router?.query?.reservationId),
  );

  const handleSubmit = () => {
    const params = _omit(initialTreatmentValues, ['treatmentFile']);
    const file = initialTreatmentValues?.treatmentFile?.[0];
    const registrationParams = {
      amount: 0,
      menuId: initialTreatmentValues?.menuId,
      reservationId: router?.query?.reservationId,
      customerName: customerInfo?.name || '',
    };

    handleReservationCompleted(
      {
        ...params,
        amount: 0,
        treatmentFile: {
          name: file?.originalName || '',
          objectKey: file?.key || '',
        },
      },
      {
        onSuccess: () => {
          setDisabled(true);
          router.push(
            `${Helper.parseURLByParams(
              registrationParams,
              `/my-page/reservation/complete-payment`,
            )}`,
          );
        },
      },
    );
  };

  return (
    <>
      <Box mt={isShowTreatment ? 0 : 40} width="100%">
        {/* Customer Info */}
        <SwitchForm
          isShowTreatment={isShowTreatment}
          isPaymentConfirmation={isPaymentConfirmation}
          control={control}
          initialTreatmentValues={initialTreatmentValues}
          setValue={setValue}
          reservationData={reservationData}
        />
        <ButtonForm
          isShowTreatment={isShowTreatment}
          isPaymentConfirmation={isPaymentConfirmation}
          disabled={disabled}
          treatmentData={treatmentData}
          onBackTreatmentForm={onBackTreatmentForm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          status={reservationData?.status}
        />
      </Box>
    </>
  );
};
export default ReservationForm;
