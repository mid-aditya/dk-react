import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  onChange,
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-xs',
    md: 'py-3 px-4 text-sm',
    lg: 'py-4 px-5 text-base',
  };

  return (
    <>
      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className={`relative w-full ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} ref={dropdownRef}>
        <button
          type="button"
          className={`w-full ${sizeClasses[size]} bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] cursor-pointer flex items-center justify-between gap-2 transition-all duration-200 hover:border-[var(--accent-color)] hover:bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="flex items-center gap-2 flex-1 text-left">
            {selectedOption ? (
              <>
                {selectedOption.icon && <i className={selectedOption.icon}></i>}
                {selectedOption.label}
              </>
            ) : (
              <span className="text-[var(--text-tertiary)]">{placeholder}</span>
            )}
          </span>
          <i className={`bx bx-chevron-down text-xl transition-transform duration-200 text-[var(--text-secondary)] ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-[0_4px_12px_var(--shadow)] z-[1000] max-h-[300px] overflow-y-auto animate-[dropdownFadeIn_0.2s_ease]">
            {options.length === 0 ? (
              <div className="p-4 text-center text-[var(--text-secondary)] text-sm">No options available</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full py-3 px-4 bg-none border-none text-[var(--text-primary)] text-sm cursor-pointer flex items-center gap-2 transition-colors duration-200 text-left ${
                    option.value === value 
                      ? 'bg-[rgba(59,130,246,0.1)] text-[var(--accent-color)]' 
                      : 'hover:bg-[var(--bg-tertiary)]'
                  } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                >
                  {option.icon && <i className={option.icon}></i>}
                  <span className="flex-1">{option.label}</span>
                  {option.value === value && <i className="bx bx-check"></i>}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;

