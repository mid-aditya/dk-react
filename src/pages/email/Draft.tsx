import React, { useEffect, useRef, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import EndChatTicket from "../../components/ticketing/EndChatTicket";
import History from "../../components/ticketing/History";
import Overview from "../../components/ticketing/Overview";
import Tabs from "../../components/ticketing/Tabs";
import UserJourney from "../../components/ticketing/UserJourney";
import Pagination from "../../components/ui/Pagination";

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    initial?: string;
  };
  subject: string;
  preview: string;
  attachments: number;
  date: string;
  unread?: number;
  isSelected?: boolean;
}

const Draft: React.FC = () => {
  const [view, setView] = useState<
    "draft" | "detail" | "compose" | "reply" | "forward"
  >("draft");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDetailTab, setActiveDetailTab] = useState("user-journeys");
  const emailsPerPage = 5;
  const footerRef = useRef<HTMLDivElement>(null);

  // Compose email state
  const [composeData, setComposeData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
    attachments: [] as File[],
  });
  const composeFileInputRef = useRef<HTMLInputElement>(null);

  // Sample draft email data
  const emails: Email[] = [
    {
      id: "1",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Project Proposal",
      preview:
        "I wanted to discuss the project proposal for the upcoming quarter...",
      attachments: 2,
      date: "19 Oct",
    },
    {
      id: "2",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Meeting Follow-up",
      preview:
        "Thank you for the meeting today. I wanted to follow up on...",
      attachments: 1,
      date: "18 Oct",
    },
    {
      id: "3",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Budget Review",
      preview: "Please review the attached budget proposal for...",
      attachments: 1,
      date: "17 Oct",
    },
    {
      id: "4",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Weekly Update",
      preview: "Here is the weekly update on the project status...",
      attachments: 0,
      date: "16 Oct",
    },
    {
      id: "5",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Client Feedback",
      preview: "I have reviewed the client feedback and would like to...",
      attachments: 3,
      date: "15 Oct",
    },
    {
      id: "6",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Draft: Team Announcement",
      preview: "I wanted to announce some important updates to the team...",
      attachments: 1,
      date: "14 Oct",
    },
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setView("detail");
  };

  const handleBackToDraft = () => {
    setView("draft");
    setSelectedEmail(null);
  };

  const handleOpenCompose = () => {
    setView("compose");
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      attachments: [],
    });
  };

  const handleReply = () => {
    if (selectedEmail) {
      setView("reply");
      setComposeData({
        to: selectedEmail.sender.email,
        cc: "",
        bcc: "",
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n--- Original Message ---\nFrom: ${selectedEmail.sender.name} <${selectedEmail.sender.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.preview}`,
        attachments: [],
      });
    }
  };

  const handleForward = () => {
    if (selectedEmail) {
      setView("forward");
      setComposeData({
        to: "",
        cc: "",
        bcc: "",
        subject: `Fwd: ${selectedEmail.subject}`,
        body: `\n\n--- Forwarded Message ---\nFrom: ${selectedEmail.sender.name} <${selectedEmail.sender.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.preview}`,
        attachments: [],
      });
    }
  };

  const handleCloseCompose = () => {
    setView("draft");
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      attachments: [],
    });
  };

  const handleComposeChange = (field: string, value: string) => {
    setComposeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setComposeData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setComposeData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSendEmail = () => {
    if (!composeData.to.trim() || !composeData.subject.trim()) {
      alert("Please fill in To and Subject fields");
      return;
    }
    // Handle send email logic here
    console.log("Sending email:", composeData);
    handleCloseCompose();
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmails.length / emailsPerPage)
  );
  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const paginatedEmails = filteredEmails.slice(startIndex, endIndex);

  // Ensure currentPage doesn't exceed totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of email list
    const emailList = document.querySelector(".email-list");
    if (emailList) {
      emailList.scrollTop = 0;
    }
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full p-0 m-0 flex flex-col bg-[var(--bg-primary)] overflow-hidden min-w-0 box-border relative">
        {view === "draft" ? (
          <div className="flex flex-col h-full bg-[var(--bg-primary)] overflow-hidden min-w-0">
            <div className="py-4 px-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">
                  Draft{" "}
                  <span className="text-[var(--text-secondary)] font-normal text-base">
                    ({emails.length})
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <i className="bx bx-search absolute left-3 text-[var(--text-tertiary)] text-base pointer-events-none"></i>
                    <input
                      type="text"
                      className="py-2.5 px-4 pl-10 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm w-[300px] transition-all duration-200 focus:outline-none focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)] md:w-[200px]"
                      placeholder="Search draft"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg cursor-pointer transition-all duration-200 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)]">
                    <i className="bx bx-filter"></i>
                  </button>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-end">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        showFirstLast={true}
                        maxVisible={5}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[var(--bg-primary)] min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[var(--bg-tertiary)] email-list">
              {paginatedEmails.map((email) => (
                <div
                  key={email.id}
                  className={`py-4 px-6 border-b border-[var(--border-color)] cursor-pointer transition-colors duration-200 flex items-start gap-4 hover:bg-[var(--bg-secondary)] ${
                    email.isSelected
                      ? "bg-[var(--bg-secondary)] border-l-[3px] border-l-[var(--accent-color)]"
                      : ""
                  }`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold text-lg flex-shrink-0 border-2 border-[var(--border-color)]">
                    {email.sender.avatar ? (
                      <img
                        src={email.sender.avatar}
                        alt={email.sender.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>
                        {email.sender.initial || email.sender.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[var(--text-primary)] text-sm">
                        {email.sender.name}
                      </span>
                      <span className="text-[var(--text-secondary)] text-[13px]">
                        ({email.sender.email})
                      </span>
                      {email.unread && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--error-color)] text-white text-[11px] font-semibold ml-1">
                          {email.unread}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                      {email.subject}
                    </div>
                    <div className="text-[var(--text-secondary)] text-[13px] leading-relaxed line-clamp-2 mb-2">
                      {email.preview}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-4 flex-shrink-0 ml-4">
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-xs">
                      <i className="bx bx-paperclip text-[var(--text-tertiary)] text-sm"></i>
                      <span>{email.attachments} Attachment(s)</span>
                    </div>
                    <div className="text-[var(--text-secondary)] text-xs whitespace-nowrap">
                      {email.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : view === "detail" ? (
          <div className="flex h-full bg-[var(--bg-primary)] relative overflow-hidden min-w-0">
            <div className="flex-1 flex flex-col overflow-hidden border-r border-[var(--border-color)] min-w-0 relative">
              <div className="py-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]"
                    onClick={handleBackToDraft}
                  >
                    <i className="bx bx-arrow-back"></i>
                  </button>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 truncate max-w-[500px]">
                    {selectedEmail?.subject}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-save"></i>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-bell"></i>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-trash"></i>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-envelope"></i>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-plus-circle"></i>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                    <i className="bx bx-folder"></i>
                  </button>
                  <div className="flex items-center gap-3 px-3 text-[var(--text-secondary)] text-[13px] ml-2">
                    <span>1 from {emails.length}</span>
                    <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                      <i className="bx bx-chevron-left"></i>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                      <i className="bx bx-chevron-right"></i>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                      <i className="bx bx-printer"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-6 pb-[100px] flex flex-col min-h-0">
                <div className="mb-6 pb-6 border-b border-[var(--border-color)]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold text-xl flex-shrink-0 border-2 border-[var(--border-color)]">
                      {selectedEmail?.sender.avatar ? (
                        <img
                          src={selectedEmail.sender.avatar}
                          alt={selectedEmail.sender.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>
                          {selectedEmail?.sender.initial ||
                            selectedEmail?.sender.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="font-semibold text-[var(--text-primary)] text-base leading-snug">
                        {selectedEmail?.sender.name}
                      </div>
                      <div className="text-[var(--text-secondary)] text-sm leading-snug">
                        ({selectedEmail?.sender.email})
                      </div>
                      <div className="text-[var(--text-secondary)] text-[13px] flex items-center gap-1 mt-1">
                        to test.cc@bankaltimtara.co.id
                        <i className="bx bx-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-[var(--text-secondary)] text-[13px] mt-2">
                    <span>19 Oct, 2025, 16:00 PM</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                        title="Star"
                      >
                        <i className="bx bx-star"></i>
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                        title="More options"
                      >
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[var(--text-primary)] text-sm leading-relaxed whitespace-pre-wrap break-words py-5 flex-1 max-w-full overflow-wrap-break-word">
                  {selectedEmail?.preview ||
                    "Lorem ipsum dolor sit amet consectetur. Ullamcorper malesuada scelerisque sed sit porttitor vel enim quisque sapien. Ipsum id aliquam nibh quam a cursus. Leo viverra dictumst facilisi eget eu volutpat. Congue odio lorem ut in tristique nunc pellentesque euismod.\n\nLorem ipsum dolor sit amet consectetur. Ullamcorper malesuada scelerisque sed sit porttitor vel enim quisque sapien. Ipsum id aliquam nibh quam a cursus. Leo viverra dictumst facilisi eget eu volutpat. Congue odio lorem ut in tristique nunc pellentesque euismod."}
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 z-[100] py-4 px-6 border-t border-[var(--border-color)] flex items-center gap-3 bg-[var(--bg-secondary)] backdrop-blur-[16px] shadow-[0_-4px_24px_var(--shadow)] flex-shrink-0"
                ref={footerRef}
              >
                <button
                  className="py-2.5 px-5 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 whitespace-nowrap hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
                  onClick={handleReply}
                >
                  <i className="bx bx-reply"></i>
                  Reply
                </button>
                <button
                  className="py-2.5 px-5 border border-[var(--accent-color)] rounded-lg bg-[var(--accent-color)] text-white text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 whitespace-nowrap hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(37,99,235,0.2)]"
                  onClick={handleForward}
                >
                  Forward
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </div>
            <div className="w-[360px] flex-shrink-0 bg-[var(--bg-secondary)] border-l border-[var(--border-color)] flex flex-col overflow-hidden min-w-0">
              <div className="pt-2 pb-0">
                <Tabs
                  activeTab={activeDetailTab}
                  onTabChange={setActiveDetailTab}
                  showUserJourneys={true}
                />
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {activeDetailTab === "user-journeys" && <UserJourney />}
                {activeDetailTab === "overview" && (
                  <Overview user={selectedEmail?.sender} />
                )}
                {activeDetailTab === "end-chat" && <EndChatTicket />}
                {activeDetailTab === "history" && <History />}
              </div>
            </div>
          </div>
        ) : view === "compose" || view === "reply" || view === "forward" ? (
          <div className="flex flex-col h-full bg-[var(--bg-primary)] overflow-hidden min-w-0">
            <div className="py-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0 relative">
              <div className="flex items-center gap-4">
                <button
                  className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]"
                  onClick={
                    view === "compose"
                      ? handleCloseCompose
                      : () => setView("detail")
                  }
                >
                  <i className="bx bx-arrow-back"></i>
                </button>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0">
                  {view === "compose"
                    ? "Compose Email"
                    : view === "reply"
                    ? "Reply Email"
                    : "Forward Email"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                  onClick={
                    view === "compose"
                      ? handleCloseCompose
                      : () => setView("detail")
                  }
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-6 min-h-0">
              <div className="max-w-full">
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                    To <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                    placeholder="Recipient email address"
                    value={composeData.to}
                    onChange={(e) => handleComposeChange("to", e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                    Cc
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                    placeholder="Cc email address (optional)"
                    value={composeData.cc}
                    onChange={(e) => handleComposeChange("cc", e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                    Bcc
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                    placeholder="Bcc email address (optional)"
                    value={composeData.bcc}
                    onChange={(e) => handleComposeChange("bcc", e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                    Subject <span className="text-[var(--error-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                    placeholder="Email subject"
                    value={composeData.subject}
                    onChange={(e) =>
                      handleComposeChange("subject", e.target.value)
                    }
                  />
                </div>
                {composeData.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5 p-3 bg-[var(--bg-tertiary)] rounded-lg">
                    {composeData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 py-2 px-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md text-[13px] text-[var(--text-primary)]"
                      >
                        <i className="bx bx-paperclip"></i>
                        <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {file.name}
                        </span>
                        <button
                          className="bg-none border-none text-[var(--text-secondary)] cursor-pointer p-0 w-[18px] h-[18px] flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--error-color)]"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          <i className="bx bx-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 resize-y min-h-[300px] font-inherit leading-relaxed box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                    placeholder="Write your message here..."
                    rows={15}
                    value={composeData.body}
                    onChange={(e) =>
                      handleComposeChange("body", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="py-4 px-6 border-t border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  className="py-2.5 px-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
                  onClick={() => composeFileInputRef.current?.click()}
                >
                  <i className="bx bx-paperclip"></i>
                  Attach
                </button>
                <input
                  ref={composeFileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="py-2.5 px-5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]"
                  onClick={
                    view === "compose"
                      ? handleCloseCompose
                      : () => setView("detail")
                  }
                >
                  Cancel
                </button>
                <button
                  className="py-2.5 px-5 bg-[var(--accent-color)] border border-[var(--accent-color)] rounded-lg text-white text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                  onClick={handleSendEmail}
                >
                  <i className="bx bx-send"></i>
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </WorkspaceLayout>
  );
};

export default Draft;

