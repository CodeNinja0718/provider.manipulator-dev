import { Box } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox } from 'components/Form';
import type { IMenuStaffProps } from 'components/RegisterMenu/models/interface';
import styles from 'components/RegisterMenu/styles';
import { AVAILABEL_STAFF } from 'utils/const';

const StaffSection: React.FC<IMenuStaffProps> = ({ control }) => {
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
            name="availabelStaff"
            control={control}
            data={AVAILABEL_STAFF}
            layout="horizontal"
            spacing={10}
            label="施術可能なスタッフを選択してください"
            required
          />
        </Box>
      </Box>
    </CommonSection>
  );
};
export default StaffSection;
