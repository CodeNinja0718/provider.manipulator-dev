import RadioActive from '@icons/radio-active.svg';
import RadioDefault from '@icons/radio-default.svg';
import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup,
  SvgIcon,
} from '@mui/material';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { IListItem } from 'hooks/types';
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

interface RadioFieldProps<TFormValues extends FieldValues>
  extends RadioGroupProps {
  label?: string;
  required?: boolean;
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  data: IListItem[];
  labelCol?: number;
  columns?: number;
  helperText?: string;
  viewMode?: boolean;
  extraLabel?: string | ReactNode;
}

const Radio = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  data,
  helperText,
  extraLabel,
  ...props
}: RadioFieldProps<TFormValues>) => {
  const {
    field: { value = null, ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      {label && (
        <Label label={label} required={required} extraLabel={extraLabel} />
      )}

      <RadioGroup
        aria-labelledby="radio-buttons-group"
        row
        sx={{ mt: { xs: 1, tablet: 0 } }}
        value={value}
        {...props}
        {...otherField}
      >
        {data.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            sx={{
              mr: { xs: '30px', tablet: 4 },
              '.MuiTypography-root': {
                fontSize: { xs: 14, tablet: 16 },
              },
              '&:last-child': {
                mr: 0,
              },
            }}
            control={
              <MuiRadio
                sx={{ p: { xs: '10px', tablet: 1 } }}
                checkedIcon={
                  <SvgIcon
                    color="primary"
                    component={RadioActive}
                    className="tabletStyle"
                  />
                }
                icon={
                  <SvgIcon
                    color="primary"
                    component={RadioDefault}
                    className="tabletStyle"
                  />
                }
              />
            }
            label={item.name}
          />
        ))}
      </RadioGroup>

      <HelperText error={error?.message} helperText={helperText} />
    </div>
  );
};

export default Radio;
