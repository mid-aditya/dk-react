import { Calendar, CalendarCheck, CheckCircle, CheckCircle2, Clock, Filter, Info, List, Mail, MessageSquare, PauseCircle, RotateCw, Search, Send, Zap } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceLayout from "../../components/WorkspaceLayout";

const BlastSchedule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("2025-12-08");
  const [endDate, setEndDate] = useState("2025-12-08");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ searchQuery, startDate, endDate });
  };

  const handleReset = () => {
    setSearchQuery("");
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  };

  // Statistics data (will be fetched from API)
  const stats = {
    totalSchedules: 0,
    active: 0,
    completed: 0,
    pending: 0,
    totalQueues: 0,
    queuesPending: 0,
    queuesSent: 0,
    queuesReplied: 0,
  };

  const schedulesCount = 0;

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="min-h-screen p-6">
            {/* Search and Filter Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="bg-[var(--bg-secondary)] border-0 border-[var(--border-color)] rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  {/* Search Input */}
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <span>Search by Name</span>
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                      <input
                        type="text"
                        name="q"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type schedule name..."
                        className="w-full bg-[var(--bg-primary)] border-0 border-[var(--border-color)] rounded-lg pl-9 pr-3 py-2 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <span>Start Date</span>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border-0 border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-[var(--text-tertiary)]" />
                      <span>End Date</span>
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border-0 border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Apply</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                      title="Reset filters"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-[var(--text-tertiary)] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--accent-color)]" />
                  <span>Default date range is today. Adjust dates to filter historical schedules.</span>
                </div>
              </div>
            </form>

            {/* Statistics Cards - Schedule Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span>Total Schedules</span>
                  </div>
                  <Calendar className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">{stats.totalSchedules}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-green-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Active</span>
                  </div>
                  <Zap className="w-5 h-5 text-green-500 animate-pulse" />
                </div>
                <div className="text-2xl font-semibold text-green-400">{stats.active}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-blue-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>Completed</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-blue-400">{stats.completed}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-yellow-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Pending</span>
                  </div>
                  <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                </div>
                <div className="text-2xl font-semibold text-yellow-400">{stats.pending}</div>
              </div>
            </div>

            {/* Statistics Cards - Queue Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <List className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span>Total Queues</span>
                  </div>
                  <Mail className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">{stats.totalQueues}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-yellow-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Queues Pending</span>
                  </div>
                  <PauseCircle className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <div className="text-2xl font-semibold text-yellow-400">{stats.queuesPending}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-blue-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-500" />
                    <span>Queues Sent</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-blue-400">{stats.queuesSent}</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-tertiary)] transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 border-[var(--border-color)] hover:border-green-500/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[var(--text-secondary)] text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                    <span>Queues Replied</span>
                  </div>
                  <MessageSquare className="w-5 h-5 text-green-400 animate-bounce" />
                </div>
                <div className="text-2xl font-semibold text-green-400">{stats.queuesReplied}</div>
              </div>
            </div>

            {/* All Schedules Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <List className="w-6 h-6 text-[var(--accent-color)]" />
                  <span>All Schedules</span>
                  <span className="text-lg text-[var(--text-secondary)] font-normal">({schedulesCount} found)</span>
                </h2>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-lg p-8 text-center">
                <p className="text-[var(--text-secondary)]">No schedules found. Create your first schedule to get started.</p>
                <Link
                  to="/blast/schedule/create"
                  className="inline-block mt-4 px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
                >
                  Create Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default BlastSchedule;
