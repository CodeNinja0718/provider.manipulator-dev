import VisibleIcon from '@icons/visible.svg';
import VisibleOffIcon from '@icons/visible-off.svg';
import type { OutlinedInputProps } from '@mui/material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';
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

interface TextInputProps<TFormValues extends FieldValues>
  extends OutlinedInputProps {
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
}

const TextField = <TFormValues extends FieldValues>({
  label,
  maxLength,
  required,
  control,
  name,
  extraLabel,
  helperText,
  fixedHelperText,
  type,
  ...props
}: TextInputProps<TFormValues>) => {
  const {
    field: { value = '', ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const renderEndAdornment = () => {
    if (type === 'password') {
      return (
        <InputAdornment position="end" sx={styles.adornmentPassword}>
          <IconButton
            aria-label="toggle-password"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            <SvgIcon
              color="primary"
              component={showPassword ? VisibleOffIcon : VisibleIcon}
            />
          </IconButton>
        </InputAdornment>
      );
    }
    return props.endAdornment;
  };
  return (
    <FormControl fullWidth>
      {label && (
        <Label
          label={label}
          required={required}
          extraLabel={extraLabel}
          size={props.size}
          className="textFieldLabel"
        />
      )}

      <OutlinedInput
        className="tabletStyle"
        sx={styles.input}
        {...props}
        {...otherField}
        type={
          // eslint-disable-next-line no-nested-ternary
          type === 'password' ? (!showPassword ? 'password' : 'text') : type
        }
        value={value}
        error={!!error}
        inputProps={{ maxLength, ...props.inputProps }}
        endAdornment={renderEndAdornment()}
      />

      <HelperText
        error={error?.message}
        value={value}
        maxLength={maxLength}
        helperText={helperText}
        fixedHelperText={fixedHelperText}
      />
    </FormControl>
  );
};

export default TextField;
