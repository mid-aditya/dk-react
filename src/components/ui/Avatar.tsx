import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  badge?: number;
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  badge,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  const statusColors = {
    online: 'bg-[#22c55e]',
    offline: 'bg-[var(--bg-tertiary)]',
    away: 'bg-[#f59e0b]',
    busy: 'bg-[#ef4444]',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getInitialsColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-[#667eea] to-[#764ba2]',
      'bg-gradient-to-br from-[#f093fb] to-[#f5576c]',
      'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
      'bg-gradient-to-br from-[#43e97b] to-[#38f9d7]',
      'bg-gradient-to-br from-[#fa709a] to-[#fee140]',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${
        shape === 'circle' ? 'rounded-full' : 'rounded-lg'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          className={`w-full h-full ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'} object-cover`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full h-full ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'} flex items-center justify-center text-white font-semibold ${
            name ? getInitialsColor(name) : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
          }`}
        >
          {name ? getInitials(name) : <i className="bx bx-user"></i>}
        </div>
      )}
      {status && (
        <span
          className={`absolute ${shape === 'circle' ? 'bottom-0 right-0' : 'bottom-0 right-0'} ${statusSizeClasses[size]} ${statusColors[status]} ${
            shape === 'circle' ? 'rounded-full' : 'rounded'
          } border-2 border-[var(--bg-secondary)]`}
        />
      )}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );
};

export default Avatar;

