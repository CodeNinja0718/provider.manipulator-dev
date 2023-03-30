import PlusSvg from '@icons/icon_plus.svg';
import TrashBoxSvg from '@icons/icon_trashbox.svg';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Select } from 'components/Form';
import CheckboxBase from 'components/Form/CheckBox/CheckboxBase';
import HelperText from 'components/Form/HelperText';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';
import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { WORK_TIMES } from 'utils/const';

import styles from './styles';

interface WorkTimeSelectProps {
  control: Control<WorkingTimeFormValues>;
  isDayOff: boolean;
  handleDayOff: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChange: () => void;
  register: UseFormRegister<WorkingTimeFormValues>;
  errorMessage?: string;
}

const WorkTimeSelect: React.FC<WorkTimeSelectProps> = ({
  control,
  isDayOff,
  handleDayOff,
  handleChange,
  register,
  errorMessage,
}) => {
  const { fields, append, remove } = useFieldArray<WorkingTimeFormValues>({
    control,
    name: `workingTime`,
  });

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
              {...register(`workingTime.${index}.startTime`, {
                required: true,
              })}
              placeholder="Time"
              name={`workingTime.${index}.startTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              formControlProps={{
                sx: {
                  maxWidth: {
                    xs: 100,
                    tablet: 180,
                  },
                  minWidth: 100,
                },
              }}
              disabled={isDayOff}
              handleChange={handleChange}
            />
            <Typography color="black" mt={14}>
              ～
            </Typography>
            <Select
              {...register(`workingTime.${index}.endTime`, {
                required: true,
              })}
              control={control}
              placeholder="Time"
              name={`workingTime.${index}.endTime`}
              data={startTimeOptions}
              fixedHelperText={false}
              formControlProps={{
                sx: {
                  maxWidth: {
                    xs: 100,
                    tablet: 180,
                  },
                  minWidth: 100,
                },
              }}
              disabled={isDayOff}
              handleChange={handleChange}
            />
            {index > 0 && (
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  mt: 4,
                }}
                onClick={() => remove(index)}
                disabled={isDayOff}
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
            if (fields.length < 2) append({ startTime: '', endTime: '' });
          }}
          disabled={isDayOff || fields.length > 1}
          variant="outlined"
          size="small"
        >
          <PlusSvg width={15} height={15} />
          時間帯を追加
        </Button>
        <Box
          component="label"
          sx={styles.holiydayCheckboxWrapper}
          data-checked={isDayOff}
        >
          <CheckboxBase
            checked={isDayOff}
            sx={styles.checkbox}
            onChange={handleDayOff}
          />
          休診日
        </Box>
      </Stack>
    </Stack>
  );
};

export default WorkTimeSelect;
