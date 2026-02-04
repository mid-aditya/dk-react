import {
    ArrowLeft,
    Bot,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    Info,
    Link as LinkIcon,
    Plus,
    RotateCw,
    Search,
    Settings,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Modal from "../../../components/ui/Modal";

interface Bot {
  id: number;
  name: string;
  icon: string;
  linkCount: number;
  date: string;
  isActive: boolean;
  settingsUrl: string;
}

const BotInteraction: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLinkingModalOpen, setIsLinkingModalOpen] = useState(false);
  const [bots, setBots] = useState<Bot[]>([
    {
      id: 12,
      name: "Century",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "12-06-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/12",
    },
    {
      id: 13,
      name: "AsriLiving2",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "12-06-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/13",
    },
    {
      id: 16,
      name: "Restu BOT",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "02-08-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/16",
    },
    {
      id: 18,
      name: "Sidikalang",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "02-08-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/18",
    },
    {
      id: 23,
      name: "Asrilevis",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "04-09-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/23",
    },
    {
      id: 26,
      name: "Candra",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "05-10-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/26",
    },
    {
      id: 34,
      name: "Roatex Trial BOT",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "13-12-2023",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/34",
    },
    {
      id: 61,
      name: "simulasi cantas",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "08-06-2024",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/61",
    },
    {
      id: 62,
      name: "Bot Simulasi 2",
      icon: "https://cdn-icons-png.flaticon.com/512/1312/1312183.png",
      linkCount: 3,
      date: "08-06-2024",
      isActive: true,
      settingsUrl: "https://crm.datakelola.com/bot/62",
    },
  ]);

  // Filter bots based on search query
  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBots.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentBots = filteredBots.slice(startIndex, endIndex);
  const startEntry = filteredBots.length > 0 ? startIndex + 1 : 0;
  const endEntry = Math.min(endIndex, filteredBots.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleToggleActive = (botId: number) => {
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot.id === botId ? { ...bot, isActive: !bot.isActive } : bot
      )
    );
  };

  const handleLinkingBot = () => {
    setIsLinkingModalOpen(true);
  };

  const handleCreateBot = () => {
    window.open("https://crm.datakelola.com/bot/v2/create", "_blank");
  };

  const handleCreateOpenAIBot = () => {
    window.open("https://crm.datakelola.com/bot/v2/create-openai", "_blank");
  };

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
                Bot Interaction
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your chatbot interactions
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full xl:w-80 flex-shrink-0">
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
                  {/* Alert Box */}
                  <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-[var(--accent-color)] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                        Chatbot adalah aplikasi asisten virtual untuk meningkatkan
                        penjualan dan pelayanan bisnis jadi lebih efektif serta
                        efisien.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCreateBot}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 text-[var(--text-primary)] font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Bot className="w-5 h-5" />
                      Create Bot
                    </button>
                    <button
                      onClick={handleLinkingBot}
                      type="button"
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 text-[var(--text-primary)] font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <LinkIcon className="w-5 h-5" />
                      Linking Bot
                    </button>
                    <button
                      onClick={handleCreateOpenAIBot}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 text-[var(--text-primary)] font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Bot className="w-5 h-5" />
                      Create OpenAI Bot
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header Section */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)] shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h5 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        Digital BOT
                      </h5>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        Digital BOT You can reach out to many people using Digital
                        Channel from this menu with people across devices and
                        platforms.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateBot}
                      className="px-6 py-3 bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                    >
                      <Plus className="w-5 h-5" />
                      Add BOT
                    </button>
                  </div>
                </div>

                {/* Search Form */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)] shadow-sm">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-11 pr-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                          placeholder="Search by bot name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <Filter className="w-5 h-5" />
                          Search
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 border border-[var(--border-color)]"
                        >
                          <RotateCw className="w-5 h-5" />
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Stats and Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-secondary)]">Show</span>
                    <select
                      value={perPage}
                      onChange={handlePerPageChange}
                      className="px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                    >
                      <option value="9">9</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                    </select>
                    <span className="text-sm text-[var(--text-secondary)]">entries</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-4 py-2 rounded-lg border border-[var(--border-color)]">
                    Showing <span className="font-medium text-[var(--text-primary)]">{startEntry}</span> to{" "}
                    <span className="font-medium text-[var(--text-primary)]">{endEntry}</span> of{" "}
                    <span className="font-medium text-[var(--text-primary)]">{filteredBots.length}</span> entries
                  </div>
                </div>

                {/* Bot Cards Grid */}
                {currentBots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {currentBots.map((bot) => (
                      <div
                        key={bot.id}
                        className="group bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 transition-colors duration-200 hover:border-[var(--accent-color)]/50"
                      >
                        <div className="relative">
                          {/* Settings Icon */}
                          <a
                            href={bot.settingsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-[var(--bg-tertiary)] hover:bg-[var(--accent-color)] text-[var(--text-secondary)] hover:text-white rounded-lg transition-colors duration-200"
                          >
                            <Settings className="w-4 h-4" />
                          </a>

                          {/* Bot Info */}
                          <div className="flex items-start gap-3 pr-10">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden border border-[var(--border-color)]">
                                <img
                                  width="32"
                                  height="32"
                                  src={bot.icon}
                                  alt={bot.name}
                                  className="rounded-lg"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://cdn-icons-png.flaticon.com/512/1312/1312183.png";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-3 truncate group-hover:text-[var(--accent-color)] transition-colors">
                                {bot.name}
                              </h5>
                              <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] mb-3">
                                <span className="flex items-center gap-1">
                                  <LinkIcon className="w-3 h-3" />
                                  {bot.linkCount}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {bot.date}
                                </span>
                              </div>

                              {/* Toggle Switch */}
                              <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={bot.isActive}
                                    onChange={() => handleToggleActive(bot.id)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-[var(--bg-quaternary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--accent-color)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--success-color)]"></div>
                                  <span className="ml-2 text-xs font-medium text-[var(--text-secondary)]">
                                    {bot.isActive ? "Active" : "Inactive"}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-12 text-center mb-6">
                    <Search className="w-12 h-12 text-[var(--text-tertiary)] mb-4 mx-auto" />
                    <p className="text-[var(--text-secondary)] font-medium">No bots found</p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-1">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-secondary)] disabled:hover:border-[var(--border-color)]"
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
                        className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-secondary)] disabled:hover:border-[var(--border-color)]"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Linking Bot Modal */}
        <Modal
          isOpen={isLinkingModalOpen}
          onClose={() => setIsLinkingModalOpen(false)}
          title="Linking Bot"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLinkingModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-secondary)]">
                Linking bot functionality will be implemented here.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default BotInteraction;
