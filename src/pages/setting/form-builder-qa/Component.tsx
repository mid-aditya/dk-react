import {
    ArrowLeft,
    Box,
    Edit,
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
  name: string;
  htmlTag: string;
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
    name: "",
    htmlTag: "",
    type: "",
  });

  // HTML Tags options
  const htmlTags = [
    "radio",
    "checkbox",
    "text",
    "textarea",
    "select",
    "number",
    "date",
    "email",
    "password",
  ];

  // Convert htmlTags to DropdownOption format
  const htmlTagOptions: DropdownOption[] = htmlTags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  // Sample data based on reference HTML
  const [components, setComponents] = useState<ComponentItem[]>([
    {
      id: 21,
      name: "Radio Button",
      htmlTag: "radio",
      type: "-",
      createdAt: "2025-09-09 16:21:21",
    },
    {
      id: 22,
      name: "Checkbox",
      htmlTag: "checkbox",
      type: "-",
      createdAt: "2025-09-09 16:22:00",
    },
    {
      id: 23,
      name: "Text Input",
      htmlTag: "text",
      type: "-",
      createdAt: "2025-09-09 16:23:00",
    },
    {
      id: 24,
      name: "Textarea",
      htmlTag: "textarea",
      type: "-",
      createdAt: "2025-09-09 16:24:00",
    },
    {
      id: 25,
      name: "Select",
      htmlTag: "select",
      type: "-",
      createdAt: "2025-09-09 16:25:00",
    },
    {
      id: 26,
      name: "Number Input",
      htmlTag: "number",
      type: "-",
      createdAt: "2025-09-09 16:26:00",
    },
    {
      id: 27,
      name: "Date Input",
      htmlTag: "date",
      type: "-",
      createdAt: "2025-09-09 16:27:00",
    },
  ]);

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.htmlTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      htmlTag: "",
      type: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (component: ComponentItem) => {
    setSelectedComponent(component);
    setFormData({
      name: component.name,
      htmlTag: component.htmlTag,
      type: component.type,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (component: ComponentItem) => {
    setSelectedComponent(component);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedComponent) {
      setComponents((prev) => prev.filter((component) => component.id !== selectedComponent.id));
      setIsDeleteModalOpen(false);
      setSelectedComponent(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Nama Komponen harus diisi");
      return;
    }

    if (!formData.htmlTag) {
      alert("HTML Tag harus dipilih");
      return;
    }

    if (selectedComponent) {
      // Update existing component
      setComponents((prev) =>
        prev.map((component) =>
          component.id === selectedComponent.id
            ? {
                ...component,
                name: formData.name,
                htmlTag: formData.htmlTag,
                type: formData.type || "-",
              }
            : component
        )
      );
    } else {
      // Create new component
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const newComponent: ComponentItem = {
        id: Math.max(...components.map((c) => c.id), 0) + 1,
        name: formData.name,
        htmlTag: formData.htmlTag,
        type: formData.type || "-",
        createdAt,
      };
      setComponents((prev) => [newComponent, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedComponent(null);
    setFormData({
      name: "",
      htmlTag: "",
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
      key: "name",
      header: "Nama Komponen",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
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
                Component Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage QA form components
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
                  <Box className="w-12 h-12 text-[var(--text-tertiary)]" />
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
              name: "",
              htmlTag: "",
              type: "",
            });
          }}
          title={selectedComponent ? "Edit Component" : "Tambah Component Baru"}
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
                    name: "",
                    htmlTag: "",
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="contoh: Radio Button"
                required
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
                "{selectedComponent.name}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Component;
