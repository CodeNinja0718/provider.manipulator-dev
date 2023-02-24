import { Fade, FormHelperText } from '@mui/material';

import styles from './styles';

const HelperText = ({
  error,
  fixed = true,
}: {
  error?: string;
  fixed?: boolean;
}) => {
  return (
    <Fade in={!!error}>
      <FormHelperText
        error={!!error}
        sx={styles.formHelper}
        data-fixed={fixed}
        variant="standard"
      >
        {error}
      </FormHelperText>
    </Fade>
  );
};

export default HelperText;
