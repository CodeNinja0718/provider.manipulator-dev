import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import type { CheckboxProps } from '@mui/material';
import { Checkbox } from '@mui/material';

export interface ICheckboxBase extends CheckboxProps {
  fontSize?: 'small' | 'inherit' | 'medium' | 'large';
  iconClassName?: string;
  viewBox?: string;
}

const CheckboxBase = ({ ...props }: ICheckboxBase) => {
  return (
    <Checkbox
      icon={<UnCheckedIcon />}
      checkedIcon={<CheckedIcon />}
      sx={{ padding: 0 }}
      {...props}
    />
  );
};

export default CheckboxBase;
