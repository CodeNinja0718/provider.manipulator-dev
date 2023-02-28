import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MENU_TYPE } from 'utils/const';

const useInitValue = () => {
  const router = useRouter();
  const initValue = useMemo(() => {
    const defaultValue = {
      name: router?.query?.name ? String(router.query.name) : '',
      order: router?.query?.order ? Number(router?.query?.order) : 0,
      estimatedTime: router?.query?.estimatedTime
        ? Number(router?.query?.estimatedTime)
        : 0,
      menuTypes: router?.query?.menuTypes
        ? String(router?.query?.menuTypes).split(',')
        : [MENU_TYPE[0]?.id],
      price: router?.query?.price ? Number(router?.query?.price) : 0,
      ticketMount: router?.query?.ticketMount
        ? Number(router?.query?.ticketMount)
        : 0,
      ticketPrice: router?.query?.ticketPrice
        ? Number(router?.query?.ticketPrice)
        : 0,
      couponExpirationDate: router?.query?.couponExpirationDate
        ? Number(router?.query?.couponExpirationDate)
        : 0,
      status: router?.query?.status ? String(router.query.status) : 'public',
      timeDisplay: router?.query?.timeDisplay
        ? Boolean(router?.query?.timeDisplay)
        : false,
      availabelStaff: router?.query?.availabelStaff
        ? String(router?.query?.availabelStaff).split(',')
        : [],
    };
    return defaultValue;
  }, [router]);

  return initValue;
};
export default useInitValue;
