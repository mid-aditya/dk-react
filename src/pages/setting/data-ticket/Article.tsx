import {
    ArrowLeft,
    Edit,
    FileText,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  formType: string;
  status: "draft" | "published";
  createdBy: string;
  createdAt: string;
  documentUrl?: string;
}

const Article: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    formType: "",
    status: "draft" as "draft" | "published",
    document: null as File | null,
  });

  // Sample data
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 10,
      title: "tes pindah relasi",
      content: "<ol><li><strong>dwadsdwadawda</strong></li><li><strong>dwadawdasdaw</strong></li><li><strong>dasdawdasdawd</strong></li><li><strong>asdawdwadasdawd</strong></li></ol>",
      category: "Inquiry",
      formType: "Kartu ATM Expired",
      status: "draft",
      createdBy: "Century",
      createdAt: "2025-10-15",
      documentUrl: "https://crm.datakelola.com/storage/files/z7JEjuECXcRPcD98SVbaSZmTjz0mSkaFzXqd0wcG.pdf",
    },
  ]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.formType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      formType: "",
      status: "draft",
      document: null,
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      formType: article.formType,
      status: article.status,
      document: null,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedArticle) {
      setArticles((prev) => prev.filter((article) => article.id !== selectedArticle.id));
      setIsDeleteModalOpen(false);
      setSelectedArticle(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Judul dan Konten harus diisi");
      return;
    }

    if (selectedArticle) {
      // Update existing article
      setArticles((prev) =>
        prev.map((article) =>
          article.id === selectedArticle.id
            ? {
                ...article,
                title: formData.title,
                content: formData.content,
                category: formData.category,
                formType: formData.formType,
                status: formData.status,
              }
            : article
        )
      );
    } else {
      // Create new article
      const newArticle: Article = {
        id: Math.max(...articles.map((a) => a.id), 0) + 1,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        formType: formData.formType,
        status: formData.status,
        createdBy: "Current User",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setArticles((prev) => [newArticle, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedArticle(null);
    setFormData({
      title: "",
      content: "",
      category: "",
      formType: "",
      status: "draft",
      document: null,
    });
  };

  const tableColumns: TableColumn<Article>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "title",
      header: "Judul",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] break-words">{item.title}</span>
      ),
    },
    {
      key: "content",
      header: "Konten",
      align: "left",
      render: (item) => (
        <div
          className="text-[var(--text-primary)] overflow-hidden"
          style={{ maxWidth: "300px" }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      ),
    },
    {
      key: "category",
      header: "Kategori",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.category}</span>
      ),
    },
    {
      key: "formType",
      header: "Jenis Form",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.formType}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "published"
              ? "bg-[var(--success-color)]/20 text-[var(--success-color)] border border-[var(--success-color)]/30"
              : "bg-[var(--error-color)]/20 text-[var(--error-color)] border border-[var(--error-color)]/30"
          }`}
        >
          {item.status === "published" ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Dibuat Oleh",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.createdBy}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Tanggal Dibuat",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.createdAt}</span>
      ),
    },
    {
      key: "document",
      header: "Dokumen",
      align: "left",
      render: (item) => (
        item.documentUrl ? (
          <a
            href={item.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-color)] hover:underline"
          >
            Lihat Dokumen
          </a>
        ) : (
          <span className="text-[var(--text-tertiary)]">-</span>
        )
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      align: "left",
      render: (item) => (
        <div className="flex items-center gap-2">
          <IconButton
            icon={Edit}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
            variant="edit"
            title="Edit"
          />
          <IconButton
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item);
            }}
            variant="delete"
            title="Delete"
          />
        </div>
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
                Article Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage your knowledge base articles
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
              {/* Search and Add Button */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-[var(--text-tertiary)]" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 placeholder:text-[var(--text-tertiary)]"
                        placeholder="Cari artikel..."
                      />
                    </div>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Artikel
                </button>
              </div>

              {/* Table */}
              {filteredArticles.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredArticles}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No articles found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <FileText className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada artikel yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat artikel baru untuk memulai"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedArticle(null);
            setFormData({
              title: "",
              content: "",
              category: "",
              formType: "",
              status: "draft",
              document: null,
            });
          }}
          title={selectedArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedArticle(null);
                  setFormData({
                    title: "",
                    content: "",
                    category: "",
                    formType: "",
                    status: "draft",
                    document: null,
                  });
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {selectedArticle ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Judul <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan judul artikel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Konten <span className="text-[var(--error-color)]">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 min-h-[200px] resize-y"
                placeholder="Masukkan konten artikel (HTML allowed)"
              />
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                HTML tags diperbolehkan untuk formatting
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Kategori <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="e.g., Inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Jenis Form <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.formType}
                  onChange={(e) => setFormData({ ...formData, formType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                  placeholder="e.g., Kartu ATM Expired"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Dokumen (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, document: file });
                  }
                }}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
              />
              {formData.document && (
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  File: {formData.document.name}
                </p>
              )}
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedArticle(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedArticle(null);
                }}
                className="px-4 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] text-[var(--text-primary)] rounded-lg transition-colors duration-200 font-medium border border-[var(--border-color)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-[var(--error-color)] hover:bg-[var(--error-color)]/90 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Hapus
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]">
              Apakah kamu yakin ingin menghapus artikel ini?
            </p>
            {selectedArticle && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedArticle.title}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default Article;

