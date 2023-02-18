import { Box } from '@mui/material';
import CommonSection from 'components/CommonSection';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';

interface IUnpublishedMenuProps {
  currentSalonId: string;
}

const UnpublishedMenu = ({ currentSalonId }: IUnpublishedMenuProps) => {
  return (
    <CommonSection
      title="非掲載のメニュー"
      customHeadingClass="customHeadingClass"
    >
      <Box width="100%" pt={30}>
        <Box>This is list</Box>

        <DirectRegisterMenu
          currentSalonId={currentSalonId}
          className="sectionButton"
        />
      </Box>
    </CommonSection>
  );
};
export default UnpublishedMenu;
