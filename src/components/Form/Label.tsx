import { Typography } from '@mui/material';

import styles from './styles';

interface LabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

const Label = ({
  label,
  required,
  className,
  htmlFor,
  ...props
}: LabelProps) => (
  <Typography
    component="label"
    htmlFor={htmlFor}
    color="black"
    className={className}
    sx={styles.formLabel}
    {...props}
  >
    {label}
    {required && (
      <Typography component="span" className="required-mark">
        必須
      </Typography>
    )}
  </Typography>
);

export default Label;
