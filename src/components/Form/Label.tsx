import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface LabelProps {
  label: string;
  required?: boolean;
  extraLabel?: string | ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const labelStyle = {
  large: {
    fontSize: 16,
    mb: '12px',
  },
  medium: {
    fontSize: 16,
    mb: '6px',
    fontWeight: 'bold',
  },
  small: {},
};

const requiredStyle = {
  large: {
    fontSize: 16,
  },
  medium: {
    fontSize: 12,
    lineHeight: 2.19,
  },
  small: {},
};
const Label = ({ label, required, size = 'medium', className }: LabelProps) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center" flex={1}>
        <Typography
          component="label"
          color="heading"
          sx={labelStyle[size]}
          className={className}
        >
          {label}
          {required && (
            <Typography
              component="span"
              sx={requiredStyle[size]}
              fontSize={15}
              lineHeight={2.33}
              color="primary"
            >
              （必須）
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default Label;
