import React, { useState } from 'react';
import BaseKnowledge from '../../components/ticketing/BaseKnowledge';
import EndChatTicket from '../../components/ticketing/EndChatTicket';
import History from '../../components/ticketing/History';
import Overview from '../../components/ticketing/Overview';
import Tabs from '../../components/ticketing/Tabs';
import CallUI from '../../components/ui/CallUI';
import ChatInput from '../../components/ui/ChatInput';
import { JourneyStep } from '../../components/ui/Journey';
import MessageBubble from '../../components/ui/MessageBubble';
import ThemeSwitcher, { ThemeType } from '../../components/ui/ThemeSwitcher';
import { useTheme } from '../../contexts/ThemeContext';
import { notifyAppReady, sendNativeNotification, updateNativeBadge } from '../../utils/NativeBridge';

const OmnichatMobile: React.FC = () => {
    const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme();

    // -- Native Integration Examples
    // 1. Unread Count handling
    // 2. Notification triggering
    const [unreadCount, setUnreadCount] = useState(0);

    // Initial Bridge handshake
    React.useEffect(() => {
        // Signal native app that web is ready
        notifyAppReady();

        // Check for theme mode in URL
        const params = new URLSearchParams(window.location.search);
        const modeParam = params.get('mode');
        if (modeParam === 'light' || modeParam === 'dark') {
            if (modeParam !== globalTheme) {
                setGlobalTheme(modeParam);
            }
        }

        // Expose function for native app to switch theme dynamically
        (window as any).setThemeMode = (mode: 'light' | 'dark') => {
            if (mode === 'light' || mode === 'dark') {
               setGlobalTheme(mode);
            }
        };

        return () => {
            delete (window as any).setThemeMode;
        };
    }, [globalTheme, setGlobalTheme]);

    // Sync Badge whenever count changes
    React.useEffect(() => {
        updateNativeBadge(unreadCount);
    }, [unreadCount]);

    // Simulate incoming message for testing
    const simulateIncomingMessage = () => {
        const newCount = unreadCount + 1;
        setUnreadCount(newCount);
        sendNativeNotification('New Message', `You have ${newCount} unread messages`);
    };
    // -- End Native Integration
  const [theme, setTheme] = useState<ThemeType>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('spektra')) return 'red-theme';
    if (params.has('amitra')) return 'green-theme';
    return 'blue-theme'; // Default or 'fif'
  });
  const [activeTab, setActiveTab] = useState('my-open');
  const [activeDetailTab, setActiveDetailTab] = useState('base-knowledge');
  const [selectedChat, setSelectedChat] = useState<string>('chat1');
  const [currentView, setCurrentView] = useState<'inbox' | 'chat' | 'details'>('inbox');

  // Detection for calling state from URL (Customer Mode Removed)
  const initialCalling = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('calling');
  }, []);

  const [isCalling, setIsCalling] = useState(initialCalling);
  const [callStatus, setCallStatus] = useState<'Ringing...' | 'Active' | 'On Hold' | 'Ended'>('Ringing...');
  const [isMuted, setIsMuted] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [showTicketStatus, setShowTicketStatus] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('Connected');
  const [ticketNote, setTicketNote] = useState('Pelanggan menanyakan status pengiriman yang terlambat.');

  // Masking helpers
  const maskName = (name: string) => {
    const parts = name.split(' ');
    // return parts.map(p => p[0] + '*'.repeat(Math.max(0, p.length - 1))).join(' ');
    // Unmask for Agent view
    return name;
  };

  const maskHandle = (handle: string) => {
    if (!handle) return '';
    // return handle[0] + handle[1] + '*'.repeat(Math.max(0, handle.length - 3)) + handle.slice(-1);
    // Unmask for Agent view
    return handle; 
  };

  // Timeline tickets data
  const timelineTickets: JourneyStep[] = [
    {
      id: 'ticket1',
      label: '#JKT-9374-3U128',
      icon: '/assets/icons/instagram.svg',
      iconType: 'image',
      isCompleted: true,
      tooltip: 'Instagram Ticket - Oct 19, 2025'
    },
    {
      id: 'ticket2',
      label: '#JKT-9374-3U129',
      icon: '/assets/icons/facebook.svg',
      iconType: 'image',
      isCompleted: true,
      tooltip: 'Facebook Ticket - Oct 20, 2025'
    },
    {
      id: 'ticket3',
      label: '#JKT-9374-3U130',
      icon: '/assets/icons/x.png',
      iconType: 'image',
      isCompleted: true,
      tooltip: 'Twitter Ticket - Oct 21, 2025'
    },
    {
      id: 'ticket4',
      label: '#JKT-9374-3U131',
      icon: '/assets/icons/whatsapp.svg',
      iconType: 'image',
      isActive: true,
      tooltip: 'WhatsApp Ticket - Oct 22, 2025 (Current)'
    },
  ];

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    setCurrentView('chat');
  };

  // Removed Customer Call Block

  if (isCalling) {
    return (
      <CallUI 
        theme={theme}
        setTheme={setTheme}
        isCalling={isCalling}
        setIsCalling={setIsCalling}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isHeld={isHeld}
        setIsHeld={setIsHeld}
        callStatus={callStatus}
        setCallStatus={setCallStatus}
        ticketStatus={ticketStatus}
        setTicketStatus={setTicketStatus}
        ticketNote={ticketNote}
        setTicketNote={setTicketNote}
        onSaveTicket={() => {
          console.log('Ticket Saved (Mobile):', { ticketStatus, ticketNote });
          setIsCalling(false);
        }}
        isCustomer={false}
      />
    );
  }

  return (
    <div className={`${theme} w-full h-screen overflow-hidden bg-[var(--bg-primary)] min-w-0 box-border relative flex flex-col`}>
      {/* Inbox View */}
      {currentView === 'inbox' && (
        <div className="flex flex-col overflow-hidden w-full h-full bg-[var(--bg-secondary)]">
          <div className="pt-3 px-4 pb-0 bg-[var(--bg-secondary)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] m-0">Inbox</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-[#22c55e] text-white text-[11px] rounded-xl font-medium">Normal</span>
              </div>
            </div>
            <div className="mb-3 relative">
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none"></i>
              <input 
                type="text" 
                className="w-full py-2 pl-9 pr-3 border border-[var(--border-color)] rounded-lg text-[13px] bg-[var(--bg-primary)] text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)]" 
                placeholder="Cari"
              />
            </div>
          </div>
          <div className="flex gap-px bg-[var(--bg-secondary)] p-2 rounded-lg">
            <button 
              className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 font-medium rounded-md ${
                activeTab === 'my-open' 
                  ? 'text-white bg-[var(--brand-primary)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
              onClick={() => setActiveTab('my-open')}
            >
              <i className="bx bx-folder-open text-xs"></i>
              My Open
            </button>
            <button 
              className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 font-medium rounded-md ${
                activeTab === 'served' 
                  ? 'text-white bg-[var(--brand-primary)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
              onClick={() => setActiveTab('served')}
            >
              <i className="bx bx-bookmark text-xs"></i>
              Served
            </button>
            <button 
              className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 font-medium rounded-md ${
                activeTab === 'resolved' 
                  ? 'text-white bg-[var(--brand-primary)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
              onClick={() => setActiveTab('resolved')}
            >
              <i className="bx bx-check-circle text-xs"></i>
              Resolved
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div 
              className={`flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedChat === 'chat1' 
                  ? 'bg-[var(--bg-tertiary)] border-[var(--brand-primary)]' 
                  : 'border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]'
              }`}
              onClick={() => handleChatSelect('chat1')}
            >
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=1" 
                    alt={maskName("Wafiy Ulhaq")}
                    className="w-full h-full rounded-full object-cover block bg-[var(--bg-tertiary)]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = target.nextElementSibling as HTMLElement;
                      if (initials) {
                        initials.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--brand-gradient)] text-white absolute top-0 left-0" style={{ display: 'none' }}>W*</div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--bg-secondary)] flex items-center justify-center z-10 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  <img 
                    src="/assets/icons/instagram.svg" 
                    alt="Instagram"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">
                  {maskName("Wafiy Ulhaq")}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">Lorem ipsum dolor sit amet consectetur...</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)]">12:33 PM</span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>
            
             <div 
              className={`flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedChat === 'chat2' 
                  ? 'bg-[var(--bg-tertiary)] border-[var(--brand-primary)]' 
                  : 'border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]'
              }`}
              onClick={() => handleChatSelect('chat2')}
            >
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=2" 
                    alt={maskName("Amina Farooq")}
                    className="w-full h-full rounded-full object-cover block bg-[var(--bg-tertiary)]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = target.nextElementSibling as HTMLElement;
                      if (initials) {
                        initials.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--brand-gradient)] text-white absolute top-0 left-0" style={{ display: 'none' }}>A*</div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--bg-secondary)] flex items-center justify-center z-10 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  <img 
                    src="/assets/icons/facebook.svg" 
                    alt="Facebook"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">
                  {maskName("Amina Farooq")}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">Consectetur adipiscing elit</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)]">14:15 PM</span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>

            <div 
              className={`flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedChat === 'chat3' 
                  ? 'bg-[var(--bg-tertiary)] border-[var(--brand-primary)]' 
                  : 'border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]'
              }`}
              onClick={() => handleChatSelect('chat3')}
            >
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=3" 
                    alt={maskName("Zainab Aftab")}
                    className="w-full h-full rounded-full object-cover block bg-[var(--bg-tertiary)]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = target.nextElementSibling as HTMLElement;
                      if (initials) {
                        initials.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--brand-gradient)] text-white absolute top-0 left-0" style={{ display: 'none' }}>Z*</div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--bg-secondary)] flex items-center justify-center z-10 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  <img 
                    src="/assets/icons/x.png" 
                    alt="X (Twitter)"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">
                  {maskName("Zainab Aftab")}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">Sed do eiusmod tempor...</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)]">09:45 AM</span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat View */}
      {currentView === 'chat' && (
        <div className="flex flex-col overflow-hidden w-full h-full bg-[var(--bg-secondary)] relative">
          <div className="p-3 px-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentView('inbox')}
                  className="bg-none border-none p-0 cursor-pointer text-[var(--text-primary)] mr-1"
                >
                  <i className="bx bx-arrow-back text-xl"></i>
                </button>
                <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                  <img 
                    src="https://i.pravatar.cc/40?img=1" 
                    alt={maskName("Wafiy Ulhaq")}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/images/users/avatar-1.jpg';
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--bg-secondary)] flex items-center justify-center z-10 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    <img 
                      src="/assets/icons/instagram.svg" 
                      alt="Instagram"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] m-0">{maskName("Wafiy Ulhaq")}</h3>
                  <p className="text-xs text-[var(--text-secondary)] m-0">{maskHandle("@wafiy.ulhaq")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isCalling && (
                  <button 
                    onClick={() => {
                        setIsCalling(true);
                        setCallStatus('Ringing...');
                    }}
                    className="bg-none border-none cursor-pointer text-[var(--text-secondary)] p-1 hover:bg-[var(--bg-tertiary)] rounded-full transition-all"
                  >
                    <i className="bx bx-phone text-xl text-green-600"></i>
                  </button>
                )}
                <button 
                  className="bg-none border-none cursor-pointer text-[var(--text-secondary)] p-1 hover:bg-[var(--bg-tertiary)] rounded-full transition-all"
                  onClick={() => setCurrentView('details')}
                >
                  <i className="bx bx-info-circle text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[var(--bg-tertiary)]">
            <div className="text-center text-[11px] text-[var(--text-tertiary)] my-2">Oct 19, 2025</div>
            <div className="flex justify-center items-center my-2 w-full">
              <span className="inline-block py-2.5 px-3.5 bg-[var(--success-color)] text-white text-xs rounded-xl font-normal max-w-[70%] text-center leading-snug">
                Chat telah terhubung dengan pengguna layanan pada 19 Oct 2025, 12:33:09
              </span>
            </div>
            <MessageBubble
              message="Lorem ipsum dolor sit amet consectetur. Tempor est adipiscing tellus diam et."
              time="12:30 PM"
              isAgent={false}
              showReadIcon={true}
            />
            <MessageBubble
              message="Hey Wafiy, thanks for reaching out! Let me check on that for you."
              time="12:32 PM"
              isAgent={true}
              showReadIcon={true}
            />
            <MessageBubble
              message="I need help with my order #12345"
              time="12:33 PM"
              isAgent={false}
              showReadIcon={false}
            />
            <MessageBubble
              message="Sure, I can help you with that. Let me look up your order details."
              time="12:34 PM"
              isAgent={true}
              showReadIcon={true}
            />
            <MessageBubble
              message="Thank you! I've been waiting for 3 days now."
              time="12:35 PM"
              isAgent={false}
              showReadIcon={false}
            />
            <MessageBubble
              message="I understand your concern. I found your order and it's currently being processed. It should be shipped tomorrow."
              time="12:36 PM"
              isAgent={true}
              showReadIcon={true}
            />
          </div>
          <ChatInput
            placeholder="Type Message"
            onSend={(message, files) => {
              console.log('Message:', message);
              console.log('Files:', files);
            }}
            showAttachButton={true}
            showPlusButton={true}
            enableDragDrop={false}
          />
        </div>
      )}

      {/* Details View */}
      {currentView === 'details' && (
        <div className="flex flex-col overflow-hidden w-full h-full bg-[var(--bg-secondary)]">
          <div className="p-3 px-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0 flex items-center gap-2">
            <button 
              onClick={() => setCurrentView('chat')}
              className="bg-none border-none p-0 cursor-pointer text-[var(--text-primary)]"
            >
              <i className="bx bx-arrow-back text-xl"></i>
            </button>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] m-0">Details</h3>
          </div>
          <Tabs 
            activeTab={activeDetailTab} 
            onTabChange={setActiveDetailTab}
            showBaseKnowledge={true}
          />
          <div className="flex-1 overflow-y-auto">
            {activeDetailTab === 'base-knowledge' && <BaseKnowledge />}
            {activeDetailTab === 'overview' && (
              <Overview maskData={true} />
            )}
            {activeDetailTab === 'end-chat' && <EndChatTicket />}
            {activeDetailTab === 'history' && <History />}
          </div>
        </div>
      )}
      
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </div>
  );
};

export default OmnichatMobile;
