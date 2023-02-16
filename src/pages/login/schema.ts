import { Regex } from 'utils/const';
import type { InferType } from 'yup';
import { object, string } from 'yup';

const schema = object({
  email: string().required().trim().matches(Regex.EMAIL, 'Invalid email'),
  password: string().required(),
});

export default schema;
export type LoginFormValues = InferType<typeof schema>;
