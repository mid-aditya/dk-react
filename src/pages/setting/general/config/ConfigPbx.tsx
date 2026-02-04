import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Database,
    Edit,
    Globe,
    Hash,
    Plus,
    Receipt,
    Search,
    Server,
    Trash2,
    User,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import IconButton from "../../../../components/ui/IconButton";
import Modal from "../../../../components/ui/Modal";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface PbxConfig {
  id: number;
  connectionName: string;
  domainPabx: string;
  ipPublic: string;
  userDb: string;
  passDb: string;
  portDb: number;
  nameDb: string;
  typeDb: string;
  createdBy: string;
  createdAt: string;
}

const ConfigPbx: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPbx, setSelectedPbx] = useState<PbxConfig | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [logoPanjang, setLogoPanjang] = useState<File | null>(null);
  const [logoPendek, setLogoPendek] = useState<File | null>(null);

  // Sample data based on reference HTML
  const [pbxConfigs, setPbxConfigs] = useState<PbxConfig[]>([
    {
      id: 5,
      connectionName: "Pabx Uidesk",
      domainPabx: "pbx.demo.uidesk.id",
      ipPublic: "157.66.54.206",
      userDb: "root",
      passDb: "Uid35k32!Uid35k32!J4y4",
      portDb: 3306,
      nameDb: "asteriskcdrdb",
      typeDb: "mysql",
      createdBy: "Century",
      createdAt: "September 24, 2025 16:15:05",
    },
  ]);

  const filteredConfigs = pbxConfigs.filter(
    (config) =>
      config.connectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.domainPabx.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.ipPublic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.nameDb.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredConfigs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConfigs = filteredConfigs.slice(startIndex, endIndex);
  const startEntry = filteredConfigs.length > 0 ? startIndex + 1 : 0;
  const endEntry = Math.min(endIndex, filteredConfigs.length);

  const handleEdit = (pbx: PbxConfig) => {
    setSelectedPbx(pbx);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setPbxConfigs((prev) => prev.filter((config) => config.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleAddSubmit = () => {
    // Handle add logic here
    setIsAddModalOpen(false);
    setLogoPanjang(null);
    setLogoPendek(null);
  };

  const handleEditSubmit = () => {
    // Handle edit logic here
    setIsEditModalOpen(false);
    setSelectedPbx(null);
  };

  // Prepare table columns
  const tableColumns: TableColumn<PbxConfig>[] = [
    {
      key: "no",
      header: "No",
      align: "center",
      render: (item, index) => (
        <span>{startIndex + index + 1}</span>
      ),
    },
    {
      key: "connectionName",
      header: "Connection Name",
      align: "center",
      render: (item) => <span>{item.connectionName}</span>,
    },
    {
      key: "domainPabx",
      header: "Domain PABX",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="font-mono text-xs">{item.domainPabx}</span>
        </div>
      ),
    },
    {
      key: "ipPublic",
      header: "IP Public",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <Server className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="font-mono text-xs">{item.ipPublic}</span>
        </div>
      ),
    },
    {
      key: "userDb",
      header: "User DB",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <User className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>{item.userDb}</span>
        </div>
      ),
    },
    {
      key: "passDb",
      header: "Pass DB",
      align: "center",
      render: () => (
        <span className="font-mono text-xs">••••••••</span>
      ),
    },
    {
      key: "portDb",
      header: "Port DB",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <Hash className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>{item.portDb}</span>
        </div>
      ),
    },
    {
      key: "nameDb",
      header: "Name DB",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <Database className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>{item.nameDb}</span>
        </div>
      ),
    },
    {
      key: "typeDb",
      header: "Type DB",
      align: "center",
      render: (item) => (
        <span className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs font-medium">
          {item.typeDb}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "CreatedBy",
      align: "center",
      render: (item) => (
        <span className="text-xs">{item.createdBy}</span>
      ),
    },
    {
      key: "createdAt",
      header: "CreatedAt",
      align: "center",
      render: (item) => (
        <span className="text-xs">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "center",
      render: (item) => (
        <div className="flex gap-2 justify-center">
          <IconButton
            icon={Edit}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
            variant="edit"
            title="Edit"
          />
          <IconButton
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
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
                PBX Configuration
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your PBX data configurations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 mb-6 border border-[var(--border-color)] shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-[var(--accent-color)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    PBX Data List
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg shadow transition-colors duration-200 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add New PBX
                  </button>
                </div>
              </div>

              {/* Search and Per Page Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--text-secondary)]">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={handlePerPageChange}
                    className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value={-1}>All</option>
                  </select>
                  <span className="text-sm text-[var(--text-secondary)]">Entries</span>
                </div>
                <form onSubmit={handleSearch} className="flex-1 sm:max-w-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <input
                      type="search"
                      className="w-full pl-11 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                      placeholder="Search data..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              {/* PBX Table */}
              {paginatedConfigs.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12">
                  <Database className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    No PBX configurations found
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Try adjusting your search criteria"
                      : "Add your first PBX configuration to get started"}
                  </p>
                </div>
              ) : (
                <Table
                  columns={tableColumns}
                  data={paginatedConfigs}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No PBX configurations found"
                />
              )}

              {/* Pagination and Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div className="text-sm text-[var(--text-secondary)]">
                  Showing <span className="font-medium text-[var(--text-primary)]">{startEntry}</span> to{" "}
                  <span className="font-medium text-[var(--text-primary)]">{endEntry}</span> of{" "}
                  <span className="font-medium text-[var(--text-primary)]">{filteredConfigs.length}</span> data
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-quaternary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                      title="First"
                    >
                      «
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-quaternary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-1">
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
                              className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                currentPage === page
                                  ? "bg-[var(--accent-color)] text-white"
                                  : "bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-quaternary)] hover:border-[var(--accent-color)]/50"
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
                      className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-quaternary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-quaternary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Last"
                    >
                      »
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add PBX Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New PBX Configuration"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSubmit}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Add PBX
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Connection Name <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="e.g., Pabx Uidesk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    IP Public <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                    placeholder="192.168.1.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Pass DB <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Name DB <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="asteriskcdrdb"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Created By <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="Century"
                    defaultValue="Century"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Domain PABX <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                    placeholder="pbx.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    User DB <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="root"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Port DB <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                    placeholder="3306"
                    defaultValue="3306"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Type DB <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                    defaultValue="mysql"
                  >
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mariadb">MariaDB</option>
                  </select>
                </div>
              </div>
            </div>

            {/* File Upload Sections */}
            <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Logo Panjang
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="logoPanjang"
                      accept=".png,.jpg,.jpeg,.svg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size <= 2 * 1024 * 1024) {
                          setLogoPanjang(file);
                        } else if (file) {
                          alert("File size must be less than 2MB");
                        }
                      }}
                    />
                    <label
                      htmlFor="logoPanjang"
                      className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 inline-block"
                    >
                      Pilih File
                    </label>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {logoPanjang ? logoPanjang.name : "Tidak ada file yang dipilih"}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    PNG, JPG, JPEG, SVG (max 2MB)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Logo Pendek
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="logoPendek"
                      accept=".png,.jpg,.jpeg,.svg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size <= 2 * 1024 * 1024) {
                          setLogoPendek(file);
                        } else if (file) {
                          alert("File size must be less than 2MB");
                        }
                      }}
                    />
                    <label
                      htmlFor="logoPendek"
                      className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 inline-block"
                    >
                      Pilih File
                    </label>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {logoPendek ? logoPendek.name : "Tidak ada file yang dipilih"}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    PNG, JPG, JPEG, SVG (max 2MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Edit PBX Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPbx(null);
          }}
          title="Edit PBX Configuration"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedPbx(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSubmit}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Connection Name <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="e.g., Pabx Uidesk"
                defaultValue={selectedPbx?.connectionName || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Domain PABX <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                  placeholder="pbx.example.com"
                  defaultValue={selectedPbx?.domainPabx || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  IP Public <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                  placeholder="192.168.1.1"
                  defaultValue={selectedPbx?.ipPublic || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  User DB <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="root"
                  defaultValue={selectedPbx?.userDb || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Pass DB <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Leave blank to keep current password
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Port DB <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="3306"
                  defaultValue={selectedPbx?.portDb || 3306}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Name DB <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="asteriskcdrdb"
                  defaultValue={selectedPbx?.nameDb || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Type DB <span className="text-[var(--error-color)]">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                  defaultValue={selectedPbx?.typeDb || "mysql"}
                >
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mariadb">MariaDB</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteConfirm !== null}
          onClose={() => setDeleteConfirm(null)}
          title="Confirm Delete"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Are you sure you want to delete this PBX configuration? This action cannot be undone.
            </p>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ConfigPbx;

