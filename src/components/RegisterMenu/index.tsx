import { useUser } from 'hooks';
import _map from 'lodash/map';
import { useRouter } from 'next/router';
import useInitValue from 'pages/my-page/menu/hook/useInitValue';
import { useState } from 'react';
import { CURRENCY } from 'utils/const';
import Helper from 'utils/helpers';
import queryClient from 'utils/queryClient';

import Component from './component';
import type { RegisterMenuFormValues } from './models/schema';

const RegisterMenu = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initValues = useInitValue();

  useUser({ enabled: false });

  const currentUserQuery = queryClient
    .getQueryCache()
    .findAll(['currentUser'])
    .map((each) => {
      return each?.state?.data;
    });

  const handleSubmit = (value: RegisterMenuFormValues) => {
    const manipulatorIds = _map(currentUserQuery, (item: any) => item._id);
    const params = {
      ...value,
      manipulatorIds,
      currency: CURRENCY.JPY,
    };

    setLoading(true);
    router.push(`${Helper.parseURLByParams(params, '/my-page/menu/register')}`);
    router.push(
      `${Helper.parseURLByParams(params, '/my-page/menu/register-review')}`,
    );
  };

  return (
    <Component
      loading={loading}
      onSubmit={handleSubmit}
      initialValues={{
        ...initValues,
      }}
    />
  );
};

export default RegisterMenu;
