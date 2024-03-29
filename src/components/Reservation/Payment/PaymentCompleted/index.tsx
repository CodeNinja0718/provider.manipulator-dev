import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Helper from 'utils/helpers';

import styles from './styles';

interface IPaymentCompleted {}

const PaymentCompleted: React.FC<IPaymentCompleted> = () => {
  const router = useRouter();
  return (
    <Box sx={styles.contentWarpper}>
      <Box display="flex" justifyContent="center" sx={styles.title}>
        <Typography variant="title">決済</Typography>
      </Box>

      <Box mt={46}>
        <Typography
          component={'h3'}
          fontSize={18}
          color="#d82c2c"
          fontWeight={600}
        >
          決済が完了しました
        </Typography>
      </Box>

      <Button
        variant="contained"
        endIcon={<ArrowRight />}
        sx={styles.button}
        onClick={() =>
          router.push(
            `${Helper.parseURLByParams(
              router?.query,
              `/my-page/registration-reservation`,
            )}`,
          )
        }
      >
        次回予約登録
      </Button>
    </Box>
  );
};
export default PaymentCompleted;
