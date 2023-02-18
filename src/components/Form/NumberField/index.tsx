import type { FormControlProps } from '@mui/material';
import { Box, FormControl } from '@mui/material';
import type { NumberInputProps } from 'components/NumberInput';
import { NumberInput } from 'components/NumberInput';
import { invoke } from 'lodash';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import Helper from 'utils/helpers';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface NumberFieldProps<TFormValues extends FieldValues>
  extends NumberInputProps {
  label?: string;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  required?: boolean;
  labelCol?: number;
  columns?: number;
  fixedHelperText?: boolean;
  extraLabel?: string | ReactNode;
  hideError?: boolean;
  adornment?: string | ReactNode;
  formControlProps?: FormControlProps;
  showError?: boolean;
  showEndAdornment?: boolean;
  unitLabel?: ReactNode;
  onBlur?: () => void;
}

const NumberField = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  fixedHelperText,
  adornment,
  formControlProps,
  showError = true,
  showEndAdornment = true,
  unitLabel,
  ...props
}: NumberFieldProps<TFormValues>) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleBlur = () => {
    onBlur();
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={styles.formControlWrapper}
      error={!!error}
      {...formControlProps}
    >
      {label && <Label label={label} htmlFor={name} required={required} />}
      <Box display="flex" alignItems="center">
        <NumberInput
          className="tabletStyle"
          sx={styles.input}
          onWheel={(event) => {
            invoke(event, 'target.blur');
          }}
          onChange={(e: number | undefined, meta: any) => {
            if (meta) {
              onChange(e);
            }
          }}
          onBlur={handleBlur}
          value={value}
          error={!!error}
          formatter={(valueText) => Helper.addComma(valueText)}
          parser={(valueText) => valueText.replace(/,/g, '')}
          showEndAdornment={showEndAdornment}
          {...props}
        />
        {adornment}
        {unitLabel}
      </Box>
      {showError && (
        <HelperText error={error?.message} fixed={fixedHelperText} />
      )}
    </FormControl>
  );
};

export default NumberField;
