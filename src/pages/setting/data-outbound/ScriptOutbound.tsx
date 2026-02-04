import {
    ArrowLeft,
    Edit,
    Eye,
    FileText,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface ScriptItem {
  id: number;
  name: string;
  description: string;
  channel: string;
  channelId: number;
  groupRoute: string;
  groupRouteId: number | null;
  status: "active" | "inactive";
}

const ScriptOutbound: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(null);
  const [previewDescription, setPreviewDescription] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    channelId: "",
    groupRouteId: "",
    status: "active" as "active" | "inactive",
  });

  // Available channels and group routes
  const channels = [
    { id: 14, name: "Whatsapp META" },
    { id: 1, name: "Call" },
  ];

  const groupRoutes = [
    { id: 9, name: "Pusat" },
    { id: null, name: "Tidak ada Group Route/Data Global" },
  ];

  // Sample data based on reference HTML
  const [scripts, setScripts] = useState<ScriptItem[]>([
    {
      id: 9,
      name: "Category 1",
      description: `<p><strong>Tujuan:</strong> Menawarkan paket Internet + TV Kabel (Silver/Gold/OTT)</p>
<h4><strong>1. Pembukaan (10-15 detik)</strong></h4>
<p><i>Gunakan nada ramah dan percaya diri.</i></p>
<blockquote><p><strong>Agent:</strong><br><i>"Selamat pagi/siang, Pak/Bu [Nama]. Saya [Nama Agent] dari Megavision. Apakah ini waktu yang tepat untuk berbincang sebentar?"</i></p></blockquote>
<p><strong>Jika penerima merespons positif:</strong></p>
<blockquote><p><i>"Terima kasih. Saya menghubungi karena Megavision sedang menawarkan promo spesial <strong>paket Internet dan TV Kabel termurah</strong> dengan jaringan super cepat dan stabil. Boleh saya tahu, saat ini Bapak/Ibu sudah menggunakan layanan internet/TV kabel di rumah?"</i></p></blockquote>
<p><strong>Jika penerima sibuk:</strong></p>
<blockquote><p><i>"Oh, tidak masalah. Kapan waktu yang lebih nyaman untuk saya menghubungi kembali? Besok pagi/siang?"</i></p></blockquote>`,
      channel: "Whatsapp META",
      channelId: 14,
      groupRoute: "Tidak ada Group Route/Data Global",
      groupRouteId: null,
      status: "active",
    },
    {
      id: 1,
      name: "SCRIPT OUTBOUND CALL MEGAVISION",
      description: `<p><strong>Tujuan:</strong> Menawarkan paket Internet + TV Kabel (Silver/Gold/OTT)</p>
<h4><strong>1. Pembukaan (10-15 detik)</strong></h4>
<p><i>Gunakan nada ramah dan percaya diri.</i></p>
<blockquote><p><strong>Agent:</strong><br><i>"Selamat pagi/siang, Pak/Bu [Nama]. Saya [Nama Agent] dari Megavision. Apakah ini waktu yang tepat untuk berbincang sebentar?"</i></p></blockquote>`,
      channel: "Whatsapp META",
      channelId: 14,
      groupRoute: "Pusat",
      groupRouteId: 9,
      status: "active",
    },
  ]);

  const filteredScripts = scripts.filter((script) =>
    script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const stripHtml = (html: string): string => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      channelId: "",
      groupRouteId: "",
      status: "active",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (script: ScriptItem) => {
    setSelectedScript(script);
    setFormData({
      name: script.name,
      description: script.description,
      channelId: script.channelId.toString(),
      groupRouteId: script.groupRouteId?.toString() || "",
      status: script.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (script: ScriptItem) => {
    setSelectedScript(script);
    setIsDeleteModalOpen(true);
  };

  const handlePreview = (script: ScriptItem) => {
    setPreviewDescription(script.description);
    setIsPreviewModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedScript) {
      setScripts((prev) => prev.filter((script) => script.id !== selectedScript.id));
      setIsDeleteModalOpen(false);
      setSelectedScript(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Nama Script harus diisi");
      return;
    }

    if (!formData.description.trim()) {
      alert("Deskripsi harus diisi");
      return;
    }

    if (!formData.channelId) {
      alert("Channel harus dipilih");
      return;
    }

    const selectedChannel = channels.find((ch) => ch.id === parseInt(formData.channelId));
    if (!selectedChannel) {
      alert("Channel tidak valid");
      return;
    }

    const selectedGroupRoute = formData.groupRouteId
      ? groupRoutes.find((gr) => gr.id === parseInt(formData.groupRouteId))
      : groupRoutes.find((gr) => gr.id === null);

    if (selectedScript) {
      // Update existing script
      setScripts((prev) =>
        prev.map((script) =>
          script.id === selectedScript.id
            ? {
                ...script,
                name: formData.name,
                description: formData.description,
                channel: selectedChannel.name,
                channelId: selectedChannel.id,
                groupRoute: selectedGroupRoute?.name || "Tidak ada Group Route/Data Global",
                groupRouteId: selectedGroupRoute?.id || null,
                status: formData.status,
              }
            : script
        )
      );
    } else {
      // Create new script
      const newScript: ScriptItem = {
        id: Math.max(...scripts.map((s) => s.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        channel: selectedChannel.name,
        channelId: selectedChannel.id,
        groupRoute: selectedGroupRoute?.name || "Tidak ada Group Route/Data Global",
        groupRouteId: selectedGroupRoute?.id || null,
        status: formData.status,
      };
      setScripts((prev) => [newScript, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedScript(null);
    setFormData({
      name: "",
      description: "",
      channelId: "",
      groupRouteId: "",
      status: "active",
    });
  };

  const tableColumns: TableColumn<ScriptItem>[] = [
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
      header: "Nama Script",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
      ),
    },
    {
      key: "description",
      header: "Deskripsi",
      align: "left",
      render: (item) => {
        const plainText = stripHtml(item.description);
        const truncated = truncateText(plainText, 80);
        return (
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-primary)] text-sm">{truncated}</span>
            {plainText.length > 80 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(item);
                }}
                className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] text-xs font-medium flex items-center gap-1 transition-colors"
                title="Lihat deskripsi lengkap"
              >
                <Eye className="w-4 h-4" />
                Lihat
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: "channel",
      header: "Channel",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.channel}</span>
      ),
    },
    {
      key: "groupRoute",
      header: "Group Route",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.groupRoute}</span>
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
                Script Outbound Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage outbound call scripts and templates
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
                        placeholder="Cari script..."
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
                  Tambah Script
                </button>
              </div>

              {/* Table */}
              {filteredScripts.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredScripts}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No scripts found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <FileText className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada script yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat script baru untuk memulai"}
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
            setSelectedScript(null);
            setFormData({
              name: "",
              description: "",
              channelId: "",
              groupRouteId: "",
              status: "active",
            });
          }}
          title={selectedScript ? "Edit Script" : "Tambah Script Baru"}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedScript(null);
                  setFormData({
                    name: "",
                    description: "",
                    channelId: "",
                    groupRouteId: "",
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
                {selectedScript ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Script <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama script"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Deskripsi <span className="text-[var(--error-color)]">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 resize-y min-h-[200px] font-mono"
                placeholder="Masukkan deskripsi script (HTML format diperbolehkan)"
                rows={10}
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Tip: Anda dapat menggunakan HTML untuk memformat deskripsi
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Channel <span className="text-[var(--error-color)]">*</span>
                </label>
                <select
                  value={formData.channelId}
                  onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                >
                  <option value="">Pilih Channel</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Group Route
                </label>
                <select
                  value={formData.groupRouteId}
                  onChange={(e) => setFormData({ ...formData, groupRouteId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                >
                  <option value="">Tidak ada Group Route/Data Global</option>
                  {groupRoutes
                    .filter((gr) => gr.id !== null)
                    .map((groupRoute) => (
                      <option key={groupRoute.id as number} value={groupRoute.id as number}>
                        {groupRoute.name}
                      </option>
                    ))}
                </select>
              </div>
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

        {/* Preview Description Modal */}
        <Modal
          isOpen={isPreviewModalOpen}
          onClose={() => {
            setIsPreviewModalOpen(false);
            setPreviewDescription("");
          }}
          title="Preview Deskripsi"
          size="lg"
        >
          <div
            className="prose prose-sm max-w-none text-[var(--text-primary)]"
            dangerouslySetInnerHTML={{ __html: previewDescription }}
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedScript(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedScript(null);
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
            {selectedScript && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedScript.name}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default ScriptOutbound;
