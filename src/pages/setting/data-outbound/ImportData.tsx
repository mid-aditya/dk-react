import {
  ArrowLeft,
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
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../components/ui/Pagination";

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
}

const ImportData: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportExistingModalOpen, setIsImportExistingModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<OutboundTicketData | null>(null);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

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
      customers: [],
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
    {
      id: 89,
      description: "testing bang",
      status: "active",
      channel: "call",
      startDate: "2025-10-16 08:31",
      endDate: "2025-10-18 08:31",
      scriptOutbound: "Category 1",
      customers: [],
    },
    {
      id: 88,
      description: "hao 3",
      status: "active",
      channel: "call",
      startDate: "2025-10-14 11:32",
      endDate: "2025-10-16 11:32",
      scriptOutbound: "Category 1",
      customers: [],
    },
    {
      id: 84,
      description: "hao 2",
      status: "active",
      channel: "call",
      startDate: "2025-10-14 11:32",
      endDate: "2025-10-16 11:32",
      scriptOutbound: "Category 1",
      customers: [],
    },
    {
      id: 79,
      description: "test panggilan",
      status: "active",
      channel: "call",
      startDate: "2025-10-09 10:18",
      endDate: "2025-10-16 10:19",
      scriptOutbound: "Category 1",
      customers: [],
    },
  ]);

  const filteredData = ticketData.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.scriptOutbound.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDownloadTemplate = () => {
    // Simulate template download
    const link = document.createElement("a");
    link.href = "#";
    link.download = "import-template.xlsx";
    link.click();
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    // Handle import logic here
    alert("File imported successfully!");
    setIsImportModalOpen(false);
    setFile(null);
  };

  const handleEditDescription = (item: OutboundTicketData) => {
    setSelectedDescription(item);
    setFormData({ description: item.description });
    setIsEditDescriptionModalOpen(true);
  };

  const handleDelete = (item: OutboundTicketData) => {
    setSelectedDescription(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDescription) {
      setTicketData((prev) => prev.filter((item) => item.id !== selectedDescription.id));
      setIsDeleteModalOpen(false);
      setSelectedDescription(null);
    }
  };

  const handleUpdateDescription = () => {
    if (!formData.description.trim()) {
      alert("Description harus diisi");
      return;
    }

    if (selectedDescription) {
      setTicketData((prev) =>
        prev.map((item) =>
          item.id === selectedDescription.id
            ? { ...item, description: formData.description }
            : item
        )
      );
      setIsEditDescriptionModalOpen(false);
      setSelectedDescription(null);
      setFormData({ description: "" });
    }
  };

  const handleDistributeAgents = (id: number) => {
    alert(`Distribute agents for campaign ${id}`);
  };

  const handleImportExisting = (item: OutboundTicketData) => {
    setSelectedDescription(item);
    setIsImportExistingModalOpen(true);
  };

  const handleImportToExisting = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    // Handle import to existing campaign
    alert(`File imported to campaign ${selectedDescription?.description}`);
    setIsImportExistingModalOpen(false);
    setFile(null);
    setSelectedDescription(null);
  };

  const handleWhatsappInfo = () => {
    alert("Info: Tambah Data WhatsApp");
  };

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
                Import Data Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage outbound data imports and campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
              {/* Search and Action Buttons */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-[var(--text-tertiary)]" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                        placeholder="Cari data..."
                      />
                    </div>
                  </form>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download Import Template
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(true)}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                  >
                    <FileUp className="w-5 h-5" />
                    Import Data
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--border-color)]">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider"></th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">No</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Channel</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">End Date</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Script Outbound</th>
                      <th className="px-6 py-3 bg-[var(--bg-tertiary)] text-left text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[var(--bg-secondary)] divide-y divide-[var(--border-color)]">
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-8 text-center text-sm text-[var(--text-secondary)]">
                          No data available
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item, index) => {
                        const isExpanded = expandedRows.has(item.id);
                        return (
                          <React.Fragment key={item.id}>
                            <tr className="hover:bg-[var(--bg-tertiary)] transition-colors">
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)] cursor-pointer"
                                onClick={() => toggleRow(item.id)}
                              >
                                <ChevronRight
                                  className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {startIndex + index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {item.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--success-color)]/20 text-[var(--success-color)] border border-[var(--success-color)]/30">
                                  {item.status === "active" ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {item.channel}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {item.startDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {item.endDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                {item.scriptOutbound}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  {item.channel === "call" && (
                                    <IconButton
                                      icon={Shuffle}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDistributeAgents(item.id);
                                      }}
                                      variant="primary"
                                      title="Distribute Agents"
                                    />
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
                                      handleDelete(item);
                                    }}
                                    variant="delete"
                                    title="Delete"
                                  />
                                  {item.channel === "whacenter-whatsapp" ? (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleWhatsappInfo();
                                      }}
                                      className="px-2 py-1.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded transition-colors duration-200 text-xs border border-[var(--border-color)]"
                                      title="Info Tambah Data WhatsApp"
                                    >
                                      <Info className="w-4 h-4" />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleImportExisting(item);
                                      }}
                                      className="px-2 py-1.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded transition-colors duration-200 text-xs flex items-center gap-1"
                                      title="Tambah Data ke Deskripsi Ini"
                                    >
                                      <FileUp className="w-4 h-4" />
                                      <span>Tambah Data</span>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr>
                                <td colSpan={9} className="p-0">
                                  <div className="overflow-x-auto p-4 bg-[var(--bg-tertiary)]">
                                    <h6 className="text-[var(--text-primary)] mb-3 font-semibold">
                                      Data customer dari campaign ini :
                                    </h6>
                                    {item.customers.length === 0 ? (
                                      <p className="text-sm text-[var(--text-secondary)]">
                                        No customer data available
                                      </p>
                                    ) : (
                                      <div className="space-y-2">
                                        {item.customers.map((customer) => (
                                          <div
                                            key={customer.id}
                                            className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]"
                                          >
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                                  {customer.name}
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">
                                                  {customer.phone} | {customer.email}
                                                </p>
                                              </div>
                                              <div className="text-right">
                                                <p className="text-xs text-[var(--text-secondary)]">
                                                  {customer.address}
                                                </p>
                                                <p className="text-sm font-semibold text-[var(--accent-color)]">
                                                  {customer.tagihan}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    showFirstLast={true}
                    maxVisible={5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Import Modal */}
        <Modal
          isOpen={isImportModalOpen}
          onClose={() => {
            setIsImportModalOpen(false);
            setFile(null);
          }}
          title="Import Data"
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setFile(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImport}
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
                Pilih File <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
              />
            </div>
          </div>
        </Modal>

        {/* Edit Description Modal */}
        <Modal
          isOpen={isEditDescriptionModalOpen}
          onClose={() => {
            setIsEditDescriptionModalOpen(false);
            setSelectedDescription(null);
            setFormData({ description: "" });
          }}
          title="Edit Description"
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditDescriptionModalOpen(false);
                  setSelectedDescription(null);
                  setFormData({ description: "" });
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleUpdateDescription}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Simpan Perubahan
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Description <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ description: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan description"
              />
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedDescription(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Hapus
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Apakah kamu yakin ingin menghapus data ini?
            </p>
            {selectedDescription && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedDescription.description}"
              </p>
            )}
          </div>
        </Modal>

        {/* Import to Existing Campaign Modal */}
        <Modal
          isOpen={isImportExistingModalOpen}
          onClose={() => {
            setIsImportExistingModalOpen(false);
            setFile(null);
            setSelectedDescription(null);
          }}
          title="Tambah Data ke Campaign"
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsImportExistingModalOpen(false);
                  setFile(null);
                  setSelectedDescription(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImportToExisting}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Import
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            {selectedDescription && (
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Campaign:</p>
                <p className="text-[var(--text-primary)] font-medium">
                  {selectedDescription.description}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Pilih File <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
              />
            </div>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ImportData;
