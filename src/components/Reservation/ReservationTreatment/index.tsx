import type { SelectChangeEvent } from '@mui/material';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { Select, TextField, Upload } from 'components/Form';
import type { IMenu } from 'models/menu/interface';
import type {
  ICouponTicket,
  ISelectableCoupon,
} from 'models/tickets/interface';
import React, { useEffect } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';

import CouponSelect from './CouponSelect';
import type { TreatmentFormValues } from './models/schema';
import PriceTypeSelect from './PriceTypeSelect';
import styles from './styles';

export interface IMenuSelectableList extends IMenu {
  id: string;
  name: string;
}
interface IReservationTreatment {
  isLoading?: boolean;
  menuList: IMenuSelectableList[];
  couponList: ISelectableCoupon[];
  ticketList: ICouponTicket[];
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
}

const ReservationTreatment: React.FC<IReservationTreatment> = ({
  isLoading,
  menuList,
  couponList,
  control,
  initialTreatmentValues,
  setValue,
  ticketList,
}) => {
  useEffect(() => {
    if (initialTreatmentValues) {
      Object.entries(initialTreatmentValues).map(([name, value]) =>
        setValue(name as keyof TreatmentFormValues, value),
      );
    }
  }, [initialTreatmentValues, setValue]);

  const onMenuChange = (e: SelectChangeEvent | undefined) => {
    const selectedMenuId = !!e && e.target.value;

    if (!selectedMenuId || selectedMenuId !== initialTreatmentValues.menuId) {
      setValue('priceType', 'one-shot');
    }
  };

  if (isLoading) {
    return (
      <CommonSection title="施術内容">
        <Stack
          alignItems="center"
          justifyContent="flex-start"
          minHeight={570}
          paddingTop={24}
          alignSelf={'stretch'}
        >
          <CircularProgress />
        </Stack>
      </CommonSection>
    );
  }

  return (
    <CommonSection title="施術内容">
      <Box sx={styles.contentWarpper}>
        <Typography fontSize={14}>
          ※この項目は、施術完了後に入力してください。
        </Typography>
        <Box mt={15}>
          <Box sx={styles.menuField}>
            <Select
              label="メニュー名"
              name="menuId"
              control={control}
              placeholder="時間予約コース"
              data={menuList}
              menuListProps={styles.menuList}
              menuItemSx={styles.menuItemSx}
              handleChange={onMenuChange}
            />
          </Box>

          <Upload
            label="ファイル添付（カルテ・施術メモなど）"
            name="treatmentFile"
            control={control}
          />

          <TextField
            label="詳細（症状・施術内容など）"
            name="treatmentInfo"
            control={control}
            placeholder="自由にご記入ください"
            multiline
            required
            rows={6}
          />

          <PriceTypeSelect
            menuList={menuList}
            ticketList={ticketList}
            control={control}
            initialTreatmentValues={initialTreatmentValues}
          />

          <CouponSelect control={control} couponList={couponList} />
        </Box>
      </Box>
    </CommonSection>
  );
};

export default ReservationTreatment;
