import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import { useMutate, useUser } from 'hooks';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import menuQuery from 'models/menu/query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { CURRENCY, MENU_INFO, MENU_STATUS_LIST, MENU_TYPE } from 'utils/const';
import Helper from 'utils/helpers';
import queryClient from 'utils/queryClient';

import RowItem from './RowItem';
import styles from './styles';

interface MenuReviewProps {
  menuData: MenuFormValues;
}
const MenuReview = ({ menuData }: MenuReviewProps) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const currentSalonId = useMemo(() => {
    return router?.query?.slug || '';
  }, [router]);
  const { mutateAsync: handleCreateMenu, isLoading } = useMutate(
    menuQuery.createMenu(currentSalonId),
  );

  useUser({ enabled: false });

  const currentUserQuery = queryClient
    .getQueryCache()
    .findAll(['currentUser'])
    .map((each) => {
      return each?.state?.data;
    });

  const menuTypeList = menuData.menuTypes || [];
  const isCouponEnabled = menuTypeList.includes(MENU_TYPE[1]?.id);
  const isOnlyTicket = isCouponEnabled && menuTypeList.length === 1;

  const handleCouponTicketFee = (ticketMount: number, ticketPrice: number) => {
    const value = ticketMount * ticketPrice;
    return `${Helper.addComma(value)}円 (${ticketMount}枚 x ${Helper.addComma(
      ticketPrice,
    )}円)`;
  };

  const handleGetStatus = (value: string) => {
    const status = MENU_STATUS_LIST.filter((item) => item.id === value).map(
      (item) => {
        return item.name;
      },
    );
    return status;
  };

  const menuTypesList = useMemo(() => {
    const data = menuData?.menuTypes || [];
    const value =
      MENU_TYPE.filter((item) => data.includes(item.id)).map((item) => {
        return item.name;
      }) || [];
    return value;
  }, [menuData]);

  const handleSubmit = () => {
    const manipulatorIds = _map(currentUserQuery, (item: any) => item._id);
    let data = {
      ..._omit(menuData, [
        'availabelStaff',
        'couponExpirationDate',
        'ticketMount',
        'ticketPrice',
      ]),
      ticket: {
        price: menuData?.ticketPrice || 0,
        numberOfTicket: menuData?.ticketMount || 0,
        expiryMonth: menuData?.couponExpirationDate || 1,
      },
      manipulatorIds,
      currency: CURRENCY.JPY,
    };

    data = isOnlyTicket ? { ..._omit(data, 'price') } : { ...data };

    handleCreateMenu(
      !isCouponEnabled ? { ..._omit(data, 'ticket') } : { ...data },
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
          <RowItem label={MENU_INFO.NAME}>{menuData?.name}</RowItem>
          <RowItem label={MENU_INFO.ORDER_SHORT}>{menuData?.order}</RowItem>
          <RowItem label={MENU_INFO.ESTIMATED_TIME}>
            {menuData?.estimatedTime}
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
          {!isOnlyTicket && (
            <RowItem label={MENU_INFO.PRICE}>{`${Helper.addComma(
              menuData?.price,
            )}円`}</RowItem>
          )}
          {/* Field for Ticket/ Coupon */}
          {isCouponEnabled && (
            <>
              <RowItem label="回数券料金">
                {handleCouponTicketFee(
                  menuData?.ticketMount,
                  menuData?.ticketPrice,
                )}
              </RowItem>
              <RowItem label="回数券の有効期限">
                {`${menuData?.couponExpirationDate}か月`}
              </RowItem>
            </>
          )}
          <RowItem label={MENU_INFO.PUBLISH_STATUS} customItemRow="borderNone">
            {handleGetStatus(menuData?.status)}
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

        <Box display={'flex'} flexDirection={'column'} gap={10}>
          <LoadingButton
            size="medium"
            color="primary"
            variant="contained"
            endIcon={<ArrowRight />}
            loadingPosition="end"
            sx={styles.actionButton}
            onClick={handleSubmit}
            loading={isLoading}
            disabled={disabled}
          >
            確認する
          </LoadingButton>
          <LoadingButton
            size="medium"
            color="primary"
            loadingPosition="start"
            sx={styles.actionButton}
            disabled={disabled}
            variant="outlined"
            loading={isLoading}
            startIcon={<ArrowLeft />}
            onClick={() => {
              router.push(
                {
                  pathname: `/my-page/menu/register/${router?.query.slug}`,
                },
                undefined,
                {
                  shallow: true,
                },
              );
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            修正する
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
export default MenuReview;
