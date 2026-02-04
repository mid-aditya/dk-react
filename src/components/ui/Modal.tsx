import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  footer,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'w-full max-w-[400px]',
    md: 'w-full max-w-[600px]',
    lg: 'w-full max-w-[800px]',
    xl: 'w-full max-w-[1200px]',
    full: 'w-full max-w-[95vw] max-h-[95vh]',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-6 animate-[fadeIn_0.2s_ease] md:p-6" 
        onClick={handleOverlayClick}
      >
        <div 
          className={`bg-[var(--bg-secondary)] rounded-xl shadow-[0_20px_60px_var(--shadow)] flex flex-col max-h-[90vh] animate-[slideUp_0.3s_ease] border border-[var(--border-color)] ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between py-5 px-6 border-b border-[var(--border-color)] md:py-5 md:px-6">
              {title && <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">{title}</h2>}
              {showCloseButton && (
                <button
                  type="button"
                  className="bg-none border-none text-[var(--text-secondary)] text-2xl cursor-pointer p-1 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <i className="bx bx-x"></i>
                </button>
              )}
            </div>
          )}

          <div className="p-6 overflow-y-auto flex-1 text-[var(--text-primary)] md:p-6">{children}</div>

          {footer && <div className="py-4 px-6 border-t border-[var(--border-color)] flex justify-end gap-3 md:py-4 md:px-6">{footer}</div>}
        </div>
      </div>
    </>
  );
};

export default Modal;

