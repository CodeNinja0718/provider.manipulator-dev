import { Box, FormControl, MenuItem, Select as MuiSelect } from '@mui/material';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import type { IListItem } from 'hooks/types';
import { find, get } from 'lodash';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface SelectFieldProps<TFormValues extends FieldValues>
  extends SelectProps {
  label?: string;
  required?: boolean;
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  maxLength?: number;
  data: IListItem[];
  labelCol?: number;
  columns?: number;
}

const MultipleSelect = <TFormValues extends FieldValues>({
  label,
  data = [],
  required,
  maxLength,
  control,
  name,
  placeholder,
  ...props
}: SelectFieldProps<TFormValues>) => {
  const {
    field: { value = [], onChange, ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const eventValue = get(event, 'target.name');
    onChange(
      typeof eventValue === 'string' ? eventValue.split(',') : eventValue,
    );
  };

  return (
    <div>
      {label && <Label label={label} required={required} />}

      <FormControl fullWidth sx={{ justifyContent: 'center' }}>
        <MuiSelect
          sx={styles.input}
          {...props}
          {...otherField}
          defaultValue={value}
          value={value}
          error={!!error}
          displayEmpty
          multiple
          onChange={handleChange}
          inputProps={{ maxLength }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected
                .map((item) => find(data, (i) => i.id === item)?.name)
                .join('、')}
            </Box>
          )}
          IconComponent={(iconProps) => {
            return (
              <img
                {...iconProps}
                alt="arrow-down"
                src="/icons/arrow-down.svg"
              />
            );
          }}
        >
          <MenuItem key="none" value="" disabled>
            <Box sx={styles.placeholder}>{placeholder}</Box>
          </MenuItem>
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>

      <HelperText error={error?.message} />
    </div>
  );
};

export default MultipleSelect;
