import { Divider, Grid, Stack, Typography } from '@mui/material';
import type { IMenu } from 'models/menu/interface';

import styles from '../../styles';

interface PriceLineProps {
  data: IMenu;
}
const PriceLine = ({ data }: PriceLineProps) => {
  return (
    <Grid container marginBottom={10} gap={{ xs: 10, tablet: 0 }}>
      <Grid item xs={12} tablet={4} sx={{ pl: 20 }}>
        <Stack spacing={20} direction="row">
          <Typography fontWeight={500} sx={styles.textWrapper}>
            目安時間
          </Typography>

          <Typography fontWeight={300}>{data.estimatedTime}分</Typography>
        </Stack>
        <Divider sx={styles.divider} />
      </Grid>
      <Grid item xs={12} tablet={4} sx={{ pl: 20 }}>
        <Stack spacing={20} direction="row">
          <Typography fontWeight={500} sx={styles.textWrapper}>
            単発料金
          </Typography>
          <Typography fontWeight={300}>{data.price}円</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} tablet={4}></Grid>
    </Grid>
  );
};
export default PriceLine;
