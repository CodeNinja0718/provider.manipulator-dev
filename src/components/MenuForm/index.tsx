import { useUser } from 'hooks';
import _map from 'lodash/map';
import useInitValue from 'pages/my-page/menu/hook/useInitValue';
import { useState } from 'react';
import { CURRENCY } from 'utils/const';
import queryClient from 'utils/queryClient';

import Component from './component';
import type { MenuFormValues } from './models/schema';

interface MenuFormProps {
  onSubmit: (param: MenuFormValues) => void;
  defaultValues?: MenuFormValues;
}

const MenuForm = ({ onSubmit, defaultValues }: MenuFormProps) => {
  const [loading, setLoading] = useState(false);
  const initValues = { ...useInitValue(), ...defaultValues };

  useUser({ enabled: false });

  const currentUserQuery = queryClient
    .getQueryCache()
    .findAll(['currentUser'])
    .map((each) => {
      return each?.state?.data;
    });

  const handleSubmit = (value: MenuFormValues) => {
    const manipulatorIds = _map(currentUserQuery, (item: any) => item._id);
    const params = {
      ...value,
      manipulatorIds,
      currency: CURRENCY.JPY,
    };

    setLoading(true);
    onSubmit(params);
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

export default MenuForm;
