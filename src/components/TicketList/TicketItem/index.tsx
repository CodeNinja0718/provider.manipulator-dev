import { Collapse, Stack } from '@mui/material';
import type { ICustomerTickets } from 'models/tickets/interface';
import { useState } from 'react';

import TicketCard from './TicketCard';
import TicketItemHeader from './TicketItemHeader';

interface TicketItemProps {
  data: ICustomerTickets;
}

const TicketItem = ({ data }: TicketItemProps) => {
  const [isOpen, setOpen] = useState(true);

  const onTicketClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Stack>
      <TicketItemHeader
        title={data.customerName}
        isOpen={isOpen}
        onClick={onTicketClick}
      />
      <Collapse in={isOpen} unmountOnExit timeout="auto">
        {!!data.tickets?.length &&
          data.tickets.map((item, index) => (
            <TicketCard
              key={item.ticketId}
              data={item}
              hasDivider={index !== data.tickets.length - 1}
            />
          ))}
      </Collapse>
    </Stack>
  );
};

export default TicketItem;
