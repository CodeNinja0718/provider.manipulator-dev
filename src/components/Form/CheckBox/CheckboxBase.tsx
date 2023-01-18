import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import type { CheckboxProps } from '@mui/material';
import { Checkbox, SvgIcon } from '@mui/material';

export interface ICheckboxBase extends CheckboxProps {
  fontSize?: 'small' | 'inherit' | 'medium' | 'large';
  iconClassName?: string;
}
const CheckboxBase = ({ iconClassName, fontSize, ...props }: ICheckboxBase) => {
  return (
    <Checkbox
      icon={
        <SvgIcon className={iconClassName} fontSize={fontSize}>
          <UnCheckedIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon className={iconClassName} fontSize={fontSize}>
          <CheckedIcon />
        </SvgIcon>
      }
      sx={{
        p: 1,
      }}
      {...props}
    />
  );
};

export default CheckboxBase;
