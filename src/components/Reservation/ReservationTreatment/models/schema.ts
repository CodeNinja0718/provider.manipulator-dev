import type { InferType } from 'yup';
import { array, number, object, string } from 'yup';

const schema = object({
  price: number().min(0, 'Price must be 0 or greater'),
  treatmentInfo: string().required(),
  treatmentFile: array(),
  menuId: string(),
});

export default schema;
export type TreatmentFormValues = InferType<typeof schema>;
