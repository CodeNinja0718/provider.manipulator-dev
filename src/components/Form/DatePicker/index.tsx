import CalendarIcon from '@icons/calendar.svg';
import { Box, SvgIcon, TextField } from '@mui/material';
import type { DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import useBreakpoint from 'hooks/useBreakpoint';
import { omit } from 'lodash';
import type { ReactNode } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { DateFormat } from 'utils/const';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface DatePickerProps<TFormValues extends FieldValues>
  extends Omit<
    DesktopDatePickerProps<Date | Dayjs, Date | Dayjs>,
    'onChange' | 'renderInput' | 'value'
  > {
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  required?: boolean;
  labelCol?: number;
  columns?: number;
  placeholder?: string;
  label?: string;
  extraLabel?: string | ReactNode;
}

const DatePicker = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  placeholder,
  inputFormat = DateFormat.YEAR_MONTH_DATE,
  extraLabel,
  ...props
}: DatePickerProps<TFormValues>) => {
  const isBreakpoint = useBreakpoint({});
  const {
    field: { value = null, onChange, ...otherField },
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

      <Box display="flex" alignItems="center" width={1}>
        <DesktopDatePicker
          {...props}
          {...otherField}
          onChange={(dateValue) => {
            if (dayjs.isDayjs(dateValue) && dateValue.isValid()) {
              onChange(dateValue.toISOString());
            } else onChange(dateValue);
          }}
          value={value}
          disableHighlightToday
          inputFormat={inputFormat}
          components={{
            OpenPickerIcon: () => (
              <SvgIcon
                color="primary"
                component={CalendarIcon}
                className="tabletStyle"
              />
            ),
          }}
          renderInput={(params) => {
            return (
              <TextField
                sx={[styles.input, styles.datepicker] as never}
                {...omit(params, ['onKeyUp', 'onKeyDown'])}
                onBlur={otherField.onBlur}
                error={!!error}
                // TODO: Replace by className
                size={isBreakpoint ? 'small' : 'medium'}
                margin="none"
                inputProps={{
                  ...params.inputProps,
                  placeholder: placeholder || params.inputProps?.placeholder,
                }}
              />
            );
          }}
        />
      </Box>

      <HelperText error={error?.message} />
    </div>
  );
};

export default DatePicker;
