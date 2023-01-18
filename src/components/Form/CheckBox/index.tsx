import { FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { IListItem } from 'hooks/types';
import { isEmpty } from 'lodash';
import type { ReactNode } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import t from 'utils/translator';

import HelperText from '../HelperText';
import Label from '../Label';
import CheckboxBase from './CheckboxBase';

interface CheckBoxFieldProps<TFormValues extends FieldValues>
  extends RadioGroupProps {
  label?: string;
  required?: boolean;
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  data: IListItem[];
  labelCol?: number;
  columns?: number;
  helperText?: string;
  showSelectAll?: boolean;
  layout?: 'vertical' | 'horizontal';
  extraLabel?: string | ReactNode;
  iconClassName?: string;
  fixedHelperText?: boolean;
}

const CheckBox = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  data = [],
  helperText,
  showSelectAll,
  layout = 'vertical',
  extraLabel,
  iconClassName = 'tabletStyle',
  fixedHelperText = false,
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
    <div>
      {label && (
        <Label label={label} required={required} extraLabel={extraLabel} />
      )}

      <FormGroup>
        <Grid container>
          {showSelectAll && !isEmpty(data) && (
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                sx={{ whiteSpace: 'pre-line' }}
                control={
                  <CheckboxBase
                    sx={{ p: { xs: '10px', tablet: 1 } }}
                    iconClassName={iconClassName}
                    checked={value.length === data.length}
                  />
                }
                label={t('global.selectAll')}
                onChange={(_, checked) => {
                  if (checked) {
                    onChange(allIds);
                  } else {
                    onChange([]);
                  }
                }}
              />
            </Grid>
          )}
          {data.map((option) => {
            return (
              <Grid item xs={layout === 'vertical' ? 12 : 6} key={option.id}>
                <FormControlLabel
                  sx={{ whiteSpace: 'pre-line' }}
                  control={
                    <CheckboxBase
                      sx={{ p: { xs: '10px', tablet: 1 } }}
                      iconClassName={iconClassName}
                      checked={value.includes(option.id as never)}
                    />
                  }
                  label={
                    <Typography
                      color="heading"
                      fontSize={{ xs: 14, tablet: 16 }}
                    >
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
                />
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>

      <HelperText
        error={error?.message}
        value={value}
        helperText={helperText}
        fixedHelperText={fixedHelperText}
      />
    </div>
  );
};

export default CheckBox;
