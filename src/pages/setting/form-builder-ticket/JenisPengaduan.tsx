import {
  ArrowLeft,
  Edit,
  List,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../../../components/WorkspaceLayout";
import Dropdown, { DropdownOption } from "../../../components/ui/Dropdown";
import IconButton from "../../../components/ui/IconButton";
import Modal from "../../../components/ui/Modal";
import Table, { TableColumn } from "../../../components/ui/Table";

interface JenisPengaduanItem {
  id: number;
  kategoriId: number;
  kategoriName: string;
  nama_jenis: string;
  code: string;
  deskripsi: string;
  createdAt: string;
}

const JenisPengaduan: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJenisPengaduan, setSelectedJenisPengaduan] = useState<JenisPengaduanItem | null>(null);
  const [formData, setFormData] = useState({
    kategoriId: "",
    code: "",
    nama_jenis: "",
    deskripsi: "",
  });

  // Available categories (from Category page - matching the HTML reference)
  const categories = [
    { id: 3, name: "Inquiry" },
    { id: 4, name: "Request" },
    { id: 5, name: "Complaint" },
  ];

  // Convert categories to DropdownOption format
  const categoryOptions: DropdownOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  // Sample data based on reference HTML
  const [jenisPengaduans, setJenisPengaduans] = useState<JenisPengaduanItem[]>([
    {
      id: 2,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Informasi Rekening",
      code: "1001",
      deskripsi: "informasi untuk rekening",
      createdAt: "29 Juli 2025 pukul 03.23.32",
    },
    {
      id: 3,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan Aktifasi Rekening Tidak Aktif (Dormant)",
      code: "1050",
      deskripsi: "Pada case ini yaitu Nasabah merasa tidak puas dengan pelayanan yang diberikan oleh Bankaltimtara (layanan frontliner)",
      createdAt: "29 Juli 2025 pukul 03.23.32",
    },
    {
      id: 4,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Pengaduan Nasabah Terkait Layanan Bankaltimtara",
      code: "1102",
      deskripsi: "Pada case ini yaitu Nasabah merasa tidak puas dengan pelayanan yang diberikan oleh Bankaltimtara (layanan frontliner)",
      createdAt: "29 Juli 2025 pukul 03.23.32",
    },
    {
      id: 5,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Top Up Saldo Speedcash Paykaltimtara Gagal namun Saldo Bankaltimtara Terdebet",
      code: "1361",
      deskripsi: "Lampirkan bukti transaksi dan cantumkan nomor akun paykaltimtara nasabah. (isi keterangan dengan detail pengaduan yg disampaikan)",
      createdAt: "29 Juli 2025 pukul 16.19.15",
    },
    {
      id: 6,
      kategoriId: 5,
      kategoriName: "Complaint",
      nama_jenis: "Tarik Tunai di ATM Bersama Gagal, Saldo Terdebet",
      code: "1203",
      deskripsi: "ATM",
      createdAt: "30 Juli 2025 pukul 07.22.59",
    },
    {
      id: 7,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan CCTV Bank Lain",
      code: "2302",
      deskripsi: "Permintaan cctv",
      createdAt: "30 Juli 2025 pukul 07.33.10",
    },
    {
      id: 8,
      kategoriId: 4,
      kategoriName: "Request",
      nama_jenis: "Permintaan Buka Blokir Kartu ATM",
      code: "1901",
      deskripsi: "Hal ini disebabkan karena nasabah salah dalam penginputan PIN ATM 3x dalam melakukan transaksi sehingga kartu ATM terblokir. Untuk melakukan buka blokir, nasabah dapat datang ke Customer Service atau menghubungi layanan Call Center untuk melakukan proses buka blokir kartu ATM. *Kartu ATM yang telah dilakukan buka blokir dapat digunakan kembali pada keesokan harinya/setelah pergantian hari. *Pembukaan blokir oleh Agent Call Center hanya 1x kesempatan, apabila terblokir kembali akibat nasabah salah pin kembali maka Agent menyarankan nasabah ke Customer Service untuk melakukan cetak PIN pengganti. *Pada Lay Call Center hanya melayani permintaan buka blokir kartu ATM karena SALAH PIN.",
      createdAt: "30 Juli 2025 pukul 07.52.24",
    },
    {
      id: 9,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Kartu ATM Expired",
      code: "1709",
      deskripsi: "Hal ini disebabkan oleh Kartu ATM Nasabah tidak dapat digunakan karena masa berlaku telah habis sehingga Nasabah disarankan untuk melakukan permintaan kartu ATM pengganti di Customer Service.",
      createdAt: "30 Juli 2025 pukul 08.05.38",
    },
    {
      id: 10,
      kategoriId: 3,
      kategoriName: "Inquiry",
      nama_jenis: "Pengaduan Nasabah terkait layanan",
      code: "9301",
      deskripsi: "pengaduan",
      createdAt: "30 Juli 2025 pukul 08.12.05",
    },
  ]);

  const filteredJenisPengaduans = jenisPengaduans.filter((item) =>
    item.kategoriName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nama_jenis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    setFormData({
      kategoriId: "",
      code: "",
      nama_jenis: "",
      deskripsi: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: JenisPengaduanItem) => {
    setSelectedJenisPengaduan(item);
    setFormData({
      kategoriId: item.kategoriId.toString(),
      code: item.code,
      nama_jenis: item.nama_jenis,
      deskripsi: item.deskripsi,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: JenisPengaduanItem) => {
    setSelectedJenisPengaduan(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedJenisPengaduan) {
      setJenisPengaduans((prev) => prev.filter((item) => item.id !== selectedJenisPengaduan.id));
      setIsDeleteModalOpen(false);
      setSelectedJenisPengaduan(null);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const day = now.getDate();
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;
  };

  const handleSubmit = () => {
    if (!formData.kategoriId) {
      alert("Kategori harus dipilih");
      return;
    }

    if (!formData.code.trim()) {
      alert("Code harus diisi");
      return;
    }

    if (!formData.nama_jenis.trim()) {
      alert("Nama Jenis harus diisi");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.id === parseInt(formData.kategoriId));
    if (!selectedCategory) {
      alert("Kategori tidak valid");
      return;
    }

    if (selectedJenisPengaduan) {
      // Update existing item
      setJenisPengaduans((prev) =>
        prev.map((item) =>
          item.id === selectedJenisPengaduan.id
            ? {
                ...item,
                kategoriId: selectedCategory.id,
                kategoriName: selectedCategory.name,
                code: formData.code,
                nama_jenis: formData.nama_jenis,
                deskripsi: formData.deskripsi || "",
              }
            : item
        )
      );
    } else {
      // Create new item
      const newItem: JenisPengaduanItem = {
        id: Math.max(...jenisPengaduans.map((j) => j.id), 0) + 1,
        kategoriId: selectedCategory.id,
        kategoriName: selectedCategory.name,
        code: formData.code,
        nama_jenis: formData.nama_jenis,
        deskripsi: formData.deskripsi || "",
        createdAt: formatDate(),
      };
      setJenisPengaduans((prev) => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedJenisPengaduan(null);
    setFormData({
      kategoriId: "",
      code: "",
      nama_jenis: "",
      deskripsi: "",
    });
  };

  const tableColumns: TableColumn<JenisPengaduanItem>[] = [
    {
      key: "no",
      header: "No.",
      align: "left",
      render: (item, index) => (
        <span className="text-[var(--text-primary)]">{index + 1}</span>
      ),
    },
    {
      key: "id",
      header: "ID",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.id}</span>
      ),
    },
    {
      key: "kategori",
      header: "Kategori",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.kategoriName}</span>
      ),
    },
    {
      key: "nama_jenis",
      header: "Nama Jenis",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)] font-medium">{item.nama_jenis}</span>
      ),
    },
    {
      key: "code",
      header: "Code",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.code}</span>
      ),
    },
    {
      key: "deskripsi",
      header: "Deskripsi",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.deskripsi}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Dibuat Pada",
      align: "left",
      render: (item) => (
        <span className="text-[var(--text-primary)]">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
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
                Jenis Pengaduan Management
              </h5>
              <p className="text-xs text-[var(--text-secondary)] m-0">
                Manage complaint types for ticket forms
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
                        placeholder="Cari jenis pengaduan..."
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
                  Tambah Jenis Complaint
                </button>
              </div>

              {/* Table */}
              {filteredJenisPengaduans.length > 0 ? (
                <Table
                  columns={tableColumns}
                  data={filteredJenisPengaduans}
                  className="bg-[var(--bg-secondary)]"
                  emptyMessage="No complaint types found"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-12">
                  <List className="w-12 h-12 text-[var(--text-tertiary)]" />
                  <p className="text-[var(--text-secondary)] font-medium">
                    Tidak ada jenis pengaduan yang tersedia
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {searchQuery
                      ? "Coba ubah kata kunci pencarian"
                      : "Buat jenis pengaduan baru untuk memulai"}
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
            setSelectedJenisPengaduan(null);
            setFormData({
              kategoriId: "",
              code: "",
              nama_jenis: "",
              deskripsi: "",
            });
          }}
          title={selectedJenisPengaduan ? "Edit Jenis Complaint" : "Tambah Jenis Complaint"}
          size="md"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedJenisPengaduan(null);
                  setFormData({
                    kategoriId: "",
                    code: "",
                    nama_jenis: "",
                    deskripsi: "",
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
                {selectedJenisPengaduan ? "Simpan Perubahan" : "Simpan"}
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Kategori <span className="text-[var(--error-color)]">*</span>
              </label>
              <Dropdown
                options={categoryOptions}
                value={formData.kategoriId ? parseInt(formData.kategoriId) : undefined}
                placeholder="-- Pilih Kategori --"
                onChange={(value) => setFormData({ ...formData, kategoriId: value.toString() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Code <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Nama Jenis <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                value={formData.nama_jenis}
                onChange={(e) => setFormData({ ...formData, nama_jenis: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20"
                placeholder="Masukkan nama jenis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg text-sm outline-none transition-colors duration-200 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 resize-y"
                placeholder="Masukkan deskripsi (opsional)"
              />
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedJenisPengaduan(null);
          }}
          title="Konfirmasi Hapus"
          size="sm"
          footer={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedJenisPengaduan(null);
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
            {selectedJenisPengaduan && (
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                "{selectedJenisPengaduan.nama_jenis}"
              </p>
            )}
          </div>
        </Modal>
      </div>
    </WorkspaceLayout>
  );
};

export default JenisPengaduan;
