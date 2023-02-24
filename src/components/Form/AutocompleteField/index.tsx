import ArrowDownSvg from '@icons/arrow-down.svg';
import type { AutocompleteProps, FormControlProps } from '@mui/material';
import { Autocomplete, FormControl, OutlinedInput } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface AutocompleteFieldProps<
  TFormValues extends FieldValues,
  IOptions,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<
    AutocompleteProps<IOptions, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  label?: string;
  placerholder?: string;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  maxLength?: number;
  required?: boolean;
  loading?: boolean;
  showError?: boolean;
  formControlProps?: FormControlProps;
  fixedHelperText?: boolean;
}

const AutocompleteField = <
  TFormValues extends FieldValues,
  IOptions,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  name,
  control,
  label,
  placerholder,
  required,
  disabled,
  loading,
  showError = true,
  formControlProps,
  fixedHelperText = true,
  ...props
}: AutocompleteFieldProps<
  TFormValues,
  IOptions,
  Multiple,
  DisableClearable,
  FreeSolo
>) => {
  const {
    field: { value = null, ...otherField },
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
      {label && <Label label={label} required={required} />}
      <Autocomplete
        id={name}
        value={value as any}
        placeholder="text"
        onChange={(_e, newValue) => {
          otherField.onChange(newValue);
        }}
        data-disabled={disabled}
        sx={styles.autocompleteInput}
        popupIcon={<ArrowDownSvg />}
        disabled={disabled}
        // eslint-disable-next-line unused-imports/no-unused-vars
        renderInput={({ InputLabelProps, InputProps, ...params }) => (
          <OutlinedInput
            {...params}
            {...InputProps}
            endAdornment={
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {InputProps.endAdornment}
              </>
            }
            placeholder={placerholder}
          />
        )}
        {...props}
      />
      {showError && (
        <HelperText error={error?.message} fixed={fixedHelperText} />
      )}
    </FormControl>
  );
};

export default AutocompleteField;
