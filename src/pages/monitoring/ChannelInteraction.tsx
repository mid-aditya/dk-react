import React, { useState } from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';
import Modal from '../../components/ui/Modal';
import TabHorizontal from '../../components/ui/TabHorizontal';
import Table, { TableColumn } from '../../components/ui/Table';

interface Agent {
  username: string;
  name: string;
}

const ChannelInteraction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isSelectAgentsOpen, setIsSelectAgentsOpen] = useState(false);
  const [isSelectReassignOpen, setIsSelectReassignOpen] = useState(false);
  const [chatQueue, setChatQueue] = useState(3);
  const [chatHandled, setChatHandled] = useState(78);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [reassignNote, setReassignNote] = useState('');

  const filterByStatus = (status: string) => {
    setSelectedStatus(status);
    // Filter logic would go here
  };

  const tabs = [
    { id: 'tab1', label: 'Chat Assignment' },
    { id: 'tab2', label: 'Re-Assign History' },
  ];

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
      key: 'action',
      header: 'Action',
      render: (item) => (
        <button
          onClick={() => {
            // Handle assign action
            setIsSelectAgentsOpen(false);
          }}
          className="px-3 py-1 bg-[var(--accent-color)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
        >
          Select
        </button>
      ),
    },
  ];

  const reassignAgentColumns: TableColumn<Agent>[] = [
    {
      key: 'username',
      header: 'Username',
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'action',
      header: 'Action',
      render: (item) => (
        <button
          onClick={() => {
            // Handle reassign action
            setIsSelectReassignOpen(false);
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
      <style>{`
        .nav-tabs-custom .nav-link {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-bottom: none;
          margin-bottom: -1px;
          border-radius: 0.375rem 0.375rem 0 0;
        }

        .nav-tabs-custom .nav-link.active {
          background-color: var(--bg-tertiary);
          border-color: var(--border-color);
          color: var(--text-primary);
        }
      `}</style>

      <div className="flex flex-col lg:flex-row mb-4">
        <div className="w-full mt-4 lg:mt-0 lg:ml-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: Chat in Queue */}
            <div
              className="bg-[var(--bg-secondary)] rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer border border-[var(--border-color)]"
              onClick={() => filterByStatus('queue')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-yellow-600/20">
                    <i className="bx bxs-time-five text-2xl text-yellow-500"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]" id="chat_queue">
                      {chatQueue}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm">Chat in Queue</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium">
                  Today
                </span>
              </div>
            </div>

            {/* Card 2: Chat on Handled */}
            <div
              className="bg-[var(--bg-secondary)] rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer border border-[var(--border-color)]"
              onClick={() => filterByStatus('handled')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                    <i className="bx bxs-conversation text-2xl text-blue-500"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]" id="chat_handled">
                      {chatHandled}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm">Chat on Handled</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium">
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
            {/* Custom Tabs Navigation */}
            <div className="border-b border-[var(--border-color)]">
              <div className="flex">
                <button
                  className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === 'tab1'
                      ? 'border-[var(--accent-color)] text-[var(--accent-color)] bg-[var(--bg-tertiary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                  onClick={() => setActiveTab('tab1')}
                >
                  Chat Assignment
                </button>
                <button
                  className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === 'tab2'
                      ? 'border-[var(--accent-color)] text-[var(--accent-color)] bg-[var(--bg-tertiary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                  onClick={() => setActiveTab('tab2')}
                >
                  Re-Assign History
                </button>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="p-3">
              {/* Tab 1: Chat Assignment */}
              {activeTab === 'tab1' && (
                <div>
                  <iframe
                    src="https://crm.datakelola.com/spv/iframe-chat-open"
                    className="w-full border-none rounded-lg"
                    id="iframe-chat-open"
                    frameBorder="0"
                    style={{ height: '699px' }}
                    title="Chat Assignment"
                  ></iframe>
                </div>
              )}

              {/* Tab 2: Re-Assign History */}
              {activeTab === 'tab2' && (
                <div>
                  <iframe
                    src="https://crm.datakelola.com/spv/iframe-chat-reassign-histories"
                    id="iframe-chat-reassign"
                    frameBorder="0"
                    className="w-full border-none rounded-lg"
                    style={{ height: '600px' }}
                    title="Re-Assign History"
                  ></iframe>
                </div>
              )}
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
          <>
            <button
              type="button"
              className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-quaternary)] transition-colors"
              onClick={() => setIsSelectAgentsOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
              onClick={() => {
                // Handle save action
                setIsSelectAgentsOpen(false);
              }}
            >
              Save
            </button>
          </>
        }
      >
        <Table columns={agentColumns} data={agents} emptyMessage="No agents available" />
      </Modal>

      {/* Modal: Re-Assign Agent */}
      <Modal
        isOpen={isSelectReassignOpen}
        onClose={() => setIsSelectReassignOpen(false)}
        title="Pilih Agen untuk Re-Assign"
        size="lg"
        footer={
          <button
            type="button"
            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-quaternary)] transition-colors"
            onClick={() => setIsSelectReassignOpen(false)}
          >
            Close
          </button>
        }
      >
        <div>
          <Table
            columns={reassignAgentColumns}
            data={agents}
            emptyMessage="No agents available"
            className="mb-4"
          />
          {/* Input Note */}
          <div className="mb-3">
            <label htmlFor="note_reassign" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">
              Catatan Re-Assign
            </label>
            <textarea
              id="note_reassign"
              className="w-full px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent resize-none"
              rows={3}
              placeholder="Tulis alasan re-assign..."
              value={reassignNote}
              onChange={(e) => setReassignNote(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ChannelInteraction;

