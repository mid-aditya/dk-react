import React, { useState } from 'react';

export type ThemeType = 'blue-theme' | 'red-theme' | 'green-theme';

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'blue-theme', name: 'FIFGROUP', color: '#2563EB', icon: 'bx-shield' },
    { id: 'red-theme', name: 'DANANTRA', color: '#dc2626', icon: 'bx-bolt-circle' },
    { id: 'green-theme', name: 'AMITRA', color: '#10b981', icon: 'bx-leaf' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onThemeChange(theme.id as ThemeType);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border-none cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${
                currentTheme === theme.id 
                  ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold ring-1 ring-[var(--brand-primary)]' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: theme.color }}
              />
              <span className="text-xs uppercase tracking-wider">{theme.name}</span>
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[var(--brand-primary)] text-white shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-90 border-none group relative overflow-hidden"
        title="Change Theme"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <i className={`bx ${isOpen ? 'bx-x' : 'bx-palette'} text-2xl transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Backdrop to close menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1] cursor-default" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
