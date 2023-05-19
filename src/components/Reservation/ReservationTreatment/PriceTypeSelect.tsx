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
      initialTreatmentValues?.menuId &&
      selectedMenuId === initialTreatmentValues.menuId
    ) {
      return initialTreatmentValues.priceType === 'ticket';
    }

    const currentMenuTicket = menuList.find(
      (menu) => menu._id === selectedMenuId,
    )?.ticket;

    if (!currentMenuTicket) {
      return false;
    }

    return (
      ticketList.findIndex(
        (ticket) => currentMenuTicket.id === ticket.ticketId,
      ) > -1
    );
  }, [
    selectedMenuId,
    initialTreatmentValues.menuId,
    initialTreatmentValues.priceType,
    menuList,
    ticketList,
  ]);

  return (
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
  );
};

export default PriceTypeSelect;
