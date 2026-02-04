import React, { useState } from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';
import EndChatTicket from '../../components/ticketing/EndChatTicket';
import History from '../../components/ticketing/History';
import Overview from '../../components/ticketing/Overview';
import Tabs from '../../components/ticketing/Tabs';
import UserJourney from '../../components/ticketing/UserJourney';
import ChatInput from '../../components/ui/ChatInput';
import { DropdownOption } from '../../components/ui/Dropdown';

const Comment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-open');
  const [activeDetailTab, setActiveDetailTab] = useState('user-journeys');
  const [branch, setBranch] = useState<string | number>('');
  const [complaintPath, setComplaintPath] = useState<string | number>('');
  const [category, setCategory] = useState<string | number>('');
  const [type, setType] = useState<string | number>('');

  const branchOptions: DropdownOption[] = [
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'bandung', label: 'Bandung' },
  ];

  const complaintPathOptions: DropdownOption[] = [
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing' },
    { value: 'general', label: 'General Inquiry' },
  ];

  const categoryOptions: DropdownOption[] = [
    { value: 'product', label: 'Product Issue' },
    { value: 'service', label: 'Service Issue' },
    { value: 'payment', label: 'Payment Issue' },
  ];

  const typeOptions: DropdownOption[] = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low Priority' },
  ];

  return (
    <WorkspaceLayout>
      <div className="w-full h-full p-0 m-0 flex gap-0 overflow-hidden bg-[var(--bg-primary)] min-w-0 box-border relative">
        {/* Card 1 - Comments List */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative w-[330px] flex-shrink-0">
          <div className="pt-3 px-4 pb-0 bg-[var(--bg-secondary)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] m-0">Comments & more</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-[#22c55e] text-white text-[11px] rounded-xl font-medium">Normal</span>
                <div className="flex items-end gap-1 h-6">
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[#22c55e]"></div>
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[#22c55e]"></div>
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[#22c55e]"></div>
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[#22c55e]"></div>
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[var(--bg-tertiary)] dark:bg-[#4b5563]"></div>
                  <div className="w-2 rounded transition-all duration-200 h-6 bg-[var(--bg-tertiary)] dark:bg-[#4b5563]"></div>
                </div>
              </div>
            </div>
            <div className="mb-3 relative">
              <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none"></i>
              <input 
                type="text" 
                className="w-full py-2 pl-9 pr-3 border border-[var(--border-color)] rounded-lg text-[13px] bg-[var(--bg-primary)] text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--accent-color)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" 
                placeholder="Cari"
              />
            </div>
          </div>
          <div className="flex gap-px bg-[var(--bg-secondary)] p-2 rounded-lg">
            <button 
              className={`flex-1 py-2 px-3 bg-none border-none text-[12px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 font-medium rounded-md ${
                activeTab === 'my-open' 
                  ? 'text-white bg-[#2563EB] dark:bg-[#1E40AF]' 
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
                  ? 'text-white bg-[#2563EB] dark:bg-[#1E40AF]' 
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
                  ? 'text-white bg-[#2563EB] dark:bg-[#1E40AF]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
              onClick={() => setActiveTab('resolved')}
            >
              <i className="bx bx-check-circle text-xs"></i>
              Resolved
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)] bg-[var(--bg-tertiary)] border-[var(--accent-color)]">
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=1" 
                    alt="Wafiy Ulhaq"
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white absolute top-0 left-0" style={{ display: 'none' }}>WU</div>
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
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">Wafiy Ulhaq</div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">mengomentari: Consectetur adipiscing?</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)]">12:33 PM</span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]">
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=2" 
                    alt="Amina Farooq"
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white absolute top-0 left-0" style={{ display: 'none' }}>AF</div>
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
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">Amina Farooq</div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">mengomentari: Consectetur adipiscing elit</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)]">14:15 PM</span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2 mb-0.5 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]">
              <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <div className="w-10 h-10 rounded-full relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)] bg-[var(--bg-tertiary)]">
                  <img 
                    src="https://i.pravatar.cc/40?img=4" 
                    alt="Samiya Iqbal"
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white absolute top-0 left-0" style={{ display: 'none' }}>SI</div>
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
                <div className="text-[13px] font-medium text-[var(--text-primary)] m-0 mb-0.5 flex items-center gap-2">Samiya Iqbal</div>
                <div className="text-[11px] text-[var(--text-secondary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">membalas: Excepteur sint occaecat ?</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-[var(--text-tertiary)] flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444] mr-1"></span>
                    16:05 PM
                  </span>
                  <i className="bx bx-check-double w-4 h-4 text-[var(--success-color)]"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Comment Thread */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative flex-1 min-w-[400px] last:border-r-0">
          <div className="p-4 pb-0 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex-shrink-0 relative overflow-visible">
                <img 
                  src="https://i.pravatar.cc/40?img=1" 
                  alt="Wafiy Ulhaq"
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
                  <h3 className="text-base font-semibold text-[var(--text-primary)] m-0">Wafiy Ulhaq</h3>
                  <p className="text-xs text-[var(--text-secondary)] m-0">@wafiy.ulhaq</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="py-2 px-4 bg-[#2563EB] text-white border-none rounded-md text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#1d4ed8]">Lihat postingan</button>
                <button className="bg-none border-none text-[var(--text-secondary)] cursor-pointer p-2 rounded transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
                  <i className="bx bx-sync"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center my-4 gap-3">
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              <span className="text-[11px] text-[var(--text-tertiary)] px-3">Oct 19, 2025</span>
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
            </div>
            {/* Main Comment */}
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img 
                    src="https://i.pravatar.cc/40?img=1" 
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/images/users/avatar-1.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-[var(--bg-tertiary)] rounded-lg py-3 px-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">Wafiy Ulhaq</span>
                      <span className="text-[11px] text-[var(--text-tertiary)]">14 minutes ago</span>
                    </div>
                    <p className="text-[13px] text-[var(--text-primary)] leading-relaxed">Lorem ipsum dolor sit amet consectetur. Tempor est adipiscing tellus diam et.</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 bg-none border-none text-[var(--text-secondary)] text-[13px] cursor-pointer py-1 px-2 rounded transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-[var(--bg-tertiary)]">
                        <i className="bx bx-like"></i>
                        <span>84</span>
                      </button>
                      <button className="flex items-center gap-1 bg-none border-none text-[var(--text-secondary)] text-[13px] cursor-pointer py-1 px-2 rounded transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-[var(--bg-tertiary)]">
                        <i className="bx bx-comment"></i>
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <ChatInput
              placeholder="Add comment"
              onSend={(message, files) => {
                console.log('Comment:', message);
                console.log('Files:', files);
              }}
              showAttachButton={true}
              showPlusButton={false}
              enableDragDrop={true}
            />
        </div>

        {/* Card 3 - Details */}
        <div className="flex flex-col overflow-hidden min-w-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-full relative w-[430px] flex-shrink-0 last:border-r-0">
          <Tabs 
            activeTab={activeDetailTab} 
            onTabChange={setActiveDetailTab}
            showUserJourneys={true}
          />
          {activeDetailTab === 'user-journeys' && <UserJourney />}
          {activeDetailTab === 'overview' && <Overview />}
          {activeDetailTab === 'end-chat' && <EndChatTicket />}
          {activeDetailTab === 'history' && <History />}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Comment;
