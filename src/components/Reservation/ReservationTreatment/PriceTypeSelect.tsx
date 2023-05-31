import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import NumberField from 'components/Form/NumberField';
import type { ICouponTicket } from 'models/tickets/interface';
import React, { useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { useController, useWatch } from 'react-hook-form';
import { UNIT } from 'utils/const';

import type { IMenuSelectableList } from '.';
import type { TreatmentFormValues } from './models/schema';
import styles from './styles';

interface PriceTypeSelectProps {
  control: Control<TreatmentFormValues>;
  menuList: IMenuSelectableList[];
  ticketList: ICouponTicket[];
  initialTreatmentValues: TreatmentFormValues;
}

const PriceTypeSelect = ({
  control,
  menuList,
  ticketList,
  initialTreatmentValues,
}: PriceTypeSelectProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'priceType',
    control,
  });

  const selectedMenuId = useWatch({ control, name: 'menuId' });

  const canTicketChoosed = useMemo(() => {
    if (!selectedMenuId) {
      return false;
    }

    if (
      selectedMenuId === initialTreatmentValues?.menuId &&
      initialTreatmentValues.priceType === 'ticket'
    ) {
      return true;
    }

    const currentSelectedMenu = menuList.find(
      (menu) => menu._id === selectedMenuId,
    );

    if (!currentSelectedMenu) {
      return false;
    }

    return (
      ticketList.findIndex(
        (ticket) => currentSelectedMenu.ticket?.id === ticket.ticketId,
      ) > -1 && currentSelectedMenu.menuTypes.includes('coupon')
    );
  }, [
    selectedMenuId,
    initialTreatmentValues?.menuId,
    initialTreatmentValues.priceType,
    menuList,
    ticketList,
  ]);

  const canOneShotChoosed = useMemo(() => {
    if (!selectedMenuId) {
      return false;
    }

    const currentSelectedMenu = menuList.find(
      (menu) => menu._id === selectedMenuId,
    );

    if (!currentSelectedMenu) {
      return false;
    }

    return currentSelectedMenu.menuTypes.includes('one_time');
  }, [menuList, selectedMenuId]);

  return (
    <>
      <RadioGroup
        name="priceType"
        sx={{ mb: 12 }}
        value={value}
        onChange={onChange}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'flex-start'}
          sx={styles.radioWrapper}
        >
          <FormControlLabel
            control={<Radio className="customRadio" />}
            label={
              <NumberField
                name="price"
                control={control}
                label="料金（税抜)"
                placeholder="6,000"
                disabled={!canOneShotChoosed}
                showEndAdornment={false}
                className="maxHeight maxWidth"
                sx={styles.numberField}
                unitLabel={
                  <Typography sx={{ ...styles.unitLabel, ml: 12 }}>
                    {UNIT.YEN}
                  </Typography>
                }
              />
            }
            value="one-shot"
            disabled={!canOneShotChoosed}
          />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'flex-start'}
          sx={styles.radioWrapper}
        >
          <FormControlLabel
            control={<Radio className="customRadio" />}
            label={
              <Box display={'flex'} flexDirection={'column'} mb={12}>
                <Typography fontWeight={'bold'} fontSize={16}>
                  回数券利用
                </Typography>
                <Typography fontWeight={'bold'} fontSize={16}>
                  1回
                </Typography>
              </Box>
            }
            value={'ticket'}
            disabled={!canTicketChoosed}
          />
        </Box>
      </RadioGroup>
      {!!error && (
        <Typography fontSize={14} color={'red'} mb={16}>
          {error.message}
        </Typography>
      )}
    </>
  );
};

export default PriceTypeSelect;
