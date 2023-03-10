import { Box } from '@mui/material';
import type { IMenu } from 'models/menu/interface';

import CardBody from './CardBody';
import CardHeader from './CardHeader';
import styles from './styles';

interface MenuCardProps {
  menu: IMenu;
  isUnpublished?: boolean;
  onRefetchList: () => void;
}
const MenuCard = ({ menu, isUnpublished, onRefetchList }: MenuCardProps) => {
  return (
    <Box sx={styles.menuCardWrapper}>
      <CardHeader title={menu.name} isUnpublished={isUnpublished} />
      <CardBody data={menu} onRefetchList={onRefetchList} />
    </Box>
  );
};
export default MenuCard;
