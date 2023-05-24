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
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';
import UnpublishedMenu from 'components/MenuList/UnpublishedMenu';
import { useFetch, useList, useUser } from 'hooks';
import { isEmpty } from 'lodash';
import type { IMenu, IMenuManipulator } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useMemo, useState } from 'react';
import { MENU_STATUS } from 'utils/const';
import queryClient from 'utils/queryClient';

import PublishedMenu from './PublishedMenu';
import styles from './styles';

const MenuList = () => {
  const { data } = useUser();
  const salonList = data?.salon;
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.getManiplatorList(salonList?.[0]?.salonId),
  );

  const { list: manipulatorRes } = useList<IMenuManipulator | any>(
    menuQuery.getManiplators(salonList?.[0]?.salonId),
  );

  const currentSalonId = useMemo(() => {
    return salonList?.[0]?.salonId || '';
  }, [salonList]);

  const [selectedGender, setSelectedGender] = useState('');

  const handleChange = (event: any) => {
    setSelectedGender(event.target.value);
  };

  // List
  const privateList = useMemo(() => {
    const list = res?.docs || [];
    return list.filter((item: IMenu) => item?.status === MENU_STATUS.PRIVATE);
  }, [res?.docs]);
  const pulicList = useMemo(() => {
    const list = res?.docs || [];
    return list.filter((item: IMenu) => item?.status === MENU_STATUS.PUBLIC);
  }, [res?.docs]);

  const manipulatorList = useMemo(() => {
    return manipulatorRes.map((item) => ({
      id: item._id,
      name: item.nameKana,
    }));
  }, [manipulatorRes]);

  // Re-fetch list
  const handleRefetchList = () => {
    queryClient.prefetchQuery({
      queryKey: ['menu', 'list', 'salonId', salonList?.[0]?.salonId],
    });
  };

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
              <Select
                value={selectedGender}
                onChange={handleChange}
                sx={styles.nameSelect}
                displayEmpty
                renderValue={
                  selectedGender !== ''
                    ? undefined
                    : () => <Box sx={styles.placeholder}>整体師</Box>
                }
                IconComponent={(iconProps) => {
                  if (isEmpty(selectedGender.toString())) {
                    return (
                      <IconButton {...iconProps}>
                        <ArrowDownSvg />
                      </IconButton>
                    );
                  }
                  return (
                    <IconButton onClick={() => setSelectedGender('')}>
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
            </>
          )}
        </Box>
        {res ? (
          <>
            <PublishedMenu
              menus={pulicList}
              currentSalonId={currentSalonId}
              onRefetchList={handleRefetchList}
            />
            <UnpublishedMenu
              menus={privateList}
              currentSalonId={currentSalonId}
              onRefetchList={handleRefetchList}
            />
          </>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="flex-start"
            minHeight={570}
          >
            <CircularProgress />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MenuList;
