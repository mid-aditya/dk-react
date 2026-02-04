import {
    ArrowLeft,
    Check,
    Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";

interface CategoryItem {
  id: number;
  name: string;
}

interface JenisPengaduanItem {
  id: number;
  kategoriId: number;
  kategoriName: string;
  nama_jenis: string;
  code: string;
}

interface FieldItem {
  id: number;
  nama_field: string;
  label_field: string;
}

const ConfigField: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKategoriId, setSelectedKategoriId] = useState<number | undefined>(undefined);
  const [selectedJenisId, setSelectedJenisId] = useState<number | undefined>(undefined);
  const [selectedFieldIds, setSelectedFieldIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Available categories
  const categories: CategoryItem[] = [
    { id: 3, name: "Inquiry" },
    { id: 4, name: "Request" },
    { id: 5, name: "Complaint" },
  ];

  // Convert categories to DropdownOption format
  const categoryOptions: DropdownOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  // Sample jenis pengaduan data (from JenisPengaduan page)
  const jenisPengaduans: JenisPengaduanItem[] = [
    {
      id: 2,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Informasi Rekening",
      code: "1001",
    },
    {
      id: 3,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan Aktifasi Rekening Tidak Aktif (Dormant)",
      code: "1050",
    },
    {
      id: 4,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Pengaduan Nasabah Terkait Layanan Bankaltimtara",
      code: "1102",
    },
    {
      id: 5,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Top Up Saldo Speedcash Paykaltimtara Gagal namun Saldo Bankaltimtara Terdebet",
      code: "1361",
    },
    {
      id: 6,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Tarik Tunai di ATM Bersama Gagal, Saldo Terdebet",
      code: "1203",
    },
    {
      id: 7,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan CCTV Bank Lain",
      code: "2302",
    },
    {
      id: 8,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan Buka Blokir Kartu ATM",
      code: "1901",
    },
    {
      id: 9,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Kartu ATM Expired",
      code: "1709",
    },
    {
      id: 10,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Pengaduan Nasabah terkait layanan",
      code: "9301",
    },
  ];

  // Sample fields data (from Field page)
  const fields: FieldItem[] = [
    { id: 5, nama_field: "FlagFinancial", label_field: "Flag Financial" },
    { id: 6, nama_field: "JenisEskalasi", label_field: "Jenis Eskalasi" },
    { id: 7, nama_field: "TotalKlaim", label_field: "Total Klaim" },
    { id: 8, nama_field: "Nominal", label_field: "Nominal" },
    { id: 9, nama_field: "Biaya", label_field: "Biaya" },
    { id: 10, nama_field: "Dana", label_field: "Dana" },
    { id: 11, nama_field: "PenyebabPengaduan", label_field: "Penyebab Pengaduan" },
    { id: 12, nama_field: "SistemPembayaran", label_field: "Sistem Pembayaran" },
    { id: 13, nama_field: "MutasiRekening", label_field: "Mutasi Rekening" },
    { id: 14, nama_field: "LokasiKejadian", label_field: "Lokasi Kejadian" },
  ];

  // Filter jenis pengaduan berdasarkan kategori yang dipilih
  const filteredJenisPengaduans = selectedKategoriId
    ? jenisPengaduans.filter((item) => item.kategoriId === selectedKategoriId)
    : [];

  // Convert filtered jenis pengaduan to DropdownOption format
  const jenisOptions: DropdownOption[] = filteredJenisPengaduans.map((item) => ({
    value: item.id,
    label: `${item.nama_jenis} (${item.code})`,
  }));

  // Reset jenis dan field saat kategori berubah
  useEffect(() => {
    setSelectedJenisId(undefined);
    setSelectedFieldIds([]);
  }, [selectedKategoriId]);

  // Reset field saat jenis berubah
  useEffect(() => {
    setSelectedFieldIds([]);
  }, [selectedJenisId]);

  // Load saved field associations (simulated - in real app, this would come from API)
  useEffect(() => {
    if (selectedJenisId) {
      // Simulate loading saved associations
      // In real app, fetch from API based on selectedJenisId
      // For now, we'll just reset the selection
      setSelectedFieldIds([]);
    }
  }, [selectedJenisId]);

  const handleKategoriChange = (value: number | string) => {
    setSelectedKategoriId(typeof value === "number" ? value : parseInt(value.toString()));
  };

  const handleJenisChange = (value: number | string) => {
    setSelectedJenisId(typeof value === "number" ? value : parseInt(value.toString()));
  };

  const handleFieldToggle = (fieldId: number) => {
    setSelectedFieldIds((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFieldIds.length === fields.length) {
      setSelectedFieldIds([]);
    } else {
      setSelectedFieldIds(fields.map((f) => f.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedKategoriId) {
      alert("Pilih Kategori Complaint terlebih dahulu");
      return;
    }

    if (!selectedJenisId) {
      alert("Pilih Jenis Complaint terlebih dahulu");
      return;
    }

    if (selectedFieldIds.length === 0) {
      alert("Pilih minimal satu field");
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Saving field associations:", {
        kategoriId: selectedKategoriId,
        jenisId: selectedJenisId,
        fieldIds: selectedFieldIds,
      });

      alert("Asosiasi field berhasil disimpan!");
      setIsSaving(false);
    }, 1000);
  };

  const isFormValid = selectedKategoriId && selectedJenisId && selectedFieldIds.length > 0;
  const showFieldSelection = selectedJenisId !== undefined;

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--accent-color)]"
              title="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h5 className="text-lg font-semibold text-[var(--text-primary)] m-0">
                Atur Field untuk Jenis Complaint
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Configure which fields appear for each complaint type
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
              <form onSubmit={handleSubmit} id="manage_field_associations_form">
                {/* Kategori Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="kategori_dropdown"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Pilih Kategori Complaint:
                  </label>
                  <Dropdown
                    options={categoryOptions}
                    value={selectedKategoriId}
                    placeholder="-- Pilih Kategori --"
                    onChange={handleKategoriChange}
                  />
                </div>

                {/* Jenis Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="jenis_dropdown"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Pilih Jenis Complaint:
                  </label>
                  <Dropdown
                    options={jenisOptions}
                    value={selectedJenisId}
                    placeholder="-- Pilih Jenis Complaint --"
                    onChange={handleJenisChange}
                    disabled={!selectedKategoriId}
                  />
                </div>

                {/* Field Selection Area */}
                {showFieldSelection && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-base font-semibold text-[var(--text-primary)] m-0">
                        Pilih Field yang Akan Muncul:
                      </h5>
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                      >
                        {selectedFieldIds.length === fields.length ? "Hapus Semua" : "Pilih Semua"}
                      </button>
                    </div>

                    <div className="border border-[var(--border-color)] rounded-lg p-4 bg-[var(--bg-tertiary)] max-h-96 overflow-y-auto">
                      {fields.length > 0 ? (
                        <div className="space-y-3">
                          {fields.map((field) => {
                            const isChecked = selectedFieldIds.includes(field.id);
                            return (
                              <label
                                key={field.id}
                                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-secondary)]"
                              >
                                <div className="relative flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleFieldToggle(field.id)}
                                    className="w-5 h-5 rounded border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
                                  />
                                  {isChecked && (
                                    <Check className="absolute left-0.5 w-4 h-4 text-[var(--accent-color)] pointer-events-none" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {field.label_field}
                                  </span>
                                  <span className="text-xs text-[var(--text-secondary)] ml-2">
                                    ({field.nama_field})
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-center text-[var(--text-secondary)] py-8">
                          Tidak ada field yang tersedia
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSaving}
                        className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] disabled:bg-[var(--bg-tertiary)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Menyimpan..." : "Simpan Asosiasi Field"}
                      </button>
                    </div>
                  </div>
                )}

                {!showFieldSelection && (
                  <div className="mt-6 border border-[var(--border-color)] rounded-lg p-8 bg-[var(--bg-tertiary)]">
                    <p className="text-center text-[var(--text-secondary)]">
                      Pilih Jenis Complaint untuk melihat daftar field.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default ConfigField;
