import VisibleIcon from '@icons/visible.svg';
import VisibleOffIcon from '@icons/visible-off.svg';
import type { FormControlProps, OutlinedInputProps } from '@mui/material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from '@mui/material';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface TextInputProps<TFormValues extends FieldValues>
  extends OutlinedInputProps {
  label?: string;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  maxLength?: number;
  required?: boolean;
  showError?: boolean;
  formControlProps?: FormControlProps;
  fixedHelperText?: boolean;
}

const TextField = <TFormValues extends FieldValues>({
  label,
  maxLength,
  required,
  control,
  name,
  type,
  showError = true,
  formControlProps,
  fixedHelperText = true,
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
    <FormControl
      fullWidth
      variant="standard"
      sx={styles.formControlWrapper}
      error={!!error}
      {...formControlProps}
    >
      {label && <Label label={label} htmlFor={name} required={required} />}

      <OutlinedInput
        id={name}
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
      {type !== 'password' && showError && (
        <HelperText error={error?.message} fixed={fixedHelperText} />
      )}
    </FormControl>
  );
};

export default TextField;
