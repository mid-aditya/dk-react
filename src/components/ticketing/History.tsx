import React, { useState } from 'react';
import Dropdown, { DropdownOption } from '../ui/Dropdown';
import Journey, { JourneyStep } from '../ui/Journey';

interface Ticket {
  id: string;
  ticketId: string;
  code: string;
  source: {
    name: string;
    icon: string;
  };
  description: string;
  date: string;
  platform?: string;
  layer?: string;
  created?: string;
  subject?: string;
}

const History: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    note: '',
    isEskalasi: false
  });

  const statusOptions: DropdownOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  // Map source name to icon path
  const getSourceIconPath = (sourceName: string): string => {
    const iconMap: Record<string, string> = {
      'Instagram': '/assets/icons/instagram.svg',
      'Facebook': '/assets/icons/facebook.svg',
      'Twitter': '/assets/icons/x.png',
      'WhatsApp': '/assets/icons/whatsapp.svg',
      'WhatsApp Business': '/assets/icons/whatsapp-business.svg',
      'Telegram': '/assets/icons/telegram.svg',
      'YouTube': '/assets/icons/youtube.svg',
      'App Store': '/assets/icons/appstore.svg',
      'Play Store': '/assets/icons/playstore.svg',
    };
    return iconMap[sourceName] || '/assets/icons/profile.png';
  };

  // Journey steps for ticket detail
  const getJourneySteps = (ticket: Ticket): JourneyStep[] => {
    const currentLayer = ticket.layer || 'Layer 1';
    const layerNum = parseInt(currentLayer.replace('Layer ', '')) || 1;
    const sourceIcon = getSourceIconPath(ticket.source.name);
    
    return [
      {
        id: 'start',
        label: 'Start Layer',
        icon: sourceIcon,
        iconType: 'image',
        isCompleted: true,
        tooltip: `Ticket Started - ${ticket.source.name}`
      },
      {
        id: 'layer2',
        label: 'Layer 2',
        icon: '/assets/icons/profile.png',
        iconType: 'image',
        isCompleted: layerNum >= 2,
        isActive: layerNum === 2,
        tooltip: layerNum >= 2 ? 'Completed' : 'Pending'
      },
      {
        id: 'layer3',
        label: 'Layer 3',
        icon: '/assets/icons/profile.png',
        iconType: 'image',
        isCompleted: layerNum >= 3,
        isActive: layerNum === 3,
        tooltip: layerNum >= 3 ? 'Completed' : 'Pending'
      },
      {
        id: 'end',
        label: 'End Layer',
        icon: '/assets/icons/profile.png',
        iconType: 'image',
        isCompleted: layerNum >= 4,
        isActive: layerNum === 4,
        tooltip: layerNum >= 4 ? 'Completed' : 'Pending'
      },
    ];
  };

  const handleUpdateClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsUpdateMode(true);
    // Pre-fill form with ticket data
    setUpdateData({
      status: '',
      note: '',
      isEskalasi: false
    });
  };

  const handleUpdateSubmit = () => {
    if (!selectedTicket) return;
    // Handle update logic here
    console.log('Updating ticket:', selectedTicket.id, updateData);
    setIsUpdateMode(false);
    setSelectedTicket(null);
    setUpdateData({
      status: '',
      note: '',
      isEskalasi: false
    });
  };

  const handleCancelUpdate = () => {
    setIsUpdateMode(false);
    setSelectedTicket(null);
    setUpdateData({
      status: '',
      note: '',
      isEskalasi: false
    });
  };
  const tickets: Ticket[] = [
    {
      id: '1',
      ticketId: '#JKT-9374-3U128',
      code: '2341',
      source: {
        name: 'Instagram',
        icon: 'fab fa-instagram'
      },
      description: 'Lorem ipsum dolor sit amet consectetur. Tempor est adipiscing tellus diam et.',
      date: 'Oct 19, 2025',
      platform: 'Instagram',
      layer: 'Layer 1',
      created: 'Oct 19, 2025, 12:33:09',
      subject: 'Informasi Rekening'
    },
    {
      id: '2',
      ticketId: '#JKT-9375-3U129',
      code: '2342',
      source: {
        name: 'Facebook',
        icon: 'fab fa-facebook'
      },
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'Oct 20, 2025',
      platform: 'Facebook',
      layer: 'Layer 1',
      created: 'Oct 20, 2025, 14:15:30',
      subject: 'Pertanyaan Produk'
    },
    {
      id: '3',
      ticketId: '#JKT-9376-3U130',
      code: '2343',
      source: {
        name: 'Twitter',
        icon: 'fab fa-twitter'
      },
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: 'Oct 21, 2025',
      platform: 'Twitter',
      layer: 'Layer 1',
      created: 'Oct 21, 2025, 09:45:12',
      subject: 'Komplain Layanan'
    },
  ];

  return (
    <>
      {selectedTicket && isUpdateMode ? (
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-4 px-6 border-b border-[var(--border-color)] flex items-center gap-3 flex-shrink-0">
            <button 
              className="w-8 h-8 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
              onClick={handleCancelUpdate}
            >
              <i className="bx bx-arrow-back"></i>
            </button>
            <h3 className="text-base font-semibold text-[var(--text-primary)] m-0 flex-1">Update Ticket</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                Ticket ID
              </label>
              <input 
                type="text" 
                className="w-full py-2.5 px-3.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)] box-border" 
                value={selectedTicket.ticketId}
                readOnly
              />
            </div>
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                Status
              </label>
              <Dropdown
                options={statusOptions}
                value={updateData.status}
                placeholder="Select status"
                onChange={(value) => setUpdateData(prev => ({ ...prev, status: value as string }))}
              />
            </div>
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                Note
              </label>
              <textarea
                className="w-full py-2.5 px-3.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] text-sm outline-none transition-all duration-200 resize-y min-h-[100px] font-inherit box-border focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)]"
                placeholder="Enter note..."
                value={updateData.note}
                onChange={(e) => setUpdateData(prev => ({ ...prev, note: e.target.value }))}
              />
            </div>
            <div className="flex items-start gap-3 mt-5">
              <input 
                type="checkbox" 
                className="w-[18px] h-[18px] cursor-pointer mt-0.5 flex-shrink-0" 
                id="update-eskalasi"
                checked={updateData.isEskalasi}
                onChange={(e) => setUpdateData(prev => ({ ...prev, isEskalasi: e.target.checked }))}
              />
              <label htmlFor="update-eskalasi" className="text-[13px] text-[var(--text-secondary)] leading-normal">
                Eskalasi ke Layer Berikutnya
                <br />
                <span className="text-[11px] text-[var(--text-tertiary)]">
                  Centang jika ticket memerlukan eskalasi ke layer berikutnya
                </span>
              </label>
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border-color)]">
              <button 
                className="flex-1 py-2.5 px-5 border border-[var(--border-color)] rounded-md text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]"
                onClick={handleCancelUpdate}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-2.5 px-5 border border-[var(--brand-primary)] rounded-md text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)] hover:-translate-y-px hover:shadow-[0_2px_8px_var(--brand-alpha)]"
                onClick={handleUpdateSubmit}
              >
                <i className="bx bx-save"></i>
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      ) : selectedTicket ? (
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-4 px-6 border-b border-[var(--border-color)] flex items-center gap-3 flex-shrink-0">
            <button 
              className="w-8 h-8 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
              onClick={() => setSelectedTicket(null)}
            >
              <i className="bx bx-arrow-back"></i>
            </button>
            <h3 className="text-base font-semibold text-[var(--text-primary)] m-0 flex-1">Detail Ticket</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Ticket ID</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.ticketId}</div>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Platform</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.platform || selectedTicket.source.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Code</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.code}</div>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Layer</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.layer || 'N/A'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 col-span-full">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Created</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.created || selectedTicket.date}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 col-span-full">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Subject</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.subject || 'N/A'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 col-span-full">
                <div>
                  <span className="text-xs text-[var(--text-secondary)] mb-2 block">Description</span>
                  <div className="text-sm text-[var(--text-primary)] font-medium">{selectedTicket.description}</div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-xs text-[var(--text-secondary)] mb-4 block">Ticket Journey</span>
              <Journey steps={getJourneySteps(selectedTicket)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-5 relative">
            <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-base pointer-events-none"></i>
            <input 
              type="text" 
              className="w-full py-2.5 px-4 pl-10 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)]" 
              placeholder="Cari"
            />
          </div>
          <div className="flex flex-col gap-3">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[var(--bg-secondary)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col gap-2">
                    <span className="inline-block py-1 px-2.5 bg-[var(--brand-primary)] text-white text-[11px] font-semibold rounded-xl font-mono w-fit">{ticket.ticketId}</span>
                    <div className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-[var(--bg-tertiary)] rounded-xl text-[11px] w-fit">
                      <span className="text-[var(--text-secondary)]">N/A</span>
                      <span className="text-[var(--brand-primary)] font-semibold">Code: {ticket.code}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className={`${ticket.source.icon} w-6 h-6 flex items-center justify-center text-[var(--text-primary)] text-lg`}></i>
                    <span className="text-[13px] text-[var(--text-primary)] font-medium">{ticket.source.name}</span>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">{ticket.description}</div>
                <div className="text-xs text-[var(--text-tertiary)]">{ticket.date}</div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-color)]">
                  <button 
                    className="flex-1 py-2 px-4 border border-[var(--border-color)] rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[13px] font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateClick(ticket);
                    }}
                  >
                    <i className="bx bx-edit"></i>
                    Update
                  </button>
                  <button 
                    className="flex-1 py-2 px-4 border border-[var(--brand-primary)] rounded-md bg-[var(--brand-primary)] text-white text-[13px] font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[var(--brand-primary)] hover:-translate-y-px hover:shadow-[0_2px_8px_var(--brand-alpha)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicket(ticket);
                    }}
                  >
                    <i className="bx bx-info-circle"></i>
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default History;

