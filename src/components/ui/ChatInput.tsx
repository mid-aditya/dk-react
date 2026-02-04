import React, { useEffect, useRef, useState } from 'react';

export interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string, files: File[]) => void;
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  showAttachButton?: boolean;
  showPlusButton?: boolean;
  enableDragDrop?: boolean;
  containerClassName?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = 'Type Message (Shift + Enter for new line)',
  onSend,
  onFileSelect,
  accept = 'image/*,video/*,.pdf,.doc,.docx',
  showAttachButton = true,
  showPlusButton = true,
  enableDragDrop = true,
  containerClassName = '',
}) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleDragEnter = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || 
      file.type.startsWith('video/') || 
      file.type.startsWith('application/')
    );
    
    if (validFiles.length > 0) {
      setAttachedFiles(prev => [...prev, ...validFiles]);
      if (onFileSelect) {
        onFileSelect([...attachedFiles, ...validFiles]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => {
        const newFiles = [...prev, ...files];
        if (onFileSelect) {
          onFileSelect(newFiles);
        }
        return newFiles;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachedFiles.length > 0) {
      if (onSend) {
        onSend(message, attachedFiles);
      }
      setMessage('');
      setAttachedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (onFileSelect) {
        onFileSelect(newFiles);
      }
      return newFiles;
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return 'bx-image';
    if (file.type.startsWith('video/')) return 'bx-video';
    return 'bx-file';
  };

  return (
    <div 
      className={`px-5 pt-0 pb-4 bg-transparent backdrop-blur-[16px] flex-shrink-0 relative ${isDragging ? 'bg-[rgba(59,130,246,0.05)]' : ''} ${containerClassName}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <>
          <div className="absolute inset-0 bg-[rgba(59,130,246,0.1)] border-2 border-dashed border-[var(--accent-color)] rounded-lg z-[100] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--accent-color)] text-lg font-medium z-[101] pointer-events-none text-center">
            Drop files here to upload
          </div>
        </>
      )}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 p-2 bg-[var(--bg-tertiary)] rounded-lg max-h-[120px] overflow-y-auto">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 py-1.5 px-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-xs text-[var(--text-primary)]">
              <i className={`bx ${getFileIcon(file)} text-base text-[var(--accent-color)]`}></i>
              <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</span>
              <button 
                className="bg-none border-none text-[var(--text-secondary)] cursor-pointer p-0 w-4 h-4 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--error-color)]"
                onClick={() => removeFile(index)}
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-3xl py-2 px-4 relative">
        {/* {showAttachButton && (
          <button 
            className="w-6 h-6 text-[var(--text-secondary)] cursor-pointer flex-shrink-0 bg-none border-none flex items-center justify-center rounded transition-all duration-200 p-0 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
            type="button"
          >
            <i className="bx bx-paperclip text-base"></i>
          </button>
        )} */}
        {showPlusButton && (
          <button 
            className="w-6 h-6 text-[var(--text-secondary)] cursor-pointer flex-shrink-0 bg-none border-none flex items-center justify-center rounded transition-all duration-200 p-0 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]"
            onClick={() => fileInputRef.current?.click()}
            title="Add file"
            type="button"
          >
            <i className="bx bx-plus text-base"></i>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <textarea 
          ref={textareaRef}
          className="flex-1 border-none bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm outline-none py-1 px-0 resize-none min-h-[24px] max-h-[120px] overflow-y-auto font-inherit leading-relaxed placeholder:text-[var(--text-tertiary)] placeholder:opacity-60 placeholder:font-normal" 
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button 
          className="w-6 h-6 text-[var(--accent-color)] cursor-pointer flex-shrink-0 bg-none border-none flex items-center justify-center rounded transition-all duration-200 p-0 hover:bg-[var(--bg-secondary)] hover:scale-110 active:scale-95"
          onClick={handleSendMessage}
          title="Send message"
          type="button"
          disabled={!message.trim() && attachedFiles.length === 0}
        >
          <i className="bx bx-send text-base"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

