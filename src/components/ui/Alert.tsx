import React, { useEffect } from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type: AlertType;
  message: string;
  title?: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
  icon?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  title,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className = '',
  icon,
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const getDefaultIcon = (): string => {
    switch (type) {
      case 'success':
        return 'bx-check-circle';
      case 'info':
        return 'bx-info-circle';
      case 'warning':
        return 'bx-error-circle';
      case 'error':
        return 'bx-x-circle';
      default:
        return 'bx-info-circle';
    }
  };

  const iconClass = icon || getDefaultIcon();

  const alertStyles = {
    success: 'bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)] text-[var(--success-color)]',
    info: 'bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.3)] text-[var(--accent-color)]',
    warning: 'bg-[rgba(251,191,36,0.1)] border-[rgba(251,191,36,0.3)] text-[#f59e0b]',
    error: 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)] text-[var(--error-color)]',
  };

  return (
    <div 
      className={`flex items-start justify-between p-4 rounded-lg border gap-3 animate-[slideDown_0.3s_ease] ${alertStyles[type]} ${className}`} 
      role="alert"
      style={{
        animation: 'slideDown 0.3s ease',
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="flex items-start gap-3 flex-1">
        <i className={`bx ${iconClass} text-xl flex-shrink-0 mt-0.5`}></i>
        <div className="flex-1">
          {title && <div className="font-semibold text-sm mb-1">{title}</div>}
          <div className="text-sm leading-normal">{message}</div>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          className="bg-none border-none text-inherit text-xl cursor-pointer p-0 w-6 h-6 flex items-center justify-center flex-shrink-0 opacity-70 transition-opacity duration-200 rounded hover:opacity-100 hover:bg-[rgba(0,0,0,0.05)]"
          onClick={onClose}
          aria-label="Close alert"
        >
          <i className="bx bx-x"></i>
        </button>
      )}
    </div>
  );
};

export default Alert;

