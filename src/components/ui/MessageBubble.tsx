import React from 'react';

export interface MessageBubbleProps {
  message: string;
  time: string;
  isAgent?: boolean;
  showReadIcon?: boolean;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  time,
  isAgent = false,
  showReadIcon = false,
  className = '',
}) => {
  return (
    <div className={`max-w-[70%] py-2.5 px-3.5 rounded-xl text-sm leading-snug relative ${
      isAgent 
        ? 'self-end bg-[var(--brand-primary)] text-white' 
        : 'self-start bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
    } ${className}`}>
      <div>{message}</div>
      <div className="text-[10px] text-[var(--text-tertiary)] mt-1 flex items-center gap-1">
        {time}
        {showReadIcon && <i className="bx bx-check w-3 h-3 text-[var(--text-tertiary)]"></i>}
      </div>
    </div>
  );
};

export default MessageBubble;

