import useGlobalState from 'hooks/useGlobalState';
import useMutate from 'hooks/useMutate';
import Helper from 'utils/helpers';
import queryClient from 'utils/queryClient';

import authQuery from './query';

const useLogout = () => {
  const { setConfirmModal } = useGlobalState();
  const { mutateAsync: handleLogout } = useMutate<{ refreshToken: string }>(
    authQuery.logout,
  );
  const logout = () => {
    const webCookie = Helper.getWebCookie();
    try {
      handleLogout({ refreshToken: webCookie?.refreshToken || '' });
    } finally {
      setTimeout(() => Helper.removeWebCookie());
      queryClient
        .getQueryCache()
        .findAll(['currentUser'])
        .forEach((query) => query.reset());
    }
  };

  const showConfirmLogout = () => {
    setConfirmModal({
      title: 'ログアウト',
      onConfirm: logout,
      content: '本当にログアウトしますか？',
    });
  };
  return { logout: showConfirmLogout };
};

export default useLogout;
