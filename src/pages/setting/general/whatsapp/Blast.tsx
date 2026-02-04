import {
    ArrowLeft,
    Eye,
    FileUp,
    Receipt,
    RotateCw,
    Search
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Calendar from "../../../../components/ui/Calendar";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown";
import Modal from "../../../../components/ui/Modal";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface BlastSchedule {
  id: number;
  name: string;
  whatsappAccount: string;
  sendTime: string;
  isActive: boolean;
  isExecuted: boolean;
  createdAt: string;
}

interface BlastQueue {
  id: number;
  target: string;
  status: string;
}

const Blast: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedBlast, setSelectedBlast] = useState<BlastSchedule | null>(null);
  const [detailTab, setDetailTab] = useState<"active" | "history">("active");

  // Sample data based on reference HTML
  const [schedules, setSchedules] = useState<BlastSchedule[]>([
    {
      id: 215,
      name: "Testing Blast Import",
      whatsappAccount: "HAIDAR (0881010812304)",
      sendTime: "27 November 2025 pukul 10.45.00",
      isActive: true,
      isExecuted: true,
      createdAt: "27 November 2025 pukul 10.46.10",
    },
    {
      id: 212,
      name: "Testing Blast Haidar",
      whatsappAccount: "HAIDAR (0881010812304)",
      sendTime: "4 November 2025 pukul 08.58.00",
      isActive: true,
      isExecuted: true,
      createdAt: "4 November 2025 pukul 08.57.58",
    },
    {
      id: 211,
      name: "testing ambil response",
      whatsappAccount: "Support Delta",
      sendTime: "4 November 2025 pukul 08.26.00",
      isActive: true,
      isExecuted: true,
      createdAt: "4 November 2025 pukul 08.27.09",
    },
    {
      id: 210,
      name: "Testing Blast Uidesk 2",
      whatsappAccount: "Support Delta",
      sendTime: "4 November 2025 pukul 08.05.00",
      isActive: true,
      isExecuted: true,
      createdAt: "4 November 2025 pukul 08.00.03",
    },
    {
      id: 209,
      name: "testing blast uidesk",
      whatsappAccount: "HAIDAR (0881010812304)",
      sendTime: "3 November 2025 pukul 09.40.00",
      isActive: true,
      isExecuted: true,
      createdAt: "3 November 2025 pukul 09.41.17",
    },
  ]);

  const [activeQueues, setActiveQueues] = useState<BlastQueue[]>([
    { id: 1, target: "081234567890", status: "Pending" },
    { id: 2, target: "081234567891", status: "Processing" },
  ]);

  const [historyQueues, setHistoryQueues] = useState<BlastQueue[]>([
    { id: 1, target: "081234567890", status: "Sent" },
    { id: 2, target: "081234567891", status: "Failed" },
  ]);

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange =
      (!startDate || schedule.sendTime >= startDate) &&
      (!endDate || schedule.sendTime <= endDate);
    return matchesSearch && matchesDateRange;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSchedules = filteredSchedules.slice(startIndex, endIndex);
  const startEntry = filteredSchedules.length > 0 ? startIndex + 1 : 0;
  const endEntry = Math.min(endIndex, filteredSchedules.length);

  const handleShowDetail = (schedule: BlastSchedule) => {
    setSelectedBlast(schedule);
    setIsDetailModalOpen(true);
    setDetailTab("active");
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const channelOptions: DropdownOption[] = [
    { value: "14", label: "WhatsApp Official" },
    { value: "13", label: "WhatsApp Unofficial" },
  ];

  const templateTypeOptions: DropdownOption[] = [
    { value: "plain", label: "Plain Text" },
    { value: "template", label: "Template" },
  ];

  const isEnableOptions: DropdownOption[] = [
    { value: "1", label: "Ya (Aktif)" },
    { value: "0", label: "Tidak (Nonaktif)" },
  ];

  // Prepare table columns
  const tableColumns: TableColumn<BlastSchedule>[] = [
    {
      key: "no",
      header: "No",
      align: "center",
      render: (item, index) => <span>{startIndex + index + 1}</span>,
    },
    {
      key: "name",
      header: "Nama Jadwal",
      align: "center",
      render: (item) => <span>{item.name}</span>,
    },
    {
      key: "whatsappAccount",
      header: "Akun Whatsapp",
      align: "center",
      render: (item) => <span>{item.whatsappAccount}</span>,
    },
    {
      key: "sendTime",
      header: "Waktu Kirim",
      align: "center",
      render: (item) => <span>{item.sendTime}</span>,
    },
    {
      key: "isActive",
      header: "Aktif",
      align: "center",
      render: (item) => (
        <span className="text-[var(--success-color)]">✅</span>
      ),
    },
    {
      key: "isExecuted",
      header: "Sudah Dieksekusi",
      align: "center",
      render: (item) => (
        <span className="text-[var(--success-color)]">✅</span>
      ),
    },
    {
      key: "createdAt",
      header: "Dibuat Pada",
      align: "center",
      render: (item) => <span>{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Action",
      align: "center",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleShowDetail(item);
          }}
          className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-3 py-1 rounded-md transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const queueTableColumns: TableColumn<BlastQueue>[] = [
    {
      key: "no",
      header: "No",
      align: "center",
      render: (item, index) => <span>{index + 1}</span>,
    },
    {
      key: "target",
      header: "Target",
      align: "left",
      render: (item) => <span>{item.target}</span>,
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            item.status === "Sent"
              ? "bg-[var(--success-color)]/80 text-white"
              : item.status === "Failed"
              ? "bg-[var(--error-color)]/80 text-white"
              : item.status === "Processing"
              ? "bg-[var(--warning-color)]/80 text-white"
              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "center",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPreviewModalOpen(true);
          }}
          className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors"
        >
          Preview
        </button>
      ),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--accent-color)]"
              title="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h5 className="text-lg font-semibold text-[var(--text-primary)] m-0">
                WhatsApp Blast
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your WhatsApp blast schedules
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-[var(--accent-color)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center">
                    Blast List
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors"
                  >
                    Tambah Blast
                  </button>
                  <button
                    onClick={() => navigate("/outbound/tickets")}
                    className="bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors inline-block"
                  >
                    <FileUp className="w-4 h-4 inline mr-2" />
                    Import Data Customer
                  </button>
                </div>
              </div>

              {/* Filter Section */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari Nama Jadwal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Calendar
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    placeholder="Tanggal Mulai"
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Calendar
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    placeholder="Tanggal Selesai"
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <button
                    onClick={handleResetFilter}
                    className="bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] font-bold py-2 px-4 rounded-xl transition-colors whitespace-nowrap w-full flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    Reset/Refresh
                  </button>
                </div>
              </div>

              {/* Table */}
              {filteredSchedules.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={paginatedSchedules}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No schedules found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <Receipt className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada jadwal blast yang ditemukan
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-[var(--text-secondary)] text-sm">
                    Menampilkan {startEntry} sampai {endEntry} dari {filteredSchedules.length} data
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sebelumnya
                    </button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded-md transition-colors ${
                                currentPage === page
                                  ? "bg-[var(--accent-color)] text-white"
                                  : "bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)]"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-[var(--text-secondary)]">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Blast Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Tambah Jadwal Blast Baru"
          size="xl"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle save logic here
                  setIsAddModalOpen(false);
                }}
                className="px-4 py-2.5 bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Simpan
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Channel <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={channelOptions}
                  value=""
                  onChange={(value) => console.log("Channel:", value)}
                  placeholder="Pilih Channel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Jenis Template <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={templateTypeOptions}
                  value=""
                  onChange={(value) => console.log("Template Type:", value)}
                  placeholder="Pilih Channel Terlebih Dahulu"
                  disabled={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Nama Jadwal <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="Masukkan nama jadwal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Tanggal & Waktu Kirim <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Channel Page <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={[]}
                  value=""
                  onChange={(value) => console.log("Channel Page:", value)}
                  placeholder="Pilih Channel Terlebih Dahulu"
                  disabled={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Aktifkan Jadwal <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={isEnableOptions}
                  value="1"
                  onChange={(value) => console.log("Is Enable:", value)}
                  placeholder="Pilih Status"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Data Tiket Outbound <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={[]}
                  value=""
                  onChange={(value) => console.log("Outbound Ticket:", value)}
                  placeholder="Pilih Data Tiket"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                Pilih Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Template List */}
                <div>
                  <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 min-h-[200px] max-h-80 overflow-y-auto mb-3">
                    <div className="text-[var(--text-secondary)] text-center py-8">
                      Pilih Jenis Template Terlebih Dahulu
                    </div>
                  </div>
                </div>

                {/* Preview Template */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Preview
                  </label>
                  <div className="bg-[var(--bg-quaternary)] rounded-lg p-4 min-h-[200px] max-h-80 overflow-y-auto mb-3">
                    <div className="text-[var(--text-tertiary)] text-center py-8 flex items-center justify-center min-h-[200px]">
                      <div>
                        <i className="bx bx-message-rounded text-4xl mb-2"></i>
                        <p>Pilih template untuk melihat preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Detail Blast Queue Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedBlast(null);
          }}
          title="Detail Blast Queue"
          size="xl"
        >
          {selectedBlast && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Nama Jadwal
                  </label>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {selectedBlast.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Total Queue
                  </label>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {detailTab === "active" ? activeQueues.length : historyQueues.length}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  Daftar Blast Queue
                </h4>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setDetailTab("active")}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      detailTab === "active"
                        ? "bg-[var(--accent-color)] text-white"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                    }`}
                  >
                    Aktif
                  </button>
                  <button
                    onClick={() => setDetailTab("history")}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      detailTab === "history"
                        ? "bg-[var(--accent-color)] text-white"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                    }`}
                  >
                    History
                  </button>
                </div>
                <Table
                  columns={queueTableColumns}
                  data={detailTab === "active" ? activeQueues : historyQueues}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No queue data available"
                />
              </div>
            </div>
          )}
        </Modal>

        {/* Preview Message Modal */}
        <Modal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          title="Preview Message"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Target
              </label>
              <div className="text-[var(--text-primary)]">081234567890</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Status
              </label>
              <div className="text-[var(--text-primary)]">Pending</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Message Preview
              </label>
              <div className="bg-[var(--bg-quaternary)] rounded-lg p-4 min-h-[200px] max-h-80 overflow-y-auto">
                <div className="text-[var(--text-tertiary)] text-center py-8 flex items-center justify-center min-h-[200px]">
                  <div>
                    <i className="bx bx-message-rounded text-4xl mb-2"></i>
                    <p>Pilih data untuk melihat preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Blast;

