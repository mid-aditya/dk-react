import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    onChange?.(formattedDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] cursor-pointer flex items-center justify-between gap-2 transition-all duration-200 hover:border-[var(--accent-color)] hover:bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? "border-[var(--accent-color)]" : ""
        }`}
      >
        <span className={value ? "" : "text-[var(--text-tertiary)]"}>
          {value ? formatDate(new Date(value)) : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-[var(--text-secondary)]" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg p-4 min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-[var(--text-secondary)] text-center py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isTodayDate = isToday(date);
              const isSelectedDate = isSelected(date);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  className={`aspect-square text-sm rounded transition-colors ${
                    isSelectedDate
                      ? "bg-[var(--accent-color)] text-white font-semibold"
                      : isTodayDate
                      ? "bg-[var(--accent-color)]/20 text-[var(--accent-color)] font-semibold"
                      : "hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
