import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Alert from "../../../../components/ui/Alert";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown";
import IconButton from "../../../../components/ui/IconButton";
import PopupAlert from "../../../../components/ui/PopupAlert";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface Module {
  id: string;
  name: string;
  description: string;
  company: string;
  quota: {
    total: number;
    used: number;
    free: number;
  };
  startDate: string;
  expireDate: string;
  status: "active" | "inactive" | "expired";
}

const CompanyModules: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | number>("all");
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    module: Module | null;
  }>({
    isOpen: false,
    module: null,
  });
  const [notification, setNotification] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);

  // Check for success message from navigation
  React.useEffect(() => {
    const state = location.state as { success?: string; action?: string } | null;
    if (state?.success) {
      setNotification({
        type: "success",
        message: state.success,
      });
      // Clear state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const statusOptions: DropdownOption[] = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "expired", label: "Expired" },
  ];

  // Sample data
  const modules: Module[] = [
    {
      id: "1",
      name: "Omnichat",
      description: "Digital Channel",
      company: "JSS MALAKA",
      quota: {
        total: 999999,
        used: 0,
        free: 999999,
      },
      startDate: "03 Nov 2025",
      expireDate: "18 Nov 2026",
      status: "active",
    },
    {
      id: "2",
      name: "Outbound Call",
      description: "Voice",
      company: "JSS MALAKA",
      quota: {
        total: 9999999,
        used: 0,
        free: 9999999,
      },
      startDate: "03 Nov 2025",
      expireDate: "19 Nov 2026",
      status: "active",
    },
    {
      id: "3",
      name: "WhatsApp",
      description: "Messaging",
      company: "JSS MALAKA",
      quota: {
        total: 9999999,
        used: 0,
        free: 9999999,
      },
      startDate: "03 Nov 2025",
      expireDate: "11 Nov 2026",
      status: "active",
    },
    {
      id: "4",
      name: "Comments",
      description: "Social Media",
      company: "century",
      quota: {
        total: 0,
        used: 0,
        free: 0,
      },
      startDate: "N/A",
      expireDate: "N/A",
      status: "active",
    },
  ];

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || module.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  const handleEdit = (module: Module, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/settings/general/company-modules/edit/${module.id}`);
  };

  const handleDelete = (module: Module, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteAlert({
      isOpen: true,
      module: module,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.module) {
      // Handle delete logic here
      console.log("Delete module:", deleteAlert.module.id);
      // After successful deletion, show notification
      setNotification({
        type: "success",
        message: `Module "${deleteAlert.module.name}" has been deleted successfully.`,
      });
      setDeleteAlert({
        isOpen: false,
        module: null,
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteAlert({
      isOpen: false,
      module: null,
    });
  };

  const handleAddNew = () => {
    navigate("/settings/general/company-modules/create");
  };

  const columns: TableColumn<Module>[] = [
    {
      key: "module",
      header: "MODULE",
      render: (module) => (
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--text-primary)]">
            {module.name}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            {module.description}
          </span>
        </div>
      ),
    },
    {
      key: "company",
      header: "COMPANY",
      render: (module) => (
        <span className="text-[var(--text-primary)]">{module.company}</span>
      ),
    },
    {
      key: "quota",
      header: "QUOTA",
      render: (module) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-[var(--text-primary)]">
            Total: {formatNumber(module.quota.total)}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Used: {formatNumber(module.quota.used)}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Free: {formatNumber(module.quota.free)}
          </span>
        </div>
      ),
    },
    {
      key: "startDate",
      header: "START DATE",
      render: (module) => (
        <span className="text-[var(--text-primary)]">{module.startDate}</span>
      ),
    },
    {
      key: "expireDate",
      header: "EXPIRE DATE",
      render: (module) => (
        <span className="text-[var(--text-primary)]">{module.expireDate}</span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      align: "center",
      render: (module) => {
        const statusColors = {
          active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
          expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              statusColors[module.status]
            }`}
          >
            {module.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "ACTIONS",
      align: "center",
      width: "120px",
      render: (module) => (
        <div className="flex items-center justify-center gap-2">
          <IconButton
            icon={Edit}
            onClick={(e) => handleEdit(module, e)}
            variant="edit"
            title="Edit"
          />
          <IconButton
            icon={Trash2}
            onClick={(e) => handleDelete(module, e)}
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
        {/* Notification Alert */}
        {notification && (
          <div className="px-6 pt-4 flex-shrink-0">
            <Alert
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
              autoClose={true}
              autoCloseDelay={5000}
            />
          </div>
        )}

        {/* Top Bar */}
        <div className="h-16 px-6 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-shrink-0 flex items-center">
          <div className="flex items-center gap-3 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/settings")}
              className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--accent-color)] flex-shrink-0"
              title="Back to Settings"
            >
              <i className="bx bx-arrow-back"></i>
            </button>
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-base pointer-events-none"></i>
              <input
                type="text"
                className="w-full py-2.5 px-4 pl-10 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                placeholder="Search by module"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="w-40">
              <Dropdown
                options={statusOptions}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                size="sm"
              />
            </div>

            {/* Search Button */}
            <button className="h-[42px] w-[42px] flex items-center justify-center bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200">
              <i className="bx bx-search text-lg"></i>
            </button>

            {/* Add New Module Button */}
            <button
              onClick={handleAddNew}
              className="h-[42px] px-4 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <i className="bx bx-plus text-lg"></i>
              <span>Add New Module</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6">
            <Table
              columns={columns}
              data={filteredModules}
              emptyMessage="No modules found"
            />
          </div>
        </div>

        {/* Delete Confirmation Alert */}
        <PopupAlert
          isOpen={deleteAlert.isOpen}
          onClose={handleCancelDelete}
          title="Delete Module"
          message={`Are you sure you want to delete "${deleteAlert.module?.name}"? This action cannot be undone.`}
          type="error"
          confirmText="Delete"
          cancelText="Cancel"
          showCancel={true}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </WorkspaceLayout>
  );
};

export default CompanyModules;

