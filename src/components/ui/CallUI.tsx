import React, { useEffect, useMemo, useState } from 'react';
import Dropdown from './Dropdown';
import { ThemeType } from './ThemeSwitcher';

interface CallUIProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isCalling: boolean;
  setIsCalling: (calling: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isHeld?: boolean;
  setIsHeld?: (held: boolean) => void;
  callStatus: string;
  setCallStatus?: (status: any) => void;
  // Ticket props (for Agent)
  ticketStatus?: string;
  setTicketStatus?: (status: string) => void;
  ticketNote?: string;
  setTicketNote?: (note: string) => void;
  onSaveTicket?: () => void;
  // Role
  isCustomer?: boolean;
  onEndCall?: () => void;
}

const CallUI: React.FC<CallUIProps> = ({
  isCalling,
  setIsCalling,
  isMuted,
  setIsMuted,
  isHeld = false,
  setIsHeld = () => {},
  callStatus,
  setCallStatus = () => {},
  ticketStatus = '',
  setTicketStatus = () => {},
  ticketNote = '',
  setTicketNote = () => {},
  onSaveTicket = () => {},
  isCustomer = false,
  onEndCall,
}) => {
  const [showTicketing, setShowTicketing] = useState(false);
  const [showControls, setShowControls] = useState(false); // Animation trigger

  useEffect(() => {
    if (isCalling) {
      setTimeout(() => setShowControls(true), 500);
    } else {
      setShowControls(false);
    }
  }, [isCalling]);

  const { brandTheme, brandLogo } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('spektra')) {
      return { brandTheme: 'red-theme', brandLogo: '/assets/fif/fif-merah.png' };
    } else if (params.has('amitra')) {
      return { brandTheme: 'green-theme', brandLogo: '/assets/fif/fif-hijau.png' };
    } else if (params.has('fif')) {
      return { brandTheme: 'blue-theme', brandLogo: '/assets/fif/fif.png' };
    }
    return { brandTheme: 'blue-theme', brandLogo: null };
  }, []);

  const handleAcceptCall = () => {
    setCallStatus('Active');
  };

  const handleDeclineCall = () => {
    if (onEndCall) {
      onEndCall();
    } else {
      setIsCalling(false);
      setCallStatus('Ended');
    }
  };

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    } else {
      setIsCalling(false);
      setCallStatus('Ended');
    }
  };

  // -- RENDER STATES --

  // 1. Idle State (Customer Only) - Ready to Call
  if (!isCalling && isCustomer) {
    return (
      <div className={`${brandTheme} w-full h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] p-6 relative overflow-hidden animate-[fadeIn_0.5s_ease-out]`}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-primary)] opacity-5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--brand-primary)] opacity-5 rounded-full blur-[100px]"></div>

        <div className="flex flex-col items-center max-w-[400px] w-full text-center z-10">
          <div className="mb-8 relative">
             <div className="w-32 h-32 rounded-full bg-[var(--brand-gradient)] p-1 shadow-2xl relative z-10">
                <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden border-4 border-[var(--bg-primary)]">
                  {brandLogo ? (
                    <img src={brandLogo} alt="Brand Logo" className="w-[80%] h-auto object-contain" />
                  ) : (
                    <i className="bx bx-headphone text-6xl text-[var(--brand-primary)]"></i>
                  )}
                </div>
             </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Customer Support</h2>
          <p className="text-[var(--text-secondary)] mb-12">Siap membantu anda kapan saja</p>

          <button 
            onClick={() => {
              setIsCalling(true);
              setCallStatus('Ringing...'); // Simulate outgoing ring
            }}
            className="group relative flex flex-col items-center gap-3"
          >
            <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(22,163,74,0.4)] transition-all transform group-hover:scale-110 group-active:scale-95">
              <i className="bx bx-phone text-4xl"></i>
            </div>
            <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Mulai Panggilan</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Ringing State (Incoming for Agent, Outgoing for Customer)
  // We assume 'Ringing...' is the status for this visual
  if (isCalling && (callStatus === 'Ringing...' || callStatus === 'Ringing')) {
    const isIncoming = !isCustomer; // Agent receives call, Customer makes call (simplified)
    
    return (
      <div className={`${brandTheme} w-full h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] p-0 m-0 overflow-hidden relative backdrop-blur-md`}>
         {/* Background Ambient */}
         <div className="absolute inset-0 bg-[var(--brand-primary)] opacity-10 z-0"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-primary)] opacity-20 rounded-full blur-[150px] animate-pulse"></div>

         <div className="z-10 flex flex-col items-center justify-between h-[80vh] w-full max-w-md py-10">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--bg-primary)] p-1.5 shadow-2xl relative mx-auto">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] relative z-10 bg-white flex items-center justify-center">
                      <img 
                        src={isCustomer ? (brandLogo || "/assets/icons/user.png") : "https://i.pravatar.cc/150?img=12"} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<i class="bx bx-user text-6xl text-gray-400"></i>';
                        }}
                      />
                    </div>
                    {/* Ringing waves */}
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--brand-primary)] opacity-60 animate-[ping_1.5s_ease-out_infinite]"></div>
                    <div className="absolute inset-[-20px] rounded-full border border-[var(--brand-primary)] opacity-30 animate-[ping_2s_ease-out_infinite_0.5s]"></div>
                 </div>
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-1 text-center">{isCustomer ? 'Calling Support...' : 'Incoming Call'}</h2>
              <p className="text-[var(--text-secondary)] text-lg animate-pulse">{isCustomer ? 'Connecting you to an agent' : 'Customer • 0812-3456-7890'}</p>
            </div>

            <div className="w-full px-10">
               {isIncoming ? (
                 <div className="flex items-center justify-center gap-16 w-full">
                    <div className="flex flex-col items-center gap-2">
                       <button onClick={handleDeclineCall} className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-95">
                          <i className="bx bx-phone-off text-3xl"></i>
                       </button>
                       <span className="text-xs font-semibold text-[var(--text-secondary)]">Decline</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <button onClick={handleAcceptCall} className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all active:scale-95">
                          <i className="bx bx-phone text-4xl"></i>
                       </button>
                       <span className="text-xs font-semibold text-[var(--text-secondary)]">Accept</span>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-4">
                    <button onClick={handleEndCall} className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-95">
                       <i className="bx bx-phone-off text-4xl"></i>
                    </button>
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">Cancel Call</span>
                 </div>
               )}
            </div>
         </div>
      </div>
    );
  }

  // 3. Active Call State
  return (
    <div className={`${brandTheme} w-full h-screen flex flex-col md:flex-row bg-[var(--bg-primary)] p-0 m-0 overflow-hidden relative`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--brand-primary)] opacity-5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--brand-primary)] opacity-5 rounded-full blur-[100px]"></div>

      {/* Main Call Area */}
      <div className={`flex-1 flex flex-col items-center justify-center z-10 p-6 md:p-10 text-center transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative mb-6 md:mb-8 pt-4">
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--brand-gradient)] p-1 shadow-2xl relative">
              <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden border-4 border-[var(--bg-primary)]">
                {brandLogo && !isCustomer ? (
                   // Agent sees logo? No, Agent sees Customer avatar usually. 
                   // Let's swap: Customer sees Brand Logo. Agent sees User Avatar/Placeholder.
                   isCustomer ? <img src={brandLogo} alt="Brand" className="w-[80%] h-auto object-contain" /> : <i className="bx bx-user text-6xl text-[var(--brand-primary)]"></i>
                ) : (
                   isCustomer ? <img src={brandLogo || '/assets/fif/fif.png'} alt="Brand" className="w-[80%] h-auto object-contain" /> : <i className="bx bx-user text-6xl text-[var(--brand-primary)]"></i>
                )}
              </div>
              <div className="absolute top-1 md:top-2 right-1 md:right-2 w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded-full border-2 md:border-4 border-[var(--bg-primary)] animate-pulse"></div>
           </div>
           {callStatus === 'Active' && (
             <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 m-auto rounded-full border-2 border-[var(--brand-primary)] opacity-20 animate-[ping_2s_infinite]"></div>
           )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
          {isCustomer ? 'Customer Support' : 'Customer Name'}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 md:mb-10 tracking-widest font-mono text-base md:text-lg">{callStatus} • 05:23</p>

        {/* Controls Grid */}
        <div className="grid grid-cols-4 gap-4 md:flex md:items-center md:gap-8">
          {/* Mute Button (Both) */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] cursor-pointer flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
            >
              <i className={`bx ${isMuted ? 'bx-microphone-off' : 'bx-microphone'} text-xl md:text-2xl`}></i>
            </button>
            <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Mute</span>
          </div>

          {/* Hold Button (Agent Only) */}
          {!isCustomer && (
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => {
                  const newHeld = !isHeld;
                  setIsHeld(newHeld);
                  setCallStatus(newHeld ? 'On Hold' : 'Active');
                }}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] cursor-pointer flex items-center justify-center transition-all ${isHeld ? 'bg-yellow-500 border-yellow-500 text-white shadow-lg' : 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
              >
                <i className={`bx bx-pause text-xl md:text-2xl`}></i>
              </button>
              <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Hold</span>
            </div>
          )}

          {/* Speaker Button (Customer Only) */}
          {isCustomer && (
             <div className="flex flex-col items-center gap-2">
             <button 
               className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] cursor-pointer flex items-center justify-center transition-all bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]`}
             >
               <i className={`bx bx-volume-full text-xl md:text-2xl`}></i>
             </button>
             <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Speaker</span>
           </div>
          )}

          {/* Ticket Button (Agent Only) */}
          {!isCustomer && (
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => setShowTicketing(!showTicketing)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] cursor-pointer flex items-center justify-center transition-all ${showTicketing ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-lg' : 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
              >
                <i className="bx bx-receipt text-xl md:text-2xl"></i>
              </button>
              <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Ticket</span>
            </div>
          )}

          {/* Keypad Button (Optional, both can have it, simplified here) */}
          <div className="flex flex-col items-center gap-2 hidden md:flex">
             <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] cursor-pointer flex items-center justify-center transition-all">
                <i className="bx bx-dialpad text-xl md:text-2xl"></i>
             </button>
             <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Keypad</span>
          </div>

          {/* End Call Button */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={handleEndCall}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600 text-white border-none cursor-pointer flex items-center justify-center shadow-[0_10px_30px_rgba(220,38,38,0.4)] hover:bg-red-700 active:scale-95 transition-all"
            >
              <i className="bx bx-phone-off text-xl md:text-2xl"></i>
            </button>
            <span className="text-[10px] uppercase font-bold text-red-600">End</span>
          </div>
        </div>
      </div>

      {/* Right Section: Ticketing Panel (Agent Only) */}
      {!isCustomer && (
        <div className={`
          fixed inset-0 z-[100] md:relative md:inset-auto md:z-10
          transition-all duration-500 ease-in-out bg-[var(--bg-primary)] md:bg-[var(--bg-secondary)]
          ${showTicketing 
            ? 'translate-y-0 opacity-100 md:w-[450px] md:opacity-100 md:flex' 
            : 'translate-y-full opacity-0 md:w-0 md:opacity-0 md:hidden'}
          h-full md:border-l border-[var(--border-color)] overflow-y-auto shadow-2xl md:shadow-none
        `}>
          <div className="w-full h-full p-6 md:p-8 flex flex-col relative">
            {/* Mobile Close Handle */}
            <div className="md:hidden w-12 h-1.5 bg-[var(--border-color)] rounded-full mx-auto mb-6" onClick={() => setShowTicketing(false)}></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-alpha)] flex items-center justify-center">
                  <i className="bx bx-receipt text-xl text-[var(--brand-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] m-0">Ticketing Info</h3>
                  <p className="text-xs text-[var(--text-tertiary)] m-0">#JKT-9374-3U131</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTicketing(false)}
                className="md:hidden w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)]"
              >
                <i className="bx bx-x text-xl"></i>
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <label className="text-[11px] uppercase font-bold text-[var(--text-tertiary)] mb-2 block tracking-wider">Handling Status</label>
                <Dropdown
                  options={[
                    { value: 'Connected', label: 'Connected' },
                    { value: 'Follow Up', label: 'Follow Up' },
                    { value: 'Escalated', label: 'Escalated' },
                    { value: 'Resolved', label: 'Resolved' },
                    { value: 'No Answer', label: 'No Answer' },
                  ]}
                  value={ticketStatus}
                  onChange={(val) => setTicketStatus(val as string)}
                  placeholder="Select Status"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold text-[var(--text-tertiary)] mb-2 block tracking-wider">Resolution Notes</label>
                <textarea 
                  value={ticketNote}
                  onChange={(e) => setTicketNote(e.target.value)}
                  placeholder="Dokumentasi hasil panggilan..."
                  className="w-full h-48 py-4 px-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl text-[14px] text-[var(--text-primary)] outline-none resize-none focus:border-[var(--brand-primary)] shadow-sm transition-all"
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={onSaveTicket}
                  className="w-full py-4 bg-[var(--brand-primary)] text-white text-[15px] font-bold rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-[0.98]"
                >
                  Simpan & Selesaikan
                </button>
                <button 
                  onClick={() => setShowTicketing(false)}
                  className="w-full py-3 bg-transparent text-[var(--text-secondary)] text-[13px] font-semibold rounded-xl hover:text-[var(--text-primary)] transition-all"
                >
                  Tutup Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallUI;
