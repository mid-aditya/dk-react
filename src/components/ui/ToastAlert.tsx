import React, { useEffect } from 'react';

export interface ToastAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastAlert: React.FC<ToastAlertProps> = ({
  isOpen,
  onClose,
  message,
  type = 'info',
  duration = 3000,
  position = 'top-right',
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: 'bx-check-circle',
      bgColor: 'bg-[#22c55e]',
      borderColor: 'border-[#22c55e]',
    },
    error: {
      icon: 'bx-x-circle',
      bgColor: 'bg-[#ef4444]',
      borderColor: 'border-[#ef4444]',
    },
    warning: {
      icon: 'bx-error',
      bgColor: 'bg-[#f59e0b]',
      borderColor: 'border-[#f59e0b]',
    },
    info: {
      icon: 'bx-info-circle',
      bgColor: 'bg-[#2563EB]',
      borderColor: 'border-[#2563EB]',
    },
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const style = typeStyles[type];

  return (
    <div className={`fixed ${positionClasses[position]} z-[10000] animate-[slideIn_0.3s_ease]`}>
      <div
        className={`${style.bgColor} text-white rounded-lg shadow-lg border ${style.borderColor} px-4 py-3 flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <i className={`bx ${style.icon} text-xl flex-shrink-0`}></i>
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <i className="bx bx-x text-lg"></i>
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: ${position.includes('right') ? 'translateX(100%)' : position.includes('left') ? 'translateX(-100%)' : 'translateY(-100%)'};
          }
          to {
            opacity: 1;
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ToastAlert;

