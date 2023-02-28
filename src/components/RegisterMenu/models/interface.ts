import type { Control } from 'react-hook-form';

import type { RegisterMenuFormValues } from './schema';

export interface IMenuDetailProps {
  control: Control<RegisterMenuFormValues>;
  initialValues: RegisterMenuFormValues;
  timeDisplay: boolean;
  onSetTimeDisplay: (value: boolean) => void;
}

export interface IMenuStaffProps {
  control: Control<RegisterMenuFormValues>;
}
