import {
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    Download,
    Edit,
    FileUp,
    Info,
    Search,
    Shuffle,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown";
import IconButton from "../../../../components/ui/IconButton";
import Modal from "../../../../components/ui/Modal";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface CustomerTicket {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  tagihan: string;
}

interface OutboundTicketData {
  id: number;
  description: string;
  status: "active" | "inactive";
  channel: string;
  startDate: string;
  endDate: string;
  scriptOutbound: string;
  customers: CustomerTicket[];
  isExpanded?: boolean;
}

const ImportData: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false);
  const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState(false);
  const [isImportExistingModalOpen, setIsImportExistingModalOpen] = useState(false);
  const [isAgentSelectionModalOpen, setIsAgentSelectionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<OutboundTicketData | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<CustomerTicket | null>(null);

  // Sample data based on reference HTML
  const [ticketData, setTicketData] = useState<OutboundTicketData[]>([
    {
      id: 112,
      description: "sfedfewfew",
      status: "active",
      channel: "whacenter-whatsapp",
      startDate: "2025-11-27 11:28",
      endDate: "2025-11-29 11:28",
      scriptOutbound: "-",
      customers: [
        {
          id: 26516,
          name: "Raihan",
          email: "john@gmail.com",
          phone: "083139010550",
          address: "tajur",
          tagihan: "Rp 150.000",
        },
        {
          id: 26517,
          name: "Bruh",
          email: "john@gmail.com",
          phone: "085187696200",
          address: "tajur",
          tagihan: "Rp 150.001",
        },
        {
          id: 26518,
          name: "Fatur Rachmat Ramadan",
          email: "john@gmail.com",
          phone: "081291566795",
          address: "tajur",
          tagihan: "Rp 150.002",
        },
        {
          id: 26519,
          name: "Gaih Aditya Pratama",
          email: "john@gmail.com",
          phone: "081329453873",
          address: "tajur",
          tagihan: "Rp 150.003",
        },
      ],
    },
    {
      id: 111,
      description: "Testing Import Name",
      status: "active",
      channel: "whacenter-whatsapp",
      startDate: "2025-11-27 10:45",
      endDate: "2025-11-29 10:45",
      scriptOutbound: "-",
      customers: [],
    },
    {
      id: 101,
      description: "Testing vlast",
      status: "active",
      channel: "whacenter-whatsapp",
      startDate: "2025-11-15 06:27",
      endDate: "2025-11-22 06:27",
      scriptOutbound: "-",
      customers: [],
    },
    {
      id: 100,
      description: "hbudfbdef",
      status: "active",
      channel: "whacenter-whatsapp",
      startDate: "2025-11-15 06:22",
      endDate: "2025-11-22 06:22",
      scriptOutbound: "-",
      customers: [],
    },
    {
      id: 94,
      description: "Testing blast 50 data",
      status: "active",
      channel: "whacenter-whatsapp",
      startDate: "2025-11-02 19:15",
      endDate: "2025-11-08 19:15",
      scriptOutbound: "Category 1",
      customers: [],
    },
    {
      id: 90,
      description: "testing existing",
      status: "active",
      channel: "call",
      startDate: "2025-10-16 08:43",
      endDate: "2025-10-25 08:43",
      scriptOutbound: "SCRIPT OUTBOUND CALL MEGAVISION",
      customers: [],
    },
  ]);

  const filteredData = ticketData.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const startEntry = filteredData.length > 0 ? startIndex + 1 : 0;
  const endEntry = Math.min(endIndex, filteredData.length);

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleEditDescription = (item: OutboundTicketData) => {
    setSelectedDescription(item);
    setIsEditDescriptionModalOpen(true);
  };

  const handleDeleteDescription = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setTicketData(ticketData.filter((item) => item.id !== id));
    }
  };

  const handleEditTicket = (ticket: CustomerTicket) => {
    setSelectedTicket(ticket);
    setIsEditTicketModalOpen(true);
  };

  const handleDeleteTicket = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ticket ini?")) {
      setTicketData((prev) =>
        prev.map((item) => ({
          ...item,
          customers: item.customers.filter((c) => c.id !== id),
        }))
      );
    }
  };

  const handleImportExisting = (item: OutboundTicketData) => {
    setSelectedDescription(item);
    setIsImportExistingModalOpen(true);
  };

  const handleDistributeAgents = (id: number) => {
    setIsAgentSelectionModalOpen(true);
  };

  const channelOptions: DropdownOption[] = [
    { value: "call", label: "Call" },
    { value: "meta-whatsapp", label: "Whatsapp Official" },
    { value: "whacenter-whatsapp", label: "Whatsapp Unofficial" },
  ];

  const statusOptions: DropdownOption[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const scriptOutboundOptions: DropdownOption[] = [
    { value: "", label: "- Tanpa Script -" },
    { value: "1", label: "SCRIPT OUTBOUND CALL MEGAVISION" },
    { value: "9", label: "Category 1" },
  ];

  const groupRouteOptions: DropdownOption[] = [
    { value: "", label: "Global (Tanpa Group Route)" },
    { value: "2", label: "KCP Bogor (Bogor)" },
    { value: "3", label: "KCP Tangsel (Tangsel)" },
    { value: "5", label: "KCP Padang (Padang)" },
    { value: "9", label: "Pusat (Pusat)" },
  ];

  // Table columns for main table
  const mainTableColumns: TableColumn<OutboundTicketData>[] = [
    {
      key: "expand",
      header: "",
      align: "center",
      width: "48px",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleRow(item.id);
          }}
          className="text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
        >
          {expandedRows.has(item.id) ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      ),
    },
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => <span>{startIndex + index + 1}</span>,
    },
    {
      key: "description",
      header: "Description",
      align: "left",
      render: (item) => <span>{item.description}</span>,
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            item.status === "active"
              ? "bg-[var(--success-color)] text-white"
              : "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    {
      key: "channel",
      header: "Channel",
      align: "left",
      render: (item) => <span>{item.channel}</span>,
    },
    {
      key: "startDate",
      header: "Start Date",
      align: "left",
      render: (item) => <span>{item.startDate}</span>,
    },
    {
      key: "endDate",
      header: "End Date",
      align: "left",
      render: (item) => <span>{item.endDate}</span>,
    },
    {
      key: "scriptOutbound",
      header: "Script Outbound",
      align: "left",
      render: (item) => <span>{item.scriptOutbound}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.channel === "call" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDistributeAgents(item.id);
              }}
              className="p-2 bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg transition-colors"
              title="Distribute Agents"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          )}
          <IconButton
            icon={Edit}
            onClick={(e) => {
              e.stopPropagation();
              handleEditDescription(item);
            }}
            variant="edit"
            title="Edit"
          />
          <IconButton
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDescription(item.id);
            }}
            variant="delete"
            title="Delete"
          />
          {item.channel === "whacenter-whatsapp" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Show info alert
              }}
              className="p-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors"
              title="Info"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
          {item.channel === "call" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImportExisting(item);
              }}
              className="px-3 py-1.5 bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg transition-colors text-sm flex items-center gap-1"
              title="Tambah Data"
            >
              <FileUp className="w-3 h-3" />
              Tambah Data
            </button>
          )}
        </div>
      ),
    },
  ];

  // Table columns for customer tickets
  const customerTableColumns: TableColumn<CustomerTicket>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => <span>{index + 1}</span>,
    },
    {
      key: "name",
      header: "Name",
      align: "left",
      render: (item) => <span>{item.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      align: "left",
      render: (item) => <span>{item.email}</span>,
    },
    {
      key: "phone",
      header: "Phone",
      align: "left",
      render: (item) => <span>{item.phone}</span>,
    },
    {
      key: "address",
      header: "Address",
      align: "left",
      render: (item) => <span>{item.address}</span>,
    },
    {
      key: "tagihan",
      header: "Tagihan",
      align: "left",
      render: (item) => <span>{item.tagihan}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          <IconButton
            icon={Edit}
            onClick={(e) => {
              e.stopPropagation();
              handleEditTicket(item);
            }}
            variant="edit"
            title="Edit"
          />
          <IconButton
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTicket(item.id);
            }}
            variant="delete"
            title="Delete"
          />
        </div>
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
                Import Data Customer
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your outbound ticket data
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-3xl p-6">
              {/* Search and Action Buttons */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari data..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/outbound/tickets/template/download"
                    className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Import Template
                  </a>
                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FileUp className="w-4 h-4" />
                    Import Data
                  </button>
                </div>
              </div>

              {/* Main Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--border-color)]">
                  <thead>
                    <tr className="bg-[var(--bg-tertiary)]">
                      {mainTableColumns.map((column) => (
                        <th
                          key={column.key}
                          className={`px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider ${
                            column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""
                          }`}
                        >
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[var(--bg-secondary)] divide-y divide-[var(--border-color)]">
                    {paginatedData.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr className="hover:bg-[var(--bg-tertiary)] transition-colors">
                          {mainTableColumns.map((column) => (
                            <td
                              key={column.key}
                              className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]"
                            >
                              {column.render ? column.render(item, paginatedData.indexOf(item)) : null}
                            </td>
                          ))}
                        </tr>
                        {expandedRows.has(item.id) && (
                          <tr>
                            <td colSpan={mainTableColumns.length} className="p-0">
                              <div className="overflow-x-auto p-4 bg-[var(--bg-tertiary)]">
                                <h6 className="text-[var(--text-primary)] mb-3 font-semibold">
                                  Data customer dari campaign ini :
                                </h6>
                                {item.customers.length > 0 ? (
                                  <Table
                                    columns={customerTableColumns}
                                    data={item.customers}
                                    className="bg-[var(--bg-tertiary)]"
                                    emptyMessage="No customer data"
                                  />
                                ) : (
                                  <div className="text-center py-8 text-[var(--text-secondary)]">
                                    Tidak ada data customer
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Menampilkan {startEntry} sampai {endEntry} dari {filteredData.length} data
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--bg-quaternary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      « Previous
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
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                currentPage === page
                                  ? "bg-[var(--accent-color)] text-white"
                                  : "text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-[var(--bg-quaternary)]"
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
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md hover:bg-[var(--bg-quaternary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next »
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Import Modal */}
        <Modal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          title="Import Ticket Data"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle import logic here
                  setIsImportModalOpen(false);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Import
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Choose Excel File <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Description <span className="text-[var(--error-color)]">*</span>
              </label>
              <textarea
                className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 min-h-[100px]"
                placeholder="Masukkan deskripsi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={statusOptions}
                value="active"
                onChange={(value) => console.log("Status:", value)}
                placeholder="Pilih Status"
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Start Date <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  End Date <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Script Outbound
              </label>
              <Dropdown
                options={scriptOutboundOptions}
                value=""
                onChange={(value) => console.log("Script Outbound:", value)}
                placeholder="- Tanpa Script -"
              />
              <small className="text-[var(--text-secondary)] text-xs mt-1 block">
                Wajib untuk channel Call; opsional untuk WhatsApp.
              </small>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Group Route
              </label>
              <Dropdown
                options={groupRouteOptions}
                value=""
                onChange={(value) => console.log("Group Route:", value)}
                placeholder="Global (Tanpa Group Route)"
              />
              <small className="text-[var(--text-secondary)] text-xs mt-1 block">
                Pilih group route atau biarkan kosong untuk global
              </small>
            </div>
          </div>
        </Modal>

        {/* Edit Description Modal */}
        <Modal
          isOpen={isEditDescriptionModalOpen}
          onClose={() => {
            setIsEditDescriptionModalOpen(false);
            setSelectedDescription(null);
          }}
          title="Edit Description Data"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditDescriptionModalOpen(false);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle update logic here
                  setIsEditDescriptionModalOpen(false);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Update
              </button>
            </div>
          }
        >
          {selectedDescription && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Description <span className="text-[var(--error-color)]">*</span>
                </label>
                <textarea
                  defaultValue={selectedDescription.description}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Status <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={statusOptions}
                  value={selectedDescription.status}
                  onChange={(value) => console.log("Status:", value)}
                  placeholder="Pilih Status"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Channel <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={channelOptions}
                  value={selectedDescription.channel}
                  onChange={(value) => console.log("Channel:", value)}
                  placeholder="Pilih Channel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Script Outbound
                </label>
                <Dropdown
                  options={scriptOutboundOptions}
                  value={selectedDescription.scriptOutbound === "-" ? "" : selectedDescription.scriptOutbound}
                  onChange={(value) => console.log("Script Outbound:", value)}
                  placeholder="- Tanpa Script -"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Group Route
                </label>
                <Dropdown
                  options={groupRouteOptions}
                  value=""
                  onChange={(value) => console.log("Group Route:", value)}
                  placeholder="Global (Tanpa Group Route)"
                />
                <small className="text-[var(--text-secondary)] text-xs mt-1 block">
                  Pilih group route atau biarkan kosong untuk global
                </small>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Start Date <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue={selectedDescription.startDate.replace(" ", "T")}
                    className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    End Date <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue={selectedDescription.endDate.replace(" ", "T")}
                    className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Edit Ticket Modal */}
        <Modal
          isOpen={isEditTicketModalOpen}
          onClose={() => {
            setIsEditTicketModalOpen(false);
            setSelectedTicket(null);
          }}
          title="Edit Ticket Data"
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditTicketModalOpen(false);
                  setSelectedTicket(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle update logic here
                  setIsEditTicketModalOpen(false);
                  setSelectedTicket(null);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Update
              </button>
            </div>
          }
        >
          {selectedTicket && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Name <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedTicket.name}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Email <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="email"
                  defaultValue={selectedTicket.email}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Phone <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedTicket.phone}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Address <span className="text-[var(--error-color)]">*</span>
                </label>
                <textarea
                  defaultValue={selectedTicket.address}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Tagihan <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedTicket.tagihan}
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
            </div>
          )}
        </Modal>

        {/* Import Existing Modal */}
        <Modal
          isOpen={isImportExistingModalOpen}
          onClose={() => {
            setIsImportExistingModalOpen(false);
            setSelectedDescription(null);
          }}
          title={`Tambah Data ke Campaign : ${selectedDescription?.description || ""}`}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsImportExistingModalOpen(false);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle import existing logic here
                  setIsImportExistingModalOpen(false);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Import Data
              </button>
            </div>
          }
        >
          {selectedDescription && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Pilih File Import Excel <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
              <div className="bg-[var(--warning-color)]/20 border border-[var(--warning-color)] text-[var(--warning-color)] p-3 rounded">
                Data akan <strong>ditambahkan</strong> ke campaign :{" "}
                <strong className="font-semibold">{selectedDescription.description}</strong>.
              </div>
            </div>
          )}
        </Modal>

        {/* Agent Selection Modal */}
        <Modal
          isOpen={isAgentSelectionModalOpen}
          onClose={() => setIsAgentSelectionModalOpen(false)}
          title="Pilih Agent untuk Distribusi"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAgentSelectionModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle distribute logic here
                  setIsAgentSelectionModalOpen(false);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Distribute
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-[var(--text-primary)]">
                Total Agent: <span className="font-semibold">0</span>
              </div>
              <div>
                <label className="text-[var(--text-primary)] flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  Select All
                </label>
              </div>
            </div>
            <div className="text-center py-8 text-[var(--text-secondary)]">
              Tidak ada agent yang tersedia
            </div>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ImportData;

