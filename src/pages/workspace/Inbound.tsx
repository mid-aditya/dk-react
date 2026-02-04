import React from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';
import EndChatTicket from '../../components/ticketing/EndChatTicket';
import History from '../../components/ticketing/History';
import Overview from '../../components/ticketing/Overview';

const Inbound: React.FC = () => {
  return (
    <WorkspaceLayout>
      <div className="w-full h-full p-0 m-0 flex gap-0 overflow-hidden bg-[var(--bg-primary)] min-w-0 box-border relative">
        {/* Card 1 - Overview */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative flex-1 min-w-[400px] last:border-r-0">
          <div className="flex-1 overflow-y-auto">
            <Overview />
          </div>
        </div>

        {/* Card 2 - End Chat Ticket */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative flex-1 min-w-[400px] last:border-r-0">
          <div className="flex-1 overflow-y-auto">
            <EndChatTicket />
          </div>
        </div>

        {/* Card 3 - History */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative flex-1 min-w-[400px] last:border-r-0">
          <div className="flex-1 overflow-y-auto">
            <History />
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Inbound;
