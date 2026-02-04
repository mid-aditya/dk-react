import React from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T, index: number) => void;
  className?: string;
  emptyMessage?: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  className = '',
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`sticky top-0 z-20 px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] shadow-sm ${
                  column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                }`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item, index)}
                className={`border-b border-[var(--border-color)] transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[var(--bg-tertiary)]' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-sm text-[var(--text-primary)] ${
                      column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                    }`}
                  >
                    {column.render ? column.render(item, index) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

