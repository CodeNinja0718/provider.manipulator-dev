import { Divider, Grid, Stack, Typography } from '@mui/material';
import type { IMenu } from 'models/menu/interface';
import { MENU_TYPE } from 'utils/const';
import Helper from 'utils/helpers';

import styles from '../../styles';

interface PriceLineProps {
  data: IMenu;
}
const PriceLine = ({ data }: PriceLineProps) => {
  const numberOfTicket = data?.ticket?.numberOfTicket || 1;
  const priceOfTicket = data?.ticket?.price || 1;
  const totalPrice = numberOfTicket * priceOfTicket;
  const hasCoupon = data?.menuTypes?.includes(MENU_TYPE[1]?.id || '');

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
          <Typography fontWeight={300}>
            {Helper.addComma(data.price)}円
          </Typography>
        </Stack>
        <Divider sx={styles.divider} />
      </Grid>
      <Grid
        item
        xs={12}
        tablet={4}
        sx={{ display: { xs: 'none', tablet: 'inline' } }}
      ></Grid>
      <Grid
        item
        xs={12}
        tablet={4}
        sx={{ display: { xs: 'none', tablet: 'inline' } }}
      ></Grid>
      {hasCoupon ? (
        <Grid item xs={12} tablet={8} sx={styles.couponWrapper}>
          <Stack
            direction={{ xs: 'column', tablet: 'row' }}
            alignItems={{ xs: 'flex-start', tablet: 'center' }}
            justifyContent="space-between"
          >
            <Stack spacing={20} direction="row">
              <Typography fontWeight={500} sx={styles.textWrapper}>
                回数券
              </Typography>
              <Typography fontWeight={300}>
                {Helper.addComma(totalPrice)}円
              </Typography>
            </Stack>
            <Typography fontWeight={300}>
              {`${numberOfTicket}枚 x ${Helper.addComma(priceOfTicket)}円`}
            </Typography>
          </Stack>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
export default PriceLine;
