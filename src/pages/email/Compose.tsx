import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const Compose: React.FC = () => {
  const navigate = useNavigate();
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    attachments: [] as File[]
  });
  const composeFileInputRef = useRef<HTMLInputElement>(null);

  const handleComposeChange = (field: string, value: string) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setComposeData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setComposeData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSendEmail = () => {
    if (!composeData.to.trim() || !composeData.subject.trim()) {
      alert('Please fill in To and Subject fields');
      return;
    }
    // Handle send email logic here
    console.log('Sending email:', composeData);
    navigate('/email');
  };

  const handleCancel = () => {
    navigate('/email');
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] relative">
        <div className="flex flex-col h-full bg-[var(--bg-primary)]">
          <div className="py-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0">
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 flex items-center justify-center border-none bg-[var(--bg-tertiary)] rounded-lg cursor-pointer text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]" onClick={handleCancel}>
                <i className="bx bx-arrow-back"></i>
              </button>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0">Compose Email</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center border-none bg-transparent rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]" onClick={handleCancel}>
                <i className="bx bx-x"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-full">
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                  To <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  placeholder="Recipient email address"
                  value={composeData.to}
                  onChange={(e) => handleComposeChange('to', e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Cc</label>
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  placeholder="Cc email address (optional)"
                  value={composeData.cc}
                  onChange={(e) => handleComposeChange('cc', e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Bcc</label>
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  placeholder="Bcc email address (optional)"
                  value={composeData.bcc}
                  onChange={(e) => handleComposeChange('bcc', e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
                  Subject <span className="text-[var(--error-color)]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  placeholder="Email subject"
                  value={composeData.subject}
                  onChange={(e) => handleComposeChange('subject', e.target.value)}
                />
              </div>
              {composeData.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5 p-3 bg-[var(--bg-tertiary)] rounded-lg">
                  {composeData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 py-2 px-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md text-[13px] text-[var(--text-primary)]">
                      <i className="bx bx-paperclip"></i>
                      <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</span>
                      <button
                        className="bg-none border-none text-[var(--text-secondary)] cursor-pointer p-0 w-[18px] h-[18px] flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--error-color)]"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <i className="bx bx-x"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Message</label>
                <textarea
                  className="w-full py-3 px-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all duration-200 resize-y min-h-[300px] font-inherit leading-relaxed box-border focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  placeholder="Write your message here..."
                  rows={15}
                  value={composeData.body}
                  onChange={(e) => handleComposeChange('body', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="py-4 px-6 border-t border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                className="py-2.5 px-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
                onClick={() => composeFileInputRef.current?.click()}
              >
                <i className="bx bx-paperclip"></i>
                Attach
              </button>
              <input
                ref={composeFileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="py-2.5 px-5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)]" onClick={handleCancel}>
                Cancel
              </button>
              <button className="py-2.5 px-5 bg-[var(--accent-color)] border border-[var(--accent-color)] rounded-lg text-white text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)]" onClick={handleSendEmail}>
                <i className="bx bx-send"></i>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compose;
