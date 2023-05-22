import { Box } from '@mui/material';
import type { ICustomerTickets } from 'models/tickets/interface';

import TicketItem from './TicketItem';

interface TicketListProps {
  data: ICustomerTickets[];
}

const TicketList = ({ data }: TicketListProps) => (
  <Box
    display={'flex'}
    flex={1}
    flexDirection={'column'}
    alignSelf={'stretch'}
    gap={16}
    className="ticket-list"
  >
    {data.map((item) => (
      <TicketItem data={item} key={item.id} />
    ))}
  </Box>
);

export default TicketList;
