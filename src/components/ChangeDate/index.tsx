import CalenderIcon from '@icons/icon_datepicker.svg';
import { Box, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import NavigateControl from 'components/Schedule/NavigateControl';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { DATE_FORMAT } from 'utils/const';
import Helper from 'utils/helpers';

import styles from './styles';

const ChangeDate = () => {
  const router = useRouter();
  const { date, manipulator } = router.query;
  const validDate = Helper.getValidDate(date);
  const nextDay = Helper.getValidDate(validDate, 1);
  const previousDay = Helper.getValidDate(validDate, -1);
  const isLoading = false;

  return (
    <Box sx={styles.changeDateBox}>
      <NavigateControl
        previousHref={{
          href: router.pathname,
          query: !manipulator
            ? { date: previousDay }
            : { date: previousDay, manipulator },
        }}
        previousDisabled={isLoading}
        nextHref={{
          href: router.pathname,
          query: !manipulator
            ? { date: nextDay }
            : { date: nextDay, manipulator },
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
                  query: !manipulator
                    ? { page: 1, date: valueDate.format(DATE_FORMAT) }
                    : {
                        page: 1,
                        date: valueDate.format(DATE_FORMAT),
                        manipulator,
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
    </Box>
  );
};

export default ChangeDate;
