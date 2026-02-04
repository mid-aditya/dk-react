import {
    ArrowLeft,
    Edit,
    Hash,
    Mail,
    Plus,
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

interface SmtpConfig {
  id: number;
  mailer: string;
  host: string;
  port: number;
  from: string;
  username?: string;
  password?: string;
  encryption?: string;
}

const ConfigSmtp: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSmtp, setSelectedSmtp] = useState<SmtpConfig | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Sample data based on contoh.txt
  const [smtpConfigs, setSmtpConfigs] = useState<SmtpConfig[]>([
    {
      id: 3,
      mailer: "smtp",
      host: "mail.bankaltimtara.co.id",
      port: 465,
      from: '"Email Tes Kaltimtara" <test.cc@bankaltimtara.co.id>',
      username: "test.cc@bankaltimtara.co.id",
      encryption: "ssl",
    },
  ]);

  const filteredConfigs = smtpConfigs.filter(
    (config) =>
      config.mailer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (smtp: SmtpConfig) => {
    setSelectedSmtp(smtp);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setSmtpConfigs((prev) => prev.filter((config) => config.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddSubmit = () => {
    // Handle add logic here
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = () => {
    // Handle edit logic here
    setIsEditModalOpen(false);
    setSelectedSmtp(null);
  };

  // Prepare table columns
  const tableColumns: TableColumn<SmtpConfig>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span>{index + 1}</span>
      ),
    },
    {
      key: "mailer",
      header: "Mailer",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="font-medium">{item.mailer}</span>
        </div>
      ),
    },
    {
      key: "host",
      header: "Host",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="font-mono">{item.host}</span>
        </div>
      ),
    },
    {
      key: "port",
      header: "Port",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>{item.port}</span>
        </div>
      ),
    },
    {
      key: "from",
      header: "From",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2 break-words max-w-md">
          <User className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0" />
          <span className="break-all">{item.from}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
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
            title="Hapus"
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
                SMTP Configuration
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your SMTP email server configurations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    Daftar Konfigurasi SMTP
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Configure and manage your SMTP email server settings
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Tambah SMTP
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)]">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                    placeholder="Search by mailer, host, or from address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* SMTP Table */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden">
              {filteredConfigs.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12">
                  <Mail className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    No SMTP configurations found
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Try adjusting your search criteria"
                      : "Add your first SMTP configuration to get started"}
                  </p>
                </div>
              ) : (
                <Table
                  columns={tableColumns}
                  data={filteredConfigs}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No SMTP configurations found"
                />
              )}
            </div>

            {/* Info Section */}
            {filteredConfigs.length > 0 && (
              <div className="mt-6 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4">
                <p className="text-sm text-[var(--text-secondary)] text-center">
                  Showing <span className="font-medium text-[var(--text-primary)]">{filteredConfigs.length}</span> SMTP configuration
                  {filteredConfigs.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Add SMTP Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Tambah SMTP Configuration"
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
                Tambah SMTP
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Mailer <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                defaultValue="smtp"
              >
                <option value="smtp">SMTP</option>
                <option value="sendmail">Sendmail</option>
                <option value="mail">Mail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Host <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                placeholder="mail.example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Port <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="465"
                  defaultValue="465"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Encryption
                </label>
                <select
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                  defaultValue="ssl"
                >
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                  <option value="">None</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                From Address <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder='"Display Name" <email@example.com>'
              />
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Format: "Display Name" &lt;email@example.com&gt;
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* Edit SMTP Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSmtp(null);
          }}
          title="Edit SMTP Configuration"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedSmtp(null);
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
                Mailer <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                defaultValue={selectedSmtp?.mailer || "smtp"}
              >
                <option value="smtp">SMTP</option>
                <option value="sendmail">Sendmail</option>
                <option value="mail">Mail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Host <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                placeholder="mail.example.com"
                defaultValue={selectedSmtp?.host || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Port <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="465"
                  defaultValue={selectedSmtp?.port || 465}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Encryption
                </label>
                <select
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                  defaultValue={selectedSmtp?.encryption || "ssl"}
                >
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                  <option value="">None</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                From Address <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder='"Display Name" <email@example.com>'
                defaultValue={selectedSmtp?.from || ""}
              />
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Format: "Display Name" &lt;email@example.com&gt;
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="email@example.com"
                  defaultValue={selectedSmtp?.username || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Password
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
                Hapus
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Are you sure you want to delete this SMTP configuration? This action cannot be undone.
            </p>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ConfigSmtp;

