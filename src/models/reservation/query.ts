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
  reservationChange: (reservationId: string | any) => ({
    apiUrl: `/reservation/manipulator/reservations/${reservationId}/change-booking`,
    method: 'post',
    enabled: !!reservationId,
  }),
  reservationComplete: (reservationId: string | any) => ({
    apiUrl: `/reservation/manipulator/reservations/${reservationId}/complete-booking`,
    method: 'post',
    successMessage: '編集メニュー成功',
    enabled: !!reservationId,
  }),
  reservationRegistration: (reservationId: string | any) => ({
    apiUrl: `/reservation/manipulator/reservations/${reservationId}/next-reservation`,
    method: 'post',
    successMessage: '予約登録成功',
    enabled: !!reservationId,
  }),
};

export default reservationQuery;
