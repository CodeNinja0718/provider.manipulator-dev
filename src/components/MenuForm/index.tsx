import { useUser } from 'hooks';
import { useState } from 'react';

import Component from './component';
import type { MenuFormValues } from './models/schema';

interface MenuFormProps {
  onSubmit: (param: MenuFormValues) => void;
  defaultValues: MenuFormValues;
}

const MenuForm = ({ onSubmit, defaultValues }: MenuFormProps) => {
  const [loading, setLoading] = useState(false);
  useUser({ enabled: false });

  const handleSubmit = (value: MenuFormValues) => {
    setLoading(true);
    onSubmit(value);
  };

  return (
    <Component
      loading={loading}
      onSubmit={handleSubmit}
      initialValues={{
        ...defaultValues,
      }}
    />
  );
};

export default MenuForm;
