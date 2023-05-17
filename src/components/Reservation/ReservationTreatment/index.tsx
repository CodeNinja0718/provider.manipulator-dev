import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { Select, TextField, Upload } from 'components/Form';
import Label from 'components/Form/Label';
import NumberField from 'components/Form/NumberField';
import React, { useEffect } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { UNIT } from 'utils/const';

import type { TreatmentFormValues } from './models/schema';
import styles from './styles';

interface ISelectableList {
  id: string | number;
  name: string | number;
}
interface IReservationTreatment {
  menuList: ISelectableList[];
  couponList: ISelectableList[];
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
}

interface TicketCheckboxProps {
  control: Control<TreatmentFormValues>;
}

const TicketCheckbox = ({ control }: TicketCheckboxProps) => {
  const {
    field: { value = false, onChange },
  } = useController({
    name: 'isTicketUsed',
    control,
  });
  return (
    <Box display={'flex'} flexDirection={'column'} mb={12}>
      <Label htmlFor="" label="回数券利用" required={false} />
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={onChange}
            className="customRadio"
          />
        }
        label="1回"
      />
    </Box>
  );
};

const ReservationTreatment: React.FC<IReservationTreatment> = ({
  menuList,
  couponList,
  control,
  initialTreatmentValues,
  setValue,
}) => {
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
          <Box sx={styles.menuField}>
            <Select
              label="メニュー名"
              name="menuId"
              control={control}
              placeholder="時間予約コース"
              data={menuList}
              menuListProps={styles.menuList}
              menuItemSx={styles.menuItemSx}
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
          <TicketCheckbox control={control} />
          <Box sx={styles.menuField}>
            <Select
              label="クーポン"
              name="couponCode"
              control={control}
              placeholder="クーポン"
              data={couponList}
              menuListProps={styles.menuList}
              menuItemSx={styles.menuItemSx}
            />
          </Box>
        </Box>
      </Box>
    </CommonSection>
  );
};

export default ReservationTreatment;
