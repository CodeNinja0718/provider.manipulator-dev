import useGlobalState from 'hooks/useGlobalState';
import useMutate from 'hooks/useMutate';
import { useRouter } from 'next/router';
import Helper from 'utils/helpers';
import queryClient from 'utils/queryClient';

import authQuery from './query';

const useLogout = () => {
  const { replace, pathname } = useRouter();
  const { setConfirmModal } = useGlobalState();
  const { mutateAsync: handleLogout } = useMutate(authQuery.logout);
  const logout = async () => {
    handleLogout(null);
    setTimeout(() => Helper.removeWebCookie());
    await queryClient.invalidateQueries(['currentUser'], {
      refetchType: 'none',
    });
    // setTimeout(() =>
    //   queryClient.resetQueries(['currentUser'], undefined, {
    //     cancelRefetch: true,
    //   }),
    // );
    if (pathname.startsWith('/customer')) {
      replace('/');
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
