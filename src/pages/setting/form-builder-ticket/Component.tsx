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

interface ComponentItem {
  id: number;
  nama_komponen: string;
  html_tag: string;
  type: string;
  createdAt: string;
}

const Component: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [formData, setFormData] = useState({
    nama_komponen: "",
    html_tag: "input",
    type: "",
  });

  // HTML Tag options
  const htmlTagOptions: DropdownOption[] = [
    { value: "input", label: "input" },
    { value: "textarea", label: "textarea" },
    { value: "select", label: "select" },
    { value: "button", label: "button" },
  ];

  // Type options (for input fields)
  const typeOptions: DropdownOption[] = [
    { value: "text", label: "text" },
    { value: "number", label: "number" },
    { value: "email", label: "email" },
    { value: "date", label: "date" },
    { value: "password", label: "password" },
    { value: "tel", label: "tel" },
    { value: "url", label: "url" },
    { value: "color", label: "color" },
    { value: "range", label: "range" },
    { value: "datetime-local", label: "datetime-local" },
    { value: "time", label: "time" },
    { value: "month", label: "month" },
    { value: "week", label: "week" },
  ];

  // Sample data based on reference HTML
  const [components, setComponents] = useState<ComponentItem[]>([
    {
      id: 6,
      nama_komponen: "Input Nomor",
      html_tag: "input",
      type: "number",
      createdAt: "2025-07-29 03:27:34",
    },
    {
      id: 7,
      nama_komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      createdAt: "2025-07-29 03:27:34",
    },
    {
      id: 8,
      nama_komponen: "Input Email",
      html_tag: "input",
      type: "email",
      createdAt: "2025-07-29 03:27:34",
    },
    {
      id: 9,
      nama_komponen: "Input Date",
      html_tag: "input",
      type: "date",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 10,
      nama_komponen: "Input Password",
      html_tag: "input",
      type: "password",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 11,
      nama_komponen: "Input Telephone",
      html_tag: "input",
      type: "tel",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 12,
      nama_komponen: "Input URL",
      html_tag: "input",
      type: "url",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 13,
      nama_komponen: "Input Color",
      html_tag: "input",
      type: "color",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 14,
      nama_komponen: "Input Range",
      html_tag: "input",
      type: "range",
      createdAt: "2025-07-29 03:27:35",
    },
    {
      id: 15,
      nama_komponen: "Input Datetime Local",
      html_tag: "input",
      type: "datetime-local",
      createdAt: "2025-07-29 03:27:35",
    },
  ]);

  const filteredComponents = components.filter((item) =>
    item.nama_komponen.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.html_tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      nama_komponen: "",
      html_tag: "input",
      type: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: ComponentItem) => {
    setSelectedComponent(item);
    setFormData({
      nama_komponen: item.nama_komponen,
      html_tag: item.html_tag,
      type: item.type,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: ComponentItem) => {
    setSelectedComponent(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedComponent) {
      setComponents((prev) => prev.filter((item) => item.id !== selectedComponent.id));
      setIsDeleteModalOpen(false);
      setSelectedComponent(null);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = () => {
    if (!formData.nama_komponen.trim()) {
      alert("Nama Komponen harus diisi");
      return;
    }

    if (!formData.html_tag) {
      alert("HTML Tag harus dipilih");
      return;
    }

    if (formData.html_tag === "input" && !formData.type) {
      alert("Type harus dipilih untuk HTML Tag input");
      return;
    }

    if (selectedComponent) {
      // Update existing item
      setComponents((prev) =>
        prev.map((item) =>
          item.id === selectedComponent.id
            ? {
                ...item,
                nama_komponen: formData.nama_komponen,
                html_tag: formData.html_tag,
                type: formData.type || "",
              }
            : item
        )
      );
    } else {
      // Create new item
      const newItem: ComponentItem = {
        id: Math.max(...components.map((c) => c.id), 0) + 1,
        nama_komponen: formData.nama_komponen,
        html_tag: formData.html_tag,
        type: formData.type || "",
        createdAt: formatDate(),
      };
      setComponents((prev) => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedComponent(null);
    setFormData({
      nama_komponen: "",
      html_tag: "input",
      type: "",
    });
  };

  const tableColumns: TableColumn<ComponentItem>[] = [
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
      key: "nama_komponen",
      header: "Nama Komponen",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.nama_komponen}</span>
      ),
    },
    {
      key: "html_tag",
      header: "HTML Tag",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.html_tag}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.type}</span>
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
                Daftar Component Complaint
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage form components for ticket forms
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
                        placeholder="Cari component..."
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
                  Tambah Component
                </button>
              </div>

              {/* Table */}
              {filteredComponents.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredComponents}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No components found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <List className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada component yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat component baru untuk memulai"}
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
            setSelectedComponent(null);
            setFormData({
              nama_komponen: "",
              html_tag: "input",
              type: "",
            });
          }}
          title={selectedComponent ? "Edit Component" : "Tambah Component"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedComponent(null);
                  setFormData({
                    nama_komponen: "",
                    html_tag: "input",
                    type: "",
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
                {selectedComponent ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Komponen <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.nama_komponen}
                onChange={(e) => setFormData({ ...formData, nama_komponen: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama komponen"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                HTML Tag <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={htmlTagOptions}
                value={formData.html_tag ? formData.html_tag : undefined}
                placeholder="-- Pilih HTML Tag --"
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    html_tag: value.toString(),
                    // Reset type if HTML tag is not input
                    type: value.toString() === "input" ? formData.type : "",
                  });
                }}
              />
            </div>
            {formData.html_tag === "input" && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Type <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={typeOptions}
                  value={formData.type ? formData.type : undefined}
                  placeholder="-- Pilih Type --"
                  onChange={(value) => setFormData({ ...formData, type: value.toString() })}
                />
              </div>
            )}
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedComponent(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedComponent(null);
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
            {selectedComponent && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedComponent.nama_komponen}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Component;
