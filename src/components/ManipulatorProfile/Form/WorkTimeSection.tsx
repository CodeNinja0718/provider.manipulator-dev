import { Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import _get from 'lodash/get';
import React from 'react';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { WEEKDAYS_WORK_TIME } from 'utils/const';

import type { ManipulatorProfileValues } from './schema';
import styles from './styles';
import WorkTimeSelect from './WorkTimeSelect';

interface WorkTimeSectionProps {
  control: Control<ManipulatorProfileValues>;
  watch: UseFormWatch<ManipulatorProfileValues>;
  setValue: UseFormSetValue<ManipulatorProfileValues>;
  errors: FieldErrors<ManipulatorProfileValues>;
  trigger: UseFormTrigger<ManipulatorProfileValues>;
}

const WorkTimeSection: React.FC<WorkTimeSectionProps> = ({
  control,
  errors,
  setValue,
  trigger,
}) => {
  return (
    <CommonSection title="営業時間">
      <Stack sx={styles.sectionContentWrapper} data-worktime={true}>
        {WEEKDAYS_WORK_TIME.map((day) => {
          return (
            <Stack
              key={day.id}
              direction="row"
              gap={10}
              sx={styles.workTimeItemWrapper}
            >
              <Typography sx={styles.weekDayName}>{day.name}</Typography>
              <Stack flex={1}>
                <WorkTimeSelect
                  weekDayId={day.id}
                  control={control}
                  errorMessage={_get(
                    errors,
                    `businessHours[${day.id}].hours.message`,
                  )}
                  handleCheckHoliday={(e) => {
                    setValue(
                      `businessHours.${day.id}.isHoliday`,
                      e.target.checked,
                    );
                    trigger(`businessHours.${day.id}.hours`);
                  }}
                  handleChange={() => trigger(`businessHours.${day.id}.hours`)}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </CommonSection>
  );
};

export default WorkTimeSection;
