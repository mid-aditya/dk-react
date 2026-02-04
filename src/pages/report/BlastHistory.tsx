import {
    Calendar as CalendarIcon,
    Download,
    Filter,
    Info,
    RefreshCw,
    Search,
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../components/ui/Dropdown";
import Table, { TableColumn } from "../../components/ui/Table";

interface BlastHistoryItem {
  id: number;
  target: string;
  message: string;
  status: string;
  executedAt: string;
  repliedAt: string;
  schedule: string;
}

const BlastHistory: React.FC = () => {
  const [status, setStatus] = useState<number | string>("");
  const [scheduleId, setScheduleId] = useState<number | string>("");
  const [searchTarget, setSearchTarget] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Status options
  const statusOptions: DropdownOption[] = [
    { value: "", label: "All" },
    { value: 1, label: "Sent" },
    { value: 2, label: "Replied By Chat" },
    { value: 3, label: "Replied By Call" },
  ];

  // Schedule options
  const scheduleOptions: DropdownOption[] = [
    { value: "", label: "All" },
    { value: 213, label: "213 - Jadwal- WA blast" },
    { value: 214, label: "214 - Jadwal- WA blast" },
    { value: 211, label: "211 - testing ambil response" },
    { value: 212, label: "212 - Testing Blast Haidar" },
    { value: 215, label: "215 - Testing Blast Import" },
    { value: 209, label: "209 - testing blast uidesk" },
    { value: 210, label: "210 - Testing Blast Uidesk 2" },
  ];

  // Sample data based on reference HTML
  const [blastHistories, setBlastHistories] = useState<BlastHistoryItem[]>([
    {
      id: 3000,
      target: "6281329453873",
      message: "Halo Gaih Aditya Pratama, paket anda dengan no.resi #999999 akan segera dikirim.",
      status: "Sent",
      executedAt: "28 Nov 2025, 16:45",
      repliedAt: "",
      schedule: "Testing Blast Import",
    },
    {
      id: 2999,
      target: "6281291566795",
      message: "Halo Fatur Rachmat Ramadan, paket anda dengan no.resi #999999 akan segera dikirim.",
      status: "Sent",
      executedAt: "28 Nov 2025, 16:45",
      repliedAt: "",
      schedule: "Testing Blast Import",
    },
    {
      id: 2998,
      target: "6285187696200",
      message: "Halo Bruh, paket anda dengan no.resi #999999 akan segera dikirim.",
      status: "Sent",
      executedAt: "28 Nov 2025, 16:45",
      repliedAt: "",
      schedule: "Testing Blast Import",
    },
    {
      id: 2997,
      target: "6283139010550",
      message: "Halo Raihan, paket anda dengan no.resi #999999 akan segera dikirim.",
      status: "Sent",
      executedAt: "28 Nov 2025, 16:45",
      repliedAt: "",
      schedule: "Testing Blast Import",
    },
    {
      id: 2996,
      target: "628567073509",
      message: "Halo Ibu/Bpk *test*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Sent",
      executedAt: "06 Nov 2025, 14:04",
      repliedAt: "",
      schedule: "Jadwal- WA blast",
    },
    {
      id: 2995,
      target: "62812345678",
      message: "Halo Ibu/Bpk *test*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Sent",
      executedAt: "06 Nov 2025, 14:04",
      repliedAt: "",
      schedule: "Jadwal- WA blast",
    },
    {
      id: 2994,
      target: "628567073509",
      message: "Halo Ibu/Bpk *test*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Sent",
      executedAt: "06 Nov 2025, 14:04",
      repliedAt: "",
      schedule: "Jadwal- WA blast",
    },
    {
      id: 2992,
      target: "6283139010550",
      message: "Halo Ibu/Bpk *Raihan*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Replied By Call",
      executedAt: "04 Nov 2025, 16:00",
      repliedAt: "",
      schedule: "Testing Blast Haidar",
    },
    {
      id: 2991,
      target: "6281329453873",
      message: "Halo Ibu/Bpk *Galih*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Sent",
      executedAt: "04 Nov 2025, 16:00",
      repliedAt: "",
      schedule: "Testing Blast Haidar",
    },
    {
      id: 2990,
      target: "6281291566795",
      message: "Halo Ibu/Bpk *Fatur*! 😊\n\nTim *Uidesk* mau tanya nih — apakah kamu sudah mengetahui patching CRM terbaru dari kami?\n\nBalas aja ya:\n\n✅ Ya\n\n❌ Belum",
      status: "Sent",
      executedAt: "04 Nov 2025, 16:00",
      repliedAt: "",
      schedule: "Testing Blast Haidar",
    },
  ]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  const handleExport = () => {
    // In real app, this would trigger export
    window.open("/report/blast-history/export", "_blank");
  };

  // Filter data based on filters
  const filteredHistories = blastHistories.filter((item) => {
    if (status) {
      const statusLabel = statusOptions.find((opt) => opt.value === status)?.label || "";
      if (statusLabel !== "All" && item.status !== statusLabel) return false;
    }
    if (scheduleId) {
      const scheduleLabel = scheduleOptions.find((opt) => opt.value === scheduleId)?.label || "";
      if (scheduleLabel !== "All") {
        const scheduleName = scheduleLabel.split(" - ")[1] || scheduleLabel;
        if (!item.schedule.includes(scheduleName)) return false;
      }
    }
    if (searchTarget && !item.target.toLowerCase().includes(searchTarget.toLowerCase())) return false;
    return true;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-blue-900/40 text-blue-300";
      case "Replied By Chat":
        return "bg-green-900/40 text-green-300";
      case "Replied By Call":
        return "bg-purple-900/40 text-purple-300";
      default:
        return "bg-gray-900/40 text-gray-300";
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredHistories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistories = filteredHistories.slice(startIndex, endIndex);

  const tableColumns: TableColumn<BlastHistoryItem>[] = [
    {
      key: "id",
      header: "ID",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] whitespace-nowrap">{item.id}</span>
      ),
    },
    {
      key: "target",
      header: "Target",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] whitespace-nowrap">{item.target}</span>
      ),
    },
    {
      key: "message",
      header: "Message",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words whitespace-normal max-w-[480px]">
          {item.message}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getStatusBadgeColor(item.status)}`}>
          {item.status}
        </span>
      ),
    },
    {
      key: "executedAt",
      header: "Executed At",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] whitespace-nowrap">{item.executedAt}</span>
      ),
    },
    {
      key: "repliedAt",
      header: "Replied At",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-secondary)] whitespace-nowrap">{item.repliedAt || "-"}</span>
      ),
    },
    {
      key: "schedule",
      header: "Schedule",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] whitespace-nowrap">{item.schedule}</span>
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
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-color)] hover:shadow-lg transition-all duration-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                {/* Status */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>Status</span>
                  </label>
                  <Dropdown
                    options={statusOptions}
                    value={status}
                    placeholder="All"
                    onChange={(value) => setStatus(value)}
                  />
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Schedule</span>
                  </label>
                  <Dropdown
                    options={scheduleOptions}
                    value={scheduleId}
                    placeholder="All"
                    onChange={(value) => setScheduleId(value)}
                  />
                </div>

                {/* Search Target */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>Search Target</span>
                  </label>
                  <input
                    type="text"
                    id="search_target"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all duration-200"
                    placeholder="Cari nomor / target..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 md:col-span-3">
                  <button
                    id="btn-refresh"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    id="btn-export"
                    onClick={handleExport}
                    className="px-4 py-2 bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {/* Info Message */}
              <div className="mt-3 text-xs text-[var(--text-tertiary)] flex items-center gap-2">
                <Info className="w-4 h-4 text-[var(--accent-color)]" />
                <span>
                  Gunakan limit untuk membatasi jumlah data yang ditampilkan. Filter status untuk menampilkan status tertentu.
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-color)] transition-all duration-200">
              <div className="table-responsive">
                {paginatedHistories.length > 0 ? (
                  <>
                    <Table
                      columns={tableColumns}
                      data={paginatedHistories}
                      className="bg-[var(--bg-secondary)]"
                      emptyMessage="No data"
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-end mt-4">
                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded border text-sm transition-colors duration-200 ${
                                currentPage === page
                                  ? "bg-[var(--accent-color)] text-white"
                                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-quaternary)] border-[var(--border-color)]"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div id="blast-history-empty" className="text-center text-[var(--text-secondary)] py-3">
                    No data
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

export default BlastHistory;
