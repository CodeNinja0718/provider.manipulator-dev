import { Box, useMediaQuery } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox } from 'components/Form';
import type { IMenuStaffProps } from 'components/MenuForm/models/interface';
import styles from 'components/MenuForm/styles';
import theme from 'theme';
import { AVAILABEL_STAFF, MENU_INFO } from 'utils/const';

const StaffSection: React.FC<IMenuStaffProps> = ({ control }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'), {
    noSsr: true,
  });

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
            data={AVAILABEL_STAFF}
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
