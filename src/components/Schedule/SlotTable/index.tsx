import { Stack } from '@mui/material';
import type { ISalonScheduleItem } from 'models/schedule/interface';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import SlotColumn from './SlotColumn';
import styles from './styles';
import TimeColumn from './TimeColumn';

interface SlotTableProps {
  list: ISalonScheduleItem[];
  date: string;
}

const SlotTable: React.FC<SlotTableProps> = ({ list, date }) => {
  const scrollContainer = useScrollContainer();

  return (
    <Stack direction="row" alignItems="start" sx={styles.slotTableWrapper}>
      <TimeColumn />
      <Stack direction="row" id="slot-columns" ref={scrollContainer.ref}>
        {list.map((item) => {
          return (
            <SlotColumn key={item.manipulatorId} data={item} date={date} />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SlotTable;
