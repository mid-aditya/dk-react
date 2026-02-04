import React, { useState } from 'react';
import Header from './ui/Header';
import Sidebar from './ui/Sidebar';
import QuickAccess from './ui/QuickAccess';
import Notification from './ui/Notification';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(80);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleSidebarToggle = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
    setSidebarWidth(isCollapsed ? 80 : 288);
  };

  return (
    <div className="w-full min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <Header sidebarWidth={sidebarWidth} />
      <main 
        className="min-h-[calc(100vh-64px)] mt-16 transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
      <QuickAccess />
      <Notification />
    </div>
  );
};

export default Layout;
