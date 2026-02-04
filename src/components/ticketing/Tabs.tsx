import React from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showUserJourneys?: boolean;
  showBaseKnowledge?: boolean;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, showUserJourneys = false, showBaseKnowledge = false }) => {
  return (
    <div className="flex gap-px bg-[var(--bg-secondary)] py-2.5 px-5 rounded-lg">
      {showUserJourneys && (
        <button 
          className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center font-medium rounded-md ${
            activeTab === 'user-journeys' 
              ? 'text-white bg-[var(--brand-primary)]' 
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
          }`}
          onClick={() => onTabChange('user-journeys')}
        >
          User Journeys
        </button>
      )}
      {showBaseKnowledge && (
        <button 
          className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center font-medium rounded-md ${
            activeTab === 'base-knowledge' 
              ? 'text-white bg-[var(--brand-primary)]' 
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
          }`}
          onClick={() => onTabChange('base-knowledge')}
        >
          Base Knowledge
        </button>
      )}
      <button 
        className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center font-medium rounded-md ${
          activeTab === 'overview' 
            ? 'text-white bg-[var(--brand-primary)]' 
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
        }`}
        onClick={() => onTabChange('overview')}
      >
        Overview
      </button>
      <button 
        className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center font-medium rounded-md ${
          activeTab === 'end-chat' 
            ? 'text-white bg-[var(--brand-primary)]' 
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
        }`}
        onClick={() => onTabChange('end-chat')}
      >
        End Chat Ticket
      </button>
      <button 
        className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center font-medium rounded-md ${
          activeTab === 'history' 
            ? 'text-white bg-[var(--brand-primary)]' 
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
        }`}
        onClick={() => onTabChange('history')}
      >
        History
      </button>
    </div>
  );
};

export default Tabs;

