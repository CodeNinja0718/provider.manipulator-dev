import { yupResolver } from '@hookform/resolvers/yup';
import ArrowChange from '@icons/arrow_change.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import WorkTimeSelect from 'components/Profile/Form/WorkTimeSelect';
import _get from 'lodash//get';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ChangeDate from './ChangeDate';
import type { WorkingTimeFormValues } from './schema';
import schema from './schema';
import styles from './styles';

const dayId = 0;
interface WorkingTimeFormProps {
  onSubmit: SubmitHandler<WorkingTimeFormValues>;
  initialValues: WorkingTimeFormValues;
  loading?: boolean;
}
const WorkingTime = ({
  onSubmit,
  initialValues,
  loading,
}: WorkingTimeFormProps) => {
  const {
    control,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkingTimeFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">営業時間変更</Typography>
      </Box>

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        {initialValues ? (
          <>
            <ChangeDate />
            <CommonSection title="掲載中のメニュー一覧">
              <Box
                width="100%"
                pt={20}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <Typography component={'h3'} sx={styles.labelText}>
                      本日の営業時間
                    </Typography>
                    <Stack>
                      {initialValues?.businessHours[0]?.hours?.map(
                        (time: any, index) => (
                          <Typography
                            key={`time-${index}`}
                            fontSize={16}
                            fontWeight={500}
                          >
                            {`${time.startTime} ～ ${time.endTime}`}
                          </Typography>
                        ),
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Box sx={{ svg: { transform: 'rotate(-90deg)' } }}>
                      <ArrowChange />
                    </Box>
                  </Grid>
                  <Grid item xs={7} sx={styles.timeWrapper}>
                    <Typography component={'h3'} sx={styles.labelText}>
                      変更後の営業時間
                    </Typography>
                    <WorkTimeSelect
                      weekDayId={dayId}
                      control={control as any}
                      errorMessage={_get(
                        errors,
                        `businessHours[${dayId}].hours.message`,
                      )}
                      handleCheckHoliday={(e) => {
                        setValue(
                          `businessHours.${dayId}.isHoliday`,
                          e.target.checked,
                        );
                        trigger(`businessHours.${dayId}.hours`);
                      }}
                      handleChange={() =>
                        trigger(`businessHours.${dayId}.hours`)
                      }
                    />
                  </Grid>
                </Grid>
                <Box textAlign={'center'}>
                  <LoadingButton
                    size="medium"
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<ArrowRight />}
                    loadingPosition="end"
                    sx={styles.button}
                    loading={loading}
                  >
                    変更する
                  </LoadingButton>
                </Box>
              </Box>
            </CommonSection>
          </>
        ) : (
          <Box sx={styles.loadingBox}>
            <CircularProgress size="small" sx={styles.loading} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WorkingTime;
