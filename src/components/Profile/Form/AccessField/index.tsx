import PlusSvg from '@icons/icon_plus.svg';
import TrashBoxSvg from '@icons/icon_trashbox.svg';
import { Button, IconButton, Stack } from '@mui/material';
import { TextField } from 'components/Form';
import HelperText from 'components/Form/HelperText';
import Label from 'components/Form/Label';
import type { Control, FieldErrors } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import type { ProfileFormValues } from '../schema';
import styles from './styles';

interface AccessFieldProps {
  control: Control<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

const AccessField: React.FC<AccessFieldProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray<ProfileFormValues>({
    control,
    name: 'access',
  });

  return (
    <Stack sx={styles.accessField}>
      <Label label="アクセス" required />
      <Stack gap={10}>
        {fields.map((field, index) => (
          <Stack key={field.id} alignItems="start" direction="row" gap={8}>
            <TextField
              control={control}
              placeholder="東京駅10番出口徒歩5分"
              name={`access.${index}.value`}
              fixedHelperText={false}
            />
            {index > 0 && (
              <IconButton sx={styles.trashButton} onClick={() => remove(index)}>
                <TrashBoxSvg />
              </IconButton>
            )}
          </Stack>
        ))}
      </Stack>
      <Button
        sx={styles.appendButton}
        onClick={() => {
          append({ value: '' });
        }}
        variant="outlined"
        size="small"
      >
        <PlusSvg width={15} height={15} />
        追加する
      </Button>
      <HelperText />
    </Stack>
  );
};
export default AccessField;
