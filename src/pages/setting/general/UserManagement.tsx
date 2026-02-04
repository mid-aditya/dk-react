import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Alert from "../../../components/ui/Alert";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";
import Modal from "../../../components/ui/Modal";
import PopupAlert from "../../../components/ui/PopupAlert";
import Table, { TableColumn } from "../../../components/ui/Table";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  type: string;
}

interface Privilege {
  id: string;
  name: string;
  code: string;
  children?: Privilege[];
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);
  const [isEditMaxHandleModalOpen, setIsEditMaxHandleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    userId: string | null;
  }>({
    isOpen: false,
    userId: null,
  });

  // Form states
  const [addUserForm, setAddUserForm] = useState({
    role: "",
    name: "",
    email: "",
    username: "",
    password: "",
    privileges: [] as string[],
  });

  const [editUserForm, setEditUserForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [editRoleForm, setEditRoleForm] = useState({
    role: "",
    privileges: [] as string[],
  });

  const [assignUserForm, setAssignUserForm] = useState({
    channels: [] as string[],
  });

  const [editMaxHandleForm, setEditMaxHandleForm] = useState({
    maxHandleNew: "",
    maxHandleComment: "",
  });

  // Sample data
  const users: User[] = [
    {
      id: "97",
      name: "agentomni12",
      email: "agentomni1@gmail.com",
      username: "agentomni1",
      role: "agent",
      type: "",
    },
    {
      id: "133",
      name: "Jouanda",
      email: "jou@gmail.com",
      username: "jou@gmail.com",
      role: "agent",
      type: "",
    },
    {
      id: "134",
      name: "agent1old",
      email: "agent1old@gmail.com",
      username: "agent1",
      role: "agent",
      type: "",
    },
    {
      id: "136",
      name: "Naufal Century",
      email: "naufal.century@gmail.com",
      username: "naufal.century",
      role: "agent",
      type: "",
    },
    {
      id: "137",
      name: "Agent1",
      email: "Agent1@gmail.com",
      username: "Agent1new@gmail.com",
      role: "agent",
      type: "",
    },
    {
      id: "138",
      name: "Agent 2",
      email: "agent2@gmail.com",
      username: "Agent2",
      role: "agent",
      type: "",
    },
    {
      id: "139",
      name: "Megavision1",
      email: "megavision1@test.com",
      username: "megavision1@test.com",
      role: "agent",
      type: "",
    },
    {
      id: "140",
      name: "Megavision2",
      email: "megavision2@test.com",
      username: "megavision2@test.com",
      role: "agent",
      type: "",
    },
    {
      id: "141",
      name: "Megavision3",
      email: "megavision3@test.com",
      username: "megavision3@test.com",
      role: "agent",
      type: "",
    },
    {
      id: "142",
      name: "Megavision4",
      email: "megavision4@test.com",
      username: "megavision4@test.com",
      role: "agent",
      type: "",
    },
  ];

  const roleOptions: DropdownOption[] = [
    { value: "1", label: "Test" },
    { value: "2", label: "Admin" },
    { value: "3", label: "Agent" },
    { value: "4", label: "Manager" },
  ];

  const channelOptions: DropdownOption[] = [
    { value: "37,2", label: "Instagram - Wanda Irwansyah" },
    { value: "125,2", label: "Instagram - sakhawistara_1" },
    { value: "29,5", label: "Chat Widget - Uidesk Wc" },
    { value: "31,3", label: "Telegram - MultichatSaasBot" },
    { value: "40,4", label: "Whatsapp UnOfficial - Sidikalang" },
    { value: "48,3", label: "Telegram - Datakelola" },
    { value: "85,7", label: "Web Socket Chat - Rnd Ws Chat" },
    { value: "86,7", label: "Web Socket Chat - Test" },
    { value: "109,7", label: "Web Socket Chat - test2" },
    { value: "164,1", label: "Facebook - World's Sakha" },
    { value: "170,13", label: "Whatsapp Center - HAIDAR (0881010812304)" },
    { value: "171,14", label: "Whatsapp META - Uidesk Omnichannel Official" },
  ];

  // Sample privileges (flat structure for now, can be nested)
  const privileges: Privilege[] = [
    {
      id: "1",
      name: "Manage Users",
      code: "USER_MANAGEMENT",
    },
  ];

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
    setAddUserForm({
      role: "",
      name: "",
      email: "",
      username: "",
      password: "",
      privileges: [],
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      username: user.username,
      password: "",
    });
    setIsEditUserModalOpen(true);
  };

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setEditRoleForm({
      role: "",
      privileges: [],
    });
    setIsEditRoleModalOpen(true);
  };

  const handleAssignUser = (user: User) => {
    setSelectedUser(user);
    setAssignUserForm({
      channels: [],
    });
    setIsAssignUserModalOpen(true);
  };

  const handleEditMaxHandle = (user: User) => {
    setSelectedUser(user);
    setEditMaxHandleForm({
      maxHandleNew: "",
      maxHandleComment: "",
    });
    setIsEditMaxHandleModalOpen(true);
  };

  const handleDeleteAssignedChannel = (user: User) => {
    setDeleteAlert({
      isOpen: true,
      userId: user.id,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.userId) {
      // Handle delete logic here
      console.log("Delete assigned channel for user:", deleteAlert.userId);
      setNotification({
        type: "success",
        message: "Assigned channel deleted successfully.",
      });
      setDeleteAlert({
        isOpen: false,
        userId: null,
      });
    }
  };

  const handlePrivilegeChange = (
    privilegeId: string,
    checked: boolean,
    isEditRole: boolean = false
  ) => {
    if (isEditRole) {
      setEditRoleForm((prev) => {
        const newPrivileges = checked
          ? [...prev.privileges, privilegeId]
          : prev.privileges.filter((id) => id !== privilegeId);
        return { ...prev, privileges: newPrivileges };
      });
    } else {
      setAddUserForm((prev) => {
        const newPrivileges = checked
          ? [...prev.privileges, privilegeId]
          : prev.privileges.filter((id) => id !== privilegeId);
        return { ...prev, privileges: newPrivileges };
      });
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Add user:", addUserForm);
    setNotification({
      type: "success",
      message: "User added successfully!",
    });
    setIsAddUserModalOpen(false);
  };

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Edit user:", editUserForm);
    setNotification({
      type: "success",
      message: "User updated successfully!",
    });
    setIsEditUserModalOpen(false);
  };

  const handleEditRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Edit role:", editRoleForm);
    setNotification({
      type: "success",
      message: "Role updated successfully!",
    });
    setIsEditRoleModalOpen(false);
  };

  const handleAssignUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Assign user:", assignUserForm);
    setNotification({
      type: "success",
      message: "Channel assigned successfully!",
    });
    setIsAssignUserModalOpen(false);
  };

  const handleEditMaxHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Edit max handle:", editMaxHandleForm);
    setNotification({
      type: "success",
      message: "Max handle updated successfully!",
    });
    setIsEditMaxHandleModalOpen(false);
  };

  const columns: TableColumn<User>[] = [
    {
      key: "no",
      header: "No",
      width: "60px",
      render: (_, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "name",
      header: "Nama",
      render: (user) => (
        <span className="text-[var(--text-primary)]">{user.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (user) => (
        <span className="text-[var(--text-primary)]">{user.email}</span>
      ),
    },
    {
      key: "username",
      header: "Username",
      render: (user) => (
        <span className="text-[var(--text-primary)]">{user.username}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span className="text-[var(--text-primary)]">{user.role}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (user) => (
        <span className="text-[var(--text-primary)]">{user.type || "-"}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => {
              // Handle ADD MENU
              console.log("Add menu for user:", user.id);
            }}
          >
            ADD MENU
          </button>
          <button
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => handleEditUser(user)}
          >
            EDIT USER
          </button>
          <button
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => handleAssignUser(user)}
          >
            ASSIGN CHANNEL
          </button>
          <button
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => handleEditMaxHandle(user)}
          >
            EDIT MAX HANDLE
          </button>
          <button
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => handleDeleteAssignedChannel(user)}
          >
            DELETE ASSIGNED CHANNEL
          </button>
          <button
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors duration-200"
            onClick={() => handleEditRole(user)}
          >
            EDIT ROLE
          </button>
        </div>
      ),
    },
  ];

  const PrivilegeTree: React.FC<{
    privileges: Privilege[];
    selectedPrivileges: string[];
    onChange: (privilegeId: string, checked: boolean) => void;
  }> = ({ privileges, selectedPrivileges, onChange }) => {
    const handleCheckboxChange = (
      privilegeId: string,
      checked: boolean,
      privilege: Privilege
    ) => {
      onChange(privilegeId, checked);

      // If checked, check all children
      if (checked && privilege.children) {
        privilege.children.forEach((child) => {
          if (!selectedPrivileges.includes(child.id)) {
            onChange(child.id, true);
          }
        });
      }

      // If unchecked, uncheck all children
      if (!checked && privilege.children) {
        privilege.children.forEach((child) => {
          if (selectedPrivileges.includes(child.id)) {
            onChange(child.id, false);
          }
        });
      }
    };

    const renderPrivilege = (privilege: Privilege, level: number = 0) => {
      const isChecked = selectedPrivileges.includes(privilege.id);
      const hasChildren = privilege.children && privilege.children.length > 0;

      return (
        <li key={privilege.id} className={level > 0 ? "ms-3" : ""}>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`privilege_${privilege.id}`}
              checked={isChecked}
              onChange={(e) =>
                handleCheckboxChange(privilege.id, e.target.checked, privilege)
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor={`privilege_${privilege.id}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="px-2 py-1 bg-[var(--accent-color)] text-white text-xs font-medium rounded">
                {privilege.name}
              </span>
              <small className="text-[var(--text-secondary)]">
                ({privilege.code})
              </small>
            </label>
          </div>
          {hasChildren && (
            <ul className="list-unstyled mt-2">
              {privilege.children?.map((child) => renderPrivilege(child, level + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <ul className="list-unstyled">
        {privileges.map((privilege) => renderPrivilege(privilege))}
      </ul>
    );
  };

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

        {/* Header */}
        <div className="h-16 px-6 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-shrink-0 flex items-center">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/settings")}
                className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--accent-color)]"
                title="Back to Settings"
              >
                <i className="bx bx-arrow-back"></i>
              </button>
              <h5 className="text-lg font-semibold text-[var(--text-primary)] m-0">
                Users Management List
              </h5>
            </div>
            <div>
              <button
                onClick={handleAddUser}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <i className="bx bx-plus"></i>
                Add New
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6">
            <Table columns={columns} data={users} emptyMessage="No users found" />
          </div>
        </div>

        {/* Add User Modal */}
        <Modal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          title="Add User Agent"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                form="formAddUser"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
          }
        >
          <form id="formAddUser" onSubmit={handleAddUserSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Role
                </label>
                <Dropdown
                  options={roleOptions}
                  value={addUserForm.role}
                  onChange={(value) =>
                    setAddUserForm((prev) => ({ ...prev, role: value as string }))
                  }
                  placeholder="Select Role"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Privilege Assignment
                </label>
                <div className="p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]">
                  <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Privilege Assignment
                  </h5>
                  <PrivilegeTree
                    privileges={privileges}
                    selectedPrivileges={addUserForm.privileges}
                    onChange={(privilegeId, checked) =>
                      handlePrivilegeChange(privilegeId, checked, false)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Name"
                  value={addUserForm.name}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Email"
                  value={addUserForm.email}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Username"
                  value={addUserForm.username}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Password"
                  value={addUserForm.password}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={isEditUserModalOpen}
          onClose={() => setIsEditUserModalOpen(false)}
          title="Edit User Agent"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditUserModalOpen(false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                form="formEditUser"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
              >
                Update
              </button>
            </div>
          }
        >
          <form id="formEditUser" onSubmit={handleEditUserSubmit}>
            <input type="hidden" value={selectedUser?.id} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Name"
                  value={editUserForm.name}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Email"
                  value={editUserForm.email}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Username"
                  value={editUserForm.username}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Password"
                  value={editUserForm.password}
                  onChange={(e) =>
                    setEditUserForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Edit Role Modal */}
        <Modal
          isOpen={isEditRoleModalOpen}
          onClose={() => setIsEditRoleModalOpen(false)}
          title="Edit Role"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditRoleModalOpen(false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                form="formEditRole"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
              >
                Edit
              </button>
            </div>
          }
        >
          <form id="formEditRole" onSubmit={handleEditRoleSubmit}>
            <input type="hidden" value={selectedUser?.id} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Role
                </label>
                <Dropdown
                  options={roleOptions}
                  value={editRoleForm.role}
                  onChange={(value) =>
                    setEditRoleForm((prev) => ({ ...prev, role: value as string }))
                  }
                  placeholder="Select Role"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Privilege Assignment
                </label>
                <div className="p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]">
                  <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Privilege Assignment
                  </h5>
                  <PrivilegeTree
                    privileges={privileges}
                    selectedPrivileges={editRoleForm.privileges}
                    onChange={(privilegeId, checked) =>
                      handlePrivilegeChange(privilegeId, checked, true)
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal>

        {/* Assign User Modal */}
        <Modal
          isOpen={isAssignUserModalOpen}
          onClose={() => setIsAssignUserModalOpen(false)}
          title="Assign User"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAssignUserModalOpen(false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                form="formAssignUser"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
          }
        >
          <form id="formAssignUser" onSubmit={handleAssignUserSubmit}>
            <input type="hidden" value={selectedUser?.id} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Channel Page
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-[var(--border-color)] rounded-lg p-3 bg-[var(--bg-tertiary)]">
                  {channelOptions.map((channel) => (
                    <label
                      key={channel.value}
                      className="flex items-center gap-2 p-2 hover:bg-[var(--bg-secondary)] rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={assignUserForm.channels.includes(
                          channel.value as string
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAssignUserForm((prev) => ({
                              ...prev,
                              channels: [...prev.channels, channel.value as string],
                            }));
                          } else {
                            setAssignUserForm((prev) => ({
                              ...prev,
                              channels: prev.channels.filter(
                                (c) => c !== channel.value
                              ),
                            }));
                          }
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-[var(--text-primary)]">
                        {channel.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Modal>

        {/* Edit Max Handle Modal */}
        <Modal
          isOpen={isEditMaxHandleModalOpen}
          onClose={() => setIsEditMaxHandleModalOpen(false)}
          title="Edit Max Handle"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditMaxHandleModalOpen(false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                form="formEditMaxHandle"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
          }
        >
          <form id="formEditMaxHandle" onSubmit={handleEditMaxHandleSubmit}>
            <input type="hidden" value={selectedUser?.id} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Max Handle Terbaru
                </label>
                <input
                  type="number"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Max Handle"
                  value={editMaxHandleForm.maxHandleNew}
                  onChange={(e) =>
                    setEditMaxHandleForm((prev) => ({
                      ...prev,
                      maxHandleNew: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Max Handle Comment
                </label>
                <input
                  type="number"
                  className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                  placeholder="Enter Max Handle Comment"
                  value={editMaxHandleForm.maxHandleComment}
                  onChange={(e) =>
                    setEditMaxHandleForm((prev) => ({
                      ...prev,
                      maxHandleComment: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Alert */}
        <PopupAlert
          isOpen={deleteAlert.isOpen}
          onClose={() =>
            setDeleteAlert({ isOpen: false, userId: null })
          }
          title="Delete Assigned Channel"
          message="Are you sure you want to delete this assigned channel? This action cannot be undone."
          type="error"
          confirmText="Delete"
          cancelText="Cancel"
          showCancel={true}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteAlert({ isOpen: false, userId: null })}
        />
      </div>
    </WorkspaceLayout>
  );
};

export default UserManagement;

