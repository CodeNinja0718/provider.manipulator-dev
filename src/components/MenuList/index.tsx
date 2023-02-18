import { Box, Typography } from '@mui/material';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';
import UnpublishedMenu from 'components/MenuList/UnpublishedMenu';
import { useFetch, useUser } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useMemo } from 'react';
import { MENU_STATUS } from 'utils/const';
import queryClient from 'utils/queryClient';

import PublishedMenu from './PublishedMenu';
import styles from './styles';

const getSalonInfo = () => {
  // Salon info
  const currentUserQuery = queryClient
    .getQueryCache()
    .findAll(['currentUser'])
    .map((each) => {
      return each?.state?.data;
    });
  const salonList: any[] = [];
  currentUserQuery.filter(Boolean).map((item: any) => {
    const list = item.salon ? item.salon : [];
    return salonList.push(...list);
  });
  return salonList;
};

const MenuList = () => {
  useUser({ enabled: false });
  const salonList = getSalonInfo() || [];
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.searchManiplator(salonList[0]?.salonId),
  );
  // List
  const privateList = useMemo(() => {
    const list = res?.docs || [];
    return list.filter((item: IMenu) => item?.status === MENU_STATUS.PRIVATE);
  }, [res?.docs]);
  const pulicList = useMemo(() => {
    const list = res?.docs || [];
    return list.filter((item: IMenu) => item?.status === MENU_STATUS.PUBLIC);
  }, [res?.docs]);
  const salonNameList = salonList.map((item) => {
    return item.name;
  });
  console.log(privateList);
  console.log(pulicList);
  console.log(salonNameList);
  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー管理</Typography>
      </Box>
      <DirectRegisterMenu />

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <PublishedMenu />
        <UnpublishedMenu />
      </Box>
    </Box>
  );
};

export default MenuList;
