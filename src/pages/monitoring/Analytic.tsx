import React, { useState } from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';

const Analytic: React.FC = () => {
  const [selectedSetting, setSelectedSetting] = useState('');
  const [iframeSrc, setIframeSrc] = useState('https://crm.datakelola.com/analytic/conversation');

  const openIframe = (url: string) => {
    setIframeSrc(url);
  };

  return (
    <WorkspaceLayout>
      <div className="w-full h-full overflow-y-auto bg-[var(--bg-primary)] p-6">
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="w-full mt-4 lg:mt-0 lg:ml-1">
          {/* Header Card */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] mb-1">
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Select Dropdown */}
                <div className="md:col-span-3">
                  <select
                    name="setting"
                    id="setting"
                    value={selectedSetting}
                    onChange={(e) => setSelectedSetting(e.target.value)}
                    className="w-full px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                  >
                    <option value="">All of analytic</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="md:col-span-9">
                  <div className="flex flex-row-reverse gap-2" id="btn-nav">
                    <button
                      type="button"
                      onClick={() => openIframe('https://crm.datakelola.com/analytic/conversation')}
                      className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-2"
                    >
                      Conversation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="mt-0">
            <iframe
              id="iframe"
              src={iframeSrc}
              frameBorder="0"
              className="w-full border-none rounded-lg bg-[var(--bg-secondary)]"
              style={{ height: '80vh' }}
              title="Analytic"
            ></iframe>
          </div>
        </div>
      </div>
      </div>
    </WorkspaceLayout>
  );
};

export default Analytic;

