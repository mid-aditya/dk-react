import {
  ArrowLeft,
  ChevronRight,
  Edit,
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

interface CategoryItem {
  id: number;
  name: string;
}

interface SubCategoryItem {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  status: "active" | "inactive";
}

const SubCategory: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    status: "active" as "active" | "inactive",
  });

  // Available categories (from Category page data)
  const categories: CategoryItem[] = [
    { id: 6, name: "Corporate" },
    { id: 7, name: "Personal" },
  ];

  // Sample data based on reference HTML
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([
    {
      id: 9,
      name: "Internet Only 150 Mbps",
      categoryId: 6,
      categoryName: "Corporate",
      status: "active",
    },
    {
      id: 8,
      name: "Internet Only 150 Mbps",
      categoryId: 7,
      categoryName: "Personal",
      status: "active",
    },
    {
      id: 7,
      name: "Internet Only 100 Mbps",
      categoryId: 6,
      categoryName: "Corporate",
      status: "active",
    },
    {
      id: 6,
      name: "Internet Only 100 Mbps",
      categoryId: 7,
      categoryName: "Personal",
      status: "active",
    },
    {
      id: 5,
      name: "Internet Only 30 Mbps",
      categoryId: 7,
      categoryName: "Personal",
      status: "active",
    },
    {
      id: 4,
      name: "Internet Only 30 Mbps",
      categoryId: 6,
      categoryName: "Corporate",
      status: "active",
    },
  ]);

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subCategory.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      categoryId: "",
      status: "active",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (subCategory: SubCategoryItem) => {
    setSelectedSubCategory(subCategory);
    setFormData({
      name: subCategory.name,
      categoryId: subCategory.categoryId.toString(),
      status: subCategory.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (subCategory: SubCategoryItem) => {
    setSelectedSubCategory(subCategory);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSubCategory) {
      setSubCategories((prev) => prev.filter((subCategory) => subCategory.id !== selectedSubCategory.id));
      setIsDeleteModalOpen(false);
      setSelectedSubCategory(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Nama Sub Kategori harus diisi");
      return;
    }

    if (!formData.categoryId) {
      alert("Kategori harus dipilih");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.id === parseInt(formData.categoryId));
    if (!selectedCategory) {
      alert("Kategori tidak valid");
      return;
    }

    if (selectedSubCategory) {
      // Update existing sub category
      setSubCategories((prev) =>
        prev.map((subCategory) =>
          subCategory.id === selectedSubCategory.id
            ? {
                ...subCategory,
                name: formData.name,
                categoryId: selectedCategory.id,
                categoryName: selectedCategory.name,
                status: formData.status,
              }
            : subCategory
        )
      );
    } else {
      // Create new sub category
      const newSubCategory: SubCategoryItem = {
        id: Math.max(...subCategories.map((sc) => sc.id), 0) + 1,
        name: formData.name,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        status: formData.status,
      };
      setSubCategories((prev) => [newSubCategory, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedSubCategory(null);
    setFormData({
      name: "",
      categoryId: "",
      status: "active",
    });
  };

  const tableColumns: TableColumn<SubCategoryItem>[] = [
    {
      key: "no",
      header: "No",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "name",
      header: "Nama Sub Kategori",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.name}</span>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.categoryName}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "left",
      render: (item) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "active"
              ? "bg-[var(--success-color)]/20 text-[var(--success-color)] border border-[var(--success-color)]/30"
              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
          }`}
        >
          {item.status === "active" ? "Aktif" : "Tidak Aktif"}
        </span>
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
                Sub Category Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage outbound sub category configurations
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
                        placeholder="Cari sub kategori..."
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
                  Tambah Sub Kategori
                </button>
              </div>

              {/* Table */}
              {filteredSubCategories.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredSubCategories}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No sub categories found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <ChevronRight className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada sub kategori yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat sub kategori baru untuk memulai"}
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
            setSelectedSubCategory(null);
            setFormData({
              name: "",
              categoryId: "",
              status: "active",
            });
          }}
          title={selectedSubCategory ? "Edit Sub Kategori" : "Tambah Sub Kategori Baru"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedSubCategory(null);
                  setFormData({
                    name: "",
                    categoryId: "",
                    status: "active",
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
                {selectedSubCategory ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Sub Kategori <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama sub kategori"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Kategori <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Status <span className="text-[var(--error-color)]">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 cursor-pointer"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedSubCategory(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedSubCategory(null);
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
              Apakah kamu yakin ingin menghapus data ini?
            </p>
            {selectedSubCategory && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedSubCategory.name}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default SubCategory;
