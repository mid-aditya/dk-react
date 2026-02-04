import React, { useState } from 'react';
import Dropdown, { DropdownOption } from '../ui/Dropdown';

const EndChatTicket: React.FC = () => {
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
    <div className="flex-1 overflow-y-auto p-5">
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
          Agent Name<span className="text-[var(--error-color)]">*</span>
        </label>
        <input 
          type="text" 
          className="w-full py-2.5 px-3.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)]" 
          value="DEVELOPER"
          readOnly
        />
      </div>
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
          select a branch<span className="text-[var(--error-color)]">*</span>
        </label>
        <Dropdown
          options={branchOptions}
          value={branch}
          placeholder="select a branch"
          onChange={(value) => setBranch(value)}
        />
      </div>
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
          Select Complaint Path<span className="text-[var(--error-color)]">*</span>
        </label>
        <Dropdown
          options={complaintPathOptions}
          value={complaintPath}
          placeholder="Select complaint path"
          onChange={(value) => setComplaintPath(value)}
        />
      </div>
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
          Category<span className="text-[var(--error-color)]">*</span>
        </label>
        <Dropdown
          options={categoryOptions}
          value={category}
          placeholder="Select category complaint"
          onChange={(value) => setCategory(value)}
        />
      </div>
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">
          Type<span className="text-[var(--error-color)]">*</span>
        </label>
        <Dropdown
          options={typeOptions}
          value={type}
          placeholder="Select type complaint"
          onChange={(value) => setType(value)}
        />
      </div>
      <div className="flex items-start gap-3 mt-5">
        <input 
          type="checkbox" 
          className="w-[18px] h-[18px] cursor-pointer mt-0.5 flex-shrink-0" 
          id="eskalasi"
        />
        <label htmlFor="eskalasi" className="text-[13px] text-[var(--text-secondary)] leading-normal">
          Eskalasi (Layer 2)
          <br />
          <span className="text-[11px] text-[var(--text-tertiary)]">
            Centang jika ticket memerlukan eskalasi ke layer 2
          </span>
        </label>
      </div>
    </div>
  );
};

export default EndChatTicket;

