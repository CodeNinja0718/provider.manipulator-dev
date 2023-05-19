import { Box } from '@mui/material';
import { Select } from 'components/Form';
import type { ISelectableCoupon } from 'models/tickets/interface';
import React from 'react';
import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import styles from '../styles';
import type { TreatmentFormValues } from './models/schema';

interface CouponSelectProps {
  couponList: ISelectableCoupon[];
  control: Control<TreatmentFormValues>;
}

const CouponSelect = ({ control, couponList }: CouponSelectProps) => {
  const canSelectCoupon =
    useWatch({ control, name: 'priceType' }) === 'one-shot';

  return (
    <Box sx={styles.menuField}>
      <Select
        label="クーポン"
        name="couponCode"
        control={control}
        placeholder="クーポン"
        data={couponList}
        menuListProps={styles.menuList}
        menuItemSx={styles.menuItemSx}
        disabled={!canSelectCoupon}
      />
    </Box>
  );
};

export default CouponSelect;
