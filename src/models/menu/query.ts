const menuQuery = {
  getManiplatorList: (salonId: string) => ({
    queryKey: ['menu', 'list', 'salonId', salonId],
    apiUrl: `salon/${salonId}/menu/list`,
    staleTime: Infinity,
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
};

export default menuQuery;
