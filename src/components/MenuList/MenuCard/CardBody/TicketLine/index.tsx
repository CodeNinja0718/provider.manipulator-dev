import { Grid, Stack, Typography } from '@mui/material';

import styles from '../../styles';

const TicketLine = () => {
  return (
    <Grid container>
      <Grid item xs={12} tablet={4}></Grid>
      <Grid item xs={12} tablet={4} sx={{ ...styles.lineCream, pl: 20 }}>
        <Stack spacing={20} direction="row">
          <Typography fontWeight={500} sx={styles.textWrapper}>
            回数券
          </Typography>
          <Typography fontWeight={300}>55,000円</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} tablet={4} sx={{ ...styles.lineCream, pr: 20 }}>
        <Typography
          fontWeight={300}
          textAlign={{ xs: 'left', tablet: 'right' }}
          paddingLeft={{ xs: 105, tablet: 0 }}
        >
          10枚 × 5,500円
        </Typography>
      </Grid>
    </Grid>
  );
};
export default TicketLine;
