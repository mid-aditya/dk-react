import {
    CalendarCheck,
    Calendar as CalendarIcon,
    CheckCircle,
    Clock,
    Download,
    Filter,
    Info,
    List,
    MessageCircle,
    MessageSquare,
    User,
    XCircle,
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Calendar from "../../components/ui/Calendar";
import Dropdown, { DropdownOption } from "../../components/ui/Dropdown";
import Table, { TableColumn } from "../../components/ui/Table";

interface AgentStatistic {
  id: number;
  agent: string;
  totalChat: number;
  terbalas: number;
  belumTerbalas: number;
  avgFrt: string;
  avgResolution: string;
  totalPesan: number;
  avgPesanPerChat: string;
}

interface ConversationDetail {
  id: number;
  chatId: string;
  agent: string;
  status: string;
  firstCustomer: string;
  firstAgent: string;
  frt: string;
  resolutionTime: string;
  pesanAgent: number;
  attachment: number;
}

const Omnichat: React.FC = () => {
  // Get default dates (7 days ago to today)
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  const [dateFrom, setDateFrom] = useState<string>(sevenDaysAgo.toISOString().split("T")[0]);
  const [dateTo, setDateTo] = useState<string>(today.toISOString().split("T")[0]);
  const [channelId, setChannelId] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Statistics state
  const [stats, setStats] = useState({
    totalChat: 0,
    chatTerbalas: 0,
    chatBelumTerbalas: 0,
    avgFrt: "-",
  });

  // Sample channel options
  const channelOptions: DropdownOption[] = [
    { value: "", label: "Semua Channel" },
    { value: 1, label: "WhatsApp" },
    { value: 2, label: "Instagram" },
    { value: 3, label: "Facebook" },
    { value: 4, label: "Twitter" },
  ];

  // Sample data
  const [agentStats, setAgentStats] = useState<AgentStatistic[]>([]);
  const [conversations, setConversations] = useState<ConversationDetail[]>([]);

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Set dummy data
      setStats({
        totalChat: 245,
        chatTerbalas: 198,
        chatBelumTerbalas: 47,
        avgFrt: "2m 15s",
      });
      
      // Dummy agent statistics
      setAgentStats([
        {
          id: 1,
          agent: "Ahmad Rizki",
          totalChat: 45,
          terbalas: 42,
          belumTerbalas: 3,
          avgFrt: "1m 30s",
          avgResolution: "15m 20s",
          totalPesan: 234,
          avgPesanPerChat: "5.2",
        },
        {
          id: 2,
          agent: "Siti Nurhaliza",
          totalChat: 52,
          terbalas: 48,
          belumTerbalas: 4,
          avgFrt: "2m 05s",
          avgResolution: "18m 45s",
          totalPesan: 312,
          avgPesanPerChat: "6.0",
        },
        {
          id: 3,
          agent: "Budi Santoso",
          totalChat: 38,
          terbalas: 35,
          belumTerbalas: 3,
          avgFrt: "1m 45s",
          avgResolution: "12m 30s",
          totalPesan: 189,
          avgPesanPerChat: "5.0",
        },
        {
          id: 4,
          agent: "Dewi Lestari",
          totalChat: 41,
          terbalas: 38,
          belumTerbalas: 3,
          avgFrt: "2m 20s",
          avgResolution: "20m 10s",
          totalPesan: 245,
          avgPesanPerChat: "6.0",
        },
        {
          id: 5,
          agent: "Rizki Pratama",
          totalChat: 35,
          terbalas: 32,
          belumTerbalas: 3,
          avgFrt: "1m 55s",
          avgResolution: "16m 25s",
          totalPesan: 198,
          avgPesanPerChat: "5.7",
        },
        {
          id: 6,
          agent: "Maya Sari",
          totalChat: 34,
          terbalas: 31,
          belumTerbalas: 3,
          avgFrt: "2m 10s",
          avgResolution: "17m 50s",
          totalPesan: 201,
          avgPesanPerChat: "5.9",
        },
      ]);

      // Dummy conversation details
      setConversations([
        {
          id: 1,
          chatId: "CHAT-2025-001",
          agent: "Ahmad Rizki",
          status: "Terbalas",
          firstCustomer: "2025-01-15 09:15:23",
          firstAgent: "2025-01-15 09:16:45",
          frt: "1m 22s",
          resolutionTime: "12m 30s",
          pesanAgent: 8,
          attachment: 0,
        },
        {
          id: 2,
          chatId: "CHAT-2025-002",
          agent: "Siti Nurhaliza",
          status: "Terbalas",
          firstCustomer: "2025-01-15 10:20:10",
          firstAgent: "2025-01-15 10:22:15",
          frt: "2m 05s",
          resolutionTime: "18m 45s",
          pesanAgent: 12,
          attachment: 1,
        },
        {
          id: 3,
          chatId: "CHAT-2025-003",
          agent: "Budi Santoso",
          status: "Belum Terbalas",
          firstCustomer: "2025-01-15 11:05:30",
          firstAgent: "-",
          frt: "-",
          resolutionTime: "-",
          pesanAgent: 0,
          attachment: 0,
        },
        {
          id: 4,
          chatId: "CHAT-2025-004",
          agent: "Dewi Lestari",
          status: "Terbalas",
          firstCustomer: "2025-01-15 11:30:45",
          firstAgent: "2025-01-15 11:33:10",
          frt: "2m 25s",
          resolutionTime: "20m 10s",
          pesanAgent: 10,
          attachment: 0,
        },
        {
          id: 5,
          chatId: "CHAT-2025-005",
          agent: "Rizki Pratama",
          status: "Terbalas",
          firstCustomer: "2025-01-15 12:15:20",
          firstAgent: "2025-01-15 12:17:15",
          frt: "1m 55s",
          resolutionTime: "16m 25s",
          pesanAgent: 7,
          attachment: 2,
        },
        {
          id: 6,
          chatId: "CHAT-2025-006",
          agent: "Maya Sari",
          status: "Terbalas",
          firstCustomer: "2025-01-15 13:00:00",
          firstAgent: "2025-01-15 13:02:20",
          frt: "2m 20s",
          resolutionTime: "17m 50s",
          pesanAgent: 9,
          attachment: 0,
        },
        {
          id: 7,
          chatId: "CHAT-2025-007",
          agent: "Ahmad Rizki",
          status: "Belum Terbalas",
          firstCustomer: "2025-01-15 14:10:30",
          firstAgent: "-",
          frt: "-",
          resolutionTime: "-",
          pesanAgent: 0,
          attachment: 0,
        },
        {
          id: 8,
          chatId: "CHAT-2025-008",
          agent: "Siti Nurhaliza",
          status: "Terbalas",
          firstCustomer: "2025-01-15 14:25:15",
          firstAgent: "2025-01-15 14:27:30",
          frt: "2m 15s",
          resolutionTime: "19m 20s",
          pesanAgent: 11,
          attachment: 1,
        },
        {
          id: 9,
          chatId: "CHAT-2025-009",
          agent: "Budi Santoso",
          status: "Terbalas",
          firstCustomer: "2025-01-15 15:00:45",
          firstAgent: "2025-01-15 15:02:30",
          frt: "1m 45s",
          resolutionTime: "12m 30s",
          pesanAgent: 6,
          attachment: 0,
        },
        {
          id: 10,
          chatId: "CHAT-2025-010",
          agent: "Dewi Lestari",
          status: "Terbalas",
          firstCustomer: "2025-01-15 15:30:20",
          firstAgent: "2025-01-15 15:32:50",
          frt: "2m 30s",
          resolutionTime: "21m 15s",
          pesanAgent: 13,
          attachment: 0,
        },
      ]);
      
      setIsLoading(false);
    }, 500);
  };

  const handleExport = () => {
    // In real app, this would trigger export
    window.open("/report/omnichat/export", "_blank");
  };

  const agentTableColumns: TableColumn<AgentStatistic>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.agent}</span>
      ),
    },
    {
      key: "totalChat",
      header: "Total Chat",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.totalChat}</span>
      ),
    },
    {
      key: "terbalas",
      header: "Terbalas",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.terbalas}</span>
      ),
    },
    {
      key: "belumTerbalas",
      header: "Belum Terbalas",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.belumTerbalas}</span>
      ),
    },
    {
      key: "avgFrt",
      header: "Avg FRT",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.avgFrt}</span>
      ),
    },
    {
      key: "avgResolution",
      header: "Avg Resolution",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.avgResolution}</span>
      ),
    },
    {
      key: "totalPesan",
      header: "Total Pesan",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.totalPesan}</span>
      ),
    },
    {
      key: "avgPesanPerChat",
      header: "Avg Pesan/Chat",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.avgPesanPerChat}</span>
      ),
    },
  ];

  const conversationTableColumns: TableColumn<ConversationDetail>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "chatId",
      header: "Chat ID",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.chatId}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.agent}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.status}</span>
      ),
    },
    {
      key: "firstCustomer",
      header: "First Customer",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.firstCustomer}</span>
      ),
    },
    {
      key: "firstAgent",
      header: "First Agent",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.firstAgent}</span>
      ),
    },
    {
      key: "frt",
      header: "FRT",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.frt}</span>
      ),
    },
    {
      key: "resolutionTime",
      header: "Resolution Time",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.resolutionTime}</span>
      ),
    },
    {
      key: "pesanAgent",
      header: "Pesan Agent",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.pesanAgent}</span>
      ),
    },
    {
      key: "attachment",
      header: "Attachment",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.attachment}</span>
      ),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Filters Section */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg mb-8">
              <form method="get" onSubmit={handleFilter}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Tanggal Mulai */}
                  <div>
                    <label
                      htmlFor="date_from"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Tanggal Mulai
                    </label>
                    <Calendar
                      value={dateFrom}
                      onChange={(value) => setDateFrom(value)}
                      placeholder="Select start date"
                    />
                  </div>

                  {/* Tanggal Akhir */}
                  <div>
                    <label
                      htmlFor="date_to"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                    >
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      Tanggal Akhir
                    </label>
                    <Calendar
                      value={dateTo}
                      onChange={(value) => setDateTo(value)}
                      placeholder="Select end date"
                    />
                  </div>

                  {/* Channel */}
                  <div>
                    <label
                      htmlFor="channel_id"
                      className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Channel
                    </label>
                    <Dropdown
                      options={channelOptions}
                      value={channelId}
                      placeholder="Semua Channel"
                      onChange={(value) => setChannelId(value)}
                    />
                  </div>

                  {/* Filter Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center py-2.5"
                    >
                      <Filter className="w-5 h-5 mr-2" />
                      {isLoading ? "Memproses..." : "Filter"}
                    </button>
                  </div>

                  {/* Export Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleExport}
                      className="w-full h-full bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center py-2.5"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Export Excel
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Global Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Chat */}
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Total Chat</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{stats.totalChat}</p>
                  </div>
                  <div className="bg-[var(--accent-color)]/20 p-3 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                </div>
              </div>

              {/* Chat Terbalas */}
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Chat Terbalas</p>
                    <p className="text-3xl font-bold text-[var(--success-color)]">{stats.chatTerbalas}</p>
                  </div>
                  <div className="bg-[var(--success-color)]/20 p-3 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-[var(--success-color)]" />
                  </div>
                </div>
              </div>

              {/* Chat Belum Terbalas */}
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Chat Belum Terbalas</p>
                    <p className="text-3xl font-bold text-[var(--error-color)]">{stats.chatBelumTerbalas}</p>
                  </div>
                  <div className="bg-[var(--error-color)]/20 p-3 rounded-xl">
                    <XCircle className="w-6 h-6 text-[var(--error-color)]" />
                  </div>
                </div>
              </div>

              {/* Avg FRT */}
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium">Avg FRT</p>
                    <p className="text-3xl font-bold text-[var(--accent-color)]">{stats.avgFrt}</p>
                  </div>
                  <div className="bg-[var(--accent-color)]/20 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Per Agent Statistics */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Statistik Per Agent
                </h3>
                <div className="text-[var(--text-secondary)] text-sm">
                  Total Agent: <span className="text-[var(--text-primary)] font-semibold">{agentStats.length}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                {agentStats.length > 0 ? (
                  <Table
                    columns={agentTableColumns}
                    data={agentStats}
                    className="bg-[var(--bg-secondary)]"
                    emptyMessage="No agent statistics found"
                  />
                ) : (
                  <div className="text-center text-[var(--text-secondary)] py-10">
                    <Info className="w-8 h-8 mx-auto mb-2 text-[var(--text-tertiary)]" />
                    <p>Tidak ada data agent</p>
                  </div>
                )}
              </div>
            </div>

            {/* Per Conversation Details */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
                  <List className="w-5 h-5 mr-2" />
                  Detail Percakapan
                </h3>
                <div className="text-[var(--text-secondary)] text-sm">
                  Menampilkan: <span className="text-[var(--text-primary)] font-semibold">{conversations.length}</span> percakapan terbaru
                </div>
              </div>

              <div className="overflow-x-auto">
                {conversations.length > 0 ? (
                  <Table
                    columns={conversationTableColumns}
                    data={conversations}
                    className="bg-[var(--bg-secondary)]"
                    emptyMessage="No conversations found"
                  />
                ) : (
                  <div className="text-center text-[var(--text-secondary)] py-10">
                    <Info className="w-8 h-8 mx-auto mb-2 text-[var(--text-tertiary)]" />
                    <p>Tidak ada data percakapan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Omnichat;
