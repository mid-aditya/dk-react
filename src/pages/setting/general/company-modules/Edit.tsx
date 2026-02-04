import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown";
import Modal from "../../../../components/ui/Modal";

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    company_id: "",
    module_id: "",
    total_quota: 0,
    free_quota: 0,
    used_quota: 0,
    start_date: "",
    expire_date: "",
    expand_date: "",
    coming_expand_date: "",
    status: "1", // 1 = Active, 0 = Inactive
  });

  // Sample company options
  const companyOptions: DropdownOption[] = [
    { value: "21", label: "Administrasi Hukum Umum" },
    { value: "20", label: "Administrasi Hukum Umum" },
    { value: "26", label: "Angkasa Pura 2" },
    { value: "41", label: "ASDAD" },
    { value: "6", label: "Basandiang Baniang Wedding Organizer" },
    { value: "15", label: "bayarkilat.id" },
    { value: "24", label: "Biznet Home" },
    { value: "30", label: "Cakraflash" },
    { value: "27", label: "Cakraflash" },
    { value: "5", label: "century" },
    { value: "16", label: "CV.ISMAYA" },
    { value: "2", label: "Dana Bijak" },
    { value: "43", label: "Datakelola" },
    { value: "29", label: "Duta Media" },
    { value: "42", label: "Everbest Printing Investment Limited" },
    { value: "32", label: "Facebook Testing" },
    { value: "12", label: "Jouanda wedding organizer" },
    { value: "37", label: "JSS Indonesia" },
    { value: "47", label: "JSS MALAKA" },
    { value: "36", label: "Kaltimatara" },
    { value: "10", label: "Marsilian Indonesia" },
    { value: "3", label: "MBAI" },
    { value: "33", label: "Mkn Demo" },
    { value: "7", label: "Moladin Indonesia" },
    { value: "31", label: "Pelni Indonesia" },
    { value: "17", label: "PT Antonia" },
    { value: "39", label: "PT Jaya Sejahtera Suksesindo" },
    { value: "40", label: "PT Jaya Sejahtera Suksesindo" },
    { value: "11", label: "PT KOMODO VOYAGE INDONESIA" },
    { value: "34", label: "Pt Sibernet Indonesia" },
    { value: "28", label: "Pt tri cipta integra" },
    { value: "45", label: "PT. Abdi Jaya Integra" },
    { value: "18", label: "Pt. Duta Media Mandiri" },
    { value: "38", label: "PT. Jaringan Sejahtera Selalu" },
    { value: "25", label: "PT. Jouanda Next" },
    { value: "4", label: "PT. TCI" },
    { value: "1", label: "PT. Tri Ciptra Integra" },
    { value: "8", label: "PT.Hisense Indonesia" },
    { value: "14", label: "PT.Swarna Prima Sedaya" },
    { value: "46", label: "Rachware" },
    { value: "22", label: "Roadtek" },
    { value: "44", label: "SIMS" },
    { value: "19", label: "Singa Fintech" },
    { value: "35", label: "smkn 4 bogor" },
    { value: "9", label: "Uidesk Indonesia" },
    { value: "23", label: "Volta Indonesia" },
    { value: "13", label: "Wonderfull Indonesia" },
  ];

  // Sample module options
  const moduleOptions: DropdownOption[] = [
    { value: "10", label: "Comments (Social Media)" },
    { value: "2", label: "Facebook (Social Media)" },
    { value: "4", label: "Inbound Call (Voice)" },
    { value: "3", label: "Instagram (Social Media)" },
    { value: "7", label: "Internal Group Chat (Digital Channel)" },
    { value: "9", label: "Mimin AI (AI)" },
    { value: "6", label: "Omnichat (Digital Channel)" },
    { value: "5", label: "Outbound Call (Voice)" },
    { value: "8", label: "QA Report (Report)" },
    { value: "1", label: "WhatsApp (Messaging)" },
  ];

  const statusOptions: DropdownOption[] = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  // Load existing data (simulate API call)
  useEffect(() => {
    if (id) {
      // Simulate fetching data by ID
      // In real app, this would be an API call
      const mockData = {
        company_id: "47", // JSS MALAKA
        module_id: "6", // Omnichat
        total_quota: 999999,
        free_quota: 999999,
        used_quota: 0,
        start_date: "2025-11-03T00:00",
        expire_date: "2026-11-18T00:00",
        expand_date: "",
        coming_expand_date: "",
        status: "1",
      };
      setFormData(mockData);
    }
  }, [id]);

  const handleClose = () => {
    setIsOpen(false);
    navigate("/settings/general/company-modules");
  };

  const handleChange = (
    field: string,
    value: string | number | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);
    // After successful submission, show notification and navigate back
    navigate("/settings/general/company-modules", {
      state: { success: "Company module updated successfully!" },
    });
  };

  return (
    <WorkspaceLayout>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Edit Company Module"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-module-form"
              className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <i className="bx bx-save"></i>
              Save Company Module
            </button>
          </div>
        }
      >
        <form id="edit-module-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div className="md:col-span-1">
              <label
                htmlFor="company_id"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Company <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={companyOptions}
                value={formData.company_id}
                onChange={(value) => handleChange("company_id", value)}
                placeholder="Select Company"
                className="w-full"
              />
            </div>

            {/* Module */}
            <div className="md:col-span-1">
              <label
                htmlFor="module_id"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Module <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={moduleOptions}
                value={formData.module_id}
                onChange={(value) => handleChange("module_id", value)}
                placeholder="Select Module"
                className="w-full"
              />
            </div>

            {/* Total Quota */}
            <div className="md:col-span-1">
              <label
                htmlFor="total_quota"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Total Quota <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="number"
                id="total_quota"
                name="total_quota"
                value={formData.total_quota}
                onChange={(e) =>
                  handleChange("total_quota", parseInt(e.target.value) || 0)
                }
                min="0"
                required
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Free Quota */}
            <div className="md:col-span-1">
              <label
                htmlFor="free_quota"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Free Quota <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="number"
                id="free_quota"
                name="free_quota"
                value={formData.free_quota}
                onChange={(e) =>
                  handleChange("free_quota", parseInt(e.target.value) || 0)
                }
                min="0"
                required
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Used Quota */}
            <div className="md:col-span-1">
              <label
                htmlFor="used_quota"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Used Quota
              </label>
              <input
                type="number"
                id="used_quota"
                name="used_quota"
                value={formData.used_quota}
                onChange={(e) =>
                  handleChange("used_quota", parseInt(e.target.value) || 0)
                }
                min="0"
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Start Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Start Date
              </label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={(e) => handleChange("start_date", e.target.value)}
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Expire Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="expire_date"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Expire Date
              </label>
              <input
                type="datetime-local"
                id="expire_date"
                name="expire_date"
                value={formData.expire_date}
                onChange={(e) => handleChange("expire_date", e.target.value)}
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Expand Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="expand_date"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Expand Date
              </label>
              <input
                type="datetime-local"
                id="expand_date"
                name="expand_date"
                value={formData.expand_date}
                onChange={(e) => handleChange("expand_date", e.target.value)}
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Coming Expand Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="coming_expand_date"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Coming Expand Date
              </label>
              <input
                type="datetime-local"
                id="coming_expand_date"
                name="coming_expand_date"
                value={formData.coming_expand_date}
                onChange={(e) =>
                  handleChange("coming_expand_date", e.target.value)
                }
                className="w-full py-2.5 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-[var(--text-primary)] mb-2"
              >
                Status
              </label>
              <Dropdown
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleChange("status", value)}
                placeholder="Select Status"
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Modal>
    </WorkspaceLayout>
  );
};

export default Edit;

