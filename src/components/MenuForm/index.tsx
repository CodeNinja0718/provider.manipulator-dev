import { useUser } from 'hooks';
import type { IStaff } from 'models/salon/interface';
import { useState } from 'react';

import Component from './component';
import type { MenuFormValues } from './models/schema';

interface MenuFormProps {
  onSubmit: (param: MenuFormValues) => void;
  defaultValues: MenuFormValues;
  staffs: IStaff[];
}

const MenuForm = ({ onSubmit, defaultValues, staffs }: MenuFormProps) => {
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
      staffs={staffs}
      initialValues={{
        ...defaultValues,
      }}
    />
  );
};

export default MenuForm;
