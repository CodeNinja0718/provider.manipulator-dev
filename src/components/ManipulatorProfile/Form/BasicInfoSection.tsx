import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox, TextField } from 'components/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import type { Control } from 'react-hook-form';

import styles from './styles';

interface BasicInfoSectionProps {
  initialValues: ManipulatorProfileValues;
  control: Control<ManipulatorProfileValues>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  control,
  initialValues,
}) => {
  return (
    <CommonSection title="基本情報">
      <Box pt={20} pb={15} width="100%">
        <TextField
          label="氏名"
          name="name"
          control={control}
          placeholder="整体師　太郎"
          required
        />
        <TextField
          label="ふりがな"
          name="nameKana"
          control={control}
          placeholder="せいたいし　たろう"
          required
        />
        <TextField
          label="メールアドレス"
          name="email"
          control={control}
          placeholder="sample@service.com"
        />
        <Box display="flex" width="100%" sx={styles.checkboxArea}>
          <CheckBox
            name="isRegister"
            control={control}
            layout="horizontal"
            data={initialValues.isRegister || []}
          />
        </Box>
        <Typography sx={styles.basicInfoNote}>
          <span>
            ※個人整体院の方、個別のアカウント発行が不要な場合はチェックを外してください。
          </span>
          <br />
          <span>
            ※メールアドレスがログインIDとなりますので、アカウント新規発行の場合は、メールアドレスをご入力ください。
          </span>
        </Typography>
      </Box>
    </CommonSection>
  );
};
export default BasicInfoSection;