import ArrowRight from '@icons/arrow-right.svg';
import CalenderIcon from '@icons/icon_datepicker.svg';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CommonSection from 'components/CommonSection';
import Layout from 'components/Layout';
import Link from 'components/Link';
import NavigateControl from 'components/Schedule/NavigateControl';
import SlotTable from 'components/Schedule/SlotTable';
import dayjs from 'dayjs';
import { useList, useUser } from 'hooks';
import get from 'lodash/get';
import type { ISalonScheduleItem } from 'models/schedule/interface';
import scheduleQuery from 'models/schedule/query';
import { useRouter } from 'next/router';
import { DATE_FORMAT } from 'utils/const';
import helpers from 'utils/helpers';

import styles from './styles';

const SchedulePage = () => {
  const router = useRouter();
  const { page, date } = router.query;
  const validDate = helpers.getValidDate(date);
  const { data } = useUser();
  const {
    list,
    isLoading,
    page: currentPage,
    totalPages,
  } = useList<ISalonScheduleItem>({
    ...scheduleQuery.salonSchedule({
      salonId: get(data, 'salon[0].salonId'),
      date: validDate,
      page: typeof page === 'string' ? page : 1,
      limit: 5,
    }),
    enabled: !!data,
    staleTime: 1000 * 60 * 2,
  });

  const nextDay = helpers.getValidDate(validDate, 1);
  const previousDay = helpers.getValidDate(validDate, -1);

  return (
    <Stack alignItems="center" sx={styles.scheduleListWrapper}>
      <Typography variant="title" mb={55}>
        スケジュール
      </Typography>
      <NavigateControl
        previousHref={{
          href: router.pathname,
          query: {
            page: 1,
            date: previousDay,
          },
        }}
        previousDisabled={isLoading}
        nextHref={{
          href: router.pathname,
          query: {
            page: 1,
            date: nextDay,
          },
        }}
        nextDisabled={isLoading}
      >
        <DesktopDatePicker
          value={validDate}
          onChange={(value) => {
            const valueDate = dayjs(value);
            if (valueDate.isValid()) {
              router.push(
                {
                  href: router.pathname,
                  query: {
                    page: 1,
                    date: valueDate.format(DATE_FORMAT),
                  },
                },
                undefined,
                {
                  shallow: true,
                },
              );
            }
          }}
          components={{
            OpenPickerIcon: () => <CalenderIcon />,
          }}
          renderInput={(params) => {
            return (
              <TextField {...params} margin="none" sx={styles.dateControl} />
            );
          }}
        />
      </NavigateControl>
      <Button
        component={Link}
        variant="contained"
        href={`/my-page/schedule/working-time?date=${validDate}`}
        sx={styles.updateScheduleBtn}
        endIcon={<ArrowRight />}
      >
        営業時間を変更する
      </Button>
      <CommonSection title="日別スケジュール">
        <Stack mt={20} sx={{ width: '100%' }}>
          <Typography sx={styles.scheduleNote}>
            <span>予約</span>をクリックすると、詳細を確認できます。
            <br />
            スケジュールが入っていない箇所をタップすると、予約を追加・登録できます。
          </Typography>
          <NavigateControl
            previousHref={{
              href: router.pathname,
              query: {
                page: 1,
                date: previousDay,
              },
            }}
            previousDisabled={isLoading}
            nextHref={{
              href: router.pathname,
              query: {
                page: 1,
                date: nextDay,
              },
            }}
            nextDisabled={isLoading}
            sx={styles.navRow}
          />
          <NavigateControl
            previousHref={{
              href: router.pathname,
              query: {
                page: currentPage - 1,
                date: validDate,
              },
            }}
            previousDisabled={currentPage <= 1 || isLoading}
            previousText="前の5名へ"
            nextHref={{
              href: router.pathname,
              query: {
                page: currentPage + 1,
                date: validDate,
              },
            }}
            nextText="次の5名へ"
            nextDisabled={currentPage >= totalPages || isLoading}
            sx={{
              ...styles.navRow,
              border: 0,
            }}
          />

          <SlotTable list={list} date={validDate} loading={isLoading} />

          <NavigateControl
            previousHref={{
              href: router.pathname,
              query: {
                page: 1,
                date: previousDay,
              },
            }}
            previousDisabled={isLoading}
            nextHref={{
              href: router.pathname,
              query: {
                page: 1,
                date: nextDay,
              },
            }}
            nextDisabled={isLoading}
            sx={styles.navRow}
          />
          <NavigateControl
            previousHref={{
              href: router.pathname,
              query: {
                page: currentPage - 1,
                date: validDate,
              },
            }}
            previousDisabled={currentPage <= 1 || isLoading}
            previousText="前の5名へ"
            nextHref={{
              href: router.pathname,
              query: {
                page: currentPage + 1,
                date: validDate,
              },
            }}
            nextText="次の5名へ"
            nextDisabled={currentPage >= totalPages || isLoading}
            sx={{
              ...styles.navRow,
              border: 0,
            }}
          />
        </Stack>
      </CommonSection>
    </Stack>
  );
};

SchedulePage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default SchedulePage;
