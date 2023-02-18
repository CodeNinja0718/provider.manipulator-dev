import type { InferType } from 'yup';
import { array, boolean, number, object, string } from 'yup';

const schema = object({
  name: string().required(),
  order: number().required().min(0, 'Order must be 0 or greater'),
  estimatedTime: number()
    .required()
    .min(0, 'Estimated Time must be 0 or greater'),
  timeDisplay: boolean(),
  menuTypes: array().min(1),
  price: number().required().min(0, 'Price must be 0 or greater'),
  ticketMount: number().required().min(0, 'Ticket mount must be 0 or greater'),
  ticketPrice: number().required().min(0, 'Ticket price must be 0 or greater'),
  couponExpirationDate: number()
    .required()
    .min(0, 'Coupon expiration date must be 0 or greater'),
  status: string().required(),
  availabelStaff: array().min(1),
});

export default schema;
export type RegisterMenuFormValues = InferType<typeof schema>;
