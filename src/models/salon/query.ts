const authQuery = {
  updateSalonProfile: {
    apiUrl: (params: Record<string, unknown>) =>
      `/salon/salons/${params.salonId}`,
    method: 'put',
    successMessage: 'お支払い方法を削除しました',
  },
};

export default authQuery;
