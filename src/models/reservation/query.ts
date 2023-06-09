const reservationQuery = {
  getReservationList: ({
    date,
    manipulatorId,
    salonId,
  }: Record<string, unknown>) => ({
    apiUrl: `/reservation/manipulator/reservations`,
    queryKey: ['reservation-list', date, manipulatorId, salonId],
    enabled: !!date && !!manipulatorId && !!salonId,
    customParams: {
      date,
      manipulatorId,
      salonId,
      page: 1,
      limit: 1000,
    },
  }),
  reservationDetail: ({
    id,
    salonId,
    manipulatorId,
  }: Record<string, unknown>) => ({
    apiUrl: `/reservation/manipulator/reservations/${id}`,
    queryKey: ['reservation-detail', id, salonId, manipulatorId],
    enabled: !!id && !!salonId && !!manipulatorId,
    customParams: {
      manipulatorId,
      salonId,
    },
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
