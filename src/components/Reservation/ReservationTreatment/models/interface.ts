import type { Control } from 'react-hook-form';

import type { TreatmentFormValues } from './schema';

export interface ITreatmentFormProps {
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
}

export interface IMenuStaffProps {
  control: Control<TreatmentFormValues>;
}
