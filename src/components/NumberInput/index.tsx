import ArrowDownIcon from '@icons/arrow-down.svg';
import ArrowUpIcon from '@icons/arrow-up.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { ButtonBase, InputAdornment, OutlinedInput } from '@mui/material';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { InputAdornmentProps } from '@mui/material/InputAdornment';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import type { Theme } from '@mui/material/styles';
import { styled, useThemeProps } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import cx from 'clsx';
import { capitalize } from 'lodash';
import type { PropsWithChildren } from 'react';
import React from 'react';

import type { numberInputClasses } from './numberInputClasses';
import { getNumberInputUtilityClass } from './numberInputClasses';
import type { UseNumberInputOptions } from './useNumberinput';
import { useNumberInput } from './useNumberinput';

export type NumberInputClassKey = keyof typeof numberInputClasses;
export type NumberInputClasses = Partial<typeof numberInputClasses>;

type StepperClasses = {
  stepper?: string;
  stepperSmall?: string;
  stepperMedium?: string;
  button?: string;
  increment?: string;
  decrement?: string;
};

export type NumberInputProps = UseNumberInputOptions & {
  inputElement?: React.ReactElement;
  incrementIcon?: React.ReactNode;
  decrementIcon?: React.ReactNode;
  DecrementProps?: ButtonBaseProps;
  IncrementProps?: ButtonBaseProps;
  InputAdornmentProps?: InputAdornmentProps;
  StepperProps?: JSX.IntrinsicElements['div'] & {
    classes?: StepperClasses;
  };
} & Omit<OutlinedInputProps, 'onChange'>;

const useUtilityClasses = (ownerState: NumberInputProps) => {
  const { StepperProps, size } = ownerState;
  const slots = {
    stepper: ['stepper', size && `stepper${capitalize(size)}`],
    button: ['button'],
    increment: ['increment'],
    decrement: ['decrement'],
  };
  return composeClasses(
    slots,
    getNumberInputUtilityClass,
    StepperProps?.classes as Required<StepperClasses>,
  );
};

const NumberInputStepper = styled('div', {
  name: 'MuiNumberInput',
  slot: 'Stepper',
  overridesResolver: (props, styles) => [
    styles.stepper,
    props.size && styles[`size${capitalize(props.size)}`],
  ],
})({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '4px',
});

const NumberInputButton = styled(ButtonBase, {
  name: 'MuiNumberInput',
  slot: 'Button',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.button, styles[ownerState.type]];
  },
})<{
  ownerState: { size: 'small' | 'medium' | 'large' };
}>(({ theme, ownerState }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  ...(ownerState.size === 'small' && {
    '& svg': {
      fontSize: '1.25rem',
    },
  }),
}));

const defaultIncrementIcon = (
  <SvgIcon color="primary" fontSize="small">
    <ArrowUpIcon />
  </SvgIcon>
);
const defaultDecrementIcon = (
  <SvgIcon color="primary" fontSize="small">
    <ArrowDownIcon />
  </SvgIcon>
);

export const NumberInput = React.forwardRef<
  any,
  PropsWithChildren<NumberInputProps>
>(function NumberInput(inProps, ref) {
  const props = useThemeProps<Theme, NumberInputProps, 'MuiNumberInput'>({
    props: inProps,
    name: 'MuiNumberInput',
  });
  const {
    inputElement = <OutlinedInput />,
    endAdornment = null,
    // defaultValue,
    // allowMouseWheel,
    // keepWithinRange,
    // clampValueOnBlur,
    // focusInputOnChange,
    incrementIcon = defaultIncrementIcon,
    decrementIcon = defaultDecrementIcon,
    IncrementProps,
    DecrementProps,
    InputAdornmentProps,
    StepperProps,
    // eslint-disable-next-line unused-imports/no-unused-vars
    formatter,
    // eslint-disable-next-line unused-imports/no-unused-vars
    parser,
    size = 'medium',
    ...other
  } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const { inputRef, getInputProps, getIncrementProps, getDecrementProps } =
    useNumberInput(props);

  return React.cloneElement(inputElement, {
    ref,
    size,
    ...other,
    inputRef,
    inputProps: getInputProps(props),
    endAdornment: (
      <>
        {endAdornment}
        <InputAdornment {...InputAdornmentProps} position="end">
          <NumberInputStepper
            {...StepperProps}
            className={cx(classes.stepper, StepperProps?.className)}
          >
            <NumberInputButton
              {...IncrementProps}
              {...getIncrementProps(IncrementProps)}
              className={cx(
                classes.button,
                classes.increment,
                IncrementProps?.className,
              )}
              ownerState={{ size }}
            >
              {incrementIcon}
            </NumberInputButton>
            <NumberInputButton
              {...DecrementProps}
              {...getDecrementProps(DecrementProps)}
              className={cx(
                classes.button,
                classes.decrement,
                DecrementProps?.className,
              )}
              ownerState={{ size }}
            >
              {decrementIcon}
            </NumberInputButton>
          </NumberInputStepper>
        </InputAdornment>
      </>
    ),
  });
});
