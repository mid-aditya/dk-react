import {
    Calendar,
    CalendarCheck,
    CheckCircle,
    Clock,
    FileText,
    Filter,
    Grid3x3,
    Mail,
    MessageCircle,
    MessageSquareMore,
    Phone,
    Smile,
    Zap
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";

interface StatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  stats: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    valueColor?: string;
  }[];
}

const Overview: React.FC = () => {
  const today = new Date();
  const [dateFrom, setDateFrom] = useState<string>(
    today.toISOString().split("T")[0]
  );
  const [dateTo, setDateTo] = useState<string>(
    today.toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);

  // Statistics data
  const [stats, setStats] = useState({
    phone: {
      total: "0 panggilan",
      answered: "0 (0%)",
      avgDuration: "4m 32s",
      satisfaction: "4.3/5",
    },
    chat: {
      total: "0 chat",
      responded: "0 (0%)",
      responseTime: "45 detik",
      satisfaction: "4.5/5",
    },
    email: {
      total: "0 email",
      replied: "0 (0%)",
      responseTime: "2 jam 15m",
      satisfaction: "4.2/5",
    },
    social: {
      total: "0 interaksi",
      responded: "0 (0%)",
      responseTime: "15 menit",
      satisfaction: "4.4/5",
    },
    whatsapp: {
      total: "0 pesan",
      responded: "0 (0%)",
      responseTime: "2 menit",
      satisfaction: "4.6/5",
    },
    comment: {
      total: "0 panggilan",
      answered: "0 (0%)",
      duration: "12m 45s",
      satisfaction: "4.5/5",
    },
  });

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update with dummy data
      setStats({
        phone: {
          total: "125 panggilan",
          answered: "98 (78%)",
          avgDuration: "4m 32s",
          satisfaction: "4.3/5",
        },
        chat: {
          total: "342 chat",
          responded: "298 (87%)",
          responseTime: "45 detik",
          satisfaction: "4.5/5",
        },
        email: {
          total: "89 email",
          replied: "76 (85%)",
          responseTime: "2 jam 15m",
          satisfaction: "4.2/5",
        },
        social: {
          total: "156 interaksi",
          responded: "142 (91%)",
          responseTime: "15 menit",
          satisfaction: "4.4/5",
        },
        whatsapp: {
          total: "523 pesan",
          responded: "501 (96%)",
          responseTime: "2 menit",
          satisfaction: "4.6/5",
        },
        comment: {
          total: "67 panggilan",
          answered: "58 (87%)",
          duration: "12m 45s",
          satisfaction: "4.5/5",
        },
      });
      setIsLoading(false);
    }, 1000);
  };

  const statCards: StatCard[] = [
    {
      id: "phone",
      title: "Phone Calls",
      icon: <Phone className="w-6 h-6" />,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-500",
      stats: [
        {
          label: "Total:",
          value: stats.phone.total,
        },
        {
          label: "Terjawab:",
          value: stats.phone.answered,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Rata-rata:",
          value: stats.phone.avgDuration,
          icon: <Clock className="w-4 h-4 text-purple-500" />,
          valueColor: "text-purple-400",
        },
        {
          label: "Kepuasan:",
          value: stats.phone.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
    {
      id: "chat",
      title: "Live Chat",
      icon: <MessageCircle className="w-6 h-6" />,
      iconBg: "bg-gray-500/20",
      iconColor: "text-gray-400",
      stats: [
        {
          label: "Total:",
          value: stats.chat.total,
        },
        {
          label: "Direspon:",
          value: stats.chat.responded,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Response:",
          value: stats.chat.responseTime,
          icon: <Zap className="w-4 h-4 text-orange-500" />,
          valueColor: "text-orange-400",
        },
        {
          label: "Kepuasan:",
          value: stats.chat.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
    {
      id: "email",
      title: "Email",
      icon: <Mail className="w-6 h-6" />,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      stats: [
        {
          label: "Total:",
          value: stats.email.total,
        },
        {
          label: "Dibalas:",
          value: stats.email.replied,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Response:",
          value: stats.email.responseTime,
          icon: <FileText className="w-4 h-4 text-blue-500" />,
          valueColor: "text-blue-400",
        },
        {
          label: "Kepuasan:",
          value: stats.email.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
    {
      id: "social",
      title: "Social Media",
      icon: <Grid3x3 className="w-6 h-6" />,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
      stats: [
        {
          label: "Total:",
          value: stats.social.total,
        },
        {
          label: "Direspon:",
          value: stats.social.responded,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Response:",
          value: stats.social.responseTime,
          icon: <Zap className="w-4 h-4 text-orange-500" />,
          valueColor: "text-orange-400",
        },
        {
          label: "Kepuasan:",
          value: stats.social.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp Business",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"></path>
        </svg>
      ),
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
      stats: [
        {
          label: "Total:",
          value: stats.whatsapp.total,
        },
        {
          label: "Direspon:",
          value: stats.whatsapp.responded,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Response:",
          value: stats.whatsapp.responseTime,
          icon: <Zap className="w-4 h-4 text-orange-500" />,
          valueColor: "text-orange-400",
        },
        {
          label: "Kepuasan:",
          value: stats.whatsapp.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
    {
      id: "comment",
      title: "Comment & More",
      icon: <MessageSquareMore className="w-6 h-6" />,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
      stats: [
        {
          label: "Total:",
          value: stats.comment.total,
        },
        {
          label: "Dijawab:",
          value: stats.comment.answered,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          valueColor: "text-green-400",
        },
        {
          label: "Durasi:",
          value: stats.comment.duration,
          icon: <Clock className="w-4 h-4 text-purple-500" />,
          valueColor: "text-purple-400",
        },
        {
          label: "Kepuasan:",
          value: stats.comment.satisfaction,
          icon: <Smile className="w-4 h-4 text-yellow-500" />,
          valueColor: "text-yellow-400",
        },
      ],
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="p-6 h-full overflow-y-auto bg-[var(--bg-primary)]">
        {/* Filter Section */}
        <div className="mb-8">
          <form
            onSubmit={handleFilter}
            className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg"
          >
            <div className="flex flex-wrap gap-6 items-end">
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="date_filter"
                  className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  id="date_filter"
                  name="date_filter"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border-0 text-[var(--text-primary)] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-color)] outline-none transition-all"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="date_filter2"
                  className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  id="date_filter2"
                  name="date_filter2"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border-0 text-[var(--text-primary)] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--accent-color)] outline-none transition-all"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl px-6 py-2.5 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  {isLoading ? "Loading..." : "Apply Filter"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <div
              key={card.id}
              className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor}`}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {card.title}
                </h3>
              </div>
              <div className="space-y-3">
                {card.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[var(--text-secondary)] text-sm flex items-center">
                      {stat.icon && <span className="mr-2">{stat.icon}</span>}
                      {stat.label}
                    </span>
                    <span
                      className={`font-semibold ${
                        stat.valueColor || "text-[var(--text-primary)]"
                      }`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Overview;
