import {
    ArrowLeft,
    Edit,
    Plus,
    Search,
    Trash2,
    Type,
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
  name: string;
  label: string;
  component: string;
  htmlTag: string;
  type: string;
  defaultValue: string;
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
    name: "",
    label: "",
    component: "",
    htmlTag: "",
    type: "",
    defaultValue: "",
  });

  // Available components (from Component page)
  interface ComponentOption {
    id: number;
    name: string;
    htmlTag: string;
  }

  const componentOptions: ComponentOption[] = [
    { id: 21, name: "Radio Button", htmlTag: "radio" },
    { id: 22, name: "Checkbox", htmlTag: "checkbox" },
    { id: 23, name: "Text Input", htmlTag: "text" },
    { id: 24, name: "Textarea", htmlTag: "textarea" },
    { id: 25, name: "Select", htmlTag: "select" },
    { id: 26, name: "Number Input", htmlTag: "number" },
    { id: 27, name: "Date Input", htmlTag: "date" },
  ];

  // Additional HTML Tags for flexibility
  const additionalHtmlTags = [
    "email",
    "password",
  ];

  // Convert componentOptions to DropdownOption format
  const componentDropdownOptions: DropdownOption[] = componentOptions.map((comp) => ({
    value: comp.name,
    label: comp.name,
  }));

  // Convert all HTML tags to DropdownOption format
  const htmlTagOptions: DropdownOption[] = [
    ...componentOptions.map((comp) => ({
      value: comp.htmlTag,
      label: comp.htmlTag,
    })),
    ...additionalHtmlTags.map((tag) => ({
      value: tag,
      label: tag,
    })),
  ];

  // Sample data based on reference HTML
  const [fields, setFields] = useState<FieldItem[]>([
    {
      id: 40,
      name: "salam_pembuka_call",
      label: "Salam Pembuka",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.21.51",
    },
    {
      id: 41,
      name: "salam_penutup_call",
      label: "Salam Penutup",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.22.50",
    },
    {
      id: 42,
      name: "kemampuan_menyimak",
      label: "Kemampuan Menyimak",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.23.31",
    },
    {
      id: 43,
      name: "kemampuan_menjelaskan",
      label: "Kemampuan Menjelaskan",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.23.57",
    },
    {
      id: 44,
      name: "kemampuan_menggali_informasi",
      label: "Kemampuan Menggali Informasi",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.24.25",
    },
    {
      id: 45,
      name: "ketepatan_informasi",
      label: "Ketepatan Informasi",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "9 September 2025 pukul 16.24.51",
    },
    {
      id: 47,
      name: "salam_pembuka_chat",
      label: "Salam Pembuka",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "15 September 2025 pukul 05.19.49",
    },
    {
      id: 48,
      name: "salam_penutup_chat",
      label: "Salam Penutup",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "15 September 2025 pukul 05.20.11",
    },
    {
      id: 49,
      name: "kemampuan_menyimak_chat",
      label: "Kemampuan Menyimak",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "15 September 2025 pukul 05.20.33",
    },
    {
      id: 50,
      name: "kemampuan_menjelaskan_chat",
      label: "Kemampuan Menjelaskan",
      component: "Radio Button",
      htmlTag: "radio",
      type: "-",
      defaultValue: "-",
      createdAt: "15 September 2025 pukul 05.20.58",
    },
  ]);

  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.htmlTag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      label: "",
      component: "",
      htmlTag: "",
      type: "",
      defaultValue: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (field: FieldItem) => {
    setSelectedField(field);
    setFormData({
      name: field.name,
      label: field.label,
      component: field.component,
      htmlTag: field.htmlTag,
      type: field.type,
      defaultValue: field.defaultValue,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (field: FieldItem) => {
    setSelectedField(field);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedField) {
      setFields((prev) => prev.filter((field) => field.id !== selectedField.id));
      setIsDeleteModalOpen(false);
      setSelectedField(null);
    }
  };

  // Handle component change - auto set HTML tag
  const handleComponentChange = (componentName: string) => {
    const selectedComponent = componentOptions.find((comp) => comp.name === componentName);
    setFormData({
      ...formData,
      component: componentName,
      htmlTag: selectedComponent ? selectedComponent.htmlTag : formData.htmlTag,
    });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Nama Field harus diisi");
      return;
    }

    if (!formData.label.trim()) {
      alert("Label Field harus diisi");
      return;
    }

    if (!formData.component) {
      alert("Komponen harus dipilih");
      return;
    }

    if (!formData.htmlTag) {
      alert("HTML Tag harus dipilih");
      return;
    }

    if (selectedField) {
      // Update existing field
      setFields((prev) =>
        prev.map((field) =>
          field.id === selectedField.id
            ? {
                ...field,
                name: formData.name,
                label: formData.label,
                component: formData.component,
                htmlTag: formData.htmlTag,
                type: formData.type || "-",
                defaultValue: formData.defaultValue || "-",
              }
            : field
        )
      );
    } else {
      // Create new field
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

      const newField: FieldItem = {
        id: Math.max(...fields.map((f) => f.id), 0) + 1,
        name: formData.name,
        label: formData.label,
        component: formData.component,
        htmlTag: formData.htmlTag,
        type: formData.type || "-",
        defaultValue: formData.defaultValue || "-",
        createdAt,
      };
      setFields((prev) => [newField, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedField(null);
    setFormData({
      name: "",
      label: "",
      component: "",
      htmlTag: "",
      type: "",
      defaultValue: "",
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
      key: "name",
      header: "Nama Field",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium font-mono text-xs">
          {item.name}
        </span>
      ),
    },
    {
      key: "label",
      header: "Label Field",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.label}</span>
      ),
    },
    {
      key: "component",
      header: "Komponen",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.component}</span>
      ),
    },
    {
      key: "htmlTag",
      header: "HTML Tag",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-mono text-xs">
          {item.htmlTag}
        </span>
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
      key: "defaultValue",
      header: "Default Value",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.defaultValue}</span>
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
                Field Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage QA form fields
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
                  <Type className="w-12 h-12 text-[var(--text-tertiary)]" />
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
              name: "",
              label: "",
              component: "",
              htmlTag: "",
              type: "",
              defaultValue: "",
            });
          }}
          title={selectedField ? "Edit Field" : "Tambah Field Baru"}
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
                    name: "",
                    label: "",
                    component: "",
                    htmlTag: "",
                    type: "",
                    defaultValue: "",
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                placeholder="contoh: salam_pembuka_call"
                required
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Gunakan format snake_case (huruf kecil dengan underscore)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Label Field <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="contoh: Salam Pembuka"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Komponen <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={componentDropdownOptions}
                  value={formData.component || undefined}
                  placeholder="Pilih Komponen"
                  onChange={(value) => handleComponentChange(value as string)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  HTML Tag <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={htmlTagOptions}
                  value={formData.htmlTag || undefined}
                  placeholder="Pilih HTML Tag"
                  onChange={(value) => setFormData({ ...formData, htmlTag: value as string })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="Opsional (kosongkan untuk '-')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Default Value
                </label>
                <input
                  type="text"
                  value={formData.defaultValue}
                  onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="Opsional (kosongkan untuk '-')"
                />
              </div>
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
                "{selectedField.label}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Field;
