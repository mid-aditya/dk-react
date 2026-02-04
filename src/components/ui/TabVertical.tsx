import React from 'react';

export interface TabVerticalItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

interface TabVerticalProps {
  items: TabVerticalItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabVertical: React.FC<TabVerticalProps> = ({
  items,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.disabled && onTabChange(item.id)}
          disabled={item.disabled}
          className={`w-full py-3 px-4 text-left bg-none border-none text-sm cursor-pointer transition-all duration-200 flex items-center gap-3 rounded-lg ${
            activeTab === item.id
              ? 'bg-[#2563EB] text-white'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
          } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {item.icon && <i className={`bx ${item.icon} text-lg`}></i>}
          <span className="flex-1">{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center ${
                activeTab === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
              }`}
            >
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabVertical;

