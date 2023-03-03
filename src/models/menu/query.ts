const menuQuery = {
  getManiplatorList: (salonId: string | any) => ({
    queryKey: ['menu', 'list', 'salonId', salonId],
    apiUrl: `salon/${salonId}/menu/list`,
    useUrlQuery: false,
    enabled: !!salonId,
    customParams: {
      page: 1,
      limit: 100,
    },
  }),
  createMenu: (salonId: string | any) => ({
    apiUrl: `salon/${salonId}/menu/create-menu`,
    method: 'post',
    successMessage: '登録メニュー成功',
    enabled: !!salonId,
  }),
  detailMenu: (salonId: string | any, menuId: string | any) => ({
    apiUrl: `salon/${salonId}/menu/${menuId}`,
    enabled: !!salonId && !!menuId,
    queryKey: [salonId, menuId, 'menuDetail'],
    cacheTime: 0,
  }),
  updateMenu: (salonId: string | any, menuId: string | any) => ({
    apiUrl: `salon/${salonId}/menu/${menuId}`,
    method: 'put',
    successMessage: '編集メニュー成功',
    enabled: !!salonId,
  }),
};

export default menuQuery;
