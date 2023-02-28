import { Box } from '@mui/material';
import Label from 'components/Form/Label';
import styles from 'components/MenuReview/styles';

interface RowItemProps {
  label?: string;
  children?: React.ReactNode;
  customItemRow?: string;
}

const RowItem: React.FC<RowItemProps> = ({
  label = '',
  children,
  customItemRow,
}) => {
  return (
    <Box sx={styles.sectionItem}>
      <Box sx={styles.itemRow} className={customItemRow}>
        <Box mb={10}>
          <Label label={label} />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
export default RowItem;
