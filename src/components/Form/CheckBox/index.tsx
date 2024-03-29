import type { FormControlProps } from '@mui/material';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { IListItem } from 'hooks/types';
import { isEmpty } from 'lodash';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';
import CheckboxBase from './CheckboxBase';

interface CheckBoxFieldProps<TFormValues extends FieldValues>
  extends RadioGroupProps {
  label?: string;
  required?: boolean;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  data: IListItem[];
  columns?: number;
  showSelectAll?: boolean;
  layout?: 'vertical' | 'horizontal';
  formControlProps?: FormControlProps;
  fixedHelperText?: boolean;
  spacing?: number;
  disabled?: boolean;
}

const CheckBox = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  data = [],
  showSelectAll,
  layout = 'vertical',
  columns,
  formControlProps,
  spacing,
  disabled = false,
}: CheckBoxFieldProps<TFormValues>) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const allIds = data.map((item) => item.id);

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={styles.formControlWrapper}
      error={!!error}
      {...formControlProps}
    >
      {label && <Label label={label} required={required} />}
      <FormGroup>
        <Grid container spacing={spacing}>
          {showSelectAll && !isEmpty(data) && (
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                disabled={disabled}
                sx={{
                  whiteSpace: 'pre-line',
                  ml: 0,
                  bgcolor: 'transparent !important',
                }}
                control={
                  <CheckboxBase
                    sx={{ p: 0, mt: 4, mr: 8 }}
                    checked={allIds.every((val) =>
                      (value as any[]).includes(val),
                    )}
                  />
                }
                label="すべてチェック"
                onChange={(_, checked) => {
                  if (checked) {
                    onChange([
                      ...value,
                      ...new Set(
                        allIds.filter((val) => !(value as any[]).includes(val)),
                      ),
                    ]);
                  } else {
                    onChange([
                      ...(value as any[]).filter(
                        (val) => !allIds.includes(val),
                      ),
                    ]);
                  }
                }}
              />
            </Grid>
          )}
          {data.map((option) => {
            return (
              <Grid
                item
                key={option.id}
                xs={columns || (layout === 'vertical' ? 12 : 6)}
              >
                <FormControlLabel
                  disabled={disabled}
                  sx={{
                    whiteSpace: 'pre-line',
                    m: 0,
                    alignItems: 'flex-start',
                  }}
                  control={
                    <CheckboxBase
                      checked={value.includes(option.id as never)}
                      sx={{ p: 0, mt: 4, mr: 8 }}
                    />
                  }
                  label={
                    <Typography color="black" fontSize={16}>
                      {option.name}
                    </Typography>
                  }
                  onChange={(_, checked) => {
                    if (checked) {
                      onChange(value.concat(option.id as never));
                    } else {
                      onChange(value.filter((item) => item !== option.id));
                    }
                  }}
                  className={`${
                    value.includes(option.id as never) ? 'active' : {}
                  }`}
                />
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
      <HelperText error={error?.message} />
    </FormControl>
  );
};

export default CheckBox;
