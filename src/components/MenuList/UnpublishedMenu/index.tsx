import { Box } from '@mui/material';
import CommonSection from 'components/CommonSection';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';

const UnpublishedMenu = () => {
  return (
    <CommonSection
      title="非掲載のメニュー"
      customHeadingClass="customHeadingClass"
    >
      <Box width="100%" pt={30}>
        <Box>This is list</Box>

        <DirectRegisterMenu className="sectionButton" />
      </Box>
    </CommonSection>
  );
};
export default UnpublishedMenu;
