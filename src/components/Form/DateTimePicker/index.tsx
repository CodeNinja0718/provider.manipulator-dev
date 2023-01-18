import CalendarIcon from '@icons/calendar.svg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  SvgIcon,
  TextField,
} from '@mui/material';
import type { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import useBreakpoint from 'hooks/useBreakpoint';
import { omit } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { DateFormat } from 'utils/const';
import t from 'utils/translator';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

interface DateTimePickerProps<TFormValues extends FieldValues>
  extends Omit<
    MuiDateTimePickerProps<Date | Dayjs, Date | Dayjs>,
    'onChange' | 'renderInput' | 'value'
  > {
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  label?: string;
  required?: boolean;
  labelCol?: number;
  columns?: number;
  placeholder?: string;
  onSave?: (date: string) => void;
}

const DatePicker = <TFormValues extends FieldValues>({
  label,
  required,
  control,
  name,
  inputFormat = DateFormat.JP_YEAR_MONTH_DATE_HOUR_MS,
  placeholder,
  minDate,
  onSave,
  ...props
}: DateTimePickerProps<TFormValues>) => {
  const {
    field: { value = null, onBlur, onChange, ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const ref = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const isBreakpoint = useBreakpoint({});

  useEffect(() => {
    if (value) {
      setDateValue(dayjs(value));
      setTime(dayjs(value));
    } else {
      setDateValue(null);
      setTime(null);
    }
  }, [value]);

  useEffect(() => {
    ref?.current?.focus();
  }, [dateValue]);

  const handleSetFieldValue = () => {
    setOpen(false);
    if (dateValue && time) {
      const dateTimeValue = dateValue
        .set('hour', time.get('hour'))
        .set('minute', time.get('minute'))
        .toISOString();
      if (onSave) {
        onSave(dateTimeValue);
      }
      onChange(dateTimeValue);
    }
  };

  const handleSetTime = (timeValue: Dayjs | null) => {
    if (timeValue?.isValid()) {
      setDateValue((oldDateValue) => {
        if (oldDateValue) {
          return oldDateValue
            .set('hour', timeValue.get('hour'))
            .set('minute', timeValue.get('minute'));
        }
        return oldDateValue;
      });
    }
    setTime(timeValue);
  };

  return (
    <div className="date-time-picker">
      {label && <Label label={label} required={required} />}

      <MuiDateTimePicker
        {...props}
        {...otherField}
        value={value}
        onChange={onChange}
        readOnly
        inputFormat={inputFormat}
        disableMaskedInput
        components={{
          OpenPickerIcon: () => (
            <SvgIcon component={CalendarIcon} className="tabletStyle" />
          ),
        }}
        renderInput={(params) => {
          return (
            <TextField
              sx={[styles.input, styles.datepicker] as never}
              {...omit(params, ['onKeyUp', 'onKeyDown'])}
              {...params}
              size={isBreakpoint ? 'small' : 'medium'}
              margin="none"
              onBlur={onBlur}
              error={!!error}
              onClick={() => {
                setOpen(true);
              }}
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder || params.inputProps?.placeholder,
              }}
            />
          );
        }}
      />

      <HelperText error={error?.message} />

      <Dialog
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            // onClose();
          }
        }}
        open={open}
        aria-labelledby="timepicker-modal-title"
        aria-describedby="timepicker-modal-description"
        maxWidth="card"
      >
        <DialogContent sx={{ p: 2 }}>
          <Box>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={dateValue}
              minDate={minDate}
              onChange={(newValue) => {
                if (dayjs.isDayjs(newValue)) {
                  if (time) {
                    const combinedTime = newValue
                      .set('hour', time.get('hour'))
                      .set('minute', time.get('minute'));
                    setDateValue(combinedTime);
                  }
                  setDateValue(newValue);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Box sx={{ width: 1, maxWidth: 280, margin: '16px auto' }}>
              <MuiDateTimePicker
                components={{
                  OpenPickerIcon: () => (
                    <SvgIcon
                      color="primary"
                      component={AccessTimeIcon}
                      className="tabletStyle"
                    />
                  ),
                }}
                disabled={!dateValue}
                inputFormat="HH:mm"
                value={dateValue && time && time.isValid() ? dateValue : time}
                mask="__:__"
                OpenPickerButtonProps={{ disabled: true }}
                onChange={handleSetTime}
                renderInput={(params) => {
                  return (
                    <TextField
                      sx={[styles.input, styles.datepicker] as never}
                      {...omit(params, ['onKeyUp', 'onKeyDown'])}
                      size={isBreakpoint ? 'small' : 'medium'}
                      margin="none"
                      inputRef={ref}
                    />
                  );
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: '0px 16px 16px' }}>
          <Stack spacing={1} direction="row">
            <Button
              size="small"
              onClick={() => setOpen(false)}
              sx={{ width: 112 }}
            >
              {t('global.cancel')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="icon-button"
              onClick={handleSetFieldValue}
              fullWidth
              disabled={!time?.isValid() || !dateValue?.isValid()}
              sx={{ width: 112, svg: { color: 'white' } }}
            >
              {t('global.settle')}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DatePicker;
