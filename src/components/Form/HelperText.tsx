import { FormHelperText, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import styles from './styles';

const HelperText = ({
  error,
  helperText,
  maxLength,
  value = '',
  fixedHelperText,
}: {
  error?: string;
  value?: string | unknown[];
  maxLength?: number;
  helperText?: string;
  fixedHelperText?: boolean;
}) => {
  return (
    <FormHelperText
      component="div"
      error={!!error}
      sx={{
        mt:
          error || helperText || maxLength || fixedHelperText
            ? { xs: '4px', tablet: 1 }
            : 0,
        ml: 0,
      }}
    >
      <Stack
        className="helper-text-container"
        direction="row"
        justifyContent="space-between"
        sx={{ minHeight: fixedHelperText ? 24 : 'auto' }}
      >
        {error && (
          <Stack
            component={motion.div}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit="initial"
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
            }}
            className="form-error"
            direction="row"
            spacing={{ tablet: 1, xs: '4px' }}
            sx={styles.errorContainer}
          >
            {/* <ErrorIcon /> */}
            <Typography fontSize={{ xs: 12, tablet: 14 }}>{error}</Typography>
          </Stack>
        )}
        {!error && helperText && (
          <Typography
            fontSize={{ xs: 12, tablet: 14 }}
            color="hint"
            className="form-hint"
            textAlign="start"
          >
            {helperText}
          </Typography>
        )}
        {maxLength && (
          <>
            {!error && !helperText && <div />}
            <Typography
              className="form-max-length"
              fontSize={{ tablet: 14, xs: 12 }}
              color="hint"
            >
              {`${value.length}/${maxLength}`}
            </Typography>
          </>
        )}
      </Stack>
    </FormHelperText>
  );
};

export default HelperText;
