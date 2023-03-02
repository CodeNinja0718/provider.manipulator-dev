import ArrowRight from '@icons/arrow-right.svg';
import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { useMutate } from 'hooks';
import _omit from 'lodash/omit';
import menuQuery from 'models/menu/query';
import { useRouter } from 'next/router';
import useInitValue from 'pages/my-page/menu/hook/useInitValue';
import { useMemo, useState } from 'react';
import {
  // AVAILABEL_STAFF,
  MENU_INFO,
  MENU_STATUS_LIST,
  MENU_TYPE,
} from 'utils/const';
import Helper from 'utils/helpers';

import RowItem from './RowItem';
import styles from './styles';

const MenuReview = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const currentSalonId = useMemo(() => {
    return router?.query?.slug || '';
  }, [router]);
  const { mutateAsync: handleCreateMenu, isLoading } = useMutate(
    menuQuery.createMenu(currentSalonId),
  );
  const initialValues = useInitValue();
  // const handleCouponTicketFee = (ticketMount: number, ticketPrice: number) => {
  //   const value = ticketMount * ticketPrice;
  //   return `${Helper.addComma(value)}円 (${ticketMount}枚 x ${Helper.addComma(
  //     ticketPrice,
  //   )}円)`;
  // };

  const handleGetStatus = (value: string) => {
    const status = MENU_STATUS_LIST.filter((item) => item.id === value).map(
      (item) => {
        return item.name;
      },
    );
    return status;
  };

  const menuTypesList = useMemo(() => {
    const data = initialValues?.menuTypes || [];
    const value =
      MENU_TYPE.filter((item) => data.includes(item.id)).map((item) => {
        return item.name;
      }) || [];
    return value;
  }, [initialValues]);

  // const availabelStaff = useMemo(() => {
  //   const data = initialValues?.availabelStaff || [];
  //   const value =
  //     AVAILABEL_STAFF.filter((item) => data.includes(item.id)).map((item) => {
  //       return item.name;
  //     }) || [];
  //   return value;
  // }, [initialValues]);

  const handleSubmit = () => {
    const data = {
      ..._omit(initialValues, [
        'availabelStaff',
        'couponExpirationDate',
        'ticketMount',
        'ticketPrice',
      ]),
      tiket: {
        price: initialValues?.ticketPrice || 0,
        amout: initialValues?.ticketMount || 0,
      },
      manipulatorIds: [router?.query?.manipulatorIds].filter(Boolean),
      currency: router?.query?.currency,
    };

    handleCreateMenu(
      {
        ...data,
      },
      {
        onSuccess: () => {
          setDisabled(true);
          router.replace('/my-page/menu');
        },
      },
    );
  };

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー登録・編集</Typography>
      </Box>
      <Box sx={styles.sectionWrapper}>
        <CommonSection title="メニュー詳細">
          <RowItem label={MENU_INFO.NAME}>{initialValues?.name}</RowItem>
          <RowItem label={MENU_INFO.ORDER_SHORT}>
            {initialValues?.order}
          </RowItem>
          <RowItem label={MENU_INFO.ESTIMATED_TIME}>
            {initialValues?.estimatedTime}
          </RowItem>
          <RowItem label="メニュー種別">
            <Box sx={styles.horizontalBox} className="no-wrap">
              {menuTypesList.map((item, index) => (
                <FormControlLabel
                  key={`menutype-${index}`}
                  className="checkboxControlWrapper"
                  label={item}
                  control={
                    <Checkbox
                      icon={<UnCheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                      checked
                      readOnly
                    />
                  }
                />
              ))}
            </Box>
          </RowItem>
          <RowItem label={MENU_INFO.PRICE}>{`${Helper.addComma(
            initialValues?.price,
          )}円`}</RowItem>
          {/* Field for Ticket/ Coupon */}
          {/* <RowItem label="回数券料金">
            {handleCouponTicketFee(
              initialValues?.ticketMount,
              initialValues?.ticketPrice,
            )}
          </RowItem>
          <RowItem label="回数券の有効期限">
            {`${initialValues?.couponExpirationDate}か月`}
          </RowItem> */}
          <RowItem label={MENU_INFO.PUBLISH_STATUS} customItemRow="borderNone">
            {handleGetStatus(initialValues?.status)}
          </RowItem>
        </CommonSection>
        {/* <CommonSection title="メニュー詳細">
          <RowItem customItemRow="borderNone">
            <Box sx={styles.horizontalBox}>
              {availabelStaff.map((item, index) => (
                <FormControlLabel
                  key={`availabel-staff-${index}`}
                  className="checkboxControlWrapper"
                  label={item}
                  control={
                    <Checkbox
                      icon={<UnCheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                      checked
                      readOnly
                    />
                  }
                />
              ))}
            </Box>
          </RowItem>
        </CommonSection> */}

        <LoadingButton
          size="medium"
          color="primary"
          variant="contained"
          endIcon={<ArrowRight />}
          loadingPosition="end"
          sx={styles.submitBtn}
          onClick={handleSubmit}
          loading={isLoading}
          disabled={disabled}
        >
          確認する
        </LoadingButton>
      </Box>
    </Box>
  );
};
export default MenuReview;
