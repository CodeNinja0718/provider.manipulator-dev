import Layout from 'components/Layout';
import MenuForm from 'components/MenuForm';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import MenuReview from 'components/MenuReview';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useInitValue from '../../hook/useInitValue';

const RegisterMenuPage = () => {
  const router = useRouter();

  const initValues = { ...useInitValue() };

  const { confirm } = router.query;
  const isConfirm = typeof confirm === 'string' && confirm === 'true';

  const [menuData, setMenuData] = useState<MenuFormValues>(initValues);

  const viewConfirmScreen = (params: MenuFormValues) => {
    setMenuData(params);
    router.push(
      {
        pathname: `/my-page/menu/register/${router?.query.slug}`,
        query: {
          confirm: 'true',
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isConfirm ? (
        <MenuReview menuData={menuData} />
      ) : (
        <MenuForm onSubmit={viewConfirmScreen} defaultValues={menuData} />
      )}
    </>
  );
};

RegisterMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterMenuPage;
