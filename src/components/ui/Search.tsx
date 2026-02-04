import React, { useState } from 'react';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  debounce?: number;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  className = '',
  size = 'md',
  showIcon = true,
  debounce = 300,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-3 text-[13px]',
    md: 'py-2.5 pl-10 pr-3 text-sm',
    lg: 'py-3 pl-11 pr-4 text-base',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4 left-3',
    md: 'w-4 h-4 left-3',
    lg: 'w-5 h-5 left-4',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);

    if (onSearch && debounce > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        onSearch(newValue);
      }, debounce);
      setDebounceTimer(timer);
    } else if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {showIcon && (
        <i className={`bx bx-search absolute top-1/2 -translate-y-1/2 ${iconSizeClasses[size]} text-[var(--text-tertiary)] pointer-events-none`}></i>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${sizeClasses[size]} border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)] placeholder:text-[var(--text-tertiary)]`}
      />
    </div>
  );
};

export default Search;

