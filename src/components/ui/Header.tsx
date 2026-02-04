import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface User {
  name: string;
  company: string;
  role: string;
  avatar?: string;
  channels?: Array<{
    name: string;
    icon: string;
  }>;
}

interface HeaderProps {
  user?: User;
  sidebarWidth?: number;
}

// Page title and description mapping
const pageInfo: Record<string, { title: string; description: string }> = {
  '/omnichat': { title: 'Omnichat', description: 'Manage your omnichannel conversations' },
  '/comment': { title: 'Comments Interaction', description: 'Manage social media comments' },
  '/inbound': { title: 'Inbound Call', description: 'Manage incoming calls' },
  '/outbound': { title: 'Outbound Call', description: 'Manage outbound calls and campaigns' },
  '/email': { title: 'Inbox', description: 'Manage your email communications' },
  '/email/compose': { title: 'Compose Email', description: 'Create and send a new email' },
  '/email/draft': { title: 'Draft', description: 'View and manage your draft emails' },
  '/email/sent': { title: 'Sent', description: 'View your sent emails' },
  '/email/history': { title: 'History', description: 'View your email history' },
  '/settings': { title: 'Settings', description: 'Manage your application settings and configurations' },
};

const Header: React.FC<HeaderProps> = ({ user, sidebarWidth = 80 }) => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Get page info based on current route
  const currentPageInfo = pageInfo[location.pathname] || { title: '', description: '' };

  // Default user data for demo
  const defaultUser: User = {
    name: 'John Doe',
    company: 'Company Name',
    role: 'Admin',
    avatar: '/assets/icons/profile.png',
    channels: [],
  };

  const currentUser = user || defaultUser;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit profile clicked');
  };

  const handleLogs = () => {
    // Handle logs logic here
    console.log('Logs clicked');
  };

  const handleAux = () => {
    // Handle AUX logic here
    console.log('AUX clicked');
  };

  return (
    <>
      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <header 
        className="fixed top-0 right-0 h-16 z-[9998] bg-[var(--bg-secondary)] backdrop-blur-[16px] border-b border-[var(--border-color)] transition-[left] duration-300 md:left-0" 
        style={{ left: `${sidebarWidth}px` }}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Left side - Page title and description */}
          <div className="flex-1 flex items-center">
            {currentPageInfo.title && (
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[var(--text-primary)] m-0 mb-1 leading-tight">{currentPageInfo.title}</h1>
                {currentPageInfo.description && (
                  <p className="text-sm text-[var(--text-secondary)] m-0 leading-snug">{currentPageInfo.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Right side - Theme toggle and User profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                className="flex items-center gap-3 py-2 px-3 bg-none border-none rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-tertiary)]"
                onClick={toggleProfileMenu}
                aria-label="User menu"
              >
                <div className="relative flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-[var(--border-color)]"
                    src={currentUser.avatar || '/assets/images/users/avatar-1.jpg'}
                    alt={currentUser.name}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-secondary)] ${
                      true ? 'bg-[var(--success-color)]' : 'bg-[var(--text-tertiary)]'
                    }`}
                  ></span>
                </div>
                <div className="hidden md:flex flex-col items-start min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis">{currentUser.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis">{currentUser.company}</p>
                </div>
                <i
                  className={`fas fa-chevron-down text-xs text-[var(--text-secondary)] transition-transform duration-200 flex-shrink-0 ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                ></i>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--bg-secondary)] rounded-lg shadow-[0_10px_25px_var(--shadow)] p-4 animate-[dropdownFadeIn_0.2s_ease-out] border border-[var(--border-color)] md:w-[280px] md:right-[-10px]">
                  <div className="pb-3 border-b border-[var(--border-color)] mb-3">
                    <h6 className="text-sm font-medium text-[var(--text-primary)] m-0 mb-1">{currentUser.name}</h6>
                    <p className="text-xs text-[var(--text-secondary)] m-0 mb-1">{currentUser.company}</p>
                    <p className="text-xs text-[var(--accent-color)] font-medium m-0">Role: {currentUser.role}</p>

                    {/* Assigned Channels Section */}
                    {currentUser.channels && currentUser.channels.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                        <p className="text-xs text-[var(--text-secondary)] m-0 mb-2">Assigned Channels:</p>
                        <div className="flex flex-wrap gap-2">
                          {currentUser.channels.map((channel, index) => (
                            <img
                              key={index}
                              src={channel.icon || '/assets/images/icons/user.png'}
                              className="w-6 h-6 object-contain"
                              alt={channel.name}
                              title={channel.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center w-full py-2.5 px-3 bg-none border-none rounded-md cursor-pointer transition-all duration-200 text-[var(--text-primary)] text-left hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-color)] group"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-sm transition-colors duration-200 bg-[rgba(59,130,246,0.1)] text-[rgb(96,165,250)] group-hover:bg-[rgba(59,130,246,0.2)]">
                        <i className="fas fa-user-edit"></i>
                      </div>
                      <span className="flex-1 text-sm font-medium">Edit Profile</span>
                      <i className="fas fa-chevron-right text-xs text-[var(--text-tertiary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></i>
                    </button>

                    <button 
                      onClick={handleLogs} 
                      className="flex items-center w-full py-2.5 px-3 bg-none border-none rounded-md cursor-pointer transition-all duration-200 text-[var(--text-primary)] text-left hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-color)] group"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-sm transition-colors duration-200 bg-[rgba(59,130,246,0.1)] text-[rgb(96,165,250)] group-hover:bg-[rgba(59,130,246,0.2)]">
                        <i className="fas fa-history"></i>
                      </div>
                      <span className="flex-1 text-sm font-medium">Logs</span>
                      <i className="fas fa-chevron-right text-xs text-[var(--text-tertiary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></i>
                    </button>

                    <button 
                      onClick={handleAux} 
                      className="flex items-center w-full py-2.5 px-3 bg-none border-none rounded-md cursor-pointer transition-all duration-200 text-[var(--text-primary)] text-left hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-color)] group"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-sm transition-colors duration-200 bg-[rgba(34,197,94,0.1)] text-[rgb(74,222,128)] group-hover:bg-[rgba(34,197,94,0.2)]">
                        <i className="fas fa-cog"></i>
                      </div>
                      <span className="flex-1 text-sm font-medium">AUX</span>
                      <i className="fas fa-chevron-right text-xs text-[var(--text-tertiary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></i>
                    </button>

                    <div className="h-px bg-[var(--border-color)] my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full py-2.5 px-3 bg-none border-none rounded-md cursor-pointer transition-all duration-200 text-[var(--error-color)] text-left hover:bg-[rgba(239,68,68,0.1)] group"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-sm transition-colors duration-200 bg-[rgba(239,68,68,0.1)] text-[rgb(248,113,113)] group-hover:bg-[rgba(239,68,68,0.2)]">
                        <i className="fas fa-sign-out-alt"></i>
                      </div>
                      <span className="flex-1 text-sm font-medium">Logout</span>
                      <i className="fas fa-chevron-right text-xs text-[var(--text-tertiary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

