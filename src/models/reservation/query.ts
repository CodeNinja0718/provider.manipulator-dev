const reservationQuery = {
  getReservationList: (date: string) => ({
    apiUrl: `/reservation/manipualtor/reservations?date=${date}`,
    queryKey: ['reservation-list', date],
    enabled: !!date,
    customParams: {
      page: 1,
      limit: 1000,
    },
  }),
};

export default reservationQuery;
