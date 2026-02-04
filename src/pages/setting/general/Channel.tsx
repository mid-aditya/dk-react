import {
  ArrowLeft,
  Bot,
  ChevronLeft,
  ChevronRight,
  Edit,
  Filter,
  Link as LinkIcon,
  RotateCw,
  Search,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";
import Modal from "../../../components/ui/Modal";

interface Channel {
  id: number;
  name: string;
  icon: string;
  editUrl: string;
}

interface LinkedBot {
  id: number;
  name: string;
  type: string;
}

const Channel: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLinkBotModalOpen, setIsLinkBotModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [linkedBots, setLinkedBots] = useState<LinkedBot[]>([]);
  const [selectedBot, setSelectedBot] = useState<string | number>("");

  // Sample channel data - replace with actual API data
  const allChannels: Channel[] = [
    {
      id: 25,
      name: "Sikose Digital Media",
      icon: "/assets/images/icons/fb.png",
      editUrl: "https://crm.datakelola.com/channel-page/25",
    },
    {
      id: 29,
      name: "Uidesk Wc",
      icon: "/assets/images/icons/chat_widget.png",
      editUrl: "https://crm.datakelola.com/channel-page/29",
    },
    {
      id: 31,
      name: "MultichatSaasBot",
      icon: "/assets/images/icons/telegram.png",
      editUrl: "https://crm.datakelola.com/channel-page/31",
    },
    {
      id: 32,
      name: "jouanda_",
      icon: "/assets/images/icons/fb.png",
      editUrl: "https://crm.datakelola.com/channel-page/32",
    },
    {
      id: 35,
      name: "Hijrah",
      icon: "/assets/images/icons/fb.png",
      editUrl: "https://crm.datakelola.com/channel-page/35",
    },
    {
      id: 37,
      name: "Wanda Irwansyah",
      icon: "/assets/images/icons/fb.png",
      editUrl: "https://crm.datakelola.com/channel-page/37",
    },
    {
      id: 38,
      name: "Siko Desk",
      icon: "/assets/images/icons/fb.png",
      editUrl: "https://crm.datakelola.com/channel-page/38",
    },
    {
      id: 40,
      name: "Sidikalang",
      icon: "/assets/images/icons/whatsapp.png",
      editUrl: "https://crm.datakelola.com/channel-page/40",
    },
    {
      id: 48,
      name: "Datakelola",
      icon: "/assets/images/icons/telegram.png",
      editUrl: "https://crm.datakelola.com/channel-page/48",
    },
  ];

  // Filter channels based on search query
  const filteredChannels = allChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredChannels.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentChannels = filteredChannels.slice(startIndex, endIndex);
  const startEntry = filteredChannels.length > 0 ? startIndex + 1 : 0;
  const endEntry = Math.min(endIndex, filteredChannels.length);

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

  const handleEditChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    // Load linked bots for this channel - replace with actual API call
    setLinkedBots([
      // Sample data - replace with actual API data
      { id: 1, name: "Bot Example 1", type: "Chatbot" },
      { id: 2, name: "Bot Example 2", type: "AI Bot" },
    ]);
    setIsEditModalOpen(true);
  };

  const handleLinkBot = () => {
    setIsLinkBotModalOpen(true);
  };

  const handleLinkBotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBot) {
      // Handle link bot logic here
      console.log("Linking bot:", selectedBot);
      // Add the linked bot to the list
      const botOptions = botDropdownOptions.find(opt => opt.value === selectedBot);
      if (botOptions) {
        setLinkedBots([
          ...linkedBots,
          { id: Date.now(), name: botOptions.label, type: "Chatbot" }
        ]);
      }
      setIsLinkBotModalOpen(false);
      setSelectedBot("");
    }
  };

  const handleDeleteLinkedBot = (botId: number) => {
    setLinkedBots(linkedBots.filter(bot => bot.id !== botId));
  };

  // Sample bot options for dropdown - replace with actual API data
  const botDropdownOptions: DropdownOption[] = [
    { value: 1, label: "Century Bot" },
    { value: 2, label: "AsriLiving Bot" },
    { value: 3, label: "Restu BOT" },
    { value: 4, label: "Sidikalang Bot" },
    { value: 5, label: "Asrilevis Bot" },
    { value: 6, label: "Candra Bot" },
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
                Channel Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your communication channels
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Section */}
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
                      placeholder="Search by channel name..."
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
                <span className="font-medium text-[var(--text-primary)]">{filteredChannels.length}</span> entries
              </div>
            </div>

            {/* Channel Cards Grid */}
            {currentChannels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="group bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 transition-colors duration-200 hover:border-[var(--accent-color)]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)]/50 transition-colors">
                          <img
                            src={channel.icon}
                            className="w-10 h-10 rounded-lg object-cover"
                            alt={channel.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/icons/profile.png";
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 truncate group-hover:text-[var(--accent-color)] transition-colors">
                          {channel.name}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">Channel ID: {channel.id}</p>
                      </div>
                      <button
                        onClick={() => handleEditChannel(channel)}
                        className="flex-shrink-0 px-4 py-2 bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-[var(--text-tertiary)] mb-4 mx-auto" />
                <p className="text-[var(--text-secondary)] font-medium">No channels found</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  Try adjusting your search criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-secondary)] disabled:hover:border-[var(--border-color)]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
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
                          <span
                            key={page}
                            className="px-2 text-[var(--text-secondary)]"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
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

        {/* Edit Channel Modal - Linked Bots */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedChannel(null);
            setLinkedBots([]);
          }}
          size="xl"
          showCloseButton={false}
          footer={null}
        >
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Linked Bots
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {selectedChannel?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLinkBot}
                  className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <LinkIcon className="w-5 h-5" />
                  Link to Bot
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedChannel(null);
                    setLinkedBots([]);
                  }}
                  className="px-4 py-2.5 bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)] border-b border-[var(--border-color)]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                      Id
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {linkedBots.length > 0 ? (
                    linkedBots.map((bot) => (
                      <tr
                        key={bot.id}
                        className="border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                          {bot.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                          {bot.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                          <span className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-xs font-medium">
                            {bot.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteLinkedBot(bot.id)}
                            className="px-3 py-1.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <Bot className="w-10 h-10 text-[var(--text-tertiary)] mb-3" />
                          <p className="text-[var(--text-secondary)] font-medium">
                            No linked bots found
                          </p>
                          <p className="text-sm text-[var(--text-tertiary)] mt-1">
                            Click "Link to Bot" to add a bot
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>

        {/* Link Bot Modal */}
        <Modal
          isOpen={isLinkBotModalOpen}
          onClose={() => {
            setIsLinkBotModalOpen(false);
            setSelectedBot("");
          }}
          title="Link to Bot"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsLinkBotModalOpen(false);
                  setSelectedBot("");
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="formLinkBot"
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Link Bot
              </button>
            </div>
          }
        >
          <form id="formLinkBot" onSubmit={handleLinkBotSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Select Bot <span className="text-[var(--error-color)]">*</span>
                </label>
                <Dropdown
                  options={botDropdownOptions}
                  value={selectedBot}
                  onChange={(value) => setSelectedBot(value)}
                  placeholder="Select a bot to link"
                  className="w-full"
                />
              </div>
              {selectedChannel && (
                <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-color)]">
                  <p className="text-sm text-[var(--text-secondary)]">
                    Linking bot to channel:{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      {selectedChannel.name}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </form>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Channel;
