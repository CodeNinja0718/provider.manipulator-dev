import { yupResolver } from '@hookform/resolvers/yup';
import ArrowChange from '@icons/arrow_change.svg';
import ArrowDownSvg from '@icons/arrow-down.svg';
import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import CommonSection from 'components/CommonSection';
import { useList, useUser } from 'hooks';
import _get from 'lodash/get';
import type { IMenuManipulator } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useRouter } from 'next/router';
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
  isOwner?: boolean;
}

interface IManipulator {
  id: string;
  name: string;
}

const WorkingTime = ({
  onSubmit,
  initialValues,
  loading,
  disabled,
  isOwner,
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
  const router = useRouter();
  const [isDayoff, setIsDayoff] = useState(false);

  const { data } = useUser();
  const salonList = data?.salon;
  const [isLoading, setLoading] = useState(false);
  const [manipulatorList, setManipulatorList] = useState<IManipulator[]>([]);

  const { list: manipulatorRes } = useList<IMenuManipulator | any>(
    menuQuery.getManiplators(
      salonList?.[0]?.salonId,
      !isOwner || manipulatorList?.length > 0,
    ),
  );

  const manipulatorId = (router.query.manipulator as string) || '';

  const [selectedManipulator, setSelectedManipulator] = useState('');

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    setSelectedManipulator(manipulatorId);
  }, [manipulatorId]);

  useEffect(() => {
    setIsDayoff(initialValues?.isDayOff || false);
  }, [initialValues?.isDayOff]);

  useEffect(() => {
    const temp = manipulatorRes?.map((item) => ({
      id: item._id,
      name: item.nameKana,
    }));
    if (temp?.length) setManipulatorList(temp);
  }, [manipulatorRes]);

  const handleChange = async (event: any) => {
    setLoading(true);
    const manipulatorName = event.target.value || '';

    router.push(
      {
        href: router.pathname,
        query: {
          page: 1,
          manipulator: manipulatorName,
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
    setLoading(false);
  };

  return (
    <Stack alignItems="center" sx={styles.workingTimeWrapper}>
      <Box sx={styles.navLink} onClick={() => router.push('/my-page/schedule')}>
        <ArrowLeft />
        変更せずに戻る
      </Box>
      <Typography variant="title">営業時間変更</Typography>

      <Box display="flex" mt={40} flexDirection="column" gap={40} width="100%">
        <ChangeDate />
        <CommonSection title="掲載中のメニュー一覧">
          {isOwner && manipulatorId && (
            <Box
              display="flex"
              flexDirection={'column'}
              p={{ xs: 20, tablet: 0 }}
              width={'100%'}
              mt={23}
              mb={10}
            >
              <Typography component={'h3'} sx={styles.labelText}>
                整体師で絞り込む
              </Typography>
              <Select
                value={selectedManipulator}
                onChange={handleChange}
                sx={styles.nameSelect}
                displayEmpty
                renderValue={
                  selectedManipulator !== ''
                    ? undefined
                    : () => <Box sx={styles.placeholder}>整体師</Box>
                }
                IconComponent={(iconProps) => {
                  return (
                    <IconButton {...iconProps}>
                      <ArrowDownSvg />
                    </IconButton>
                  );
                }}
              >
                <MenuItem key="none" value="" disabled>
                  <Box sx={styles.placeholder}>整体師</Box>
                </MenuItem>
                {manipulatorList?.map((salon) => (
                  <MenuItem key={salon.id} value={salon.id}>
                    {salon.name}
                  </MenuItem>
                ))}
              </Select>
              <Box pt={10}>
                ※基本勤務時間を変更する場合、<Link href="/">整体師編集</Link>
                で変更ください。
              </Box>
              <Box mt={10}>
                <Divider />
              </Box>
            </Box>
          )}
          {initialValues && !isLoading ? (
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
