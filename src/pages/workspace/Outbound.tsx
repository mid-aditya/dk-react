import React, { useState } from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';
import EndChatTicket from '../../components/ticketing/EndChatTicket';
import History from '../../components/ticketing/History';
import Overview from '../../components/ticketing/Overview';
import Tabs from '../../components/ticketing/Tabs';
import UserJourney from '../../components/ticketing/UserJourney';
import Dropdown, { DropdownOption } from '../../components/ui/Dropdown';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  tagihan?: number;
  badge?: number;
}

const Outbound: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string>('john');
  const [description, setDescription] = useState<string | number>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  const descriptionOptions: DropdownOption[] = [
    { value: 'all', label: 'All Descriptions' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const contacts: Contact[] = [
    { id: 'john', name: 'john', phone: '622130142896', email: 'john@gmail.com', address: 'tajur', tagihan: 150000, badge: 1 },
    { id: 'husein', name: 'husein', phone: '812345672' },
    { id: 'doni', name: 'doni', phone: '812345674' },
    { id: 'jouanda', name: 'Jouanda', phone: '0895345622020' },
    { id: 'yoan', name: 'Yoan', phone: '812345678' },
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <WorkspaceLayout>
      <div className="w-full h-full p-0 m-0 flex gap-0 overflow-hidden bg-[var(--bg-primary)] min-w-0 box-border relative">
        {/* Left Panel - Contacts List */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative w-[400px] flex-shrink-0 last:border-r-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <i className="bx bx-phone text-lg"></i>
              Contacts List
            </h2>
            <i className="bx bx-chevron-down text-lg text-[var(--text-secondary)] cursor-pointer"></i>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-[var(--border-color)] space-y-3">
            <Dropdown
              options={descriptionOptions}
              value={description}
              placeholder="All Descriptions"
              onChange={(value) => setDescription(value)}
              size="sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-color)]"
                  placeholder="hh/bb/tttt"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-secondary)] mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-color)]"
                  placeholder="hh/bb/tttt"
                />
              </div>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full py-2 px-3 text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-b border-[var(--border-color)] flex gap-2">
            <button className="flex-1 py-2 px-3 text-xs font-medium bg-[var(--accent-color)] text-white rounded-lg hover:bg-[#2563EB]/90 transition-colors">
              Manual Pick
            </button>
            <button className="flex-1 py-2 px-3 text-xs font-medium bg-[var(--success-color)] text-white rounded-lg hover:bg-[var(--success-color)]/90 transition-colors">
              Ready to call
            </button>
            <button className="flex-1 py-2 px-3 text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
              Reminder
            </button>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-3 cursor-pointer transition-colors border-b border-[var(--border-color)] ${
                  selectedContact === contact.id
                    ? 'bg-[var(--success-color)]/20'
                    : 'hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
                    <i className="bx bx-user text-xl text-[var(--text-secondary)]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {contact.name}
                      </p>
                      {contact.badge && (
                        <span className="bg-[#2563EB] text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                          {contact.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{contact.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Panel - Contact Profile */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative flex-1 min-w-[400px] last:border-r-0">
          {selectedContactData ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">Contact Profile</h2>
              </div>

              {/* Contact Info */}
              <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
                    <i className="bx bx-user text-3xl text-[var(--text-secondary)]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                      {selectedContactData.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedContactData.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[var(--success-color)] text-white rounded-lg hover:bg-[var(--success-color)]/90 transition-colors flex items-center gap-2">
                      <i className="bx bx-phone text-lg"></i>
                      Call
                    </button>
                    <button className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-2">
                      <i className="bx bx-x text-lg"></i>
                      Drop
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {selectedContactData.email && (
                    <p className="text-[var(--text-primary)]">
                      <span className="font-medium">Email:</span> {selectedContactData.email}
                    </p>
                  )}
                  {selectedContactData.address && (
                    <p className="text-[var(--text-primary)]">
                      <span className="font-medium">Address:</span> {selectedContactData.address}
                    </p>
                  )}
                  {selectedContactData.tagihan && (
                    <p className="text-[var(--text-primary)]">
                      <span className="font-medium">Tagihan:</span> Rp{selectedContactData.tagihan.toLocaleString('id-ID')}
                    </p>
                  )}
                </div>
              </div>

              {/* Script Outbound */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                    Script Outbound: SCRIPT OUTBOUND CALL MEGAVISION
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Tujuan (Objective):</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Menawarkan paket Internet + TV Kabel (Silver/Gold/OTT)
                    </p>
                  </div>
                </div>

                {/* Section 1: Pembukaan */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    1. Pembukaan (10-15 detik)
                  </h4>
                  <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4 mb-3">
                    <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">
                      Gunakan nada ramah dan percaya diri.
                    </p>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      "Selamat pagi/siang, Pak/Bu [Nama]. Saya [Nama Agent] dari Megavision. Apakah ini waktu yang tepat untuk berbincang sebentar?"
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)] mb-1">
                        Jika penerima merespons positif:
                      </p>
                      <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3">
                        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                          "Terima kasih. Saya menghubungi karena Megavision sedang menawarkan promo spesial paket Internet dan TV Kabel termurah dengan jaringan super cepat dan stabil. Boleh saya tahu, saat ini Bapak/Ibu sudah menggunakan layanan internet/TV kabel di rumah?"
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--text-primary)] mb-1">
                        Jika penerima sibuk:
                      </p>
                      <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3">
                        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                          "Oh, tidak masalah. Kapan waktu yang lebih nyaman untuk saya menghubungi kembali? Besok pagi/siang?"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Penjajakan Kebutuhan */}
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    2. Penjajakan Kebutuhan (30 detik)
                  </h4>
                  <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      Ajukan pertanyaan untuk memahami kebutuhan pelanggan
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[var(--text-secondary)]">Select a contact to view profile</p>
            </div>
          )}
        </div>

        {/* Right Panel - Tabs */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative w-[430px] flex-shrink-0 last:border-r-0">
          <div className="pt-2 pb-0">
            <Tabs
              activeTab={activeDetailTab}
              onTabChange={setActiveDetailTab}
              showUserJourneys={true}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeDetailTab === 'user-journeys' && <UserJourney />}
            {activeDetailTab === 'overview' && <Overview />}
            {activeDetailTab === 'end-chat' && <EndChatTicket />}
            {activeDetailTab === 'history' && <History />}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Outbound;
