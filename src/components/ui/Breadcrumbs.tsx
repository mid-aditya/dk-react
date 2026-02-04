import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className = '',
}) => {
  return (
    <nav className={`flex items-center ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center list-none p-0 m-0 flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-1">
              {isLast ? (
                <span className="flex items-center gap-1.5 py-1 px-2 text-[var(--text-primary)] text-sm font-medium">
                  {item.icon && <i className={item.icon}></i>}
                  {item.label}
                </span>
              ) : item.path ? (
                <Link to={item.path} className="flex items-center gap-1.5 py-1 px-2 text-[var(--text-secondary)] no-underline text-sm rounded transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-[var(--bg-tertiary)]">
                  {item.icon && <i className={item.icon}></i>}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 py-1 px-2 text-[var(--text-secondary)] text-sm rounded transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-[var(--bg-tertiary)]">
                  {item.icon && <i className={item.icon}></i>}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-[var(--text-tertiary)] text-sm mx-1 flex items-center">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

