import { Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import _get from 'lodash//get';
import React from 'react';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { WEEKDAYS_WORK_TIME } from 'utils/const';

import type { ProfileFormValues } from './schema';
import styles from './styles';
import WorkTimeSelect from './WorkTimeSelect';

interface WorkTimeSectionProps {
  control: Control<ProfileFormValues>;
  watch: UseFormWatch<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  trigger: UseFormTrigger<ProfileFormValues>;
}

const WorkTimeSection: React.FC<WorkTimeSectionProps> = ({
  control,
  errors,
  setValue,
  trigger,
}) => {
  return (
    <CommonSection title="営業時間">
      <Stack sx={styles.sectionContentWrapper}>
        <Typography sx={styles.workTimeNote}>
          すべて<span>必須項目</span>です。
          <br />
          午前と午後で診察時間が分かれている場合は、「時間帯を追加」より午前・午後それぞれの時間を設定してください。
        </Typography>
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
                  handleCheckHoliday={(e) =>
                    setValue(
                      `businessHours.${day.id}.isHoliday`,
                      e.target.checked,
                    )
                  }
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
