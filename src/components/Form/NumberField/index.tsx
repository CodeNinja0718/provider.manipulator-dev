import { Box, FormControl } from '@mui/material';
import type { NumberInputProps } from 'components/NumberInput';
import { NumberInput } from 'components/NumberInput';
import { invoke } from 'lodash';
import type { ReactNode } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import Helper from 'utils/helpers';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface NumberFieldProps<TFormValues extends FieldValues>
  extends NumberInputProps {
  label?: string;
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  maxLength?: number;
  required?: boolean;
  labelCol?: number;
  columns?: number;
  fixedHelperText?: boolean;
  extraLabel?: string | ReactNode;
  helperText?: string;
  hideError?: boolean;
  adornment?: string | ReactNode;
  onBlur?: () => void;
}

const NumberField = <TFormValues extends FieldValues>({
  label,
  maxLength,
  required,
  control,
  name,
  extraLabel,
  helperText,
  adornment,
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
    <div>
      {label && (
        <Label label={label} required={required} extraLabel={extraLabel} />
      )}

      <FormControl fullWidth sx={{ justifyContent: 'center' }}>
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
            {...props}
          />
          {adornment}
        </Box>
      </FormControl>
      <HelperText
        error={error?.message}
        value={value}
        maxLength={maxLength}
        helperText={helperText}
      />
    </div>
  );
};

export default NumberField;
