import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
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
    return salonList.push(...(item.salon || []));
  });
  return salonList || [];
};

const MenuList = () => {
  useUser({ enabled: false });
  const salonList = getSalonInfo();
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.getManiplatorList(salonList[0]?.salonId),
  );
  const currentSalonId = useMemo(() => {
    return salonList[0]?.salonId || '';
  }, [salonList]);

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

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー管理</Typography>
      </Box>
      <DirectRegisterMenu currentSalonId={currentSalonId} />

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <Box display="flex" flexDirection={'column'} p={{ xs: 20, tablet: 0 }}>
          {res && (
            <>
              <Typography component={'h3'} sx={styles.labelText}>
                整体師で絞り込む
              </Typography>
              <Select value={currentSalonId} readOnly>
                {salonNameList.map((salon) => (
                  <MenuItem key={salon.id} value={salon.id}>
                    {salon.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </Box>
        {res ? (
          <>
            <PublishedMenu menus={pulicList} currentSalonId={currentSalonId} />
            <UnpublishedMenu
              menus={privateList}
              currentSalonId={currentSalonId}
            />
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

export default MenuList;
