import {
    ArrowLeft
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";

interface FieldItem {
  id: number;
  name: string;
  label: string;
}

interface JenisPengaduanItem {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  code: string;
}

const ConfigField: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedJenisId, setSelectedJenisId] = useState<string>("");
  const [selectedFieldIds, setSelectedFieldIds] = useState<Set<number>>(new Set());

  // Available categories
  const categories = [
    { id: 6, name: "Call" },
    { id: 7, name: "Outbound" },
    { id: 11, name: "Chat" },
  ];

  // Available jenis pengaduan (based on JenisPengaduan page)
  const jenisPengaduans: JenisPengaduanItem[] = [
    { id: 11, categoryId: 7, categoryName: "Outbound", name: "Attitude", code: "35" },
    { id: 12, categoryId: 7, categoryName: "Outbound", name: "Skill", code: "30" },
    { id: 13, categoryId: 7, categoryName: "Outbound", name: "Knowledge", code: "35" },
    { id: 15, categoryId: 11, categoryName: "Chat", name: "Skill", code: "35" },
    { id: 16, categoryId: 11, categoryName: "Chat", name: "Attitude", code: "35" },
    { id: 17, categoryId: 11, categoryName: "Chat", name: "Knowledge", code: "30" },
    { id: 18, categoryId: 6, categoryName: "Call", name: "Knowledge", code: "35" },
    { id: 19, categoryId: 6, categoryName: "Call", name: "Attitude", code: "35" },
    { id: 20, categoryId: 6, categoryName: "Call", name: "Skill", code: "30" },
  ];

  // Available fields (based on Field page)
  const allFields: FieldItem[] = [
    { id: 40, name: "salam_pembuka_call", label: "Salam Pembuka" },
    { id: 41, name: "salam_penutup_call", label: "Salam Penutup" },
    { id: 42, name: "kemampuan_menyimak", label: "Kemampuan Menyimak" },
    { id: 43, name: "kemampuan_menjelaskan", label: "Kemampuan Menjelaskan" },
    { id: 44, name: "kemampuan_menggali_informasi", label: "Kemampuan Menggali Informasi" },
    { id: 45, name: "ketepatan_informasi", label: "Ketepatan Informasi" },
    { id: 47, name: "salam_pembuka_chat", label: "Salam Pembuka" },
    { id: 48, name: "salam_penutup_chat", label: "Salam Penutup" },
    { id: 49, name: "kemampuan_menyimak_chat", label: "Kemampuan Menyimak" },
    { id: 50, name: "kemampuan_menjelaskan_chat", label: "Kemampuan Menjelaskan" },
  ];

  // Filter jenis pengaduan based on selected category
  const filteredJenisPengaduans = selectedCategoryId
    ? jenisPengaduans.filter((jenis) => jenis.categoryId === parseInt(selectedCategoryId))
    : [];

  // Convert categories to DropdownOption format
  const categoryOptions: DropdownOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  // Convert filtered jenis pengaduans to DropdownOption format
  const jenisOptions: DropdownOption[] = filteredJenisPengaduans.map((jenis) => ({
    value: jenis.id,
    label: `${jenis.name} (${jenis.code})`,
  }));

  // Handle category selection
  const handleCategoryChange = (categoryId: string | number) => {
    setSelectedCategoryId(categoryId.toString());
    setSelectedJenisId("");
    setSelectedFieldIds(new Set());
  };

  // Handle jenis selection
  const handleJenisChange = (jenisId: string | number) => {
    setSelectedJenisId(jenisId.toString());
    // Load saved field associations for this jenis
    // For now, we'll start with empty selection
    setSelectedFieldIds(new Set());
  };

  // Handle field checkbox toggle
  const handleFieldToggle = (fieldId: number) => {
    setSelectedFieldIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fieldId)) {
        newSet.delete(fieldId);
      } else {
        newSet.add(fieldId);
      }
      return newSet;
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      alert("Pilih kategori terlebih dahulu");
      return;
    }

    if (!selectedJenisId) {
      alert("Pilih jenis complaint terlebih dahulu");
      return;
    }

    if (selectedFieldIds.size === 0) {
      alert("Pilih minimal satu field");
      return;
    }

    // Here you would save the associations
    alert(
      `Asosiasi field berhasil disimpan untuk jenis complaint ${selectedJenisId} dengan ${selectedFieldIds.size} field(s)`
    );

    // Reset form after save
    setSelectedCategoryId("");
    setSelectedJenisId("");
    setSelectedFieldIds(new Set());
  };

  const selectedCategory = categories.find((cat) => cat.id === parseInt(selectedCategoryId));
  const selectedJenis = jenisPengaduans.find((jenis) => jenis.id === parseInt(selectedJenisId));

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
                Config Field Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Configure field associations for complaint types
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
              <form onSubmit={handleSubmit} id="manage_field_associations_form">
                {/* Category Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="kategori_dropdown"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Pilih Kategori Complaint:
                  </label>
                  <Dropdown
                    options={categoryOptions}
                    value={selectedCategoryId ? parseInt(selectedCategoryId) : undefined}
                    placeholder="-- Pilih Kategori --"
                    onChange={handleCategoryChange}
                  />
                </div>

                {/* Jenis Complaint Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="jenis_dropdown"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Pilih Jenis Complaint:
                  </label>
                  <Dropdown
                    options={jenisOptions}
                    value={selectedJenisId ? parseInt(selectedJenisId) : undefined}
                    placeholder="-- Pilih Jenis Complaint --"
                    onChange={handleJenisChange}
                    disabled={!selectedCategoryId}
                  />
                </div>

                {/* Field Selection Area */}
                {selectedJenisId && (
                  <div id="field_selection_area" className="mt-6">
                    <h5 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                      Pilih Field yang Akan Muncul:
                    </h5>
                    <div
                      id="field_checklist_container"
                      className="border border-[var(--border-color)] p-4 rounded-lg bg-[var(--bg-tertiary)] max-h-[400px] overflow-y-auto"
                    >
                      {allFields.length === 0 ? (
                        <p className="text-center text-[var(--text-secondary)]">
                          Tidak ada field yang tersedia
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {allFields.map((field) => (
                            <div
                              key={field.id}
                              className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors"
                            >
                              <input
                                type="checkbox"
                                id={`field_${field.id}`}
                                checked={selectedFieldIds.has(field.id)}
                                onChange={() => handleFieldToggle(field.id)}
                                className="w-5 h-5 cursor-pointer text-[var(--accent-color)] border-[var(--border-color)] rounded focus:ring-2 focus:ring-[var(--accent-color)]/20"
                              />
                              <label
                                htmlFor={`field_${field.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {field.label}
                                  </span>
                                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                                    {field.name}
                                  </span>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        id="save_button"
                        disabled={selectedFieldIds.size === 0}
                        className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Simpan Asosiasi Field
                      </button>
                    </div>
                  </div>
                )}

                {!selectedJenisId && selectedCategoryId && (
                  <div className="mt-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]">
                    <p className="text-center text-[var(--text-secondary)] text-sm">
                      Pilih Jenis Complaint untuk melihat daftar field.
                    </p>
                  </div>
                )}

                {!selectedCategoryId && (
                  <div className="mt-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]">
                    <p className="text-center text-[var(--text-secondary)] text-sm">
                      Pilih Kategori untuk memulai konfigurasi field.
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
