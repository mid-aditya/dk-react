import { Eye, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceLayout from "../../components/WorkspaceLayout";

interface BlastThread {
  id: number;
  campaign: string;
  nama: string;
  nomor: string;
  status: "Dibalas WA" | "Telepon Langsung";
  followUpPada: string;
  balasanCustomer?: string;
  ticketNumber?: string;
}

const BlastThread: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<BlastThread | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data based on reference
  const threads: BlastThread[] = [
    {
      id: 101,
      campaign: "Black Friday 2025",
      nama: "Rina Wijaya",
      nomor: "+6282212345678",
      status: "Dibalas WA",
      followUpPada: "08 Dec 2025, 12:52",
      balasanCustomer: "Iya min, kirim katalognya ya. Saya tertarik yang warna biru.",
      ticketNumber: "TCK-2025-1147",
    },
    {
      id: 102,
      campaign: "Promo Akhir Tahun 2025",
      nama: "Dedi Kurniawan",
      nomor: "+6281311122233",
      status: "Telepon Langsung",
      followUpPada: "08 Dec 2025, 14:52",
      balasanCustomer: "Terima kasih, saya akan pertimbangkan.",
      ticketNumber: "TCK-2025-1148",
    },
    {
      id: 103,
      campaign: "Flash Sale Weekend",
      nama: "Maya Sari",
      nomor: "+6285712345678",
      status: "Dibalas WA",
      followUpPada: "08 Dec 2025, 15:07",
      balasanCustomer: "Bisa dikirim ke alamat saya?",
      ticketNumber: "TCK-2025-1149",
    },
    {
      id: 104,
      campaign: "Promo Akhir Tahun 2025",
      nama: "Joko Susilo",
      nomor: "+6281912345678",
      status: "Telepon Langsung",
      followUpPada: "08 Dec 2025, 15:32",
      balasanCustomer: "Saya akan hubungi kembali nanti.",
      ticketNumber: "TCK-2025-1150",
    },
    {
      id: 105,
      campaign: "New Year Sale",
      nama: "Laras Putri",
      nomor: "+6285212349999",
      status: "Dibalas WA",
      followUpPada: "08 Dec 2025, 15:42",
      balasanCustomer: "Bagus sekali promonya, saya mau pesan.",
      ticketNumber: "TCK-2025-1151",
    },
  ];

  const openHistoryDetail = (threadId: number) => {
    const thread = threads.find((t) => t.id === threadId);
    if (thread) {
      setSelectedThread(thread);
      setIsModalOpen(true);
    }
  };

  const closeHistoryModal = () => {
    setIsModalOpen(false);
    setSelectedThread(null);
  };

  const getStatusColor = (status: string) => {
    if (status === "Dibalas WA") {
      return "bg-emerald-900/40 text-emerald-300";
    } else if (status === "Telepon Langsung") {
      return "bg-amber-900/40 text-amber-300";
    }
    return "bg-gray-900/40 text-gray-300";
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="p-6">
            <div className="min-h-screen">
              {/* Table Container */}
              <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[var(--bg-tertiary)]/60 border-b border-[var(--border-color)]">
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          No
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Campaign
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Nama
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Nomor
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Status
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Follow Up Pada
                        </th>
                        <th className="px-6 py-5 text-center text-xs font-bold text-[var(--text-secondary)] uppercase">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {threads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                            Tidak ada thread yang ditemukan
                          </td>
                        </tr>
                      ) : (
                        threads.map((thread, index) => (
                          <tr
                            key={thread.id}
                            className="hover:bg-[var(--bg-tertiary)]/50 transition-all"
                          >
                            <td className="px-6 py-5 text-sm text-[var(--text-secondary)]">
                              {index + 1}
                            </td>
                            <td className="px-6 py-5">
                              <span className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-xs">
                                {thread.campaign}
                              </span>
                            </td>
                            <td className="px-6 py-5 font-medium text-[var(--text-primary)]">
                              {thread.nama}
                            </td>
                            <td className="px-6 py-5 text-cyan-400">{thread.nomor}</td>
                            <td className="px-6 py-5">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${getStatusColor(thread.status)}`}
                              >
                                {thread.status}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-sm text-[var(--text-secondary)]">
                              {thread.followUpPada}
                            </td>
                            <td className="px-6 py-5 text-center">
                              <button
                                onClick={() => openHistoryDetail(thread.id)}
                                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 text-[var(--text-primary)] mx-auto"
                              >
                                <Eye className="w-4 h-4" />
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal History */}
        {isModalOpen && selectedThread && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeHistoryModal}
          >
            <div
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl max-w-3xl w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  Detail History Thread
                </h2>
                <button
                  onClick={closeHistoryModal}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-4xl leading-none transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[var(--text-secondary)]">Status</p>
                    <p className={`text-2xl font-bold mt-2 ${
                      selectedThread.status === "Dibalas WA"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}>
                      {selectedThread.status === "Dibalas WA"
                        ? "Dibalas via WhatsApp"
                        : "Dibalas via Telepon"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-secondary)]">Waktu Follow Up</p>
                    <p className="text-xl font-semibold text-[var(--text-primary)] mt-2">
                      {selectedThread.followUpPada} WIB
                    </p>
                  </div>
                </div>

                {selectedThread.balasanCustomer && (
                  <div className="bg-[var(--bg-tertiary)]/70 p-6 rounded-xl">
                    <p className="text-[var(--text-secondary)] mb-3">Balasan dari Customer:</p>
                    <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                      "{selectedThread.balasanCustomer}"
                    </p>
                  </div>
                )}

                {selectedThread.ticketNumber && (
                  <div>
                    <p className="text-[var(--text-secondary)]">Ticket yang Dibuat</p>
                    <Link
                      to={`/ticket/${selectedThread.ticketNumber}`}
                      className="inline-block mt-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-xl transition-all duration-200 text-white"
                    >
                      Lihat Ticket #{selectedThread.ticketNumber} →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};

export default BlastThread;
