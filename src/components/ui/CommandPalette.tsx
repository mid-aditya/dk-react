import React, { useState, useEffect, useRef } from 'react';

export interface Command {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  group?: string;
  action: () => void;
}

interface CommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
  trigger?: string;
  placeholder?: string;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  commands,
  isOpen,
  onClose,
  trigger = 'Ctrl+K',
  placeholder = 'Type a command or search...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.group?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    const group = cmd.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled by parent component
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-start justify-center pt-[10vh] animate-[fadeIn_0.2s_ease]" 
        onClick={onClose}
      >
        <div 
          className="w-full max-w-[640px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-[0_20px_60px_var(--shadow)] overflow-hidden animate-[slideDown_0.2s_ease]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
            <i className="bx bx-search text-xl text-[var(--text-secondary)]"></i>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-none border-none text-[var(--text-primary)] text-base outline-none placeholder:text-[var(--text-tertiary)]"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
            />
            <kbd className="py-1 px-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-mono text-[var(--text-secondary)]">{trigger}</kbd>
          </div>

          <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-12 px-6 text-center text-[var(--text-secondary)]">
                <i className="bx bx-search-alt text-5xl mb-4 opacity-50"></i>
                <p className="m-0 text-sm">No commands found</p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([group, groupCommands]) => (
                <div key={group} className="mb-4 last:mb-0">
                  <div className="py-2 px-3 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">{group}</div>
                  {groupCommands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    return (
                      <button
                        key={command.id}
                        data-index={globalIndex}
                        className={`w-full py-3 px-3 bg-none border-none rounded-lg text-[var(--text-primary)] text-sm cursor-pointer flex items-center gap-3 text-left transition-colors duration-200 ${
                          selectedIndex === globalIndex ? 'bg-[var(--bg-tertiary)]' : 'hover:bg-[var(--bg-tertiary)]'
                        }`}
                        onClick={() => {
                          command.action();
                          onClose();
                        }}
                      >
                        {command.icon && <i className={command.icon}></i>}
                        <span className="flex-1">{command.label}</span>
                        {command.shortcut && (
                          <kbd className="py-0.5 px-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[11px] font-mono text-[var(--text-secondary)]">{command.shortcut}</kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;

