import { Regex } from 'utils/const';
import type { InferType } from 'yup';
import { object, string } from 'yup';

const schema = object({
  email: string().required().matches(Regex.EMAIL, 'Email is not valid'),
});

export default schema;
export type RegisterFormValues = InferType<typeof schema>;
