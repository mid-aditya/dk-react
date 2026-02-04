import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisible = 5,
  className = '',
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`flex justify-center items-center ${className}`} aria-label="Pagination">
      <ul className="flex items-center gap-1 list-none p-0 m-0">
        {showFirstLast && (
          <li>
            <button
              className="min-w-[40px] h-10 py-2 px-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <i className="bx bx-chevrons-left"></i>
            </button>
          </li>
        )}
        
        <li>
          <button
            className="min-w-[40px] h-10 py-2 px-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <i className="bx bx-chevron-left"></i>
          </button>
        </li>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} className="py-2 px-1 text-[var(--text-tertiary)]">
                <span>...</span>
              </li>
            );
          }

          const pageNum = page as number;
          return (
            <li key={pageNum}>
              <button
                className={`min-w-[40px] h-10 py-2 px-3 border rounded-lg text-sm cursor-pointer flex items-center justify-center transition-all duration-200 ${
                  currentPage === pageNum
                    ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white font-semibold'
                    : 'bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]'
                }`}
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className="min-w-[40px] h-10 py-2 px-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </li>

        {showFirstLast && (
          <li>
            <button
              className="min-w-[40px] h-10 py-2 px-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <i className="bx bx-chevrons-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

