const authQuery = {
  login: {
    apiUrl: '/auth/manipulator/login',
    metod: 'post',
  },
  currentUser: {
    queryKey: ['currentUser'],
    apiUrl: '/account/manipulator/profile',
  },
  logout: {
    apiUrl: '/auth/logout',
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
