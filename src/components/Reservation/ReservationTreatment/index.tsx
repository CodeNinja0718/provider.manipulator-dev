import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { Select, TextField, Upload } from 'components/Form';
import NumberField from 'components/Form/NumberField';
import { useFetch } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import type { ISalonInfo } from 'models/reservation/interface';
import React, { useEffect, useMemo } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { MENU_STATUS, UNIT } from 'utils/const';

import type { TreatmentFormValues } from './models/schema';
import styles from './styles';

interface IReservationTreatment {
  salonInfo: ISalonInfo;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
}

const ReservationTreatment: React.FC<IReservationTreatment> = ({
  salonInfo,
  control,
  initialTreatmentValues,
  setValue,
}) => {
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.getManiplatorList(salonInfo?.salonId),
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

  useEffect(() => {
    if (initialTreatmentValues) {
      Object.entries(initialTreatmentValues).map(([name, value]) =>
        setValue(name as keyof TreatmentFormValues, value),
      );
    }
  }, [initialTreatmentValues, setValue]);

  return (
    <CommonSection title="施術内容">
      <Box sx={styles.contentWarpper}>
        <Typography fontSize={14}>
          ※この項目は、施術完了後に入力してください。
        </Typography>
        <Box mt={15}>
          <Select
            label="メニュー名"
            name="menuId"
            control={control}
            placeholder="時間予約コース"
            data={menuList}
          />

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
            rows={6}
          />

          <NumberField
            name="price"
            control={control}
            label="料金（税抜)"
            placeholder="6,000"
            showEndAdornment={false}
            className="maxHeight maxWidth"
            sx={styles.numberField}
            unitLabel={
              <Typography sx={{ ...styles.unitLabel, ml: 12 }}>
                {UNIT.YEN}
              </Typography>
            }
          />
        </Box>
      </Box>
    </CommonSection>
  );
};
export default ReservationTreatment;
