import PaymentDetail from 'components/Reservation/Payment/PaymentDetail';
import ReservationContent from 'components/Reservation/ReservationDetail/ReservationContent';
import ReservationTreatment from 'components/Reservation/ReservationTreatment';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import { useList } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import type { ISalonInfo } from 'models/reservation/interface';
import type {
  ICoupon,
  ICouponTicket,
  ISelectableCoupon,
} from 'models/tickets/interface';
import { useMemo } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { MENU_STATUS, RESERVATION_STATUS } from 'utils/const';

interface ISwitchForm {
  isLoading?: boolean;
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
  reservationData: ISalonInfo | TreatmentFormValues | any;
  treatmentData?: TreatmentFormValues | any;
  couponList?: ICoupon[];
  ticketList?: ICouponTicket[];
}

const SwitchForm = ({
  isLoading,
  isShowTreatment,
  isPaymentConfirmation,
  control,
  initialTreatmentValues,
  setValue,
  reservationData,
  couponList,
  ticketList,
  treatmentData,
}: ISwitchForm) => {
  const { list: res } = useList<IMenu>(
    menuQuery.getManiplatorList(reservationData?.salonInfo?.salonId),
  );

  const menuList = useMemo(() => {
    const data = res || [];
    return data
      .filter((item: IMenu) => item.status === MENU_STATUS.PUBLIC)
      .map((item: IMenu) => {
        return {
          ...item,
          id: item._id,
          name: item.name,
        };
      });
  }, [res]);

  const coupons: ISelectableCoupon[] = useMemo(() => {
    const data = couponList || [];
    return data.map((item) => ({ ...item, id: item.code, name: item.title }));
  }, [couponList]);

  if (reservationData?.status === RESERVATION_STATUS.DONE) {
    return <ReservationContent {...reservationData} />;
  }

  if (isShowTreatment) {
    if (isPaymentConfirmation) {
      const menuUpdatingInfo = res?.find(
        (item: IMenu) => item._id === treatmentData?.menuId,
      );

      const couponData = couponList?.find(
        (coupon) => coupon.code === treatmentData?.couponCode,
      );

      return (
        <PaymentDetail
          {...reservationData}
          initialTreatmentValues={initialTreatmentValues}
          menuUpdatingInfo={menuUpdatingInfo}
          couponData={couponData}
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
        couponList={coupons}
        ticketList={ticketList}
        isLoading={isLoading}
      />
    );
  }
  return <ReservationContent {...reservationData} />;
};

export default SwitchForm;
