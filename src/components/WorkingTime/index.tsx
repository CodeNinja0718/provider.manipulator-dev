import { yupResolver } from '@hookform/resolvers/yup';
import ArrowChange from '@icons/arrow_change.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ChangeDate from '../ChangeDate';
import WorkTimeSelect from './Form/WorkTimeSelect';
import type { WorkingTimeFormValues } from './schema';
import schema from './schema';
import styles from './styles';

interface WorkingTimeFormProps {
  onSubmit: SubmitHandler<WorkingTimeFormValues>;
  initialValues: WorkingTimeFormValues | any;
  loading?: boolean;
  disabled?: boolean;
}
const WorkingTime = ({
  onSubmit,
  initialValues,
  loading,
  disabled,
}: WorkingTimeFormProps) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<WorkingTimeFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
  });

  const [isDayoff, setIsDayoff] = useState(false);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    setIsDayoff(initialValues?.isDayOff || false);
  }, [initialValues?.isDayOff]);

  return (
    <Stack alignItems="center" sx={styles.workingTimeWrapper}>
      <Typography variant="title">営業時間変更</Typography>

      <Box display="flex" mt={40} flexDirection="column" gap={40} width="100%">
        <ChangeDate />
        <CommonSection title="掲載中のメニュー一覧">
          {initialValues ? (
            <Box
              width="100%"
              pt={20}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container px={{ xs: 20, tablet: 0 }}>
                <Grid item xs={12} tablet={5}>
                  <Typography component={'h3'} sx={styles.labelText}>
                    本日の営業時間
                  </Typography>
                  <Stack>
                    {initialValues?.workingTime?.map(
                      (time: any, index: number) => (
                        <Typography
                          key={`time-${index}`}
                          fontSize={16}
                          fontWeight={500}
                        >
                          {`${time?.startTime} ～ ${time?.endTime}`}
                        </Typography>
                      ),
                    )}
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  tablet={1}
                  sx={{
                    padding: {
                      xs: '16px 0 20px',
                      tablet: '48px 0 0',
                    },
                    textAlign: {
                      xs: 'center',
                      tablet: 'left',
                    },
                    svg: {
                      transform: {
                        xs: 'rotate(0deg)',
                        tablet: 'rotate(-90deg)',
                      },
                    },
                  }}
                >
                  <ArrowChange />
                </Grid>
                <Grid item xs={12} tablet={6} sx={styles.timeWrapper}>
                  <Typography component={'h3'} sx={styles.labelText}>
                    変更後の営業時間
                  </Typography>
                  <WorkTimeSelect
                    register={register}
                    errorMessage={_get(errors, `workingTime.message`)}
                    control={control as any}
                    isDayOff={isDayoff}
                    handleDayOff={(e) => {
                      setValue('isDayOff', e.target.checked);
                      setIsDayoff(e.target.checked);
                    }}
                    handleChange={() => {
                      trigger('workingTime');
                    }}
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
                  disabled={disabled}
                >
                  変更する
                </LoadingButton>
              </Box>
            </Box>
          ) : (
            <Box sx={styles.loadingBox}>
              <CircularProgress size="small" sx={styles.loading} />
            </Box>
          )}
        </CommonSection>
      </Box>
    </Stack>
  );
};

export default WorkingTime;
