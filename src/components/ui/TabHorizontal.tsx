import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

interface TabHorizontalProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabHorizontal: React.FC<TabHorizontalProps> = ({
  items,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div className={`flex gap-px bg-[var(--bg-secondary)] p-2 rounded-lg ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.disabled && onTabChange(item.id)}
          disabled={item.disabled}
          className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 font-medium rounded-md ${
            activeTab === item.id
              ? 'text-white bg-[#2563EB] dark:bg-[#1E40AF]'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
          } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {item.icon && <i className={`bx ${item.icon} text-xs`}></i>}
          <span>{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabHorizontal;

