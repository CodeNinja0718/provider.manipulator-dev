import PaymentDetail from 'components/Reservation/Payment/PaymentDetail';
import ReservationContent from 'components/Reservation/ReservationDetail/ReservationContent';
import ReservationTreatment from 'components/Reservation/ReservationTreatment';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import { useFetch } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import type { ISalonInfo } from 'models/reservation/interface';
import { useMemo } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { MENU_STATUS, RESERVATION_STATUS } from 'utils/const';

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
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.getManiplatorList(reservationData?.salonInfo?.salonId),
  );

  const menuList = useMemo(() => {
    const data = res?.docs || [];
    return data
      .filter((item: IMenu) => item.status === MENU_STATUS.PUBLIC)
      .map((item: IMenu) => {
        return {
          id: item._id,
          name: item.name,
        };
      });
  }, [res]);

  if (reservationData?.status === RESERVATION_STATUS.DONE) {
    return <ReservationContent {...reservationData} />;
  }

  if (isShowTreatment) {
    if (isPaymentConfirmation) {
      const menuUpdatingInfo = res?.docs
        .filter((item: IMenu) => item._id === initialTreatmentValues.menuId)
        .map((item: IMenu) => {
          return item;
        });

      return (
        <PaymentDetail
          {...reservationData}
          initialTreatmentValues={initialTreatmentValues}
          menuUpdatingInfo={menuUpdatingInfo}
        />
      );
    }

    return (
      <ReservationTreatment
        control={control}
        {...reservationData}
        initialTreatmentValues={initialTreatmentValues}
        setValue={setValue}
        menuList={menuList}
      />
    );
  }
  return <ReservationContent {...reservationData} />;
};

export default SwitchForm;
