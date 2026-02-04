import React from 'react';

export interface PopupAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

const PopupAlert: React.FC<PopupAlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showCancel = false,
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: 'bx-check-circle',
      iconColor: 'text-[#22c55e]',
      bgColor: 'bg-[#22c55e]/10',
    },
    error: {
      icon: 'bx-x-circle',
      iconColor: 'text-[#ef4444]',
      bgColor: 'bg-[#ef4444]/10',
    },
    warning: {
      icon: 'bx-error',
      iconColor: 'text-[#f59e0b]',
      bgColor: 'bg-[#f59e0b]/10',
    },
    info: {
      icon: 'bx-info-circle',
      iconColor: 'text-[#2563EB]',
      bgColor: 'bg-[#2563EB]/10',
    },
  };

  const style = typeStyles[type];

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--bg-secondary)] rounded-lg shadow-xl max-w-md w-full mx-4 border border-[var(--border-color)]">
        <div className="p-6">
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${style.bgColor} mx-auto mb-4`}>
            <i className={`bx ${style.icon} text-3xl ${style.iconColor}`}></i>
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] text-center mb-2">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] text-center mb-6">{message}</p>
          <div className="flex gap-3 justify-center">
            {showCancel && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                type === 'success'
                  ? 'bg-[#22c55e] hover:bg-[#16a34a]'
                  : type === 'error'
                  ? 'bg-[#ef4444] hover:bg-[#dc2626]'
                  : type === 'warning'
                  ? 'bg-[#f59e0b] hover:bg-[#d97706]'
                  : 'bg-[#2563EB] hover:bg-[#1d4ed8]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;

