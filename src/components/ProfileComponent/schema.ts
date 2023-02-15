import type { InferType } from 'yup';
import { object, string } from 'yup';

const schema = object({
  name: string().required(),
});

export default schema;
export type CompleteProfileFormValues = InferType<typeof schema>;
