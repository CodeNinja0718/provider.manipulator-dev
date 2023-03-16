import PaymentDetail from 'components/Reservation/Payment/PaymentDetail';
import ReservationContent from 'components/Reservation/ReservationDetail/ReservationContent';
import ReservationTreatment from 'components/Reservation/ReservationTreatment';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import type { ISalonInfo } from 'models/reservation/interface';
import type { Control, UseFormSetValue } from 'react-hook-form';

interface ISwitchForm {
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
  reservationData: ISalonInfo | TreatmentFormValues | any;
  treatmentData?: TreatmentFormValues | any;
}

const SwitchForm = ({
  isShowTreatment,
  isPaymentConfirmation,
  control,
  initialTreatmentValues,
  setValue,
  reservationData,
}: ISwitchForm) => {
  if (isShowTreatment) {
    if (isPaymentConfirmation) {
      return (
        <PaymentDetail
          {...reservationData}
          initialTreatmentValues={initialTreatmentValues}
        />
      );
    }

    return (
      <ReservationTreatment
        control={control}
        {...reservationData}
        initialTreatmentValues={initialTreatmentValues}
        setValue={setValue}
      />
    );
  }
  return <ReservationContent {...reservationData} />;
};

export default SwitchForm;
