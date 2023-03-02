import type { Control } from 'react-hook-form';

import type { MenuFormValues } from './schema';

export interface IMenuFormProps {
  control: Control<MenuFormValues>;
  initialValues: MenuFormValues;
  timeDisplay: boolean;
  onSetTimeDisplay: (value: boolean) => void;
}

export interface IMenuStaffProps {
  control: Control<MenuFormValues>;
}
