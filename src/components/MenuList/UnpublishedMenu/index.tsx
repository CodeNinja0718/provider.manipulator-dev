import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';
import type { IMenu } from 'models/menu/interface';

import MenuCard from '../MenuCard';
import styles from '../styles';

interface UnpublishedMenuProps {
  menus: IMenu[];
  currentSalonId: string;
  isDisableAction: boolean;
  onRefetchList: () => void;
}
const UnpublishedMenu = ({
  menus,
  currentSalonId,
  isDisableAction,
  onRefetchList,
}: UnpublishedMenuProps) => {
  return (
    <CommonSection
      title="非掲載のメニュー"
      customHeadingClass="customHeadingClass"
    >
      <Box width="100%" pt={30}>
        <Box p={{ xs: 20, tablet: 0 }}>
          {menus && menus.length ? (
            menus.map((menu: IMenu) => (
              <MenuCard
                key={menu._id}
                menu={menu}
                isUnpublished={true}
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
export default UnpublishedMenu;
