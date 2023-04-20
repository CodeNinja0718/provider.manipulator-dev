import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox, Select, TextField, Upload } from 'components/Form';
import Label from 'components/Form/Label';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import useBreakpoint from 'hooks/useBreakpoint';
import type { Control } from 'react-hook-form';
import { QUALIFICATION } from 'utils/const';

import styles from './styles';

interface ProfileSectionProps {
  initialValues: ManipulatorProfileValues;
  control: Control<ManipulatorProfileValues>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  control,
  initialValues,
}) => {
  const isMobile = useBreakpoint({});
  const engagementList = [];

  for (let i = 1990; i <= new Date().getFullYear(); i += 1) {
    engagementList.push({
      id: i,
      name: i,
    });
  }

  return (
    <CommonSection title="プロフィール設定">
      <Box pt={20} pb={15} width="100%">
        <Box display="flex" flexDirection="column">
          <Label label="従事開始" />
          <Select
            name="engagement"
            control={control}
            data={engagementList}
            value={initialValues?.engagement || 2000}
            clearable={false}
            showError={false}
            formControlProps={{
              style: {
                maxWidth: 133,
              },
            }}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          mt={20}
          sx={styles.checkboxGroup}
          className={!isMobile ? 'customStyle' : ''}
        >
          <Label label="国家資格" />
          <CheckBox
            name="qualification"
            control={control}
            layout="horizontal"
            data={QUALIFICATION}
            columns={isMobile ? 6 : 3}
            spacing={isMobile ? 10 : 0}
          />
        </Box>

        <Box display="flex" flexDirection="column" mt={20}>
          <Label label="国家資格" />
          <Typography fontSize={14} color="graySolid" mb={10}>
            整体師詳細ページに表示されます。
          </Typography>
          <TextField
            name="description"
            control={control}
            placeholder="自由にご記入ください"
            multiline
            rows={6}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Label label="PR" />
          <Typography fontSize={14} color="graySolid" mb={10}>
            検索一覧・整体師詳細ページに表示されます。
          </Typography>
          <TextField
            name="pr"
            control={control}
            placeholder="自由にご記入ください"
            multiline
            rows={6}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Upload label="写真" name="photos" control={control} />
        </Box>
      </Box>
    </CommonSection>
  );
};
export default ProfileSection;
