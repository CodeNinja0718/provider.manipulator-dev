import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import dayjs from 'dayjs';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DATE_FORMAT } from 'utils/const';
import queryClient from 'utils/queryClient';

import PaymentFee from '../PaymentFee';
import TreatmentDetail from '../TreatmentDetail';
import styles from './styles';

interface IMenuList {
  id: string | number;
  name: string | number;
}

interface IPaymentDetail extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
  initialTreatmentValues: TreatmentFormValues;
  menuUpdatingInfo: IMenuList[];
}

const PaymentDetail: React.FC<IPaymentDetail> = ({
  menuInfo,
  startTime,
  endTime,
  salonInfo,
  initialTreatmentValues,
  menuUpdatingInfo,
}) => {
  const valueDate =
    startTime || endTime ? dayjs(startTime || endTime) : dayjs();
  const queryMenuList =
    queryClient
      .getQueryCache()
      .findAll(['menu', 'list', 'salonId'])
      .map((each) => {
        return each?.state?.data;
      }) || [];

  const menuListData: any = queryMenuList?.[0];
  const currentList = menuListData?.docs || [];
  const currentMenu = currentList.filter(
    (item: any) => item._id === initialTreatmentValues?.menuId,
  );

  return (
    <CommonSection title="予約内容">
      <Box sx={styles.contentWarpper}>
        <Stack spacing={20} divider={<Divider flexItem />}>
          <ContentLine start="整体師" center={salonInfo?.name} />
          <ContentLine
            start="ご予約日"
            center={`${valueDate.format(DATE_FORMAT)}(月) ${dayjs
              .utc(startTime)
              .tz()
              .format('HH:mm')} ~ ${dayjs.utc(endTime).tz().format('HH:mm')}`}
          />
          <ContentLine
            start="予約コース"
            center={`${menuUpdatingInfo?.[0]?.name || menuInfo?.name} ${
              currentMenu?.[0]?.estimatedTime || menuInfo?.estimatedTime || 0
            }分`}
            end={
              <NumericFormat
                value={initialTreatmentValues?.price || 0}
                thousandSeparator=","
                suffix="円"
                displayType="text"
                renderText={(value) => (
                  <Typography color="black">{value}</Typography>
                )}
              />
            }
          />
        </Stack>
        <TreatmentDetail initialTreatmentValues={initialTreatmentValues} />
        <PaymentFee initialTreatmentValues={initialTreatmentValues} />
      </Box>
    </CommonSection>
  );
};
export default PaymentDetail;
