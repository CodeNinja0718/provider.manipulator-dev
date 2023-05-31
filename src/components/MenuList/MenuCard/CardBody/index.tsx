import ArrowRight from '@icons/arrow-right.svg';
import DeleteIcon from '@icons/icon_trashbox.svg';
import { Box, Button } from '@mui/material';
import { useGlobalState, useMutate } from 'hooks';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useRouter } from 'next/router';

import styles from '../styles';
import PriceLine from './PriceLine';

interface CardBodyProps {
  data: IMenu;
  isDisableAction: boolean;
  onRefetchList: () => void;
}
const CardBody = ({ data, isDisableAction, onRefetchList }: CardBodyProps) => {
  const router = useRouter();
  const { setConfirmModal } = useGlobalState();
  const handleOpenDetail = () => {
    router.push(`${router.pathname}/${data?.salonId}/${data?._id}`);
  };
  const { mutateAsync: handleDeleteMenu } = useMutate(
    menuQuery.deleteMenu(data?.salonId, data?._id),
  );

  // Handle Delete Menu
  const handleConfirmDeleteMenu = () => {
    handleDeleteMenu(
      {},
      {
        onSuccess: () => {
          onRefetchList();
        },
      },
    );
  };

  const showConfirmLogout = () => {
    setConfirmModal({
      title: 'メニュー削除',
      onConfirm: handleConfirmDeleteMenu,
      content: '本当に削除しますか？',
    });
  };

  return (
    <Box sx={styles.menuCardBody}>
      <PriceLine data={data} />
      {!isDisableAction && (
        <>
          <Box display="flex">
            <Button
              variant="outlined"
              endIcon={<ArrowRight />}
              sx={styles.button}
              onClick={handleOpenDetail}
            >
              編集
            </Button>
          </Box>
          <Box display="flex" justifyContent={'center'}>
            <Button
              sx={styles.buttonDelete}
              startIcon={<DeleteIcon />}
              onClick={showConfirmLogout}
            >
              削除
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
export default CardBody;
