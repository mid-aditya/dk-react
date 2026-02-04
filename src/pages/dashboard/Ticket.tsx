import { AlertCircle, Filter, Info, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../components/ui/Dropdown";

interface CategoryItem {
  id: number;
  name: string;
}

interface SubCategoryItem {
  id: number;
  categoryId: number;
  name: string;
}

const Ticket: React.FC = () => {
  const [categoryId, setCategoryId] = useState<number | string>("");
  const [subCategoryId, setSubCategoryId] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  // Sample categories data
  const categories: CategoryItem[] = [
    { id: 3, name: "Inquiry" },
    { id: 4, name: "Request" },
    { id: 5, name: "Complaint" },
  ];

  // Sample subcategories data
  const subCategories: SubCategoryItem[] = [
    // Inquiry subcategories
    { id: 1, categoryId: 3, name: "Informasi Rekening" },
    { id: 2, categoryId: 3, name: "Kartu ATM Expired" },
    { id: 3, categoryId: 3, name: "Pengaduan Nasabah terkait layanan" },
    // Request subcategories
    { id: 4, categoryId: 4, name: "Permintaan Aktifasi Rekening Tidak Aktif (Dormant)" },
    { id: 5, categoryId: 4, name: "Permintaan CCTV Bank Lain" },
    { id: 6, categoryId: 4, name: "Permintaan Buka Blokir Kartu ATM" },
    // Complaint subcategories
    { id: 7, categoryId: 5, name: "Pengaduan Nasabah Terkait Layanan Bankaltimtara" },
    { id: 8, categoryId: 5, name: "Top Up Saldo Speedcash Paykaltimtara Gagal namun Saldo Bankaltimtara Terdebet" },
    { id: 9, categoryId: 5, name: "Tarik Tunai di ATM Bersama Gagal, Saldo Terdebet" },
  ];

  // Convert categories to DropdownOption format
  const categoryOptions: DropdownOption[] = [
    { value: "", label: "Pilih Kategori" },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  // Filter subcategories based on selected category
  const filteredSubCategories = categoryId
    ? subCategories.filter((item) => item.categoryId === Number(categoryId))
    : [];

  // Convert filtered subcategories to DropdownOption format
  const subCategoryOptions: DropdownOption[] = [
    { value: "", label: "Pilih Subkategori" },
    ...filteredSubCategories.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  // Reset subcategory when category changes
  useEffect(() => {
    setSubCategoryId("");
    setHasData(false);
  }, [categoryId]);

  // Reset data when subcategory changes
  useEffect(() => {
    setHasData(false);
  }, [subCategoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!categoryId || !subCategoryId) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
      // In real app, fetch data here
    }, 500);
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg overflow-hidden">
              {/* Filter Section */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center">
                  <Filter className="w-5 h-5 text-[var(--accent-color)] mr-2" />
                  Filter Data
                </h3>

                <form onSubmit={handleSubmit} id="filterForm">
                  {/* Filter Utama: Kategori dan Subkategori */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    {/* Kategori */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Kategori <span className="text-[var(--error-color)]">*</span>
                      </label>
                      <Dropdown
                        options={categoryOptions}
                        value={categoryId}
                        placeholder="Pilih Kategori"
                        onChange={(value) => setCategoryId(value)}
                      />
                    </div>

                    {/* Subkategori */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Subkategori <span className="text-[var(--error-color)]">*</span>
                      </label>
                      <Dropdown
                        options={subCategoryOptions}
                        value={subCategoryId}
                        placeholder="Pilih Subkategori"
                        onChange={(value) => setSubCategoryId(value)}
                        disabled={!categoryId}
                      />
                    </div>

                    {/* Button Tampilkan Data */}
                    <div className="flex items-end">
                      <button
                        type="submit"
                        disabled={!categoryId || !subCategoryId || isLoading}
                        className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <Search className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Tampilkan Data
                      </button>
                    </div>
                  </div>

                  {/* Info mode multiple form */}
                  <div className="mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-center">
                        <Info className="w-5 h-5 text-[var(--accent-color)] mr-2 flex-shrink-0" />
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          <strong>Mode Multiple Form:</strong> Anda harus memilih kategori dan subkategori terlebih dahulu untuk menampilkan data.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Data Table / Empty State */}
              {hasData ? (
                <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-color)]">
                  {/* Data table will be displayed here */}
                  <p className="text-[var(--text-primary)]">Data akan ditampilkan di sini</p>
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 sm:p-6 md:p-8 text-center">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 dark:text-yellow-400 mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Pilih Kategori dan Subkategori
                    </h3>
                    <p className="text-sm sm:text-base text-yellow-600 dark:text-yellow-300">
                      untuk menampilkan data ticket dalam Mode Multiple Form.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Ticket;
