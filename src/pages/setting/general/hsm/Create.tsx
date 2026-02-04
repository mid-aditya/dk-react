import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Save,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../../components/ui/Dropdown";

interface TemplateForm {
  name: string;
  templateId: string;
  category: string;
  language: string;
  whatsappAccount: string;
  content: string;
}

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TemplateForm>({
    name: "",
    templateId: "",
    category: "",
    language: "",
    whatsappAccount: "",
    content: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TemplateForm, string>>>({});

  const categoryOptions: DropdownOption[] = [
    { value: "marketing", label: "Marketing" },
    { value: "utility", label: "Utility" },
    { value: "authentication", label: "Authentication" },
  ];

  const languageOptions: DropdownOption[] = [
    { value: "indonesian", label: "Indonesian" },
    { value: "english", label: "English" },
  ];

  const whatsappAccountOptions: DropdownOption[] = [
    { value: "business", label: "Business Account" },
    { value: "sales", label: "Sales Account" },
    { value: "security", label: "Security Account" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TemplateForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Template name is required";
    }

    if (!formData.templateId.trim()) {
      newErrors.templateId = "Template ID is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.language) {
      newErrors.language = "Language is required";
    }

    if (!formData.whatsappAccount) {
      newErrors.whatsappAccount = "WhatsApp Account is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Template content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData);
      // Navigate back or show success message
      navigate("/settings");
    }
  };

  const handleChange = (field: keyof TemplateForm, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: String(value) }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "marketing":
        return "bg-orange-100 text-orange-800";
      case "utility":
        return "bg-green-100 text-green-800";
      case "authentication":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                Create Template Chat
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Create a new WhatsApp message template
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                    Template Chat
                  </h1>
                  <p className="text-[var(--text-secondary)] mt-1">
                    Manage your WhatsApp message templates
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
                  <i className="bx bx-table mr-2 text-blue-500"></i>
                  Template Information
                </h2>

                <div className="space-y-6">
                  {/* Template Name */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Template Name <span className="text-[var(--error-color)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3 bg-[var(--bg-tertiary)] border ${
                        errors.name ? "border-[var(--error-color)]" : "border-[var(--border-color)]"
                      } text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20`}
                      placeholder="e.g., Welcome Message"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[var(--error-color)]">{errors.name}</p>
                    )}
                  </div>

                  {/* Template ID */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Template ID <span className="text-[var(--error-color)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.templateId}
                      onChange={(e) => handleChange("templateId", e.target.value)}
                      className={`w-full px-4 py-3 bg-[var(--bg-tertiary)] border ${
                        errors.templateId ? "border-[var(--error-color)]" : "border-[var(--border-color)]"
                      } text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono`}
                      placeholder="e.g., WM-001"
                    />
                    {errors.templateId && (
                      <p className="mt-1 text-xs text-[var(--error-color)]">{errors.templateId}</p>
                    )}
                  </div>

                  {/* Category and Language */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Category <span className="text-[var(--error-color)]">*</span>
                      </label>
                      <div className={errors.category ? "border-2 border-[var(--error-color)] rounded-lg" : ""}>
                        <Dropdown
                          options={categoryOptions}
                          value={formData.category}
                          onChange={(value) => handleChange("category", value)}
                          placeholder="Select Category"
                        />
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-xs text-[var(--error-color)]">{errors.category}</p>
                      )}
                      {formData.category && (
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                              formData.category
                            )}`}
                          >
                            {categoryOptions.find((opt) => opt.value === formData.category)?.label}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Language <span className="text-[var(--error-color)]">*</span>
                      </label>
                      <div className={errors.language ? "border-2 border-[var(--error-color)] rounded-lg" : ""}>
                        <Dropdown
                          options={languageOptions}
                          value={formData.language}
                          onChange={(value) => handleChange("language", value)}
                          placeholder="Select Language"
                        />
                      </div>
                      {errors.language && (
                        <p className="mt-1 text-xs text-[var(--error-color)]">{errors.language}</p>
                      )}
                      {formData.language && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {languageOptions.find((opt) => opt.value === formData.language)?.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Account */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      WhatsApp Account <span className="text-[var(--error-color)]">*</span>
                    </label>
                      <div className={errors.whatsappAccount ? "border-2 border-[var(--error-color)] rounded-lg" : ""}>
                        <Dropdown
                          options={whatsappAccountOptions}
                          value={formData.whatsappAccount}
                          onChange={(value) => handleChange("whatsappAccount", value)}
                          placeholder="Select WhatsApp Account"
                        />
                      </div>
                    {errors.whatsappAccount && (
                      <p className="mt-1 text-xs text-[var(--error-color)]">{errors.whatsappAccount}</p>
                    )}
                    {formData.whatsappAccount && (
                      <div className="mt-2 flex items-center gap-2">
                        <i className="bx bxl-whatsapp text-green-500 text-lg"></i>
                        <span className="text-[var(--text-primary)]">
                          {whatsappAccountOptions.find((opt) => opt.value === formData.whatsappAccount)?.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Template Content */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Template Content <span className="text-[var(--error-color)]">*</span>
                    </label>
                    <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-color)]">
                      <textarea
                        value={formData.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                        rows={6}
                        className={`w-full bg-transparent border-none text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 resize-none ${
                          errors.content ? "ring-2 ring-[var(--error-color)]" : ""
                        } focus:ring-2 focus:ring-[var(--accent-color)]/20`}
                        placeholder="Enter your template message here. You can use variables like {{variable_name}} for dynamic content."
                      />
                    </div>
                    {errors.content && (
                      <p className="mt-1 text-xs text-[var(--error-color)]">{errors.content}</p>
                    )}
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                      Use <code className="px-1 py-0.5 bg-[var(--bg-tertiary)] rounded text-[var(--accent-color)]">{"{{variable_name}}"}</code> for dynamic content
                    </p>
                  </div>

                  {/* Preview Section */}
                  {formData.content && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Preview
                      </label>
                      <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-color)]">
                        <div className="flex flex-col">
                          <div className="flex items-center mb-3">
                            <div>
                              <h3 className="text-[var(--text-primary)] font-medium">
                                {formData.name || "Template Name"}
                              </h3>
                              <p className="text-[var(--text-secondary)] text-sm">
                                ID: {formData.templateId || "TEMPLATE-ID"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                            <p className="text-[var(--text-primary)] text-sm whitespace-pre-wrap">
                              {formData.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="px-6 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 border border-[var(--border-color)]"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Create;

