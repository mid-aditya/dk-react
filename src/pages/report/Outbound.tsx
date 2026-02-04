import {
    CalendarCheck,
    Calendar as CalendarIcon,
    Download,
    Search,
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Calendar from "../../components/ui/Calendar";
import Table, { TableColumn } from "../../components/ui/Table";

interface OutboundTicket {
  id: number;
  ticketNumber: string;
  customerName: string;
  priority: string;
  status: string;
  subject: string;
  category: string;
  answer: string;
  needEscalated: string;
  createdAt: string;
}

const Outbound: React.FC = () => {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Sample data based on reference HTML
  const [tickets, setTickets] = useState<OutboundTicket[]>([
    {
      id: 1,
      ticketNumber: "202510171838102725",
      customerName: "Restu",
      priority: "High",
      status: "Open",
      subject: "folwowjwofjwof",
      category: "Corporate",
      answer: "testing",
      needEscalated: "No",
      createdAt: "2025-10-17 18:38:10",
    },
    {
      id: 2,
      ticketNumber: "202510151503561267",
      customerName: "Raihan",
      priority: "Low",
      status: "Done Not Approved",
      subject: "test tiket",
      category: "Corporate",
      answer: "test tiket",
      needEscalated: "No",
      createdAt: "2025-10-15 15:03:56",
    },
    {
      id: 3,
      ticketNumber: "202510151452182222",
      customerName: "Galih",
      priority: "Low",
      status: "Busy",
      subject: "testing submit",
      category: "Corporate",
      answer: "testing submit",
      needEscalated: "No",
      createdAt: "2025-10-15 14:52:18",
    },
    {
      id: 4,
      ticketNumber: "202510151451477929",
      customerName: "Fatur",
      priority: "High",
      status: "Busy",
      subject: "testing submit",
      category: "Corporate",
      answer: "Ya ini testing",
      needEscalated: "No",
      createdAt: "2025-10-15 14:51:47",
    },
    {
      id: 5,
      ticketNumber: "202508281117537419",
      customerName: "wanda",
      priority: "High",
      status: "Done Not Approved",
      subject: "belum mengangkat",
      category: "Corporate",
      answer: "sudah di angkat sama customernya",
      needEscalated: "No",
      createdAt: "2025-08-28 11:17:53",
    },
    {
      id: 6,
      ticketNumber: "202508152140565738",
      customerName: "Elang ",
      priority: "High",
      status: "No Answer",
      subject: "tidak diangkat",
      category: "Corporate",
      answer: "fdfd",
      needEscalated: "No",
      createdAt: "2025-08-15 21:40:56",
    },
    {
      id: 7,
      ticketNumber: "202508152140118163",
      customerName: "Elang ",
      priority: "High",
      status: "Busy",
      subject: "tidak diangkat",
      category: "Personal",
      answer: "oplastik",
      needEscalated: "No",
      createdAt: "2025-08-15 21:40:11",
    },
    {
      id: 8,
      ticketNumber: "202508152138443175",
      customerName: "Elang ",
      priority: "High",
      status: "Busy",
      subject: "tidak diangkat",
      category: "Personal",
      answer: "saasda",
      needEscalated: "No",
      createdAt: "2025-08-15 21:38:44",
    },
    {
      id: 9,
      ticketNumber: "202508152138151688",
      customerName: "Galih",
      priority: "High",
      status: "Answer Follow Up",
      subject: "diangkat",
      category: "Personal",
      answer: "sdsdsfdsd",
      needEscalated: "No",
      createdAt: "2025-08-15 21:38:15",
    },
    {
      id: 10,
      ticketNumber: "202508152137119309",
      customerName: "rayhand",
      priority: "High",
      status: "Answer Follow Up",
      subject: "angkat 4",
      category: "Personal",
      answer: "bgn",
      needEscalated: "No",
      createdAt: "2025-08-15 21:37:11",
    },
    {
      id: 11,
      ticketNumber: "202508152136443577",
      customerName: "Aya",
      priority: "High",
      status: "Wrong Number",
      subject: "diangkat",
      category: "Personal",
      answer: "night",
      needEscalated: "No",
      createdAt: "2025-08-15 21:36:44",
    },
    {
      id: 12,
      ticketNumber: "202508152129208394",
      customerName: "Aya",
      priority: "Low",
      status: "Busy",
      subject: "belum mengangkat  1 low",
      category: "Personal",
      answer: "adsa",
      needEscalated: "No",
      createdAt: "2025-08-15 21:29:20",
    },
    {
      id: 13,
      ticketNumber: "202508152125278111",
      customerName: "Restu",
      priority: "High",
      status: "Busy",
      subject: "tidak ada jawaban",
      category: "Corporate",
      answer: "yaaaa",
      needEscalated: "No",
      createdAt: "2025-08-15 21:25:27",
    },
    {
      id: 14,
      ticketNumber: "202508152125048074",
      customerName: "john",
      priority: "High",
      status: "Busy",
      subject: "tes",
      category: "Corporate",
      answer: "tes",
      needEscalated: "No",
      createdAt: "2025-08-15 21:25:04",
    },
    {
      id: 15,
      ticketNumber: "202508152123411647",
      customerName: "Restu",
      priority: "High",
      status: "Busy",
      subject: "belum mengangkat 2",
      category: "Corporate",
      answer: "sadas",
      needEscalated: "No",
      createdAt: "2025-08-15 21:23:41",
    },
    {
      id: 16,
      ticketNumber: "202508152122513965",
      customerName: "Restu",
      priority: "High",
      status: "Busy",
      subject: "ada",
      category: "Corporate",
      answer: "asd",
      needEscalated: "No",
      createdAt: "2025-08-15 21:22:51",
    },
    {
      id: 17,
      ticketNumber: "202508152122363853",
      customerName: "Albaihaqi",
      priority: "Low",
      status: "Done Not Approved",
      subject: "f",
      category: "Personal",
      answer: "fafa",
      needEscalated: "No",
      createdAt: "2025-08-15 21:22:36",
    },
    {
      id: 18,
      ticketNumber: "202508152000498610",
      customerName: "Aya",
      priority: "High",
      status: "Done Approved",
      subject: "tes status else than no answer and busy",
      category: "Corporate",
      answer: "testing",
      needEscalated: "No",
      createdAt: "2025-08-15 20:00:49",
    },
    {
      id: 19,
      ticketNumber: "202508151959154999",
      customerName: "Elang ",
      priority: "Reminder",
      status: "Busy",
      subject: "tes status busy",
      category: "Corporate",
      answer: "status busy with priority reminder",
      needEscalated: "No",
      createdAt: "2025-08-15 19:59:15",
    },
    {
      id: 20,
      ticketNumber: "202508151957549668",
      customerName: "Elang ",
      priority: "High",
      status: "No Answer",
      subject: "tes no answer",
      category: "Corporate",
      answer: "testing no answer priority high",
      needEscalated: "No",
      createdAt: "2025-08-15 19:57:55",
    },
  ]);

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In real app, this would fetch data from API
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (dateFrom) params.append("date_from", dateFrom);
    if (dateTo) params.append("date_to", dateTo);
    
    const exportUrl = `/report/outbound/export?${params.toString()}`;
    window.location.href = exportUrl;
  };

  // Pagination calculations
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTickets = tickets.slice(startIndex, endIndex);

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Low":
        return "bg-yellow-500";
      case "Reminder":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500";
      case "Closed":
        return "bg-gray-500";
      case "Done Approved":
        return "bg-green-500";
      case "Done Not Approved":
        return "bg-orange-500";
      case "Answer Follow Up":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const tableColumns: TableColumn<OutboundTicket>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{startIndex + index + 1}</span>
      ),
    },
    {
      key: "ticketNumber",
      header: "Ticket Number",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words whitespace-normal max-w-[120px]">
          {item.ticketNumber}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer Name",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words whitespace-normal max-w-[150px]">
          {item.customerName}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      align: "left",
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getPriorityBadgeColor(
            item.priority
          )}`}
        >
          {item.priority}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusBadgeColor(
            item.status
          )}`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words whitespace-normal max-w-[120px]">
          {item.subject}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words whitespace-normal max-w-[120px]">
          {item.category}
        </span>
      ),
    },
    {
      key: "answer",
      header: "Answer",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-secondary)] break-words whitespace-normal max-w-[150px]">
          {item.answer}
        </span>
      ),
    },
    {
      key: "needEscalated",
      header: "Need Escalated",
      align: "left",
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${
            item.needEscalated === "Yes" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {item.needEscalated}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-secondary)] break-words whitespace-normal max-w-[120px]">
          {item.createdAt}
        </span>
      ),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-3 max-w-7xl mx-auto">
            {/* Filters Section */}
            <form method="GET" onSubmit={handleFilter} className="bg-[var(--bg-secondary)] rounded-2xl p-6 mb-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Start Date */}
                <div>
                  <label
                    htmlFor="date_from"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Start Date
                  </label>
                  <Calendar
                    value={dateFrom}
                    onChange={(value) => setDateFrom(value)}
                    placeholder="Select start date"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    htmlFor="date_to"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                  >
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    End Date
                  </label>
                  <Calendar
                    value={dateTo}
                    onChange={(value) => setDateTo(value)}
                    placeholder="Select end date"
                  />
                </div>

                {/* Filter and Export Buttons */}
                <div className="flex items-end space-x-3 col-span-1 md:col-span-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white font-medium rounded-xl px-6 py-2.5 transition-colors duration-200 flex items-center"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    {isLoading ? "Memproses..." : "Filter"}
                  </button>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white font-medium rounded-xl px-6 py-2.5 transition-colors duration-200 flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </form>

            {/* Report Table */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Outbound Transaction Report
                </h3>
                <div className="text-[var(--text-secondary)] text-sm">
                  Total: <span className="text-[var(--text-primary)] font-semibold">{tickets.length}</span> tickets
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table
                  columns={tableColumns}
                  data={paginatedTickets}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No tickets found"
                />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-end mt-6">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] disabled:bg-[var(--bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-primary)] rounded-lg transition-colors duration-200 border border-[var(--border-color)]"
                    >
                      ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                              currentPage === page
                                ? "bg-[var(--accent-color)] text-white"
                                : "bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] border border-[var(--border-color)]"
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

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] disabled:bg-[var(--bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-primary)] rounded-lg transition-colors duration-200 border border-[var(--border-color)]"
                    >
                      ›
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Outbound;
