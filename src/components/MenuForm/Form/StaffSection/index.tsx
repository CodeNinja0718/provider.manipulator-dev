import { Box, useMediaQuery } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox } from 'components/Form';
import type { IMenuStaffProps } from 'components/MenuForm/models/interface';
import styles from 'components/MenuForm/styles';
import { useMemo } from 'react';
import theme from 'theme';
import { MENU_INFO } from 'utils/const';

const StaffSection: React.FC<IMenuStaffProps> = ({ control, staffs }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'), {
    noSsr: true,
  });

  const listItems = useMemo(() => {
    return staffs.map((staff) => ({ ...staff, id: staff._id })).reverse();
  }, [staffs]);

  return (
    <CommonSection title="スタッフ選択">
      <Box sx={styles.sectionItem}>
        <Box
          display="flex"
          width="100%"
          sx={{
            ...styles.checkboxArea,
            '& label.MuiTypography-root': {
              mb: 20,
            },
          }}
          className="noSpacingCheckbox activeTheme"
        >
          <CheckBox
            name="availableStaff"
            control={control}
            data={listItems}
            layout="horizontal"
            spacing={10}
            label={MENU_INFO.AVAILABEL_STAFF}
            required
            columns={isTablet ? 12 : 6}
            showSelectAll
          />
        </Box>
      </Box>
    </CommonSection>
  );
};
export default StaffSection;
