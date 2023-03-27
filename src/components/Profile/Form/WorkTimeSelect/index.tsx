import PlusSvg from '@icons/icon_plus.svg';
import TrashBoxSvg from '@icons/icon_trashbox.svg';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Select } from 'components/Form';
import CheckboxBase from 'components/Form/CheckBox/CheckboxBase';
import HelperText from 'components/Form/HelperText';
import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray, useWatch } from 'react-hook-form';
import { WORK_TIMES } from 'utils/const';

import type { ProfileFormValues } from '../schema';
import styles from './styles';

interface WorkTimeSelectProps {
  control: Control<ProfileFormValues>;
  weekDayId: number;
  errorMessage?: string;
  handleChange: () => void;
  handleCheckHoliday: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WorkTimeSelect: React.FC<WorkTimeSelectProps> = ({
  weekDayId,
  control,
  errorMessage,
  handleChange,
  handleCheckHoliday,
}) => {
  const { fields, append, remove } = useFieldArray<ProfileFormValues>({
    control,
    name: `businessHours.${weekDayId}.hours`,
  });

  const watchBusinessHours = useWatch({ name: 'businessHours', control });

  const businessHour = watchBusinessHours[weekDayId];

  const startTimeOptions = useMemo(() => {
    return WORK_TIMES.map((time) => ({
      id: time,
      name: time,
    }));
  }, []);

  return (
    <Stack gap={10} sx={styles.WorkTimeSelectWrapper}>
      {fields.map((field, index) => {
        return (
          <Stack direction="row" alignItems="start" gap={10} key={field.id}>
            <Select
              control={control}
              placeholder="時間"
              name={`businessHours.${weekDayId}.hours.${index}.startTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              handleChange={handleChange}
              formControlProps={{
                sx: {
                  maxWidth: {
                    xs: 100,
                    tablet: 180,
                  },
                },
              }}
              disabled={businessHour?.isHoliday}
            />
            <Typography color="black" mt={14}>
              ～
            </Typography>
            <Select
              control={control}
              placeholder="時間"
              name={`businessHours.${weekDayId}.hours.${index}.endTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              handleChange={handleChange}
              formControlProps={{
                sx: {
                  maxWidth: {
                    xs: 100,
                    tablet: 180,
                  },
                },
              }}
              disabled={businessHour?.isHoliday}
            />
            {index > 0 && (
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  mt: 4,
                }}
                onClick={() => remove(index)}
                disabled={businessHour?.isHoliday}
              >
                <TrashBoxSvg />
              </IconButton>
            )}
          </Stack>
        );
      })}
      <HelperText error={errorMessage} fixed={false} />
      <Stack direction="row" gap={10} flexWrap="wrap">
        <Button
          sx={{
            width: 156,
            gap: 8,
            padding: 8,
          }}
          onClick={() => {
            append({ startTime: '', endTime: '' });
          }}
          disabled={businessHour?.isHoliday || fields.length > 2}
          variant="outlined"
          size="small"
        >
          <PlusSvg width={15} height={15} />
          時間帯を追加
        </Button>
        <Box
          component="label"
          sx={styles.holiydayCheckboxWrapper}
          data-checked={businessHour?.isHoliday}
        >
          <CheckboxBase
            checked={businessHour?.isHoliday}
            sx={styles.checkbox}
            onChange={handleCheckHoliday}
          />
          休診日
        </Box>
      </Stack>
    </Stack>
  );
};

export default WorkTimeSelect;
