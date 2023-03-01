import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

import type { IDirectRegisterMenu } from '../models/interface';
import styles from './styles';

const DirectRegisterMenu = ({
  className,
  currentSalonId,
}: IDirectRegisterMenu) => {
  const router = useRouter();
  // Go to register menu
  const handleClick = () => {
    router.push(`${router.pathname}/register/${currentSalonId}`);
  };

  return (
    <Box display="flex">
      <Button
        variant="contained"
        endIcon={<ArrowRight />}
        sx={styles.button}
        onClick={handleClick}
        className={className}
      >
        メニュー登録する
      </Button>
    </Box>
  );
};

export default DirectRegisterMenu;
