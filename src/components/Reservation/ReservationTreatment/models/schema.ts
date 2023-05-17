import type { InferType } from 'yup';
import { array, boolean, number, object, string } from 'yup';

const schema = object({
  price: number().min(0, 'Price must be 0 or greater'),
  treatmentInfo: string().required(),
  treatmentFile: array(),
  menuId: string(),
  isTicketUsed: boolean(),
  couponCode: string(),
});

export default schema;
export type TreatmentFormValues = InferType<typeof schema>;
