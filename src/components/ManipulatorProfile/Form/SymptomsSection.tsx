import { Box } from '@mui/material';
import CollapseSection from 'components/CollapseSection';
import CommonSection from 'components/CommonSection';
import { CheckBox } from 'components/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import { useFetch } from 'hooks';
import isEmpty from 'lodash/isEmpty';
import type { ICommonDataSalon } from 'models/resource/interface';
import resourceQuery from 'models/resource/query';
import type { Control } from 'react-hook-form';
import { FILTER_ITEMS } from 'utils/const';

import styles from './styles';

interface SymptomsSectionProps {
  control: Control<ManipulatorProfileValues>;
}

const SymptomsSection: React.FC<SymptomsSectionProps> = ({ control }) => {
  const { data: response } = useFetch<ICommonDataSalon>(resourceQuery.general);
  const renderItemSympthom = (value: any) => {
    const data = isEmpty(value) ? [] : value;

    return (
      <CheckBox
        name="symptoms"
        control={control}
        layout="horizontal"
        data={data}
        spacing={10}
        showSelectAll
      />
    );
  };

  return (
    <CommonSection title="施術可能な症状">
      <Box pb={15} width="100%">
        {FILTER_ITEMS.map((item) => (
          <Box
            key={item._id}
            sx={styles.checkboxGroup}
            className="noSpacing borderBottom"
          >
            <CollapseSection title={item.label}>
              {isEmpty(response?.symptoms)
                ? []
                : renderItemSympthom(
                    response?.symptoms
                      .filter((ele) => ele.typeId === item._id)
                      .map((ele) => {
                        return {
                          id: ele?._id,
                          name: ele?.symptomName,
                        };
                      }),
                  )}
            </CollapseSection>
          </Box>
        ))}
      </Box>
    </CommonSection>
  );
};
export default SymptomsSection;
