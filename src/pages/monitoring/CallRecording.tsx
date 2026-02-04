import React, { useState } from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';
import Modal from '../../components/ui/Modal';
import Table, { TableColumn } from '../../components/ui/Table';

interface Agent {
  username: string;
  name: string;
  site: string;
}

const CallRecording: React.FC = () => {
  const [isSelectAgentsOpen, setIsSelectAgentsOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh - in real app, this would fetch data
    setTimeout(() => {
      setIsRefreshing(false);
      // Reload iframe by changing key or src
    }, 1000);
  };

  const agentColumns: TableColumn<Agent>[] = [
    {
      key: 'username',
      header: 'Username',
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'site',
      header: 'Site',
    },
    {
      key: 'action',
      header: 'Action',
      render: (item) => (
        <button
          onClick={() => {
            // Handle select action
            setIsSelectAgentsOpen(false);
          }}
          className="px-3 py-1 bg-[var(--accent-color)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
        >
          Select
        </button>
      ),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full overflow-y-auto bg-[var(--bg-primary)] p-6">
        <div className="flex flex-col lg:flex-row mb-4">
          <div className="w-full mt-4 lg:mt-0 lg:ml-1">
            {/* Header Card */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] mb-3">
              <div className="flex flex-col lg:flex-row justify-between items-center p-4 lg:p-6 border-b border-[var(--border-color)]">
                <h5 className="text-lg font-semibold text-[var(--text-primary)] mb-0">
                  SPV Dashboard — Outbound
                </h5>
                <div className="mt-3 lg:mt-0">
                  <button
                    type="button"
                    onClick={refreshData}
                    disabled={isRefreshing}
                    className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <i className={`bx ${isRefreshing ? 'bx-loader-alt bx-spin' : 'bx-refresh'} text-base`}></i>
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="grid grid-cols-1 gap-3 mt-1">
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] h-full">
                <div className="p-4 lg:p-6">
                  <div className="mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="font-semibold text-[var(--text-primary)]">
                      Daftar Outbound (Pickup)
                    </div>
                    <small className="text-[var(--text-secondary)] text-sm">
                      Menampilkan data <em>outbound</em> handle dan juga queued
                    </small>
                  </div>

                  <iframe
                    src="https://crm.datakelola.com/spv/outbound/iframe-pickup"
                    className="mt-2 w-full border-none rounded-lg"
                    id="iframe-outbound"
                    frameBorder="0"
                    style={{ height: '720px' }}
                    title="Daftar Outbound (Pickup)"
                    key={isRefreshing ? 'refreshing' : 'normal'}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Select Agents */}
        <Modal
          isOpen={isSelectAgentsOpen}
          onClose={() => setIsSelectAgentsOpen(false)}
          title="List Agent Ready"
          size="lg"
          footer={
            <button
              type="button"
              className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-quaternary)] transition-colors"
              onClick={() => setIsSelectAgentsOpen(false)}
            >
              Close
            </button>
          }
        >
          <Table columns={agentColumns} data={agents} emptyMessage="No agents available" />
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default CallRecording;

