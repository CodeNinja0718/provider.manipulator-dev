const reservationQuery = {
  getReservationList: (date: string) => ({
    apiUrl: `/reservation/manipulator/reservations?date=${date}`,
    queryKey: ['reservation-list', date],
    enabled: !!date,
    customParams: {
      page: 1,
      limit: 1000,
    },
  }),
  reservationDetail: (id: string | any) => ({
    apiUrl: `/reservation/manipulator/reservations/${id}`,
    queryKey: ['reservation-detail', id],
    enabled: !!id,
  }),
  reservationComplete: (reservationId: string | any) => ({
    apiUrl: `/reservation/manipulator/reservations/${reservationId}/complete`,
    method: 'put',
    successMessage: '編集メニュー成功',
    enabled: !!reservationId,
  }),
};

export default reservationQuery;
