import { Box } from '@mui/material';
import CommonSection from 'components/CommonSection';
import DirectRegisterMenu from 'components/MenuList/DirectRegisterMenu';

interface IPublishedMenuProps {
  currentSalonId: string;
}

const PublishedMenu = ({ currentSalonId }: IPublishedMenuProps) => {
  return (
    <CommonSection title="掲載中のメニュー一覧">
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
export default PublishedMenu;
