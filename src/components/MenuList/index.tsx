import { Box, MenuItem, Select, Typography } from '@mui/material';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';
import UnpublishedMenu from 'components/MenuList/UnpublishedMenu';
import { useFetch, useUser } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useEffect, useMemo, useState } from 'react';
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
  const [salonSelected, setSalonSelected] = useState('');
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
    return { id: item.salonId, name: item.name };
  });
  useEffect(() => {
    setSalonSelected(salonNameList[0]?.id);
  }, [salonNameList]);

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー管理</Typography>
      </Box>
      <DirectRegisterMenu />

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <Box display="flex" flexDirection={'column'} p={{ xs: 20, tablet: 0 }}>
          <Typography component={'h3'} sx={styles.labelText}>
            整体師で絞り込む
          </Typography>
          <Select value={salonSelected}>
            {salonNameList.map((salon) => (
              <MenuItem key={salon.id} value={salon.id}>
                {salon.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <PublishedMenu menus={pulicList} />
        <UnpublishedMenu menus={privateList} />
      </Box>
    </Box>
  );
};

export default MenuList;
