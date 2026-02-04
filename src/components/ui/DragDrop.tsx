import React, { useState, useRef, DragEvent } from 'react';

interface DragDropProps {
  onFilesDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const DragDrop: React.FC<DragDropProps> = ({
  onFilesDrop,
  accept,
  multiple = true,
  maxSize,
  className = '',
  children,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    validateAndProcessFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      validateAndProcessFiles(files);
    }
  };

  const validateAndProcessFiles = (files: File[]) => {
    setError(null);

    if (!multiple && files.length > 1) {
      setError('Only one file is allowed');
      return;
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const invalidFiles = files.filter(file => {
        return !acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type.replace('*', '.*'));
        });
      });

      if (invalidFiles.length > 0) {
        setError(`Invalid file type. Accepted: ${accept}`);
        return;
      }
    }

    if (maxSize) {
      const oversizedFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setError(`File size exceeds ${maxSize}MB limit`);
        return;
      }
    }

    onFilesDrop(files);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragging
            ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10'
            : 'border-[var(--border-color)] hover:border-[var(--accent-color)] hover:bg-[var(--bg-tertiary)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        {children || (
          <div>
            <i className="bx bx-cloud-upload text-4xl text-[var(--text-secondary)] mb-2"></i>
            <p className="text-sm text-[var(--text-primary)] mb-1">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">
              {accept && `Accepted: ${accept}`}
              {maxSize && ` • Max size: ${maxSize}MB`}
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 text-sm text-[var(--error-color)]">{error}</div>
      )}
    </div>
  );
};

export default DragDrop;

