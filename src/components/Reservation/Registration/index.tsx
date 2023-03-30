import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useFetch, useMutate, useUser } from 'hooks';
import _pick from 'lodash/pick';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { DATE_LONG_FORMAT, GTM_JP } from 'utils/const';

import BasicInfoForm from './BasicInfoForm';
import type { RegistrationFormValues } from './models/schema';
import schema from './models/schema';
import PriceInfo from './PriceInfo';
import ReservationForm from './ReservationForm';
import styles from './styles';

interface IRegistration {}

const parseTimeIsoString = (value: string, date: string) => {
  const splitValue = value.split(':');
  const result = new Date(date).setHours(
    Number(splitValue[0]) || 0,
    Number(splitValue[1]) || 0,
    0,
  );

  return new Date(
    `${dayjs(result).format(DATE_LONG_FORMAT)} ${GTM_JP}`,
  ).toISOString();
};

const Registration: React.FC<IRegistration> = () => {
  const { data } = useUser();
  const router = useRouter();
  const salonList = data?.salon;
  const [currentMenu, setCurrentMenu] = useState<string | any>(
    router?.query?.menuId,
  );
  const [disabled, setDisabled] = useState(false);

  // Get Salon list
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.getManiplatorList(salonList?.[0]?.salonId),
  );

  // Init value of form
  const defaultParams: {
    customerName: string | any;
    manipulatorId: string | any;
  } = useMemo(() => {
    return {
      customerName: router?.query?.customerName,
      manipulatorId: salonList?.[0]?.salonId,
    };
  }, [router?.query?.customerName, salonList]);

  const isLoadingPage = useMemo(() => {
    return defaultParams;
  }, [defaultParams]);

  const { control, handleSubmit, setValue, getValues } =
    useForm<RegistrationFormValues>({
      resolver: yupResolver(schema),
      mode: 'onBlur',
      defaultValues: {
        date: String(new Date()),
        startTime: '10:00',
        endTime: '13:00',
        ...defaultParams,
      },
    });

  useEffect(() => {
    if (defaultParams) {
      setValue('manipulatorId', defaultParams.manipulatorId);
      setValue('customerName', defaultParams.customerName);
    }
  }, [defaultParams, setValue]);

  const salons = useMemo(() => {
    const salonData = salonList || [];
    const list =
      salonData.map((item) => {
        return { id: item.salonId, name: item.name };
      }) || [];

    return list;
  }, [salonList]);

  const { mutateAsync: handleReservationCompleted, isLoading } = useMutate(
    reservationQuery.reservationRegistration(router?.query?.reservationId),
  );

  const handleOnSubmit: SubmitHandler<RegistrationFormValues> = (
    values: RegistrationFormValues,
  ) => {
    const params = _pick(values, ['menuId', 'startTime', 'endTime']);
    const startTime = parseTimeIsoString(params?.startTime, values?.date);
    const endTime = parseTimeIsoString(params?.endTime, values?.date);

    handleReservationCompleted(
      {
        ...params,
        amount: 0,
        startTime,
        endTime,
      },
      {
        onSuccess: () => {
          setDisabled(true);
          router.push(
            `/my-page/reservation?date=${dayjs(values?.date).format(
              'YYYY-MM-DD',
            )}`,
          );
        },
      },
    );
  };

  const handleChangeMenu = () => {
    const value = getValues('menuId') || router?.query?.menuId;
    setCurrentMenu(value);
  };

  const currentMenuInfo = useMemo(() => {
    const menuData = res?.docs || [];
    const result = menuData.filter((item: any) => item._id === currentMenu);

    return result;
  }, [currentMenu, res?.docs]);

  return (
    <Box
      color={'black'}
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {isLoadingPage ? (
        <>
          <BasicInfoForm control={control} salonList={salons} />
          <ReservationForm
            control={control}
            menu={res?.docs || []}
            onChangeMenu={handleChangeMenu}
          />
          <PriceInfo {...currentMenuInfo?.[0]} />
          <Box sx={styles.buttonBox}>
            <LoadingButton
              size="medium"
              color="primary"
              variant="contained"
              type="submit"
              endIcon={<ArrowRight />}
              loadingPosition="end"
              sx={styles.button}
              loading={isLoading}
              disabled={disabled}
            >
              この内容で予約登録する
            </LoadingButton>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default Registration;
