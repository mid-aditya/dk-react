import { LucideIcon } from "lucide-react";
import React from "react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "edit" | "delete" | "info" | "primary" | "success" | "warning" | "error";
  title?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = "primary",
  title,
  className = "",
  disabled = false,
  size = "md",
}) => {
  const variantClasses = {
    edit: "bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white",
    delete: "bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white",
    info: "bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white",
    primary: "bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white",
    success: "bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white",
    warning: "bg-[var(--warning-color)] hover:bg-[var(--warning-color)]/90 text-white",
    error: "bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white",
  };

  const sizeClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={title}
    >
      <Icon className={iconSizeClasses[size]} />
    </button>
  );
};

export default IconButton;

