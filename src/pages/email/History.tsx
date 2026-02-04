import React, { useEffect, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import EndChatTicket from "../../components/ticketing/EndChatTicket";
import History from "../../components/ticketing/History";
import Overview from "../../components/ticketing/Overview";
import Tabs from "../../components/ticketing/Tabs";
import UserJourney from "../../components/ticketing/UserJourney";
import Pagination from "../../components/ui/Pagination";
import Table, { TableColumn } from "../../components/ui/Table";

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    initial?: string;
  };
  recipient: {
    name: string;
    email: string;
    avatar?: string;
    initial?: string;
  };
  subject: string;
  preview: string;
  attachments: number;
  date: string;
  status: "sent" | "received" | "draft";
  unread?: number;
  isSelected?: boolean;
}

const EmailHistory: React.FC = () => {
  const [view, setView] = useState<
    "history" | "detail" | "compose" | "reply" | "forward"
  >("history");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDetailTab, setActiveDetailTab] = useState("user-journeys");
  const emailsPerPage = 10;
  const footerRef = React.useRef<HTMLDivElement>(null);

  // Compose email state
  const [composeData, setComposeData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
    attachments: [] as File[],
  });
  const composeFileInputRef = React.useRef<HTMLInputElement>(null);

  // Sample email history data
  const emails: Email[] = [
    {
      id: "1",
      sender: {
        name: "Wafiy Ulhaq",
        email: "wafiyulhaq14@gmail.com",
        initial: "W",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Permasalahan Internet Banking",
      preview:
        "Lorem ipsum dolor sit amet consectetur. Ullamcorper malesuada scelerisque sed sit porttitor vel enim quisque sapien.",
      attachments: 1,
      date: "19 Oct, 2025",
      status: "received",
      unread: 2,
    },
    {
      id: "2",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Wafiy Ulhaq",
        email: "wafiyulhaq14@gmail.com",
        initial: "W",
      },
      subject: "Re: Permasalahan Internet Banking",
      preview: "Thank you for contacting us regarding your Internet Banking issue...",
      attachments: 1,
      date: "19 Oct, 2025",
      status: "sent",
    },
    {
      id: "3",
      sender: {
        name: "Areeba Khan",
        email: "areeba.khan@example.com",
        initial: "A",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "New website design",
      preview:
        "I wanted to share the latest design mockups for the new website.",
      attachments: 2,
      date: "18 Oct, 2025",
      status: "received",
    },
    {
      id: "4",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Hassan Ali",
        email: "hassan.ali@example.com",
        initial: "H",
      },
      subject: "Project Update",
      preview: "I wanted to provide you with an update on the project status...",
      attachments: 0,
      date: "18 Oct, 2025",
      status: "sent",
    },
    {
      id: "5",
      sender: {
        name: "Hassan Ali",
        email: "hassan.ali@example.com",
        initial: "H",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Regarding your order",
      preview: "Your order has been processed and will be shipped soon.",
      attachments: 1,
      date: "18 Oct, 2025",
      status: "received",
    },
    {
      id: "6",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Laiba Khan",
        email: "laiba.khan@example.com",
        initial: "L",
      },
      subject: "Meeting Confirmation",
      preview: "I confirm our meeting scheduled for next week...",
      attachments: 1,
      date: "17 Oct, 2025",
      status: "sent",
    },
    {
      id: "7",
      sender: {
        name: "Laiba Khan",
        email: "laiba.khan@example.com",
        initial: "L",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Meeting agenda",
      preview: "Here is the agenda for our upcoming meeting next week.",
      attachments: 1,
      date: "17 Oct, 2025",
      status: "received",
    },
    {
      id: "8",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Saad Khan",
        email: "saad.khan@example.com",
        initial: "S",
      },
      subject: "Draft: Project Proposal",
      preview: "I wanted to discuss the project proposal for the upcoming quarter...",
      attachments: 2,
      date: "17 Oct, 2025",
      status: "draft",
    },
    {
      id: "9",
      sender: {
        name: "Saad Khan",
        email: "saad.khan@example.com",
        initial: "S",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Project timeline",
      preview: "I have updated the project timeline based on our discussion.",
      attachments: 2,
      date: "17 Oct, 2025",
      status: "received",
    },
    {
      id: "10",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Misha Zaidi",
        email: "misha.zaidi@example.com",
        initial: "M",
      },
      subject: "Weekly Report Submission",
      preview: "Please find attached the weekly report for your review...",
      attachments: 1,
      date: "16 Oct, 2025",
      status: "sent",
    },
    {
      id: "11",
      sender: {
        name: "Misha Zaidi",
        email: "misha.zaidi@example.com",
        initial: "M",
      },
      recipient: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      subject: "Q4 Goals",
      preview: "Let's review our Q4 goals and objectives for the team.",
      attachments: 1,
      date: "16 Oct, 2025",
      status: "received",
    },
    {
      id: "12",
      sender: {
        name: "Me",
        email: "me@example.com",
        initial: "M",
      },
      recipient: {
        name: "Maryam Noor",
        email: "maryam.noor@example.com",
        initial: "M",
      },
      subject: "Client Feedback Response",
      preview: "Thank you for your feedback. I have reviewed your comments...",
      attachments: 2,
      date: "16 Oct, 2025",
      status: "sent",
    },
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setView("detail");
  };

  const handleBackToHistory = () => {
    setView("history");
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
      const replyTo = selectedEmail.status === "sent" 
        ? selectedEmail.recipient 
        : selectedEmail.sender;
      setComposeData({
        to: replyTo.email,
        cc: "",
        bcc: "",
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n--- Original Message ---\nFrom: ${selectedEmail.sender.name} <${selectedEmail.sender.email}>\nTo: ${selectedEmail.recipient.name} <${selectedEmail.recipient.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.preview}`,
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
        body: `\n\n--- Forwarded Message ---\nFrom: ${selectedEmail.sender.name} <${selectedEmail.sender.email}>\nTo: ${selectedEmail.recipient.name} <${selectedEmail.recipient.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.preview}`,
        attachments: [],
      });
    }
  };

  const handleCloseCompose = () => {
    setView("history");
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
      email.sender.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.recipient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  };

  // Table columns definition
  const columns: TableColumn<Email>[] = [
    {
      key: "status",
      header: "Status",
      width: "100px",
      align: "center",
      render: (email) => {
        const statusColors = {
          sent: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          received: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          draft: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              statusColors[email.status]
            }`}
          >
            {email.status}
          </span>
        );
      },
    },
    {
      key: "sender",
      header: "From/To",
      width: "200px",
      render: (email) => {
        const person = email.status === "sent" ? email.recipient : email.sender;
        const label = email.status === "sent" ? "To" : "From";
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold text-sm flex-shrink-0 border-2 border-[var(--border-color)]">
              {person.avatar ? (
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{person.initial || person.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[var(--text-secondary)]">{label}</span>
              <span className="font-semibold text-sm text-[var(--text-primary)] truncate">
                {person.name}
              </span>
              <span className="text-xs text-[var(--text-secondary)] truncate">
                {person.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "subject",
      header: "Subject",
      render: (email) => (
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-sm text-[var(--text-primary)]">
            {email.subject}
          </div>
          <div className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {email.preview}
          </div>
        </div>
      ),
    },
    {
      key: "attachments",
      header: "Attachments",
      width: "120px",
      align: "center",
      render: (email) => (
        <div className="flex items-center justify-center gap-1.5 text-[var(--text-secondary)] text-xs">
          {email.attachments > 0 && (
            <>
              <i className="bx bx-paperclip text-[var(--text-tertiary)] text-sm"></i>
              <span>{email.attachments}</span>
            </>
          )}
          {email.attachments === 0 && (
            <span className="text-[var(--text-tertiary)]">-</span>
          )}
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: "150px",
      render: (email) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-[var(--text-primary)]">{email.date}</span>
          {email.unread && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--error-color)] text-white text-[10px] font-semibold">
              {email.unread}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full p-0 m-0 flex flex-col bg-[var(--bg-primary)] overflow-hidden min-w-0 box-border relative">
        {view === "history" ? (
          <div className="flex flex-col h-full bg-[var(--bg-primary)] overflow-hidden min-w-0">
            <div className="py-4 px-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">
                  History{" "}
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
                      placeholder="Search email history"
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
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[var(--bg-primary)] min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[var(--bg-tertiary)]">
              <div  >
                <Table
                  columns={columns}
                  data={paginatedEmails}
                  onRowClick={handleEmailClick}
                  emptyMessage="No email history found"
                />
              </div>
            </div>
          </div>
        ) : view === "detail" ? (
          <div className="flex h-full bg-[var(--bg-primary)] relative overflow-hidden min-w-0">
            <div className="flex-1 flex flex-col overflow-hidden border-r border-[var(--border-color)] min-w-0 relative">
              <div className="py-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]"
                    onClick={handleBackToHistory}
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
                        From: {selectedEmail?.sender.name}
                      </div>
                      <div className="text-[var(--text-secondary)] text-sm leading-snug">
                        ({selectedEmail?.sender.email})
                      </div>
                      <div className="text-[var(--text-secondary)] text-[13px] flex items-center gap-1 mt-1">
                        To: {selectedEmail?.recipient.name} ({selectedEmail?.recipient.email})
                        <i className="bx bx-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-[var(--text-secondary)] text-[13px] mt-2">
                    <span>{selectedEmail?.date}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          selectedEmail?.status === "sent"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : selectedEmail?.status === "received"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {selectedEmail?.status}
                      </span>
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
                  <Overview
                    user={
                      selectedEmail?.status === "sent"
                        ? selectedEmail?.recipient
                        : selectedEmail?.sender
                    }
                  />
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

export default EmailHistory;

