import ArrowDownSvg from '@icons/arrow-down.svg';
import CloseIcon from '@icons/close.svg';
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import ChangeDate from 'components/ChangeDate';
import Layout from 'components/Layout';
import Reservation from 'components/Reservation';
import { useFetch, useList, useUser } from 'hooks';
import { groupBy, isEmpty, values } from 'lodash';
import type { IMenuManipulator } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import type { IReservationItem } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import helpers from 'utils/helpers';
import type { PageProps } from 'utils/type';

import styles from './styles';

const ReservationPage = ({ isOwnerSsr }: PageProps) => {
  const router = useRouter();
  const { date } = router.query;
  const validDate = helpers.getValidDate(date);
  const { data: userData } = useUser();

  const salonList = userData?.salon;

  const { list: manipulatorRes } = useList<IMenuManipulator | any>(
    menuQuery.getManiplators(salonList?.[0]?.salonId, !isOwnerSsr),
  );

  const [selectedManipulator, setSelectedManipulator] = useState<
    string | undefined
  >('');

  useEffect(() => {
    if (userData) {
      setSelectedManipulator(userData._id);
    }
  }, [userData]);

  const handleChange = async (event: any) => {
    setSelectedManipulator(event.target.value);
  };

  const manipulatorList = useMemo(() => {
    return manipulatorRes?.map((item) => ({
      id: item._id,
      name: item.name,
    }));
  }, [manipulatorRes]);

  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.getReservationList({
      date: validDate,
      manipulatorId: selectedManipulator,
      salonId: userData?.salon[0]?.salonId,
    }),
  );

  const reservationList = useMemo(() => {
    let dataReturn: Array<IReservationItem[]> = [];
    if (res?.docs) {
      const dataConvert = groupBy(res?.docs, 'manipulatorInfo.manipulatorId');
      dataReturn = values(dataConvert);
    }

    return dataReturn;
  }, [res]);

  return (
    <Box sx={styles.reservationWrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">予約リスト</Typography>
      </Box>
      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <ChangeDate />
        <Box display="flex" flexDirection={'column'} p={{ xs: 20, tablet: 0 }}>
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
              if (
                selectedManipulator === '' &&
                isEmpty(selectedManipulator.toString())
              ) {
                return (
                  <IconButton {...iconProps}>
                    <ArrowDownSvg />
                  </IconButton>
                );
              }
              return (
                <IconButton
                  onClick={() => {
                    setSelectedManipulator(userData?._id);
                    // setSelectedManipulator('');
                  }}
                >
                  <CloseIcon />
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

          {res ? (
            <Reservation res={res} reservationList={reservationList} />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="flex-start"
              sx={styles.wrapper}
            >
              <CircularProgress />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};
ReservationPage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default ReservationPage;
