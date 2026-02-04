import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = true,
  label,
  size = 'md',
  color = 'primary',
  animated = false,
  striped = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-[var(--accent-color)]',
    success: 'bg-[var(--success-color)]',
    warning: 'bg-[#f59e0b]',
    error: 'bg-[var(--error-color)]',
  };

  const stripedStyle = striped ? {
    backgroundImage: `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    )`,
    backgroundSize: '1rem 1rem',
  } : {};

  return (
    <>
      <style>{`
        @keyframes progressAnimation {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        @keyframes progressStripe {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      `}</style>
      <div className={`w-full ${className}`}>
        {showLabel && (
          <div className="flex justify-between items-center mb-2 text-sm text-[var(--text-secondary)]">
            <span>{label || `${Math.round(percentage)}%`}</span>
            {label && <span>{Math.round(percentage)}%</span>}
          </div>
        )}
        <div className={`w-full bg-[var(--bg-tertiary)] rounded-lg overflow-hidden relative ${sizeClasses[size]}`}>
          <div
            className={`h-full rounded-lg transition-[width] duration-300 relative overflow-hidden ${colorClasses[color]} ${
              animated ? 'animate-[progressAnimation_1s_linear_infinite]' : ''
            } ${animated && striped ? 'animate-[progressAnimation_1s_linear_infinite,progressStripe_1s_linear_infinite]' : ''}`}
            style={{ width: `${percentage}%`, ...stripedStyle }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            {striped && <div className="progress-bar-stripe"></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;

