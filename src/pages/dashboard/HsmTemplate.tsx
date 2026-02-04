import { Eye, Filter, RotateCw, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../components/ui/Dropdown";

interface HsmTemplate {
  id: number;
  namaKampanye: string;
  cabang: string;
  targetAudiens: string;
  tanggalKirim: string;
  status: "Pending" | "Approved" | "Rejected";
  dibuatOleh: string;
  tanggalDibuat: string;
}

const HsmTemplate: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data based on reference
  const allTemplates: HsmTemplate[] = [
    {
      id: 1,
      namaKampanye: "Promo Akhir Tahun 2025",
      cabang: "Jakarta Pusat",
      targetAudiens: "Pelanggan Existing",
      tanggalKirim: "2025-12-31 10:00",
      status: "Pending",
      dibuatOleh: "John Doe",
      tanggalDibuat: "2025-01-15 09:30",
    },
    {
      id: 2,
      namaKampanye: "Flash Sale Weekend",
      cabang: "Bandung",
      targetAudiens: "Prospek Baru",
      tanggalKirim: "2025-01-20 14:00",
      status: "Approved",
      dibuatOleh: "Jane Smith",
      tanggalDibuat: "2025-01-10 11:20",
    },
    {
      id: 3,
      namaKampanye: "New Product Launch",
      cabang: "Surabaya",
      targetAudiens: "Pelanggan VIP",
      tanggalKirim: "2025-02-01 08:00",
      status: "Pending",
      dibuatOleh: "Bob Johnson",
      tanggalDibuat: "2025-01-18 15:45",
    },
    {
      id: 4,
      namaKampanye: "Special Discount",
      cabang: "Medan",
      targetAudiens: "Tidak Aktif",
      tanggalKirim: "2025-01-25 12:00",
      status: "Rejected",
      dibuatOleh: "Alice Brown",
      tanggalDibuat: "2025-01-12 10:15",
    },
    {
      id: 5,
      namaKampanye: "Loyalty Program",
      cabang: "Jakarta Pusat",
      targetAudiens: "Pelanggan Existing",
      tanggalKirim: "2025-02-05 16:00",
      status: "Approved",
      dibuatOleh: "Charlie Wilson",
      tanggalDibuat: "2025-01-20 13:30",
    },
  ];

  // Status filter options
  const statusOptions: DropdownOption[] = [
    { value: "all", label: "Semua Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  // Filter templates based on status and search query
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((template) => {
      const matchesStatus =
        statusFilter === "all" ||
        template.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        template.namaKampanye.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allTemplates, statusFilter, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

  const handleResetFilter = () => {
    setStatusFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-900/40 text-yellow-300";
      case "Approved":
        return "bg-green-900/40 text-green-300";
      case "Rejected":
        return "bg-red-900/40 text-red-300";
      default:
        return "bg-gray-900/40 text-gray-300";
    }
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="pt-4 pb-8 sm:pt-6 sm:pb-12 px-2 sm:px-4 md:px-6 lg:px-8">
            {/* Filter & Search */}
            <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter Status
                  </label>
                  <Dropdown
                    options={statusOptions}
                    value={statusFilter}
                    placeholder="Semua Status"
                    onChange={(value) => {
                      setStatusFilter(value as string);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Cari Nama Kampanye
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
                    placeholder="Cari kampanye..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Nama Kampanye
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Cabang
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Target Audiens
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Tanggal Kirim
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Dibuat Oleh
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">
                        Tanggal Dibuat
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-[var(--text-secondary)]">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-secondary)]">
                    {paginatedTemplates.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-10 text-center text-[var(--text-secondary)]">
                          Tidak ada template yang ditemukan
                        </td>
                      </tr>
                    ) : (
                      paginatedTemplates.map((template, index) => (
                        <tr
                          key={template.id}
                          className="border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                        >
                          <td className="px-4 py-3">{startIndex + index + 1}</td>
                          <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                            {template.namaKampanye}
                          </td>
                          <td className="px-4 py-3">{template.cabang}</td>
                          <td className="px-4 py-3">{template.targetAudiens}</td>
                          <td className="px-4 py-3">{template.tanggalKirim}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeColor(template.status)}`}>
                              {template.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{template.dibuatOleh}</td>
                          <td className="px-4 py-3">{template.tanggalDibuat}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center">
                              <Link
                                to={`/blast-hsm-guide/approve-template?id=${template.id}`}
                                className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredTemplates.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Menampilkan <span className="text-[var(--text-primary)] font-semibold">{startIndex + 1}</span> -{" "}
                    <span className="text-[var(--text-primary)] font-semibold">
                      {Math.min(endIndex, filteredTemplates.length)}
                    </span>{" "}
                    dari <span className="text-[var(--text-primary)] font-semibold">{filteredTemplates.length}</span>{" "}
                    template
                  </div>
                  {totalPages > 1 && (
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                            currentPage === page
                              ? "bg-[var(--accent-color)] text-white"
                              : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-quaternary)]"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default HsmTemplate;
