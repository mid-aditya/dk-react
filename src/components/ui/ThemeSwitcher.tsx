import React, { useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export type ThemeType = 'blue-theme' | 'red-theme' | 'green-theme';

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: mode, toggleTheme } = useTheme();

  // Dragging state
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
     // Only drag if clicking the main button (not the menu items)
     // However, the event listener is on the container...
     // Ideally we put the handler on the button, but we move the whole container.
     // Let's put the handler on the main button specifically?
     // No, the user wants the whole thing to float/move?
     // Actually, if we move the container, the menu moves with it. Correct.
     
     // We only want to initiate drag from the main button, to avoid issues clicking menu items?
     // But wait, the main button sends onClick to toggle menu. 
     // We need to distinguish click vs drag.
  };

  // Simplified Drag Implementation
  // We will attach pointer events to the main button wrapper.
  
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = false;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    
    const onPointerMove = (moveEvent: PointerEvent) => {
       isDragging.current = true;
       // We can add a threshold here if needed (e.g. > 5px move)
       const newX = moveEvent.clientX - dragStart.current.x;
       const newY = moveEvent.clientY - dragStart.current.y;
       setPosition({ x: newX, y: newY });
    };
    
    const onPointerUp = () => {
       document.removeEventListener('pointermove', onPointerMove);
       document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
        e.stopPropagation();
        return; // It was a drag, so don't toggle menu
    }
    setIsOpen(!isOpen);
  };

  const themes = [
    { id: 'blue-theme', name: 'FIFGROUP', color: '#2563EB', icon: 'bx-shield' },
    { id: 'red-theme', name: 'DANANTRA', color: '#dc2626', icon: 'bx-bolt-circle' },
    { id: 'green-theme', name: 'AMITRA', color: '#10b981', icon: 'bx-leaf' },
  ];

  return (
    <div 
        className="fixed z-[9999] flex flex-col items-end gap-3"
        style={{ left: position.x, top: position.y, touchAction: 'none' }}
    >
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200 absolute bottom-16 right-0 items-end">
           {/* Light/Dark Toggle */}
           <button
              onClick={() => { toggleTheme(); setIsOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border-none cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]`}
            >
              <i className={`bx ${mode === 'light' ? 'bx-moon' : 'bx-sun'} text-lg`}></i>
              <span className="text-xs uppercase tracking-wider">{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            
            <div className="h-px w-full bg-[var(--border-color)] my-1"></div>

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
        onPointerDown={onPointerDown}
        onClick={handleMainClick}
        className="w-14 h-14 rounded-full bg-[var(--brand-primary)] text-white shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 hover:rotate-12 hover:scale-110 border-none group relative overflow-hidden"
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
