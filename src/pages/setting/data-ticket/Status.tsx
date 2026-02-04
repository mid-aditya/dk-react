import {
    ArrowLeft,
    Edit,
    Plus,
    Search,
    Tag,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface StatusItem {
  id: number;
  name: string;
  status: "active" | "inactive";
}

const Status: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as "active" | "inactive",
  });

  // Sample data
  const [statuses, setStatuses] = useState<StatusItem[]>([
    {
      id: 10,
      name: "Progress",
      status: "active",
    },
    {
      id: 9,
      name: "Open",
      status: "active",
    },
    {
      id: 8,
      name: "Closed",
      status: "active",
    },
  ]);

  const filteredStatuses = statuses.filter((status) =>
    status.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      status: "active",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (status: StatusItem) => {
    setSelectedStatus(status);
    setFormData({
      name: status.name,
      status: status.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (status: StatusItem) => {
    setSelectedStatus(status);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStatus) {
      setStatuses((prev) => prev.filter((status) => status.id !== selectedStatus.id));
      setIsDeleteModalOpen(false);
      setSelectedStatus(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Nama Status harus diisi");
      return;
    }

    if (selectedStatus) {
      // Update existing status
      setStatuses((prev) =>
        prev.map((status) =>
          status.id === selectedStatus.id
            ? {
                ...status,
                name: formData.name,
                status: formData.status,
              }
            : status
        )
      );
    } else {
      // Create new status
      const newStatus: StatusItem = {
        id: Math.max(...statuses.map((s) => s.id), 0) + 1,
        name: formData.name,
        status: formData.status,
      };
      setStatuses((prev) => [newStatus, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedStatus(null);
    setFormData({
      name: "",
      status: "active",
    });
  };

  const tableColumns: TableColumn<StatusItem>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "name",
      header: "Nama Status",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.name}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "active"
              ? "bg-[var(--success-color)]/20 text-[var(--success-color)] border border-[var(--success-color)]/30"
              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
          }`}
        >
          {item.status === "active" ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
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
              handleDelete(item);
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
                Status Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage ticket status configurations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
              {/* Search and Add Button */}
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
                        placeholder="Cari status..."
                      />
                    </div>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Status
                </button>
              </div>

              {/* Table */}
              {filteredStatuses.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredStatuses}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No statuses found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <Tag className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada status yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat status baru untuk memulai"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedStatus(null);
            setFormData({
              name: "",
              status: "active",
            });
          }}
          title={selectedStatus ? "Edit Status" : "Tambah Status Baru"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedStatus(null);
                  setFormData({
                    name: "",
                    status: "active",
                  });
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {selectedStatus ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedStatus(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedStatus(null);
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
            {selectedStatus && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedStatus.name}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Status;

