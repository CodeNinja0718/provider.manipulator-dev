import ArrowDownSvg from '@icons/arrow-down.svg';
import CloseIcon from '@icons/close.svg';
import type { FormControlProps, SxProps, Theme } from '@mui/material';
import { Box, FormControl, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import MuiSelect from '@mui/material/Select';
import { isEmpty } from 'lodash';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface SelectFieldProps<TFormValues extends FieldValues>
  extends SelectProps {
  label?: string;
  required?: boolean;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  maxLength?: number;
  data: { id: string | number; name: string | number }[];
  clearable?: boolean;
  showError?: boolean;
  formControlProps?: FormControlProps;
  fixedHelperText?: boolean;
  handleChange?: (e?: SelectChangeEvent) => void;
  menuListProps?: SxProps<Theme>;
  menuItemSx?: SxProps<Theme>;
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
  clearable = true,
  formControlProps,
  showError = true,
  fixedHelperText = true,
  handleChange,
  menuListProps,
  menuItemSx,
  ...props
}: SelectFieldProps<TFormValues>) => {
  const {
    field: { value = multiple ? [] : '', onChange, ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={styles.formControlWrapper}
      error={!!error}
      {...formControlProps}
    >
      {label && <Label label={label} required={required} htmlFor={name} />}

      <MuiSelect
        variant="outlined"
        sx={styles.selectInput}
        {...props}
        {...otherField}
        onChange={(e) => {
          if (handleChange) handleChange();
          onChange(e);
        }}
        value={value}
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
              maxHeight: 300,
              px: 1,
              ...menuListProps,
            },
          },
        }}
        IconComponent={(iconProps) => {
          if (clearable && !isEmpty(value?.toString())) {
            return (
              <IconButton
                {...iconProps}
                style={{
                  pointerEvents: 'auto',
                }}
                onClick={() => onChange('')}
              >
                <CloseIcon />
              </IconButton>
            );
          }
          return (
            <IconButton {...iconProps}>
              <ArrowDownSvg />
            </IconButton>
          );
        }}
      >
        <MenuItem
          key="none"
          value=""
          disabled={required}
          sx={{
            ...menuItemSx,
          }}
        >
          <Box sx={styles.placeholder}>{placeholder}</Box>
        </MenuItem>
        {data.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
            sx={{
              ...menuItemSx,
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>

      {showError && (
        <HelperText error={error?.message} fixed={fixedHelperText} />
      )}
    </FormControl>
  );
};

export default Select;
