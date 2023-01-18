import CloseIcon from '@icons/close.svg';
import { Box, FormControl, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import type { SelectProps } from '@mui/material/Select';
import MuiSelect from '@mui/material/Select';
import { isEmpty } from 'lodash';
import type { ReactNode } from 'react';
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
  data: { id: string | number; name: string | number }[];
  labelCol?: number;
  columns?: number;
  viewMode?: boolean;
  extraLabel?: string | ReactNode;
  fixedHelperText?: boolean;
}

const Select = <TFormValues extends FieldValues>({
  label,
  data = [],
  required,
  maxLength,
  control,
  name,
  placeholder,
  multiple,
  extraLabel,
  fixedHelperText,
  ...props
}: SelectFieldProps<TFormValues>) => {
  const {
    field: { value = multiple ? [] : '', ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth className="selectFieldCustom">
      {label && (
        <Label
          label={label}
          required={required}
          extraLabel={extraLabel}
          className="selectLabel"
        />
      )}

      <MuiSelect
        className="tabletStyle"
        sx={styles.input}
        {...props}
        {...otherField}
        value={value}
        error={!!error}
        displayEmpty
        inputProps={{ maxLength }}
        renderValue={
          value !== ''
            ? undefined
            : () => <Box sx={styles.placeholder}>{placeholder}</Box>
        }
        MenuProps={{
          PaperProps: {
            sx: {
              px: 1,
            },
          },
        }}
        IconComponent={(iconProps) => {
          if (isEmpty(value?.toString())) {
            return (
              <img
                {...iconProps}
                alt="arrow-down"
                src="/icons/arrow-down.svg"
              />
            );
          }
          return (
            <IconButton
              sx={styles.clearButton}
              onClick={() => otherField.onChange('')}
            >
              <CloseIcon />
            </IconButton>
          );
        }}
      >
        <MenuItem key="none" value="" disabled={required}>
          <Box sx={styles.placeholder}>{placeholder}</Box>
        </MenuItem>
        {data.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>

      <HelperText error={error?.message} fixedHelperText={fixedHelperText} />
    </FormControl>
  );
};

export default Select;
