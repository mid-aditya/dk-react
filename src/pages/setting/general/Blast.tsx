import {
    ArrowLeft,
    Edit,
    Mail,
    Plus,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface BlastTemplate {
  id: number;
  name: string;
  content: string;
  variables: string;
  status: "active" | "inactive";
  createdBy: string;
}

const Blast: React.FC = () => {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<BlastTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    status: "active" as "active" | "inactive",
  });

  // Sample data based on reference HTML
  const [templates, setTemplates] = useState<BlastTemplate[]>([
    {
      id: 3,
      name: "PROMO DANA TUNAI",
      content: "Selamat siang Bapak/Ibu {{1}}\nUnit {{2}}\n\nIni Dea dari ADIRA, untuk...",
      variables: "1,2",
      status: "active",
      createdBy: "Century",
    },
    {
      id: 2,
      name: "Template tanpa parameter",
      content: "Halo, paket anda ditunda ya",
      variables: "",
      status: "active",
      createdBy: "Century",
    },
    {
      id: 1,
      name: "Template dengan parameter",
      content: "Halo {{1}}, paket anda dengan no.resi #{{2}} akan segera dikirim.",
      variables: "1,2",
      status: "active",
      createdBy: "Century",
    },
  ]);

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setTemplates((prev) => prev.filter((template) => template.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleEdit = (id: number) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        content: template.content,
        status: template.status,
      });
      setIsModalOpen(true);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setFormData({
      name: "",
      content: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
    setFormData({
      name: "",
      content: "",
      status: "active",
    });
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      alert("Nama dan Isi harus diisi");
      return;
    }

    if (editingTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === editingTemplate.id
            ? {
                ...template,
                name: formData.name,
                content: formData.content,
                status: formData.status,
              }
            : template
        )
      );
    } else {
      // Create new template
      const newTemplate: BlastTemplate = {
        id: Math.max(...templates.map((t) => t.id), 0) + 1,
        name: formData.name,
        content: formData.content,
        variables: extractVariables(formData.content),
        status: formData.status,
        createdBy: "Current User", // You can replace this with actual user
      };
      setTemplates((prev) => [newTemplate, ...prev]);
    }

    handleCloseModal();
  };

  const extractVariables = (content: string): string => {
    const matches = content.match(/\{\{(\d+)\}\}/g);
    if (matches) {
      const numbers = matches
        .map((match) => match.replace(/\{\{|\}\}/g, ""))
        .sort((a, b) => parseInt(a) - parseInt(b));
      return Array.from(new Set(numbers)).join(",");
    }
    return "";
  };

  const statusOptions: DropdownOption[] = [
    { value: "active", label: "Aktif" },
    { value: "inactive", label: "Tidak Aktif" },
  ];

  // Prepare table columns
  const tableColumns: TableColumn<BlastTemplate>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="font-medium">{index + 1}</span>
      ),
    },
    {
      key: "name",
      header: "Nama Template",
      align: "left",
      render: (item) => (
        <span className="font-semibold text-[var(--accent-color)]">{item.name}</span>
      ),
    },
    {
      key: "content",
      header: "Isi Pesan",
      align: "left",
      render: (item) => (
        <p className="text-xs italic max-w-96 whitespace-pre-wrap line-clamp-3">
          {item.content}
        </p>
      ),
    },
    {
      key: "variables",
      header: "Variabel",
      align: "left",
      render: (item) => (
        item.variables ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--warning-color)]/20 text-[var(--warning-color)] border border-[var(--warning-color)]/30">
            {item.variables}
          </span>
        ) : (
          <span className="text-[var(--text-tertiary)] italic">-</span>
        )
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-full ${
            item.status === "active"
              ? "bg-[var(--success-color)] text-white"
              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
          }`}
        >
          {item.status === "active" ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Dibuat Oleh",
      align: "left",
      render: (item) => <span>{item.createdBy}</span>,
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
              handleEdit(item.id);
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
                Blast Templates
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your blast plain text templates
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Single Card with Header and Table */}
            <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="p-6 border-b border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[var(--accent-color)]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center m-0">
                        Blast Plain Text Templates
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)] m-0 mt-1">
                        Daftar semua template plain text yang tersedia untuk blast
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenCreateModal}
                    className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Buat Template Baru
                  </button>
                </div>
              </div>

              {/* Templates Table */}
              <div>
                {templates.length > 0 ? (
                  <Table
                    columns={tableColumns}
                    data={templates}
                    className="bg-[var(--bg-secondary)]"
                    emptyMessage="No templates found"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 py-12">
                    <Mail className="w-12 h-12 text-[var(--text-tertiary)]" />
                    <p className="text-[var(--text-secondary)] font-medium">
                      Tidak ada template yang tersedia
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)]">
                      Buat template baru untuk memulai
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTemplate ? "Edit Template" : "Buat Template Baru"}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {editingTemplate ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama template"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Isi <span className="text-[var(--error-color)]">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 min-h-[150px] resize-y"
                placeholder="Masukkan isi pesan template. Gunakan {{1}}, {{2}}, dll untuk variabel."
              />
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Gunakan format {'{{1}}'}, {'{{2}}'}, dll untuk menambahkan variabel
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={statusOptions}
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
                placeholder="Pilih Status"
              />
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
              Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Blast;

