import {
    CalendarCheck,
    Calendar as CalendarIcon,
    ClipboardList,
    Download,
    Eye,
    Filter,
    Inbox,
    MessageSquare,
    Phone,
    PhoneCall,
    RefreshCw,
    X,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Calendar from "../../components/ui/Calendar";
import Dropdown, { DropdownOption } from "../../components/ui/Dropdown";

interface QaResult {
  id: number;
  kategori: "Call" | "Outbound" | "Chat";
  jenisCount: number;
  sourceType: string;
  flagChatCall: "Call" | "Chat";
  idTiket: number;
  genesisNumber: string;
  agent: string;
  tanggal: string;
}

const QaReport: React.FC = () => {
  const [kategoriFilter, setKategoriFilter] = useState<string | number>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQa, setSelectedQa] = useState<QaResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Sample data based on reference
  const allQaResults: QaResult[] = [
    {
      id: 21,
      kategori: "Call",
      jenisCount: 3,
      sourceType: "phone",
      flagChatCall: "Call",
      idTiket: 2,
      genesisNumber: "-",
      agent: "Century",
      tanggal: "7 Okt 2025, 09.44",
    },
    {
      id: 20,
      kategori: "Call",
      jenisCount: 3,
      sourceType: "phone",
      flagChatCall: "Call",
      idTiket: 2,
      genesisNumber: "-",
      agent: "Century",
      tanggal: "16 Sep 2025, 16.30",
    },
    {
      id: 19,
      kategori: "Outbound",
      jenisCount: 3,
      sourceType: "outbound",
      flagChatCall: "Call",
      idTiket: 11,
      genesisNumber: "1755159225.1628",
      agent: "Century",
      tanggal: "16 Sep 2025, 16.25",
    },
    {
      id: 18,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 16.20",
    },
    {
      id: 17,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 16.08",
    },
    {
      id: 16,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 16.01",
    },
    {
      id: 15,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 15.22",
    },
    {
      id: 14,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.53",
    },
    {
      id: 13,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.51",
    },
    {
      id: 12,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.46",
    },
    {
      id: 11,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.42",
    },
    {
      id: 10,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.36",
    },
    {
      id: 9,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.28",
    },
    {
      id: 8,
      kategori: "Chat",
      jenisCount: 3,
      sourceType: "Unknown",
      flagChatCall: "Chat",
      idTiket: 1,
      genesisNumber: "315233",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.21",
    },
    {
      id: 7,
      kategori: "Outbound",
      jenisCount: 3,
      sourceType: "outbound",
      flagChatCall: "Call",
      idTiket: 11,
      genesisNumber: "1755159225.1628",
      agent: "Century",
      tanggal: "16 Sep 2025, 14.08",
    },
  ];

  // Kategori filter options
  const kategoriOptions: DropdownOption[] = [
    { value: "", label: "Semua Kategori" },
    { value: 6, label: "Call" },
    { value: 7, label: "Outbound" },
    { value: 11, label: "Chat" },
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const filtered = allQaResults.filter((qa) => {
      if (kategoriFilter) {
        const kategoriMap: Record<number, string> = { 6: "Call", 7: "Outbound", 11: "Chat" };
        const kategoriLabel = kategoriMap[kategoriFilter as number];
        if (kategoriLabel && qa.kategori !== kategoriLabel) return false;
      }
      return true;
    });

    return {
      totalForms: filtered.length,
      chatForms: filtered.filter((qa) => qa.kategori === "Chat").length,
      callForms: filtered.filter((qa) => qa.kategori === "Call").length,
      outboundForms: filtered.filter((qa) => qa.kategori === "Outbound").length,
    };
  }, [allQaResults, kategoriFilter]);

  // Filter QA results based on filters
  const filteredQaResults = useMemo(() => {
    return allQaResults.filter((qa) => {
      if (kategoriFilter) {
        const kategoriMap: Record<number, string> = { 6: "Call", 7: "Outbound", 11: "Chat" };
        const kategoriLabel = kategoriMap[kategoriFilter as number];
        if (kategoriLabel && qa.kategori !== kategoriLabel) return false;
      }
      // Date filtering would be implemented here if needed
      return true;
    });
  }, [allQaResults, kategoriFilter, dateFrom, dateTo]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredQaResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQaResults = filteredQaResults.slice(startIndex, endIndex);

  const handleApplyFilter = () => {
    setIsLoading(true);
    setCurrentPage(1);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setCurrentPage(1);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleExport = () => {
    // Handle export functionality
    window.open("/qa-report/export", "_blank");
  };

  const showDetail = (qaId: number) => {
    const qa = allQaResults.find((q) => q.id === qaId);
    if (qa) {
      setSelectedQa(qa);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQa(null);
  };

  const getSourceTypeBadgeColor = (sourceType: string) => {
    return "bg-gray-500";
  };

  const getFlagBadgeColor = (flag: string) => {
    if (flag === "Chat") {
      return "bg-green-500";
    } else if (flag === "Call") {
      return "bg-blue-500";
    }
    return "bg-gray-500";
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">QA Report Dashboard</h1>
                <p className="text-[var(--text-secondary)] mt-1">
                  Monitoring dan analisis hasil Quality Assurance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--accent-color)] mb-2">
                    Kategori
                  </label>
                  <Dropdown
                    options={kategoriOptions}
                    value={kategoriFilter}
                    placeholder="Semua Kategori"
                    onChange={(value) => setKategoriFilter(value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--accent-color)] mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Tanggal Mulai
                  </label>
                  <Calendar
                    value={dateFrom}
                    onChange={(value) => setDateFrom(value)}
                    placeholder="Select start date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--accent-color)] mb-2 flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4" />
                    Tanggal Akhir
                  </label>
                  <Calendar
                    value={dateTo}
                    onChange={(value) => setDateTo(value)}
                    placeholder="Select end date"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleApplyFilter}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Terapkan Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Total QA Forms */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">Total QA Forms</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.totalForms}</p>
                  </div>
                  <div className="bg-blue-500 rounded-full p-3">
                    <ClipboardList className="text-white text-xl" />
                  </div>
                </div>
              </div>

              {/* Chat Evaluations */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">Chat Evaluations</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.chatForms}</p>
                  </div>
                  <div className="bg-green-500 rounded-full p-3">
                    <MessageSquare className="text-white text-xl" />
                  </div>
                </div>
              </div>

              {/* Call Evaluations */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">Call Evaluations</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.callForms}</p>
                  </div>
                  <div className="bg-yellow-500 rounded-full p-3">
                    <Phone className="text-white text-xl" />
                  </div>
                </div>
              </div>

              {/* Outbound Evaluations */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">Outbound Evaluations</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.outboundForms}</p>
                  </div>
                  <div className="bg-purple-500 rounded-full p-3">
                    <PhoneCall className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[var(--border-color)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Data QA Result Forms</h3>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)] mb-3"></div>
                  <p className="text-[var(--text-secondary)]">Memuat data...</p>
                </div>
              )}

              {/* Table */}
              {!isLoading && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[var(--border-color)]">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            ID
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Kategori
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Jenis Count
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Source Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Flag Chat/Call
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            ID Tiket
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Genesis Number
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Agent
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Tanggal
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--accent-color)]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedQaResults.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="px-4 py-8 text-center">
                              <div className="flex flex-col items-center">
                                <Inbox className="text-[var(--text-tertiary)] text-4xl mb-3" />
                                <p className="text-[var(--text-secondary)]">Tidak ada data QA Result Forms</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          paginatedQaResults.map((qa) => (
                            <tr
                              key={qa.id}
                              className="border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                            >
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.id}</td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.kategori}</td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.jenisCount}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs text-white ${getSourceTypeBadgeColor(qa.sourceType)}`}>
                                  {qa.sourceType}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs text-white ${getFlagBadgeColor(qa.flagChatCall)}`}>
                                  {qa.flagChatCall}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.idTiket}</td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.genesisNumber}</td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.agent}</td>
                              <td className="px-4 py-3 text-[var(--text-primary)]">{qa.tanggal}</td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => showDetail(qa.id)}
                                  className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm transition-colors flex items-center gap-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {filteredQaResults.length > 0 && totalPages > 1 && (
                    <div className="p-4 border-t border-[var(--border-color)]">
                      <nav>
                        <ul className="flex justify-center items-center gap-2">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page}>
                              <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                                  currentPage === page
                                    ? "bg-[var(--accent-color)] text-white"
                                    : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-quaternary)] border border-[var(--border-color)]"
                                }`}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                          {currentPage < totalPages && (
                            <li>
                              <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-quaternary)] border border-[var(--border-color)] rounded-lg text-sm transition-colors"
                              >
                                Next
                              </button>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {isModalOpen && selectedQa && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
                <h5 className="text-xl font-semibold text-[var(--text-primary)]">Detail QA Result Form</h5>
                <button
                  onClick={closeModal}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">ID</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.id}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Kategori</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.kategori}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Jenis Count</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.jenisCount}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Source Type</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.sourceType}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Flag Chat/Call</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.flagChatCall}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">ID Tiket</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.idTiket}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Genesis Number</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.genesisNumber}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Agent</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.agent}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[var(--text-secondary)] text-sm mb-1">Tanggal</p>
                    <p className="text-[var(--text-primary)] font-medium">{selectedQa.tanggal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};

export default QaReport;
