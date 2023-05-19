import { Box } from '@mui/material';
import type { ISalonInfo } from 'models/reservation/interface';
import type { ICoupon, ICouponTicket } from 'models/tickets/interface';
import { useState } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';

import type { TreatmentFormValues } from '../ReservationTreatment/models/schema';
import ButtonForm from './ButtonForm';
import SwitchForm from './SwitchForm';

interface IReservationForm {
  isLoading?: boolean;
  isSubmitLoading?: boolean;
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
  reservationData: ISalonInfo | TreatmentFormValues | any;
  onBackTreatmentForm: (value: TreatmentFormValues | any) => void;
  treatmentData?: TreatmentFormValues | any;
  couponList?: ICoupon[];
  ticketList?: ICouponTicket[];
  onSubmit?: (callback: () => void) => void;
}

const ReservationForm = ({
  isLoading,
  isSubmitLoading = false,
  isShowTreatment,
  isPaymentConfirmation,
  control,
  initialTreatmentValues,
  reservationData,
  setValue,
  onBackTreatmentForm,
  treatmentData,
  couponList,
  ticketList,
  onSubmit = () => {},
}: IReservationForm) => {
  const [disabled, setDisabled] = useState(false);
  /**
   * isShowTreatment: Show treatment form
   * isPaymentConfirmation: Show on Payment confirmation form
   */

  const handleSubmit = () => {
    onSubmit(() => {
      setDisabled(true);
    });
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
          couponList={couponList}
          ticketList={ticketList}
          isLoading={isLoading}
          treatmentData={treatmentData}
        />
        <ButtonForm
          isShowTreatment={isShowTreatment}
          isPaymentConfirmation={isPaymentConfirmation}
          disabled={disabled}
          treatmentData={treatmentData}
          onBackTreatmentForm={onBackTreatmentForm}
          onSubmit={handleSubmit}
          isLoading={isSubmitLoading}
          status={reservationData?.status}
        />
      </Box>
    </>
  );
};
export default ReservationForm;
