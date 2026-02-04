import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Edit,
    Info,
    Plus,
    Search,
    Trash2
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import IconButton from "../../../../components/ui/IconButton";
import Modal from "../../../../components/ui/Modal";
import TabVertical, { TabVerticalItem } from "../../../../components/ui/TabVertical";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface ConfigItem {
  id: number;
  name: string;
  key: string;
  value: string;
}

interface ConfigSection {
  id: string;
  label: string;
  icon: string;
  description?: string;
  configs: ConfigItem[];
}

const Config: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ConfigItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; url: string } | null>(null);

  // Sample data based on contoh.txt
  const configSections: ConfigSection[] = [
    {
      id: "general",
      label: "General",
      icon: "bx-cog",
      configs: [
        { id: 1, name: "Bot Section Not Found", key: "msg.bot.section.not-found", value: "Command Is Not Found" },
        { id: 2, name: "Autoreply Type", key: "msg.bot.autoreply.type", value: "template" },
        { id: 3, name: "Autoreply Template", key: "msg.bot.autoreply.template", value: "Terimakasih {user.name} telah menghubungi kami." },
        { id: 4, name: "Message when Bot Campaign End", key: "msg.bot.campaign.end", value: "Sesi survei telah berakhir, terimakasih :)" },
        { id: 5, name: "Message when Bot Campaign Wrong Format", key: "msg.bot.campaign.wrong-format", value: "Mohon periksa kembali jawaban anda!!" },
        { id: 6, name: "Message when Bot Campaign send to Webhook", key: "msg.bot.campaign.webhook", value: "Terimakasih, interaksi anda akan kami simpan pada noticket tersebut" },
        { id: 7, name: "Message when Bot Campaign Too Many Wrong Format", key: "msg.bot.campaign.too-many-wrong", value: "Too many wrong, please try begin" },
        { id: 9, name: "Bot Section Command Not Found", key: "msg.bot.section.command-not-found", value: "Mohon maaf aku tidak mengerti yang kamu maksud,mau aku arahkan ke menu sebelumnya?\nReply *Yes*\nReply */home* untuk kembali ke awal BOT" },
        { id: 10, name: "Chat Out Of Operational Time", key: "msg.chat.out-of-operational-time", value: "Terimakasih telah menghubungi Whasapp Hisense Care.\n\nKami tidak dapat melayani Anda saat ini. Kami akan segera membalas pesan Anda saat jam operasional kami:\n\nJam Operasional:\nSenin - Jumat : 09.00 - 17.00\nSabtu : 09.00 - 14.00\nMinggu (dan tanggal merah/libur nasional) : Libur\n\nKami akan membalas pesan Anda dari bawah, mohon ketersediaan Anda untuk menunggu agent kami membalas dan mohon untuk tidak chat berulang.\n\nTerima kasih" },
        { id: 34, name: "Chat closed by agent", key: "msg.chat.close", value: "Sesi chat Anda dengan Hisense Care telah berakhir. Jika Anda memiliki pertanyaan lain, silahkan hubungi kami kembali.\nTerimakasih telah menghubungi Hisense Care" },
      ],
    },
    {
      id: "key1",
      label: "Section Not Found",
      icon: "bx-key",
      configs: [
        { id: 1, name: "Bot Section Not Found", key: "msg.bot.section.not-found", value: "Command Is Not Found" },
      ],
    },
    {
      id: "key2",
      label: "Autoreply Type",
      icon: "bx-key",
      description: "Autoreply Type = jenis type pesan",
      configs: [
        { id: 2, name: "Autoreply Type", key: "msg.bot.autoreply.type", value: "template" },
      ],
    },
    {
      id: "key3",
      label: "Autoreply Template",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan template",
      configs: [
        { id: 3, name: "Autoreply Template", key: "msg.bot.autoreply.template", value: "Terimakasih {user.name} telah menghubungi kami." },
      ],
    },
    {
      id: "key4",
      label: "Campaign End",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan endchat template",
      configs: [
        { id: 4, name: "Message when Bot Campaign End", key: "msg.bot.campaign.end", value: "Sesi survei telah berakhir, terimakasih :)" },
      ],
    },
    {
      id: "key5",
      label: "Campaign Wrong Format",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan jika pilihan salah",
      configs: [
        { id: 5, name: "Message when Bot Campaign Wrong Format", key: "msg.bot.campaign.wrong-format", value: "Mohon periksa kembali jawaban anda!!" },
      ],
    },
    {
      id: "key6",
      label: "Campaign Webhook",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan template ke webhook",
      configs: [
        { id: 6, name: "Message when Bot Campaign send to Webhook", key: "msg.bot.campaign.webhook", value: "Terimakasih, interaksi anda akan kami simpan pada noticket tersebut" },
      ],
    },
    {
      id: "key7",
      label: "Campaign Too Many Wrong",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan template jika pilihan salah",
      configs: [
        { id: 7, name: "Message when Bot Campaign Too Many Wrong Format", key: "msg.bot.campaign.too-many-wrong", value: "Too many wrong, please try begin" },
      ],
    },
    {
      id: "key8",
      label: "Command Not Found",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan template jika perintah salah",
      configs: [
        { id: 9, name: "Bot Section Command Not Found", key: "msg.bot.section.command-not-found", value: "Mohon maaf aku tidak mengerti yang kamu maksud,mau aku arahkan ke menu sebelumnya?\nReply *Yes*\nReply */home* untuk kembali ke awal BOT" },
      ],
    },
    {
      id: "key9",
      label: "Out of Operational Time",
      icon: "bx-key",
      description: "Key ini digunakan untuk mengirim pesan template jika diluar office hours",
      configs: [
        { id: 10, name: "Chat Out Of Operational Time", key: "msg.chat.out-of-operational-time", value: "Terimakasih telah menghubungi Whasapp Hisense Care.\n\nKami tidak dapat melayani Anda saat ini. Kami akan segera membalas pesan Anda saat jam operasional kami:\n\nJam Operasional:\nSenin - Jumat : 09.00 - 17.00\nSabtu : 09.00 - 14.00\nMinggu (dan tanggal merah/libur nasional) : Libur\n\nKami akan membalas pesan Anda dari bawah, mohon ketersediaan Anda untuk menunggu agent kami membalas dan mohon untuk tidak chat berulang.\n\nTerima kasih" },
      ],
    },
    {
      id: "key10",
      label: "Chat Close",
      icon: "bx-key",
      description: "Key ini digunakan untuk megirim pesan template jika agent mengakhiri pesan",
      configs: [
        { id: 34, name: "Chat closed by agent", key: "msg.chat.close", value: "Sesi chat Anda dengan Hisense Care telah berakhir. Jika Anda memiliki pertanyaan lain, silahkan hubungi kami kembali.\nTerimakasih telah menghubungi Hisense Care" },
      ],
    },
    {
      id: "key11",
      label: "Webhook Chat",
      icon: "bx-key",
      configs: [
        { id: 105, name: "", key: "api.webhook.chat", value: "1" },
      ],
    },
    {
      id: "key12",
      label: "Direct to Chat",
      icon: "bx-key",
      configs: [
        { id: 197, name: "", key: "wsc.direct_to_chat", value: "1" },
      ],
    },
    {
      id: "key13",
      label: "Home Response",
      icon: "bx-key",
      configs: [
        { id: 218, name: "", key: "msg.bot.section.home-response", value: "Terima kasih telah menghubungi Cantas \nThank you for Contacting Cantas \n\nReply *Yes* untuk melanjutkan proses ini" },
      ],
    },
    {
      id: "key14",
      label: "Try Confirm",
      icon: "bx-key",
      configs: [
        { id: 358, name: "", key: "chat.try.confirm", value: "1,2" },
      ],
    },
    {
      id: "key15",
      label: "Chat Confirm",
      icon: "bx-key",
      configs: [
        { id: 359, name: "", key: "msg.chat.confirm", value: "apakah anda masih terhubung dengan kami" },
        { id: 360, name: "", key: "msg.chat.confirm.en", value: "are you still connected with us" },
      ],
    },
    {
      id: "key16",
      label: "Config Autoreply",
      icon: "bx-key",
      description: "msg.config.autoreply 1 = mengaktifkan text auto reply \nmsg.config.autoreply.text digunakan untuk membuat chat template",
      configs: [
        { id: 386, name: "", key: "msg.config.autoreply", value: "1" },
        { id: 387, name: "", key: "msg.config.autoreply.text", value: "Bertanya;Apakah Bapak/Ibu Masih Online Dengan Kami?" },
        { id: 388, name: "", key: "msg.config.autoreply.text", value: "Memastikan;Apakah Jawaban Dari Kami Sudah Cukup Menjawab Kebutuhan Bpk/Ibu?" },
        { id: 460, name: "", key: "msg.config.autoreply.text", value: "101;Halo! Ada yang bisa saya bantu hari ini?" },
        { id: 461, name: "", key: "msg.config.autoreply.text", value: "102;Silakan ketik pertanyaan Anda, saya siap membantu!" },
        { id: 462, name: "", key: "msg.config.autoreply.text", value: "103;Butuh bantuan? Saya di sini untuk menjawab pertanyaan Anda." },
        { id: 463, name: "", key: "msg.config.autoreply.text", value: "104;Apakah Anda mencari sesuatu? Saya bisa membantu mencarikan jawabannya!" },
        { id: 475, name: "", key: "msg.config.autoreply.text", value: "105;Jika ada yang kurang jelas, jangan ragu untuk bertanya ya!" },
      ],
    },
    {
      id: "key17",
      label: "Category Form",
      icon: "bx-key",
      configs: [
        { id: 399, name: "", key: "msg.category.form", value: "1" },
      ],
    },
  ];

  const activeSection = configSections.find((section) => section.id === activeTab);
  const filteredConfigs = activeSection?.configs.filter(
    (config) =>
      config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.value.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredConfigs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConfigs = filteredConfigs.slice(startIndex, endIndex);

  const handleEdit = (config: ConfigItem) => {
    setSelectedConfig(config);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const deleteUrl = `https://crm.datakelola.com/company/config/${id}`;
    setDeleteConfirm({ id, url: deleteUrl });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      // Here you would make the actual API call
      console.log("Deleting config:", deleteConfirm.url);
      // After successful delete, you might want to reload the data
      setDeleteConfirm(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Prepare tab items for TabVertical
  const tabItems: TabVerticalItem[] = configSections.map((section) => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
  }));

  // Prepare table columns
  const tableColumns: TableColumn<ConfigItem>[] = [
    {
      key: "name",
      header: "Name",
      align: "left",
      render: (item) => (
        item.name || <span className="text-[var(--text-tertiary)] italic">-</span>
      ),
    },
    {
      key: "key",
      header: "Key",
      align: "left",
      render: (item) => (
        <span className="font-mono">{item.key}</span>
      ),
    },
    {
      key: "value",
      header: "Value",
      align: "left",
      render: (item) => (
        <div className="whitespace-pre-wrap break-words max-w-md">{item.value}</div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
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
                Configuration
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your system configurations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex-shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-[var(--border-color)]">
              <h6 className="text-sm font-semibold text-[var(--text-primary)] mb-0">
                Configuration Sections
              </h6>
            </div>
            <div className="p-2">
              <TabVertical
                items={tabItems}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
            <div className="p-6 max-w-7xl mx-auto">
              {/* Search and Add Button */}
              <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)]">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <form onSubmit={handleSearch} className="flex-1 w-full md:w-auto">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                        placeholder="Search by key or value..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Config
                  </button>
                </div>
              </div>

              {/* Info Description */}
              {activeSection?.description && (
                <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4 mb-6 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[var(--accent-color)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                    {activeSection.description}
                  </p>
                </div>
              )}

              {/* Config Table */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden">
                {paginatedConfigs.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-12">
                    <Search className="w-12 h-12 text-[var(--text-tertiary)]" />
                    <p className="text-[var(--text-secondary)] font-medium">No configurations found</p>
                    <p className="text-sm text-[var(--text-tertiary)]">
                      Try adjusting your search criteria
                    </p>
                  </div>
                ) : (
                  <Table
                    columns={tableColumns}
                    data={paginatedConfigs}
                    className="bg-[var(--bg-secondary)]"
                    emptyMessage="No configurations found"
                  />
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Showing <span className="font-medium text-[var(--text-primary)]">{startIndex + 1}</span> to{" "}
                    <span className="font-medium text-[var(--text-primary)]">
                      {Math.min(endIndex, filteredConfigs.length)}
                    </span>{" "}
                    of <span className="font-medium text-[var(--text-primary)]">{filteredConfigs.length}</span> entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
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
                                  : "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)]/50"
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
                      className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Config Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Configuration"
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
                onClick={() => {
                  // Handle add logic here
                  setIsAddModalOpen(false);
                }}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Add Configuration
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Enter configuration name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Key
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                placeholder="e.g., msg.bot.section.not-found"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Value
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 resize-none"
                placeholder="Enter configuration value"
              />
            </div>
          </div>
        </Modal>

        {/* Edit Config Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedConfig(null);
          }}
          title="Edit Configuration"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedConfig(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle edit logic here
                  setIsEditModalOpen(false);
                  setSelectedConfig(null);
                }}
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
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Enter configuration name"
                defaultValue={selectedConfig?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Key
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono"
                placeholder="e.g., msg.bot.section.not-found"
                defaultValue={selectedConfig?.key}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Value
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 resize-none"
                placeholder="Enter configuration value"
                defaultValue={selectedConfig?.value}
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
                Delete
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Are you sure you want to delete this configuration? This action cannot be undone.
            </p>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Config;

