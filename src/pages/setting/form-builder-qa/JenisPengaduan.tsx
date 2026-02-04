import {
    ArrowLeft,
    Edit,
    List,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface JenisPengaduanItem {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
}

const JenisPengaduan: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJenisPengaduan, setSelectedJenisPengaduan] = useState<JenisPengaduanItem | null>(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    code: "",
    name: "",
    description: "",
  });

  // Available categories (from Category page)
  const categories = [
    { id: 6, name: "Call" },
    { id: 7, name: "Outbound" },
    { id: 11, name: "Chat" },
  ];

  // Convert categories to DropdownOption format
  const categoryOptions: DropdownOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  // Sample data based on reference HTML
  const [jenisPengaduans, setJenisPengaduans] = useState<JenisPengaduanItem[]>([
    {
      id: 11,
      categoryId: 7,
      categoryName: "Outbound",
      name: "Attitude",
      code: "35",
      description: "-",
      createdAt: "9 September 2025 pukul 16.18.26",
    },
    {
      id: 12,
      categoryId: 7,
      categoryName: "Outbound",
      name: "Skill",
      code: "30",
      description: "-",
      createdAt: "9 September 2025 pukul 16.19.46",
    },
    {
      id: 13,
      categoryId: 7,
      categoryName: "Outbound",
      name: "Knowledge",
      code: "35",
      description: "-",
      createdAt: "9 September 2025 pukul 16.20.08",
    },
    {
      id: 15,
      categoryId: 11,
      categoryName: "Chat",
      name: "Skill",
      code: "35",
      description: "-",
      createdAt: "11 September 2025 pukul 11.16.34",
    },
    {
      id: 16,
      categoryId: 11,
      categoryName: "Chat",
      name: "Attitude",
      code: "35",
      description: "-",
      createdAt: "11 September 2025 pukul 11.17.03",
    },
    {
      id: 17,
      categoryId: 11,
      categoryName: "Chat",
      name: "Knowledge",
      code: "30",
      description: "-",
      createdAt: "11 September 2025 pukul 11.17.33",
    },
    {
      id: 18,
      categoryId: 6,
      categoryName: "Call",
      name: "Knowledge",
      code: "35",
      description: "-",
      createdAt: "11 September 2025 pukul 11.45.18",
    },
    {
      id: 19,
      categoryId: 6,
      categoryName: "Call",
      name: "Attitude",
      code: "35",
      description: "-",
      createdAt: "11 September 2025 pukul 11.45.28",
    },
    {
      id: 20,
      categoryId: 6,
      categoryName: "Call",
      name: "Skill",
      code: "30",
      description: "-",
      createdAt: "11 September 2025 pukul 11.45.41",
    },
  ]);

  const filteredJenisPengaduans = jenisPengaduans.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      categoryId: "",
      code: "",
      name: "",
      description: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: JenisPengaduanItem) => {
    setSelectedJenisPengaduan(item);
    setFormData({
      categoryId: item.categoryId.toString(),
      code: item.code,
      name: item.name,
      description: item.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: JenisPengaduanItem) => {
    setSelectedJenisPengaduan(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedJenisPengaduan) {
      setJenisPengaduans((prev) => prev.filter((item) => item.id !== selectedJenisPengaduan.id));
      setIsDeleteModalOpen(false);
      setSelectedJenisPengaduan(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.categoryId) {
      alert("Kategori harus dipilih");
      return;
    }

    if (!formData.code.trim()) {
      alert("Code harus diisi");
      return;
    }

    if (!formData.name.trim()) {
      alert("Nama Jenis harus diisi");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.id === parseInt(formData.categoryId));
    if (!selectedCategory) {
      alert("Kategori tidak valid");
      return;
    }

    if (selectedJenisPengaduan) {
      // Update existing item
      setJenisPengaduans((prev) =>
        prev.map((item) =>
          item.id === selectedJenisPengaduan.id
            ? {
                ...item,
                categoryId: selectedCategory.id,
                categoryName: selectedCategory.name,
                code: formData.code,
                name: formData.name,
                description: formData.description || "-",
              }
            : item
        )
      );
    } else {
      // Create new item
      const now = new Date();
      const day = now.getDate();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const createdAt = `${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;

      const newItem: JenisPengaduanItem = {
        id: Math.max(...jenisPengaduans.map((j) => j.id), 0) + 1,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        code: formData.code,
        name: formData.name,
        description: formData.description || "-",
        createdAt,
      };
      setJenisPengaduans((prev) => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedJenisPengaduan(null);
    setFormData({
      categoryId: "",
      code: "",
      name: "",
      description: "",
    });
  };

  const tableColumns: TableColumn<JenisPengaduanItem>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "id",
      header: "ID",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.id}</span>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.categoryName}</span>
      ),
    },
    {
      key: "name",
      header: "Nama Jenis",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
      ),
    },
    {
      key: "code",
      header: "Code",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.code}</span>
      ),
    },
    {
      key: "description",
      header: "Deskripsi",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.description}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Dibuat Pada",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
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
                Jenis Pengaduan Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage complaint types for QA forms
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
                        placeholder="Cari jenis pengaduan..."
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
                  Tambah Jenis Complaint
                </button>
              </div>

              {/* Table */}
              {filteredJenisPengaduans.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredJenisPengaduans}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No complaint types found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <List className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada jenis pengaduan yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat jenis pengaduan baru untuk memulai"}
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
            setSelectedJenisPengaduan(null);
            setFormData({
              categoryId: "",
              code: "",
              name: "",
              description: "",
            });
          }}
          title={selectedJenisPengaduan ? "Edit Jenis Complaint" : "Tambah Jenis Complaint Baru"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedJenisPengaduan(null);
                  setFormData({
                    categoryId: "",
                    code: "",
                    name: "",
                    description: "",
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
                {selectedJenisPengaduan ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Kategori <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={categoryOptions}
                value={formData.categoryId ? parseInt(formData.categoryId) : undefined}
                placeholder="-- Pilih Kategori --"
                onChange={(value) => setFormData({ ...formData, categoryId: value.toString() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Code <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Jenis <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama jenis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 resize-y"
                placeholder="Masukkan deskripsi (opsional)"
              />
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedJenisPengaduan(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedJenisPengaduan(null);
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
            {selectedJenisPengaduan && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedJenisPengaduan.name}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default JenisPengaduan;
