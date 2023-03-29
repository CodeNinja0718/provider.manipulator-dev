import { Stack } from '@mui/material';
import { Select, TextField } from 'components/Form';
import HelperText from 'components/Form/HelperText';
import Label from 'components/Form/Label';
import { useFetch } from 'hooks';
import type { IPrefectureItem } from 'models/resource/interface';
import resourceQuery from 'models/resource/query';
import { useMemo } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import type { ProfileFormValues } from '../schema';
import styles from './styles';

interface AddressFieldProps {
  control: Control<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

const AddressField: React.FC<AddressFieldProps> = ({ control }) => {
  const { data: prefectureList } = useFetch<{ result: IPrefectureItem[] }>(
    resourceQuery.prefectures,
  );

  const prefectureOptions = useMemo(
    () =>
      (prefectureList?.result || []).map((prefecture) => ({
        id: `${prefecture.provinceId}`,
        name: prefecture.provinceName,
      })),
    [prefectureList],
  );

  return (
    <Stack sx={styles.addressFieldWrapper}>
      <Label label="住所" required />
      <Stack direction="row" alignItems="stretch" mb={10} gap={10}>
        <Select
          name="prefecture"
          control={control}
          data={prefectureOptions}
          readOnly
          clearable={false}
          showError={false}
          formControlProps={{
            style: {
              maxWidth: 133,
            },
          }}
        />
        <TextField
          name="city"
          control={control}
          placeholder="市区町村"
          required
          showError={false}
          formControlProps={{
            style: {
              maxWidth: 193,
            },
          }}
        />
      </Stack>
      <TextField
        name="address"
        control={control}
        placeholder="中央1-1"
        showError={false}
      />
      <HelperText />
    </Stack>
  );
};

export default AddressField;
