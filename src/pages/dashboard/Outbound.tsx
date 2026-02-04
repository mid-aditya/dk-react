import { CheckCircle, ChevronLeft, ChevronRight, Download, Headphones, MessageSquare, Receipt, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";

interface Ticket {
  id: number;
  ticket_number: string;
  customer_name: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  subject: string;
  category: string;
  subcategory: string;
  answer: string;
  need_escalated: string;
  created_at: string;
  recording_id: string | null;
}

const Outbound: React.FC = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data - will be replaced with API data
  const allTickets: Ticket[] = [
    {
      id: 1,
      ticket_number: "202503221500265559",
      customer_name: "N/A",
      priority: "High",
      status: "Open",
      subject: "tes",
      category: "Category 1",
      subcategory: "Category Type 1 1",
      answer: "tes",
      need_escalated: "No",
      created_at: "2025-03-22T01:00:26.000000Z",
      recording_id: null,
    },
    {
      id: 2,
      ticket_number: "202503221501314177",
      customer_name: "N/A",
      priority: "Low",
      status: "Closed",
      subject: "tes",
      category: "Category 2",
      subcategory: "Category Type 2 1",
      answer: "res",
      need_escalated: "No",
      created_at: "2025-03-22T01:01:31.000000Z",
      recording_id: null,
    },
  ];

  // Status statistics
  const statusStats = {
    Open: 4,
    Closed: 1,
    "No Answer": 9,
    "Wrong Number": 2,
    "Done Approved": 8,
    "Done Not Approved": 4,
    "Answer Follow Up": 3,
    Busy: 14,
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  // Filter tickets based on selected statuses and search term
  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status);
      const matchesSearch =
        searchTerm === "" ||
        ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allTickets, selectedStatuses, searchTerm]);

  // Pagination logic
  const totalEntries = filteredTickets.length;
  const totalPages = entriesPerPage === -1 ? 1 : Math.ceil(totalEntries / entriesPerPage);
  const firstEntryIndex = entriesPerPage === -1 ? 1 : (currentPage - 1) * entriesPerPage + 1;
  const lastEntryIndex =
    entriesPerPage === -1
      ? totalEntries
      : Math.min(currentPage * entriesPerPage, totalEntries);

  const paginatedData = useMemo(() => {
    if (entriesPerPage === -1) return filteredTickets;
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredTickets.slice(start, end);
  }, [filteredTickets, currentPage, entriesPerPage]);

  const paginationPages = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  const goToPage = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Open") {
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
    } else if (status === "Closed") {
      return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
    } else {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "Open") {
      return MessageSquare;
    } else if (status === "Closed") {
      return CheckCircle;
    } else {
      return Receipt;
    }
  };

  const getStatusBgColor = (status: string) => {
    if (status === "Open") {
      return "from-green-500/20 to-green-600/20";
    } else if (status === "Closed") {
      return "from-red-500/20 to-red-600/20";
    } else {
      return "from-blue-500/20 to-blue-600/20";
    }
  };

  const handleExportExcel = () => {
    // Handle export to Excel
    window.open("https://crm.datakelola.com/outbound/tickets/export/excel", "_blank");
  };

  const showModal = (ticket: Ticket) => {
    // Handle show ticket modal
    console.log("Show modal for ticket:", ticket);
  };

  const showRecordingInfo = (e: React.MouseEvent, recordingId: string) => {
    e.stopPropagation();
    // Handle show recording info
    console.log("Show recording info:", recordingId);
  };

  const showSTTNew = (e: React.MouseEvent, ticketId: number, recordingId: string) => {
    e.stopPropagation();
    // Handle show STT
    console.log("Show STT for ticket:", ticketId, recordingId);
  };

  const openQAModal = (e: React.MouseEvent, recordingId: string, ticketNumber: string, ticketId: number) => {
    e.stopPropagation();
    // Handle open QA modal
    console.log("Open QA modal:", recordingId, ticketNumber, ticketId);
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Status Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 mb-8 overflow-hidden">
              {Object.entries(statusStats).map(([status, count]) => {
                const StatusIcon = getStatusIcon(status);
                const isSelected = selectedStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => toggleStatusFilter(status)}
                    className={`bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-3 sm:p-6 transform hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer min-w-0 ${
                      isSelected ? "ring-2 ring-[var(--accent-color)] ring-offset-2 ring-offset-[var(--bg-primary)]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <div
                          className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br ${getStatusBgColor(status)}`}
                        >
                          <StatusIcon
                            className={`text-lg sm:text-2xl ${
                              status === "Open"
                                ? "text-green-500"
                                : status === "Closed"
                                ? "text-red-500"
                                : "text-blue-500"
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{count}</h3>
                          <p className="text-[var(--text-secondary)] text-xs sm:text-sm truncate">{status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tickets List */}
            <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl overflow-x-hidden min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-color)]/30 flex items-center justify-center">
                    <Receipt className="text-lg sm:text-xl text-[var(--accent-color)]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                    Daftar Tiket Outbound
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleExportExcel}
                    className="px-3 py-2 sm:px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export Excel</span>
                    <span className="sm:hidden">Export</span>
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4 max-w-full">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <label htmlFor="entries" className="text-[var(--text-secondary)] text-xs sm:text-sm">
                    Tampilkan
                  </label>
                  <select
                    id="entries"
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="text-[var(--text-primary)] bg-[var(--bg-tertiary)] border-[var(--border-color)] rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)]"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={-1}>Semua</option>
                  </select>
                  <span className="text-[var(--text-secondary)] text-xs sm:text-sm">entries</span>
                </div>

                <div className="w-full sm:w-auto sm:min-w-[200px] min-w-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Cari tiket..."
                      className="w-full pl-9 pr-3 py-2 text-[var(--text-primary)] bg-[var(--bg-tertiary)] border-[var(--border-color)] rounded-lg text-sm focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)]"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-w-full">
                <table className="w-full max-w-full table-auto text-sm text-left text-[var(--text-secondary)]">
                  <thead className="text-xs text-[var(--text-secondary)] uppercase bg-[var(--bg-tertiary)]">
                    <tr>
                      <th scope="col" className="px-2 py-3 min-w-[30px] sm:min-w-[40px]">
                        No
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[100px] sm:min-w-[120px]">
                        Ticket #
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[120px] sm:min-w-[150px] hidden sm:table-cell">
                        Customer
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[50px] sm:min-w-[60px]">
                        Priority
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[50px] sm:min-w-[60px]">
                        Status
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[150px] sm:min-w-[180px]">
                        Subject
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[80px] sm:min-w-[100px] hidden md:table-cell">
                        Category
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[80px] sm:min-w-[100px] hidden lg:table-cell">
                        Sub Cat
                      </th>
                      <th scope="col" className="px-2 py-3 min-w-[150px] sm:min-w-[200px] hidden lg:table-cell">
                        Answer
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[60px] sm:min-w-[70px] hidden md:table-cell">
                        Escalated
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[80px] sm:min-w-[100px] hidden lg:table-cell">
                        Created
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[80px] sm:min-w-[100px]">
                        Recording
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[50px] sm:min-w-[60px]">
                        STT
                      </th>
                      <th scope="col" className="px-2 py-3 text-center min-w-[50px] sm:min-w-[60px]">
                        QA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                        <td colSpan={13} className="px-4 py-10 text-center text-[var(--text-secondary)]">
                          Tidak ada tiket yang ditemukan.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((ticket, index) => (
                        <tr
                          key={ticket.id}
                          onClick={() => showModal(ticket)}
                          className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]/50 transition-colors cursor-pointer"
                        >
                          <td className="px-2 py-3 text-center text-[var(--text-primary)]">
                            {firstEntryIndex + index}
                          </td>
                          <td className="px-2 py-3 text-[var(--text-primary)] font-medium">
                            {ticket.ticket_number}
                          </td>
                          <td className="px-2 py-3 text-[var(--text-primary)] hidden sm:table-cell">
                            {ticket.customer_name}
                          </td>
                          <td className="px-2 py-3 text-center">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}
                            >
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-center">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-2 py-3 max-w-[150px] sm:max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)] break-words">
                            {ticket.subject}
                          </td>
                          <td className="px-2 py-3 text-[var(--text-primary)] hidden md:table-cell">
                            {ticket.category}
                          </td>
                          <td className="px-2 py-3 text-[var(--text-primary)] hidden lg:table-cell">
                            {ticket.subcategory}
                          </td>
                          <td className="px-2 py-3 max-w-[150px] sm:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)] hidden lg:table-cell break-words">
                            {ticket.answer}
                          </td>
                          <td className="px-2 py-3 text-center text-[var(--text-primary)] hidden md:table-cell">
                            {ticket.need_escalated}
                          </td>
                          <td className="px-2 py-3 text-center text-[var(--text-primary)] text-xs hidden lg:table-cell">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-2 py-3 text-center">
                            {ticket.recording_id ? (
                              <button
                                onClick={(e) => showRecordingInfo(e, ticket.recording_id!)}
                                className="px-2 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded text-xs transition-colors shadow-md flex items-center gap-1 mx-auto"
                              >
                                <Headphones className="w-3 h-3" />
                                Play
                              </button>
                            ) : (
                              <span className="text-[var(--text-tertiary)] text-xs">-</span>
                            )}
                          </td>
                          <td className="px-2 py-3 text-center">
                            {ticket.recording_id ? (
                              <button
                                onClick={(e) => showSTTNew(e, ticket.id, ticket.recording_id!)}
                                className="p-1.5 bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]/50 rounded transition-colors shadow-md"
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/1599/1599234.png"
                                  className="w-4 h-4 mx-auto"
                                  alt="STT"
                                />
                              </button>
                            ) : (
                              <span className="text-[var(--text-tertiary)] text-xs">-</span>
                            )}
                          </td>
                          <td className="px-2 py-3 text-center">
                            {ticket.recording_id ? (
                              <button
                                onClick={(e) =>
                                  openQAModal(e, ticket.recording_id!, ticket.ticket_number, ticket.id)
                                }
                                className="p-1.5 bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]/50 rounded transition-colors shadow-md"
                              >
                                <img
                                  src="https://cloud.uidesk.id/v2uidesk/images/icon/qa.png"
                                  className="w-4 h-4 mx-auto"
                                  alt="QA"
                                />
                              </button>
                            ) : (
                              <span className="text-[var(--text-tertiary)] text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 gap-3">
                {totalEntries > 0 && (
                  <div className="text-[var(--text-primary)] text-xs sm:text-sm">
                    <span className="hidden sm:inline">
                      Menampilkan <span>{firstEntryIndex}</span> sampai <span>{lastEntryIndex}</span> dari{" "}
                      <span>{filteredTickets.length}</span> tiket
                    </span>
                    <span className="sm:hidden">
                      <span>{firstEntryIndex}</span>-<span>{lastEntryIndex}</span> dari{" "}
                      <span>{filteredTickets.length}</span>
                    </span>
                  </div>
                )}

                {totalPages > 1 && (
                  <nav className="w-full sm:w-auto">
                    <ul className="flex items-center justify-center sm:justify-end space-x-1">
                      <li>
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className="p-1.5 sm:p-2 rounded-lg bg-[var(--bg-tertiary)]/30 text-[var(--text-primary)] disabled:bg-[var(--bg-tertiary)]/10 disabled:text-[var(--text-tertiary)] transition-colors shadow-sm"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </li>
                      {paginationPages.map((page, index) => (
                        <li key={index}>
                          {typeof page === "number" ? (
                            <button
                              onClick={() => goToPage(page)}
                              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[var(--text-primary)] transition-colors text-xs sm:text-sm font-medium shadow-sm ${
                                currentPage === page
                                  ? "bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white"
                                  : "bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]/50"
                              }`}
                            >
                              {page}
                            </button>
                          ) : (
                            <span className="px-2 py-1.5 sm:px-4 sm:py-2 text-[var(--text-secondary)]">
                              {page}
                            </span>
                          )}
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className="p-1.5 sm:p-2 rounded-lg bg-[var(--bg-tertiary)]/30 text-[var(--text-primary)] disabled:bg-[var(--bg-tertiary)]/10 disabled:text-[var(--text-tertiary)] transition-colors shadow-sm"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Outbound;
