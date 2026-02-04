import React from 'react';

interface OverviewProps {
  user?: {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    initial?: string;
  };
  maskData?: boolean;
}

const Overview: React.FC<OverviewProps> = ({ user, maskData }) => {
  const defaultUser = {
    name: 'Wafiy Ulhaq',
    email: 'wafiyulhaq14@gmail.com',
    phone: '+62 823 4243 2123',
    initial: 'W',
    avatar: undefined
  };

  const userData = { ...defaultUser, ...user };

  const maskString = (str: string | undefined, type: 'name' | 'email' | 'phone' | 'handle') => {
    if (!str) return 'N/A';
    if (!maskData) return str;

    if (type === 'name') {
      const parts = str.split(' ');
      return parts.map(p => p[0] + '*'.repeat(Math.max(0, p.length - 1))).join(' ');
    }
    if (type === 'email') {
      const [local, domain] = str.split('@');
      return local[0] + '*'.repeat(local.length - 1) + '@' + domain;
    }
    if (type === 'phone') {
      return str.split(' ').map((p, i) => i > 1 ? '****' : p).join(' ');
    }
    if (type === 'handle') {
      return str[0] + str[1] + '*'.repeat(str.length - 3) + str.slice(-1);
    }
    return str;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--border-color)]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold text-xl border-2 border-[var(--border-color)]">
            {userData.avatar ? (
              <img src={userData.avatar} alt={maskString(userData.name, 'name')} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{maskString(userData.initial || userData.name.charAt(0), 'name')}</span>
            )}
          </div>
          <div className="flex-1 font-semibold text-[var(--text-primary)] text-base">{maskString(userData.name, 'name')}</div>
          <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-[var(--text-secondary)] transition-all duration-200 bg-none border-none hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]">
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bx-envelope w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>{maskString(userData.email, 'email')}</span>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bx-phone w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>{maskString(userData.phone, 'phone')}</span>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bx-dollar w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>{maskString('@wafiy.ulhaq', 'handle')}</span>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bx-target-lock w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>{maskString('@wafiy.ulhaq', 'handle')}</span>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bxl-twitter w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>{maskString('@wafiy.ulhaq', 'handle')}</span>
        </div>
        <div className="flex items-center gap-3 py-3 text-[var(--text-secondary)] text-sm">
          <i className="bx bx-building w-5 text-[var(--text-tertiary)] text-base"></i>
          <span>Bogor, Indonesia</span>
        </div>
        <div className="w-full h-[200px] rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-tertiary)] text-sm mt-3">
          Map View
        </div>
      </div>
    </div>
  );
};

export default Overview;

