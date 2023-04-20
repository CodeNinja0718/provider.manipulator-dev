import { Box, Stack, Typography } from '@mui/material';
import { Select } from 'components/Form';
import CheckboxBase from 'components/Form/CheckBox/CheckboxBase';
import HelperText from 'components/Form/HelperText';
import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray, useWatch } from 'react-hook-form';
import { WORK_TIMES } from 'utils/const';

import type { ManipulatorProfileValues } from '../schema';
import styles from './styles';

interface WorkTimeSelectProps {
  control: Control<ManipulatorProfileValues>;
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
  const { fields } = useFieldArray<ManipulatorProfileValues>({
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
    <Stack sx={styles.WorkTimeSelectWrapper}>
      {fields.map((field, index) => {
        return (
          <Stack
            direction="row"
            gap={10}
            alignItems="center"
            key={field.id}
            flexWrap={'wrap'}
          >
            <Select
              control={control}
              placeholder="時間"
              name={`businessHours.${weekDayId}.hours.${index}.startTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              handleChange={handleChange}
              formControlProps={{
                sx: {
                  maxWidth: 100,
                  '& .MuiInputBase-root': {
                    height: 50,
                  },
                },
              }}
              disabled={businessHour?.isHoliday}
            />
            <Typography color="black">～</Typography>
            <Select
              control={control}
              placeholder="時間"
              name={`businessHours.${weekDayId}.hours.${index}.endTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              handleChange={handleChange}
              formControlProps={{
                sx: {
                  maxWidth: 100,
                  '& .MuiInputBase-root': {
                    height: 50,
                  },
                },
              }}
              disabled={businessHour?.isHoliday}
            />
            <Stack direction="row" flexWrap="wrap">
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
                休み
              </Box>
            </Stack>
          </Stack>
        );
      })}
      <HelperText error={errorMessage} fixed={false} />
    </Stack>
  );
};

export default WorkTimeSelect;
