import {
    ArrowLeft,
    Plus,
    Search,
    Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Modal from "../../../components/ui/Modal";

interface GroupRoute {
  id: number;
  code: string;
  name: string;
}

const GroupRoute: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false);
  const [selectedGroupRouteId, setSelectedGroupRouteId] = useState<number | null>(null);

  // Sample data - replace with actual API data
  const allGroupRoutes: GroupRoute[] = [
    { id: 2, code: "Bogor", name: "KCP Bogor" },
    { id: 3, code: "Tangsel", name: "KCP Tangsel" },
    { id: 5, code: "Padang", name: "KCP Padang" },
    { id: 9, code: "Pusat", name: "Pusat" },
  ];

  // Filter group routes based on search query
  const filteredGroupRoutes = allGroupRoutes.filter(
    (route) =>
      route.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleManageAgents = (id: number) => {
    setSelectedGroupRouteId(id);
    setIsAgentsModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create new group route");
    setIsCreateModalOpen(false);
  };

  const handleAgentsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Manage agents for group route:", selectedGroupRouteId);
    setIsAgentsModalOpen(false);
    setSelectedGroupRouteId(null);
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
                Group Route Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Configure and manage group routing
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search and Add Button Section */}
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-6 border border-[var(--border-color)] shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 w-full sm:max-w-md">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                      placeholder="Search group route..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Add New
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--bg-tertiary)] border-b border-[var(--border-color)]">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {filteredGroupRoutes.length > 0 ? (
                      filteredGroupRoutes.map((route, index) => (
                        <tr
                          key={route.id}
                          className="bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-[var(--text-primary)] font-medium">
                              {route.code}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-[var(--text-primary)]">
                              {route.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleManageAgents(route.id)}
                              className="px-4 py-2 bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                              <Users className="w-4 h-4" />
                              Manage Agents
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
                            <Search className="w-10 h-10 text-[var(--text-tertiary)] mb-3" />
                            <p className="text-[var(--text-secondary)] font-medium">
                              No group routes found
                            </p>
                            <p className="text-sm text-[var(--text-tertiary)] mt-1">
                              Try adjusting your search criteria
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Create New Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Add New Group Route"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="formCreateGroupRoute"
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Add Group Route
              </button>
            </div>
          }
        >
          <form id="formCreateGroupRoute" onSubmit={handleCreateSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Code <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                  placeholder="Enter route code"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Name <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                  placeholder="Enter route name"
                  required
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Manage Agents Modal */}
        <Modal
          isOpen={isAgentsModalOpen}
          onClose={() => {
            setIsAgentsModalOpen(false);
            setSelectedGroupRouteId(null);
          }}
          title="Manage Agents"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAgentsModalOpen(false);
                  setSelectedGroupRouteId(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="formManageAgents"
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          }
        >
          <form id="formManageAgents" onSubmit={handleAgentsSubmit}>
            <div className="space-y-5">
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-color)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  Managing agents for group route ID:{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    {selectedGroupRouteId}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Select Agents
                </label>
                <div className="p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)] max-h-60 overflow-y-auto">
                  <p className="text-sm text-[var(--text-secondary)] text-center py-8">
                    Agent selection interface will be implemented here
                  </p>
                  {/* Add agent selection UI here */}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default GroupRoute;
