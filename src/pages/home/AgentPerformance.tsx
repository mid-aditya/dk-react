import {
    Eye,
    Search,
    Star,
    User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Pagination from "../../components/ui/Pagination";
import Table, { TableColumn } from "../../components/ui/Table";

interface Agent {
  id: number;
  name: string;
  username: string;
  status: "Ready" | "Offline";
  currentHandle: number;
  closedToday: number;
}

interface AgentPerformance {
  id: number;
  name: string;
  username: string;
  totalHandled: number;
  avgResponse: string;
  successRate: number;
  rating: number;
}

const AgentPerformance: React.FC = () => {
  // Current Agent Status
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  // Performance History
  const [performanceSearchQuery, setPerformanceSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");
  const [performancePage, setPerformancePage] = useState(1);
  const performancePerPage = 10;

  // Sample data for Current Agent Status
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: "Naufal Century",
      username: "naufal.century",
      status: "Ready",
      currentHandle: 14,
      closedToday: 0,
    },
    {
      id: 2,
      name: "Agent1",
      username: "Agent1new@gmail.com",
      status: "Ready",
      currentHandle: 12,
      closedToday: 0,
    },
    {
      id: 3,
      name: "Megavision2",
      username: "megavision2@test.com",
      status: "Ready",
      currentHandle: 0,
      closedToday: 0,
    },
    {
      id: 4,
      name: "agentomni12",
      username: "agentomni1",
      status: "Offline",
      currentHandle: 42,
      closedToday: 0,
    },
    {
      id: 5,
      name: "Jouanda",
      username: "jou@gmail.com",
      status: "Offline",
      currentHandle: 6,
      closedToday: 0,
    },
    {
      id: 6,
      name: "agent1old",
      username: "agent1",
      status: "Offline",
      currentHandle: 28,
      closedToday: 0,
    },
    {
      id: 7,
      name: "Agent 2",
      username: "Agent2",
      status: "Offline",
      currentHandle: 21,
      closedToday: 0,
    },
    {
      id: 8,
      name: "Megavision1",
      username: "megavision1@test.com",
      status: "Offline",
      currentHandle: 0,
      closedToday: 0,
    },
    {
      id: 9,
      name: "Megavision3",
      username: "megavision3@test.com",
      status: "Offline",
      currentHandle: 0,
      closedToday: 0,
    },
    {
      id: 10,
      name: "Megavision4",
      username: "megavision4@test.com",
      status: "Offline",
      currentHandle: 0,
      closedToday: 0,
    },
  ]);

  // Sample data for Performance History
  const [performanceData, setPerformanceData] = useState<AgentPerformance[]>([
    {
      id: 1,
      name: "agentomni12",
      username: "agentomni1",
      totalHandled: 0,
      avgResponse: "00:00:00",
      successRate: 0,
      rating: 0,
    },
    {
      id: 2,
      name: "Jouanda",
      username: "jou@gmail.com",
      totalHandled: 0,
      avgResponse: "00:00:00",
      successRate: 0,
      rating: 0,
    },
    {
      id: 3,
      name: "agent1old",
      username: "agent1",
      totalHandled: 0,
      avgResponse: "00:00:00",
      successRate: 0,
      rating: 0,
    },
    {
      id: 4,
      name: "Naufal Century",
      username: "naufal.century",
      totalHandled: 0,
      avgResponse: "00:00:00",
      successRate: 0,
      rating: 0,
    },
    {
      id: 5,
      name: "Agent1",
      username: "Agent1new@gmail.com",
      totalHandled: 0,
      avgResponse: "00:00:00",
      successRate: 0,
      rating: 0,
    },
  ]);

  // Filter agents based on search
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter performance data based on search
  const filteredPerformance = performanceData.filter(
    (perf) =>
      perf.name.toLowerCase().includes(performanceSearchQuery.toLowerCase()) ||
      perf.username.toLowerCase().includes(performanceSearchQuery.toLowerCase())
  );

  // Calculate pagination for agents
  const totalAgentPages = Math.max(
    1,
    Math.ceil(filteredAgents.length / agentsPerPage)
  );
  const startAgentIndex = (currentPage - 1) * agentsPerPage;
  const endAgentIndex = startAgentIndex + agentsPerPage;
  const paginatedAgents = filteredAgents.slice(startAgentIndex, endAgentIndex);

  // Calculate pagination for performance
  const totalPerformancePages = Math.max(
    1,
    Math.ceil(filteredPerformance.length / performancePerPage)
  );
  const startPerformanceIndex = (performancePage - 1) * performancePerPage;
  const endPerformanceIndex = startPerformanceIndex + performancePerPage;
  const paginatedPerformance = filteredPerformance.slice(
    startPerformanceIndex,
    endPerformanceIndex
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setPerformancePage(1);
  }, [performanceSearchQuery, timeRange]);

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-500 fill-gray-500"
          }`}
        />
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Get initial letter for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Current Agent Status columns
  const agentColumns: TableColumn<Agent>[] = [
    {
      key: "agent",
      header: "Agent",
      render: (agent) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white font-semibold text-sm">
            {getInitial(agent.name)}
          </div>
          <div>
            <div className="text-[var(--text-primary)] font-medium">
              {agent.name}
            </div>
            <div className="text-[var(--text-secondary)] text-sm">
              {agent.username}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (agent) => (
        <span className="inline-flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              agent.status === "Ready" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="text-[var(--text-primary)]">{agent.status}</span>
        </span>
      ),
    },
    {
      key: "currentHandle",
      header: "Current Handle",
      render: (agent) => (
        <span className="text-[var(--text-primary)]">{agent.currentHandle}</span>
      ),
    },
    {
      key: "closedToday",
      header: "Closed Today",
      render: (agent) => (
        <span className="text-[var(--text-primary)]">{agent.closedToday}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (agent) => (
        <button className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      ),
    },
  ];

  // Performance History columns
  const performanceColumns: TableColumn<AgentPerformance>[] = [
    {
      key: "agent",
      header: "Agent",
      render: (perf) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white font-semibold text-sm">
            {getInitial(perf.name)}
          </div>
          <div>
            <div className="text-[var(--text-primary)] font-medium">
              {perf.name}
            </div>
            <div className="text-[var(--text-secondary)] text-sm">
              {perf.username}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "totalHandled",
      header: "Total Handled",
      render: (perf) => (
        <span className="text-[var(--text-primary)]">{perf.totalHandled}</span>
      ),
    },
    {
      key: "avgResponse",
      header: "Avg Response",
      render: (perf) => (
        <span className="text-[var(--text-primary)]">{perf.avgResponse}</span>
      ),
    },
    {
      key: "successRate",
      header: "Success Rate",
      render: (perf) => (
        <span className="text-[var(--text-primary)]">{perf.successRate}%</span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (perf) => renderStars(perf.rating),
    },
  ];

  const handleViewDetails = (agent: Agent) => {
    // Handle view details action
    console.log("View details for:", agent);
  };

  return (
    <WorkspaceLayout>
      <div className="p-6 h-full overflow-y-auto bg-[var(--bg-primary)]">
        {/* Current Agent Status Section */}
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center mb-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                Current Agent Status
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-4">
                Real-time overview of agent activities
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-[var(--text-secondary)] text-sm">Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-[var(--text-secondary)] text-sm">Offline</span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] outline-none transition-all"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={agentColumns}
              data={paginatedAgents}
              onRowClick={handleViewDetails}
              emptyMessage="No agents found"
            />
          </div>
          {totalAgentPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalAgentPages}
                onPageChange={setCurrentPage}
                showFirstLast={true}
                maxVisible={5}
              />
            </div>
          )}
        </div>

        {/* Agent Performance History Section */}
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Performance History
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Detailed agent performance metrics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) =>
                  setTimeRange(e.target.value as "today" | "week" | "month")
                }
                className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] outline-none transition-all"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={performanceSearchQuery}
                  onChange={(e) => setPerformanceSearchQuery(e.target.value)}
                  className="w-64 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] outline-none transition-all"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={performanceColumns}
              data={paginatedPerformance}
              emptyMessage="No performance data found"
            />
          </div>
          {totalPerformancePages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={performancePage}
                totalPages={totalPerformancePages}
                onPageChange={setPerformancePage}
                showFirstLast={true}
                maxVisible={5}
              />
            </div>
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default AgentPerformance;
