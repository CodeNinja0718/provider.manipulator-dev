import Layout from 'components/Layout';
import MenuForm from 'components/MenuForm';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import { useRouter } from 'next/router';
import Helper from 'utils/helpers';

const RegisterMenuPage = () => {
  const router = useRouter();

  const handleSubmit = (params: MenuFormValues) => {
    router.push(
      `${Helper.parseURLByParams(
        params,
        `/my-page/menu/register/${router?.query.slug}`,
      )}`,
    );
    router.push(
      `${Helper.parseURLByParams(
        params,
        `/my-page/menu/register-review/${router?.query.slug}`,
      )}`,
    );
  };

  return <MenuForm onSubmit={handleSubmit} />;
};

RegisterMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterMenuPage;
