import React from 'react';
import Journey, { JourneyStep } from '../ui/Journey';

interface TimelineTicketProps {
  tickets: JourneyStep[];
}

const TimelineTicket: React.FC<TimelineTicketProps> = ({ tickets }) => {
  return (
    <div className="p-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
      <div>
        <Journey steps={tickets} />
      </div>
    </div>
  );
};

export default TimelineTicket;

