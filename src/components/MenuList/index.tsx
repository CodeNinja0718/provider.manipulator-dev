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
import { useList, useUser } from 'hooks';
import { isEmpty } from 'lodash';
import type { IMenu, IMenuManipulator } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import api from 'utils/api';
import queryClient from 'utils/queryClient';

import PublishedMenu from './PublishedMenu';
import styles from './styles';

const MenuList = () => {
  const { data, isOwner } = useUser();
  const salonList = data?.salon;
  const salonId = salonList?.[0]?.salonId;
  const [isLoading, setLoading] = useState(false);

  const { list: manipulatorRes } = useList<IMenuManipulator | any>(
    menuQuery.getManiplators(salonList?.[0]?.salonId, !isOwner),
  );
  const [selectedManipulator, setSelectedManipulator] = useState<
    string | undefined
  >('');

  useEffect(() => {
    if (data) {
      setSelectedManipulator(data._id);
    }
  }, [data]);

  const [publicMenus, setPublicMenus] = useState<IMenu[]>([]);
  const [privateMenus, setPrivateMenus] = useState<IMenu[]>([]);

  const currentSalonId = useMemo(() => {
    return salonList?.[0]?.salonId || '';
  }, [salonList]);

  const fetchMenuData = useCallback(
    async (isPublic = true) => {
      if (salonId && selectedManipulator) {
        const { data: result } = await api.get(`salon/${salonId}/menu/list`, {
          params: {
            page: 1,
            limit: 100,
            sort: 'order.asc_updateAt.desc',
            status: isPublic ? 'public' : 'private',
            manipulatorId: selectedManipulator,
          },
        });
        return result?.docs || [];
      }

      return [];
    },
    [selectedManipulator, salonId],
  );

  const loadMenuData = useCallback(async () => {
    setLoading(true);
    setPublicMenus(await fetchMenuData());
    setPrivateMenus(await fetchMenuData(false));
    setLoading(false);
  }, [fetchMenuData]);

  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  const handleChange = async (event: any) => {
    setSelectedManipulator(event.target.value);
  };

  const manipulatorList = useMemo(() => {
    return manipulatorRes?.map((item) => ({
      id: item._id,
      name: item.name,
    }));
  }, [manipulatorRes]);

  // Re-fetch list
  const handleRefetchList = () => {
    queryClient.prefetchQuery({
      queryKey: ['menu', 'list', 'salonId', salonList?.[0]?.salonId],
      queryFn: loadMenuData,
    });
  };

  return (
    <Box sx={styles.wrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">メニュー管理</Typography>
      </Box>
      {isOwner && <DirectRegisterMenu currentSalonId={currentSalonId} />}

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <Box display="flex" flexDirection={'column'} p={{ xs: 20, tablet: 0 }}>
          {(publicMenus || privateMenus) && isOwner && (
            <>
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
                        setSelectedManipulator('');
                        setPublicMenus([]);
                        setPrivateMenus([]);
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
            </>
          )}
        </Box>
        {!isLoading ? (
          <>
            <PublishedMenu
              menus={publicMenus}
              currentSalonId={currentSalonId}
              isDisableAction={!isOwner}
              onRefetchList={handleRefetchList}
            />
            <UnpublishedMenu
              menus={privateMenus}
              currentSalonId={currentSalonId}
              isDisableAction={!isOwner}
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
