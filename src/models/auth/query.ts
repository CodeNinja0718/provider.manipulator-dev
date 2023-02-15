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
  sendVerifyEmail: {
    apiUrl: '/account/manipulator/register/verify-email',
    method: 'post',
    successMessage: 'Email sent',
  },
  register: {
    apiUrl: '/account/manipulator/register',
    method: 'post',
    defaultToast: true,
  },
};

export default authQuery;
