import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';
import type { IMenu } from 'models/menu/interface';

import MenuCard from '../MenuCard';
import styles from '../styles';

interface PublishedMenuProps {
  menus: IMenu[];
  currentSalonId: string;
  onRefetchList: () => void;
  isDisableAction: boolean;
}
const PublishedMenu = ({
  menus,
  currentSalonId,
  onRefetchList,
  isDisableAction,
}: PublishedMenuProps) => {
  return (
    <CommonSection title="掲載中のメニュー一覧">
      <Box width="100%" pt={30}>
        <Box p={{ xs: 20, tablet: 0 }}>
          {menus && menus.length ? (
            menus.map((menu: IMenu) => (
              <MenuCard
                key={menu._id}
                menu={menu}
                isDisableAction={isDisableAction}
                onRefetchList={onRefetchList}
              />
            ))
          ) : (
            <Typography variant="subtitle1" sx={styles.emptyText}>
              空のリスト
            </Typography>
          )}
        </Box>
        {!isDisableAction && (
          <DirectRegisterMenu
            currentSalonId={currentSalonId}
            className="sectionButton"
          />
        )}
      </Box>
    </CommonSection>
  );
};
export default PublishedMenu;
