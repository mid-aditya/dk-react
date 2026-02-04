import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;        // hanya untuk item tanpa children
  openInNewTab?: boolean; // untuk wallboard yang buka tab baru
  children?: MenuItem[];
}

const Sidebar: React.FC<{ isCollapsed?: boolean; onToggle?: (collapsed: boolean) => void }> = ({
  isCollapsed = false,
  onToggle,
}) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const logoLong = theme === 'light'
    ? '/assets/datakelola/datakelola-biru.png'
    : '/assets/datakelola/datakelola-putih.png';

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'bx-home-alt',
      children: [
        { id: 'overview', label: 'Overview', path: '/overview' },
        { id: 'agent-performance', label: 'Agent Performance', path: '/agent-performance' },
        { id: 'agent-productivity', label: 'Agent Productivity', path: '/agent-productivity' },
      ],
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'bx-layout',
      children: [
        { id: 'dashboard-outbound', label: 'Dashboard Outbound Ticket', path: '/dashboard/outbound' },
      ],
    },
    {
      id: 'email',
      label: 'Email',
      icon: 'bx-envelope',
      children: [
        { id: 'email-inbox', label: 'Inbox', path: '/email' },
        { id: 'email-draft', label: 'Draft', path: '/email/draft' },
        { id: 'email-sent', label: 'Sent', path: '/email/sent' },
        { id: 'email-history', label: 'History', path: '/email/history' },
        { id: 'email-compose', label: 'Compose', path: '/email/compose' },
      ],
    },
    {
      id: 'workspace',
      label: 'Workspace',
      icon: 'bx-conversation',
      children: [
        { id: 'omnichat', label: 'Omnichat', path: '/omnichat' },
        { id: 'comment', label: 'Comments Interaction', path: '/comment' },
        { id: 'livechat', label: 'Livechat', path: '/livechat' },
        { id: 'inbound', label: 'Inbound Call', path: '/inbound' },
        { id: 'outbound', label: 'Outbound Call', path: '/outbound' },
      ],
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: 'bx-desktop',
      children: [
        { id: 'analytic', label: 'Analytic', path: '/monitoring/analytic' },
        { id: 'call-recording', label: 'Call Recording', path: '/monitoring/call-recording' },
        { id: 'outbound-interaction', label: 'Outbound Interaction', path: '/monitoring/outbound-interaction' },
        { id: 'channel-interaction', label: 'Channel Interaction', path: '/monitoring/channel-interaction' },
      ],
    },
    {
      id: 'wallboard',
      label: 'Wallboard',
      icon: 'bx-tv',
      children: [
        { id: 'wallboard-omnichat', label: 'Omnichat', path: '/wallboard/omnichat', openInNewTab: true },
        { id: 'wallboard-outbound', label: 'Outbound', path: '/wallboard/outbound', openInNewTab: true },
      ],
    },
  ];

  // Auto-expand parent menu berdasarkan path aktif
  useEffect(() => {
    const newExpanded = new Set<string>();

    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.path && location.pathname.startsWith(child.path)
        );
        if (hasActiveChild) {
          newExpanded.add(item.id);
        }
      }
    });

    // Auto-expand report menu if on report page
    if (location.pathname.startsWith('/report')) {
      newExpanded.add('report');
    }

    setExpandedMenus(newExpanded);
  }, [location.pathname]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string) => expandedMenus.has(id);

  // Check if any child is active
  const hasActiveChild = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some(
      (child) => child.path && location.pathname === child.path
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-[9999] bg-[var(--bg-secondary)] backdrop-blur-[16px] border-r border-[var(--border-color)] transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20 hover:w-72' : 'w-72'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 border-b border-[var(--border-color)]">
        <div className="flex items-center w-full justify-center">
          <img
            src={isCollapsed && !isHovered ? '/assets/datakelola/datakelola-mini.svg' : logoLong}
            alt="Logo"
            className={`${
              isCollapsed && !isHovered ? 'h-10 w-10' : 'h-12 w-[180px]'
            } transition-all duration-300 object-contain`}
          />
        </div>
      </div>

      {/* Menu Utama */}
      <div className="flex-1 overflow-y-auto py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)]">
        <nav className="px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                {/* Parent Menu - HANYA untuk toggle, TIDAK ADA LINK */}
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] transition-all duration-200 group border-2
                    ${hasActiveChild(item) ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'border-transparent hover:border-[#2563EB]'}
                    ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                  `}
                >
                  {item.icon && (
                    <i className={`bx ${item.icon} text-xl ${isCollapsed && !isHovered ? '' : ''}`} />
                  )}
                  <span className={`${isCollapsed && !isHovered ? 'hidden' : 'block'} text-left flex-1`}>
                    {item.label}
                  </span>
                </button>

                {/* Submenu - Hanya ini yang bisa routing */}
                <ul
                  className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                    isExpanded(item.id)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } ${isCollapsed && !isHovered ? 'hidden' : ''}`}
                >
                  {item.children?.map((child) => {
                    const isActive = child.path === location.pathname;
                    if (child.openInNewTab) {
                      return (
                        <li key={child.id}>
                          <a
                            href={child.path!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2
                              ${isActive 
                                ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                                : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                              }
                            `}
                          >
                            {child.label}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={child.id}>
                        <Link
                          to={child.path!}
                          className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2
                            ${isActive 
                              ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                              : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu Bawah (Report, Chat Group & Settings) - Tetap di bawah */}
      <div className="flex-shrink-0 border-t border-[var(--border-color)] py-2">
        <nav className="px-3">
          <ul className="space-y-1">
            {/* Report Menu */}
            <li>
              <button
                onClick={() => toggleMenu('report')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] transition-all duration-200 group border-2
                  ${location.pathname.startsWith('/report') ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'border-transparent hover:border-[#2563EB]'}
                  ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                `}
              >
                <i className={`bx bx-bar-chart-alt-2 text-xl`} />
                <span className={`${isCollapsed && !isHovered ? 'hidden' : 'block'} text-left flex-1`}>
                  Report
                </span>
              </button>
              <ul
                className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  isExpanded('report')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                } ${isCollapsed && !isHovered ? 'hidden' : ''}`}
              >
                <li>
                  <Link
                    to="/report/agent-productivity"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/agent-productivity' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Agent Productivity Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/article"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/article' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Reporting Article
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/blast-history"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/blast-history' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Blast History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/call-detail"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/call-detail' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Call Detail Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/daily-call-performance"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/daily-call-performance' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Daily Call Performance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/daily-call-report"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/daily-call-report' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Daily Call Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/omnichat"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/omnichat' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Reporting Omnichat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report/outbound"
                    className={`block pl-12 pr-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      location.pathname === '/report/outbound' 
                        ? 'bg-[#2563EB] text-white font-medium border-[#2563EB]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >
                    Reporting Transaksi Outbound
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/chat-group"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] transition-all border-2 ${
                  location.pathname === '/chat-group' 
                    ? 'bg-[#2563EB] text-white border-[#2563EB]' 
                    : 'border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                } ${isCollapsed && !isHovered ? 'justify-center' : ''}`}
              >
                <i className={`bx bx-group text-xl`} />
                <span className={`${isCollapsed && !isHovered ? 'hidden' : 'block'}`}>Chat Group</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-primary)] transition-all border-2 ${
                  location.pathname === '/settings' 
                    ? 'bg-[#2563EB] text-white border-[#2563EB]' 
                    : 'border-transparent hover:border-[#2563EB] hover:text-[#2563EB]'
                } ${isCollapsed && !isHovered ? 'justify-center' : ''}`}
              >
                <i className={`bx bx-cog text-xl`} />
                <span className={`${isCollapsed && !isHovered ? 'hidden' : 'block'}`}>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;