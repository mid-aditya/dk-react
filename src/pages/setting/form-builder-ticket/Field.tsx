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

interface FieldItem {
  id: number;
  nama_field: string;
  label_field: string;
  komponen: string;
  html_tag: string;
  type: string;
  default_value: string;
  createdAt: string;
}

const Field: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<FieldItem | null>(null);
  const [formData, setFormData] = useState({
    nama_field: "",
    label_field: "",
    komponen: "",
    html_tag: "",
    type: "",
    default_value: "",
  });

  // Component options
  const componentOptions: DropdownOption[] = [
    { value: "Radio", label: "Radio" },
    { value: "Select/Dropdown", label: "Select/Dropdown" },
    { value: "Input Teks", label: "Input Teks" },
    { value: "Text Area", label: "Text Area" },
    { value: "CheckBox", label: "CheckBox" },
  ];

  // Type options (for input fields)
  const typeOptions: DropdownOption[] = [
    { value: "text", label: "text" },
    { value: "number", label: "number" },
    { value: "email", label: "email" },
    { value: "date", label: "date" },
    { value: "password", label: "password" },
  ];

  // Map component to HTML tag
  const getHtmlTagFromComponent = (komponen: string): string => {
    const mapping: { [key: string]: string } = {
      "Radio": "radio",
      "Select/Dropdown": "select",
      "Input Teks": "input",
      "Text Area": "textarea",
      "CheckBox": "checkbox",
    };
    return mapping[komponen] || "";
  };

  // Handle component change - auto update HTML tag
  const handleComponentChange = (komponen: string) => {
    const htmlTag = getHtmlTagFromComponent(komponen);
    setFormData({
      ...formData,
      komponen,
      html_tag: htmlTag,
      // Reset type if not input
      type: komponen === "Input Teks" ? formData.type : "",
    });
  };

  // Sample data based on reference HTML
  const [fields, setFields] = useState<FieldItem[]>([
    {
      id: 5,
      nama_field: "FlagFinancial",
      label_field: "Flag Financial",
      komponen: "Radio",
      html_tag: "radio",
      type: "-",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 6,
      nama_field: "JenisEskalasi",
      label_field: "Jenis Eskalasi",
      komponen: "Select/Dropdown",
      html_tag: "select",
      type: "-",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 7,
      nama_field: "TotalKlaim",
      label_field: "Total Klaim",
      komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 8,
      nama_field: "Nominal",
      label_field: "Nominal",
      komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 9,
      nama_field: "Biaya",
      label_field: "Biaya",
      komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 10,
      nama_field: "Dana",
      label_field: "Dana",
      komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 11,
      nama_field: "PenyebabPengaduan",
      label_field: "Penyebab Pengaduan",
      komponen: "Text Area",
      html_tag: "textarea",
      type: "-",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 12,
      nama_field: "SistemPembayaran",
      label_field: "Sistem Pembayaran",
      komponen: "Radio",
      html_tag: "radio",
      type: "-",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 13,
      nama_field: "MutasiRekening",
      label_field: "Mutasi Rekening",
      komponen: "Input Teks",
      html_tag: "input",
      type: "text",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
    {
      id: 14,
      nama_field: "LokasiKejadian",
      label_field: "Lokasi Kejadian",
      komponen: "CheckBox",
      html_tag: "checkbox",
      type: "-",
      default_value: "-",
      createdAt: "29 Juli 2025 pukul 03.37.51",
    },
  ]);

  const filteredFields = fields.filter((item) =>
    item.nama_field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.label_field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.komponen.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.html_tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      nama_field: "",
      label_field: "",
      komponen: "",
      html_tag: "",
      type: "",
      default_value: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: FieldItem) => {
    setSelectedField(item);
    setFormData({
      nama_field: item.nama_field,
      label_field: item.label_field,
      komponen: item.komponen,
      html_tag: item.html_tag,
      type: item.type === "-" ? "" : item.type,
      default_value: item.default_value === "-" ? "" : item.default_value,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: FieldItem) => {
    setSelectedField(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedField) {
      setFields((prev) => prev.filter((item) => item.id !== selectedField.id));
      setIsDeleteModalOpen(false);
      setSelectedField(null);
    }
  };

  const formatDate = () => {
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
    return `${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;
  };

  const handleSubmit = () => {
    if (!formData.nama_field.trim()) {
      alert("Nama Field harus diisi");
      return;
    }

    if (!formData.label_field.trim()) {
      alert("Label Field harus diisi");
      return;
    }

    if (!formData.komponen) {
      alert("Komponen harus dipilih");
      return;
    }

    if (selectedField) {
      // Update existing item
      setFields((prev) =>
        prev.map((item) =>
          item.id === selectedField.id
            ? {
                ...item,
                nama_field: formData.nama_field,
                label_field: formData.label_field,
                komponen: formData.komponen,
                html_tag: formData.html_tag || getHtmlTagFromComponent(formData.komponen),
                type: formData.type || "-",
                default_value: formData.default_value || "-",
              }
            : item
        )
      );
    } else {
      // Create new item
      const newItem: FieldItem = {
        id: Math.max(...fields.map((f) => f.id), 0) + 1,
        nama_field: formData.nama_field,
        label_field: formData.label_field,
        komponen: formData.komponen,
        html_tag: formData.html_tag || getHtmlTagFromComponent(formData.komponen),
        type: formData.type || "-",
        default_value: formData.default_value || "-",
        createdAt: formatDate(),
      };
      setFields((prev) => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedField(null);
    setFormData({
      nama_field: "",
      label_field: "",
      komponen: "",
      html_tag: "",
      type: "",
      default_value: "",
    });
  };

  const tableColumns: TableColumn<FieldItem>[] = [
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
      key: "nama_field",
      header: "Nama Field",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.nama_field}</span>
      ),
    },
    {
      key: "label_field",
      header: "Label Field",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.label_field}</span>
      ),
    },
    {
      key: "komponen",
      header: "Komponen",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.komponen}</span>
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
      key: "default_value",
      header: "Default Value",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.default_value}</span>
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
                Daftar Field Complaint
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage form fields for ticket forms
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
                        placeholder="Cari field..."
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
                  Tambah Field
                </button>
              </div>

              {/* Table */}
              {filteredFields.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredFields}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No fields found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <List className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada field yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat field baru untuk memulai"}
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
            setSelectedField(null);
            setFormData({
              nama_field: "",
              label_field: "",
              komponen: "",
              html_tag: "",
              type: "",
              default_value: "",
            });
          }}
          title={selectedField ? "Edit Field" : "Tambah Field"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedField(null);
                  setFormData({
                    nama_field: "",
                    label_field: "",
                    komponen: "",
                    html_tag: "",
                    type: "",
                    default_value: "",
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
                {selectedField ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Field <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.nama_field}
                onChange={(e) => setFormData({ ...formData, nama_field: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Label Field <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.label_field}
                onChange={(e) => setFormData({ ...formData, label_field: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan label field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Komponen <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={componentOptions}
                value={formData.komponen ? formData.komponen : undefined}
                placeholder="-- Pilih Komponen --"
                onChange={(value) => handleComponentChange(value.toString())}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                HTML Tag
              </label>
              <input
                type="text"
                value={formData.html_tag}
                onChange={(e) => setFormData({ ...formData, html_tag: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="HTML tag (otomatis berdasarkan komponen)"
                readOnly
              />
            </div>
            {formData.komponen === "Input Teks" && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Type
                </label>
                <Dropdown
                  options={typeOptions}
                  value={formData.type ? formData.type : undefined}
                  placeholder="-- Pilih Type --"
                  onChange={(value) => setFormData({ ...formData, type: value.toString() })}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Default Value
              </label>
              <input
                type="text"
                value={formData.default_value}
                onChange={(e) => setFormData({ ...formData, default_value: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan default value (opsional)"
              />
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedField(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedField(null);
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
            {selectedField && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedField.nama_field}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Field;
