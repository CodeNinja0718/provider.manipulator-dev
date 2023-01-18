const authQuery = {
  login: {
    apiUrl: '/account/provider/login',
  },
  currentUser: {
    queryKey: ['currentUser'],
    apiUrl: '/account/consumer/me',
  },
  logout: {
    apiUrl: `/account/consumter/logout`,
    method: 'delete',
  },
};

export default authQuery;
