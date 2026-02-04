import {
    ArrowLeft,
    CheckCircle,
    Eye,
    Info,
    List,
    XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../../components/WorkspaceLayout";
import Modal from "../../../../components/ui/Modal";
import Table, { TableColumn } from "../../../../components/ui/Table";

interface PendingTemplate {
  id: number;
  campaignName: string;
  branch: string;
  targetAudience: string;
  sendDate: string;
  createdBy: string;
  createdAt: string;
  templateContent?: string;
  templateHeader?: string;
  templateCTA?: string;
  templateButtons?: string[];
}

const Approve: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [selectedTemplate, setSelectedTemplate] = useState<PendingTemplate | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Sample data based on reference HTML
  const [pendingTemplates, setPendingTemplates] = useState<PendingTemplate[]>([
    {
      id: 1,
      campaignName: "Promo Akhir Tahun 2025",
      branch: "Jakarta Pusat",
      targetAudience: "Pelanggan Existing",
      sendDate: "2025-12-31 10:00",
      createdBy: "John Doe",
      createdAt: "2025-01-15 09:30",
      templateHeader: "PROMO SPESIAL",
      templateContent: "Halo {{nama_pelanggan}}, kami dari {{nama_cabang}} memberikan penawaran spesial akhir tahun untuk Anda! Dapatkan diskon 50% untuk semua produk hingga 31 Desember.",
      templateCTA: "Klik link berikut untuk melihat katalog produk",
    },
    {
      id: 2,
      campaignName: "Flash Sale Weekend",
      branch: "Bandung",
      targetAudience: "Prospek Baru",
      sendDate: "2025-01-20 14:00",
      createdBy: "Jane Smith",
      createdAt: "2025-01-10 11:20",
      templateHeader: "FLASH SALE",
      templateContent: "Flash Sale Weekend! Dapatkan diskon hingga 70% untuk produk pilihan. Berlaku hanya hari ini!",
      templateCTA: "Beli Sekarang",
    },
    {
      id: 3,
      campaignName: "New Product Launch",
      branch: "Surabaya",
      targetAudience: "Pelanggan VIP",
      sendDate: "2025-02-01 08:00",
      createdBy: "Bob Johnson",
      createdAt: "2025-01-18 15:45",
      templateHeader: "PRODUK BARU",
      templateContent: "Kabar gembira! Produk terbaru kami sudah tersedia. Dapatkan penawaran khusus untuk pelanggan VIP.",
      templateButtons: ["Lihat", "Hubungi"],
    },
  ]);

  const handleViewTemplate = (template: PendingTemplate) => {
    setSelectedTemplate(template);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedTemplate(null);
  };

  const handleApprove = () => {
    if (selectedTemplate) {
      // Handle approve logic here
      console.log("Approving template:", selectedTemplate.id);
      setPendingTemplates((prev) => prev.filter((t) => t.id !== selectedTemplate.id));
      setIsApproveModalOpen(false);
      handleBackToList();
    }
  };

  const handleReject = () => {
    if (selectedTemplate) {
      // Handle reject logic here
      console.log("Rejecting template:", selectedTemplate.id);
      setPendingTemplates((prev) => prev.filter((t) => t.id !== selectedTemplate.id));
      setIsRejectModalOpen(false);
      handleBackToList();
    }
  };

  // Prepare table columns
  const tableColumns: TableColumn<PendingTemplate>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => <span>{index + 1}</span>,
    },
    {
      key: "campaignName",
      header: "Nama Kampanye",
      align: "left",
      render: (item) => <span className="font-medium">{item.campaignName}</span>,
    },
    {
      key: "branch",
      header: "Cabang",
      align: "left",
      render: (item) => <span>{item.branch}</span>,
    },
    {
      key: "targetAudience",
      header: "Target Audiens",
      align: "left",
      render: (item) => <span>{item.targetAudience}</span>,
    },
    {
      key: "sendDate",
      header: "Tanggal Kirim",
      align: "left",
      render: (item) => <span>{item.sendDate}</span>,
    },
    {
      key: "createdBy",
      header: "Dibuat Oleh",
      align: "left",
      render: (item) => <span>{item.createdBy}</span>,
    },
    {
      key: "createdAt",
      header: "Tanggal Dibuat",
      align: "left",
      render: (item) => <span>{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Aksi",
      align: "center",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewTemplate(item);
          }}
          className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

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
                Template Approval
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Review and approve pending templates
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-4 sm:p-6 md:p-8">
            {viewMode === "list" ? (
              /* List View */
              <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                    <List className="w-5 h-5 text-blue-500 mr-2" />
                    Template Pending Approval
                  </h2>
                </div>

                {pendingTemplates.length > 0 ? (
                  <Table
                    columns={tableColumns}
                    data={pendingTemplates}
                    className="bg-[var(--bg-secondary)]"
                    emptyMessage="No pending templates"
                  />
                ) : (
                  <div className="text-center py-12">
                    <i className="bx bx-inbox text-6xl text-[var(--text-tertiary)] mb-4"></i>
                    <p className="text-[var(--text-secondary)] text-lg">
                      Tidak ada template yang menunggu persetujuan
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Detail/Review View */
              selectedTemplate && (
                <div className="bg-[var(--bg-secondary)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left Column: Campaign Information */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                          <Info className="w-5 h-5 text-blue-500 mr-2" />
                          Informasi Kampanye
                        </h2>
                        <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 space-y-4">
                          {/* Nama Kampanye */}
                          <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                              Nama Kampanye
                            </label>
                            <div className="px-4 py-2 bg-[var(--bg-quaternary)] rounded-lg text-[var(--text-primary)]">
                              {selectedTemplate.campaignName}
                            </div>
                          </div>

                          {/* Cabang */}
                          <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                              Cabang
                            </label>
                            <div className="px-4 py-2 bg-[var(--bg-quaternary)] rounded-lg text-[var(--text-primary)]">
                              {selectedTemplate.branch}
                            </div>
                          </div>

                          {/* Target Audiens */}
                          <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                              Target Audiens
                            </label>
                            <div className="px-4 py-2 bg-[var(--bg-quaternary)] rounded-lg text-[var(--text-primary)]">
                              {selectedTemplate.targetAudience}
                            </div>
                          </div>

                          {/* Tanggal & Waktu Kirim */}
                          <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                              Tanggal & Waktu Kirim
                            </label>
                            <div className="px-4 py-2 bg-[var(--bg-quaternary)] rounded-lg text-[var(--text-primary)]">
                              {selectedTemplate.sendDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Template Preview */}
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center">
                        <Eye className="w-5 h-5 text-blue-500 mr-2" />
                        Preview Template
                      </h2>
                      <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4"
                        style={{
                          maxWidth: "380px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        {/* Header */}
                        {selectedTemplate.templateHeader && (
                          <div className="bg-green-500 text-white text-center py-2 font-semibold text-sm">
                            {selectedTemplate.templateHeader}
                          </div>
                        )}

                        {/* Body */}
                        <div className="p-4">
                          {/* Message Body */}
                          <p className="text-gray-800 text-sm mb-3">
                            {selectedTemplate.templateContent}
                          </p>

                          {/* CTA */}
                          {selectedTemplate.templateCTA && (
                            <div className="bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-center font-semibold text-sm mb-3">
                              {selectedTemplate.templateCTA}
                            </div>
                          )}

                          {/* Buttons */}
                          {selectedTemplate.templateButtons && selectedTemplate.templateButtons.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {selectedTemplate.templateButtons.map((button, index) => (
                                <div
                                  key={index}
                                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-center text-xs font-medium"
                                >
                                  {button}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-100 text-gray-600 text-xs text-center py-2">
                          Balas STOP untuk berhenti berlangganan
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
                    <div>
                      <button
                        type="button"
                        onClick={handleBackToList}
                        className="px-6 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors flex items-center justify-center font-semibold"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Kembali ke Daftar</span>
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsRejectModalOpen(true)}
                        className="px-6 py-3 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors flex items-center justify-center font-semibold"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        <span>Reject</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApproveModalOpen(true)}
                        className="px-6 py-3 bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white rounded-lg transition-colors flex items-center justify-center font-semibold"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Approve Confirmation Modal */}
        <Modal
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          title="Confirm Approval"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsApproveModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-4 py-2.5 bg-[var(--success-color)] hover:bg-[var(--success-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Approve
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Are you sure you want to approve this template? This action will approve the template and it will be ready to use.
            </p>
            {selectedTemplate && (
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">Campaign:</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {selectedTemplate.campaignName}
                </p>
              </div>
            )}
          </div>
        </Modal>

        {/* Reject Confirmation Modal */}
        <Modal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          title="Confirm Rejection"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Reject
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Are you sure you want to reject this template? This action cannot be undone.
            </p>
            {selectedTemplate && (
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">Campaign:</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {selectedTemplate.campaignName}
                </p>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Approve;

