import {
    Calendar as CalendarIcon,
    Filter,
} from "lucide-react";
import React, { useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Calendar from "../../components/ui/Calendar";

const Article: React.FC = () => {
  // Get today's date as default
  const today = new Date().toISOString().split("T")[0];
  
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For now, always show no data message
      // In real app, this would fetch data from API
      setHasData(false);
      setIsLoading(false);
    }, 500);
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
              {/* Filter Form */}
              <div className="mb-6">
                <form method="get" onSubmit={handleFilter}>
                  <div className="flex flex-wrap gap-4 items-end">
                    {/* Start Date */}
                    <div className="flex-1 min-w-[200px]">
                      <label
                        htmlFor="start_date"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Start Date
                      </label>
                      <Calendar
                        value={startDate}
                        onChange={(value) => setStartDate(value)}
                        placeholder="Select start date"
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex-1 min-w-[200px]">
                      <label
                        htmlFor="end_date"
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        End Date
                      </label>
                      <Calendar
                        value={endDate}
                        onChange={(value) => setEndDate(value)}
                        placeholder="Select end date"
                      />
                    </div>

                    {/* Filter Button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white font-medium rounded-xl px-6 py-2.5 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Filter className="w-5 h-5 mr-2" />
                        {isLoading ? "Memproses..." : "Filter"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Data Display Area */}
              <div className="overflow-x-auto">
                {hasData ? (
                  <div className="text-center text-[var(--text-secondary)] py-10">
                    {/* Table or data display would go here */}
                    <p>Data akan ditampilkan di sini</p>
                  </div>
                ) : (
                  <div className="text-center text-[var(--text-secondary)] py-10">
                    <p>
                      Tidak ada data laporan penggunaan artikel untuk rentang tanggal yang dipilih.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Article;
