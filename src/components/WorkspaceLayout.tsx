import React, { useState } from 'react';
import Header from './ui/Header';
import Sidebar from './ui/Sidebar';
import QuickAccess from './ui/QuickAccess';
import Notification from './ui/Notification';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(80);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleSidebarToggle = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
    setSidebarWidth(isCollapsed ? 80 : 288);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative flex flex-col">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <div 
        className="fixed top-0 right-0 z-[100] transition-[left,width] duration-300 ease-in-out box-border"
        style={{ 
          left: `${sidebarWidth}px`,
          width: `calc(100vw - ${sidebarWidth}px)`,
          maxWidth: `calc(100vw - ${sidebarWidth}px)`,
          '--sidebar-width': `${sidebarWidth}px`
        } as React.CSSProperties & { '--sidebar-width': string }}
      >
        <Header sidebarWidth={sidebarWidth} />
      </div>
      <div
        className="flex flex-1 mt-16 transition-[margin-left,width] duration-300 ease-in-out overflow-hidden min-w-0 box-border"
        style={{ 
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100vw - ${sidebarWidth}px)`,
          maxWidth: `calc(100vw - ${sidebarWidth}px)`,
          '--sidebar-width': `${sidebarWidth}px`
        } as React.CSSProperties & { '--sidebar-width': string }}
      >
        <main className="w-full h-full overflow-hidden flex flex-col relative min-w-0">
          {children}
        </main>
      </div>
      <QuickAccess />
      <Notification />
    </div>
  );
};

export default WorkspaceLayout;
