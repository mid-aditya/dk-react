import {
    Bell,
    LogOut,
    MessageSquare,
    MoreVertical,
    Search,
    Settings,
    UserPlus,
    Users,
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import ChatInput from "../../components/ui/ChatInput";
import MessageBubble from "../../components/ui/MessageBubble";
import Modal from "../../components/ui/Modal";

interface Group {
  id: number;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatar?: string;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  senderId: number;
  time: string;
  isMe: boolean;
}

interface PendingInvite {
  id: number;
  groupName: string;
  inviter: string;
  invitedAt: string;
}

const ChatGroup: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isManageMembersModalOpen, setIsManageMembersModalOpen] = useState(false);
  const [isRequestLeaveModalOpen, setIsRequestLeaveModalOpen] = useState(false);

  // Sample data
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Development Team",
      lastMessage: "Let's schedule a meeting tomorrow",
      lastMessageTime: "10:30 AM",
      unreadCount: 3,
    },
    {
      id: 2,
      name: "Design Team",
      lastMessage: "The new design is ready for review",
      lastMessageTime: "9:15 AM",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Marketing Team",
      lastMessage: "Campaign launch next week",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
    },
    {
      id: 4,
      name: "Support Team",
      lastMessage: "New tickets assigned",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello everyone! Welcome to the group.",
      sender: "John Doe",
      senderId: 1,
      time: "10:00 AM",
      isMe: false,
    },
    {
      id: 2,
      content: "Thanks for the welcome!",
      sender: "You",
      senderId: 2,
      time: "10:05 AM",
      isMe: true,
    },
    {
      id: 3,
      content: "Let's discuss the project timeline.",
      sender: "Jane Smith",
      senderId: 3,
      time: "10:10 AM",
      isMe: false,
    },
  ]);

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([
    {
      id: 1,
      groupName: "Product Team",
      inviter: "Alice Johnson",
      invitedAt: "2 hours ago",
    },
    {
      id: 2,
      groupName: "QA Team",
      inviter: "Bob Williams",
      invitedAt: "1 day ago",
    },
  ]);

  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = (message: string, files: File[]) => {
    if (!message.trim() && files.length === 0) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: message,
      sender: "You",
      senderId: 999,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
  };

  const handleAcceptInvite = (inviteId: number) => {
    setPendingInvites(pendingInvites.filter((inv) => inv.id !== inviteId));
    // Handle accept logic here
  };

  const handleRejectInvite = (inviteId: number) => {
    setPendingInvites(pendingInvites.filter((inv) => inv.id !== inviteId));
    // Handle reject logic here
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex bg-[var(--bg-primary)] overflow-hidden">
        {/* SIDEBAR KIRI: LIST GROUP */}
        <div className="w-full xl:w-1/4 lg:w-1/3 border-r border-[var(--border-color)] flex-shrink-0 flex flex-col h-full">
          <div className="bg-[var(--bg-secondary)] h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between flex-shrink-0">
              <h5 className="m-0 text-[var(--text-primary)] text-lg font-semibold">
                Internal Groups
              </h5>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleGroupSelect(group)}
                  className={`w-full px-4 py-3 border-b border-[var(--border-color)] text-left transition-colors hover:bg-[var(--bg-tertiary)] ${
                    selectedGroup?.id === group.id
                      ? "bg-[var(--bg-tertiary)] border-l-4 border-l-[var(--accent-color)]"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-color)]/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[var(--accent-color)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h6 className="text-sm font-semibold text-[var(--text-primary)] truncate m-0">
                          {group.name}
                        </h6>
                        {group.lastMessageTime && (
                          <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0 ml-2">
                            {group.lastMessageTime}
                          </span>
                        )}
                      </div>
                      {group.lastMessage && (
                        <p className="text-xs text-[var(--text-secondary)] truncate m-0 mb-1">
                          {group.lastMessage}
                        </p>
                      )}
                      {group.unreadCount && group.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[var(--accent-color)] text-white text-xs font-semibold rounded-full">
                          {group.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM TENGAH: THREAD */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <div className="bg-[var(--bg-secondary)] h-full flex flex-col">
            {/* Header Thread */}
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-3 flex-shrink-0">
              <div className="flex-1 min-w-0">
                {selectedGroup ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[var(--accent-color)]" />
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-[var(--text-primary)] m-0">
                        {selectedGroup.name}
                      </h6>
                      <p className="text-xs text-[var(--text-secondary)] m-0">
                        {groups.find((g) => g.id === selectedGroup.id)?.lastMessageTime || ""}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)] m-0">
                      Select a group to start chatting
                    </p>
                  </div>
                )}
              </div>

              {selectedGroup && (
                <>
                  <button
                    className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors text-[var(--text-primary)]"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <button
                      className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors text-[var(--text-primary)]"
                      title="More options"
                      onClick={() => setIsManageMembersModalOpen(true)}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Conversation Area (scrollable) */}
            {selectedGroup ? (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="chat-conversation p-3 h-full overflow-y-auto flex flex-col gap-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <MessageBubble
                          message={message.content}
                          time={message.time}
                          isAgent={message.isMe}
                          showReadIcon={message.isMe}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composer */}
                <div className="border-t border-[var(--border-color)] p-3 flex-shrink-0">
                  <ChatInput
                    placeholder="Type Message (Shift + Enter for new line)"
                    onSend={handleSendMessage}
                    showAttachButton={true}
                    showPlusButton={true}
                    enableDragDrop={true}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--text-secondary)]">
                    Select a group from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR KANAN: INVITES/PANEL */}
        <div className="hidden xl:block w-1/4 border-l border-[var(--border-color)] flex-shrink-0 h-full">
          <div className="bg-[var(--bg-secondary)] h-full flex flex-col">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex-shrink-0">
              <h6 className="m-0 text-[var(--text-primary)] font-semibold">Pending Invitations</h6>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {pendingInvites.length > 0 ? (
                <div className="space-y-3">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]"
                    >
                      <h6 className="text-sm font-semibold text-[var(--text-primary)] mb-1 m-0">
                        {invite.groupName}
                      </h6>
                      <p className="text-xs text-[var(--text-secondary)] mb-2 m-0">
                        Invited by {invite.inviter}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)] mb-3 m-0">
                        {invite.invitedAt}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptInvite(invite.id)}
                          className="flex-1 px-3 py-1.5 bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectInvite(invite.id)}
                          className="flex-1 px-3 py-1.5 bg-[var(--bg-quaternary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-medium rounded-lg transition-colors border border-[var(--border-color)]"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserPlus className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--text-secondary)]">No pending invitations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Invite Members Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Members"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // Handle invite logic here
                setIsInviteModalOpen(false);
              }}
              className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Send Invitations
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Select Members
            </label>
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
            />
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Select members to invite to this group
          </div>
        </div>
      </Modal>

      {/* Manage Members Modal */}
      <Modal
        isOpen={isManageMembersModalOpen}
        onClose={() => setIsManageMembersModalOpen(false)}
        title="Manage Members"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsManageMembersModalOpen(false)}
              className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
            >
              Close
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-sm font-semibold text-[var(--text-primary)] m-0">
              Group Members
            </h6>
            <button
              onClick={() => {
                setIsManageMembersModalOpen(false);
                setIsInviteModalOpen(true);
              }}
              className="px-3 py-1.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Invite Members
            </button>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((id) => (
              <div
                key={id}
                className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[var(--accent-color)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] m-0">
                      Member {id}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] m-0">member{id}@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-[var(--bg-quaternary)] rounded-lg transition-colors text-[var(--text-primary)]"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-[var(--error-color)]/10 text-[var(--error-color)] rounded-lg transition-colors"
                    title="Remove"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Request Leave Modal */}
      <Modal
        isOpen={isRequestLeaveModalOpen}
        onClose={() => setIsRequestLeaveModalOpen(false)}
        title="Leave Group"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRequestLeaveModalOpen(false)}
              className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // Handle leave logic here
                setIsRequestLeaveModalOpen(false);
                setSelectedGroup(null);
              }}
              className="px-4 py-2.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Leave Group
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-[var(--text-primary)]">
            Are you sure you want to leave this group? You will no longer receive messages from this
            group.
          </p>
        </div>
      </Modal>
    </WorkspaceLayout>
  );
};

export default ChatGroup;

