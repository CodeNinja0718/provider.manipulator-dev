import ArrowRight from '@icons/arrow-right.svg';
import DeleteIcon from '@icons/icon_trashbox.svg';
import { Box, Button } from '@mui/material';
import type { IMenu } from 'models/menu/interface';

import styles from '../styles';
import PriceLine from './PriceLine';
import TicketLine from './TicketLine';

interface CardBodyProps {
  data: IMenu;
}
const CardBody = ({ data }: CardBodyProps) => {
  return (
    <Box sx={styles.menuCardBody}>
      <PriceLine data={data} />
      {data.menuTypes.includes('ticket') && <TicketLine />}
      <Box display="flex">
        <Button variant="outlined" endIcon={<ArrowRight />} sx={styles.button}>
          編集
        </Button>
      </Box>
      <Box display="flex" justifyContent={'center'}>
        <Button sx={styles.buttonDelete} startIcon={<DeleteIcon />}>
          削除
        </Button>
      </Box>
    </Box>
  );
};
export default CardBody;
