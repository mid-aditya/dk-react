import React from 'react';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initial?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  isOnline?: boolean;
}

const UserJourney: React.FC = () => {
  const activities: Activity[] = [
    {
      id: '1',
      user: {
        name: 'Wafiy Ulhaq',
        avatar: 'https://i.pravatar.cc/40?img=1',
        initial: 'WU'
      },
      action: 'mengomentari',
      target: 'Consectetur adipiscing?',
      timestamp: '2 weeks ago',
      isOnline: true
    },
    {
      id: '2',
      user: {
        name: 'Wafiy Ulhaq',
        avatar: 'https://i.pravatar.cc/40?img=1',
        initial: 'WU'
      },
      action: 'membalas',
      target: 'Tempor est adipiscing',
      timestamp: '6 days ago',
      isOnline: true
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl cursor-pointer transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[var(--bg-secondary)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <div className="w-12 h-12 rounded-full object-cover flex-shrink-0 relative">
              <div className="w-12 h-12 rounded-full relative overflow-hidden bg-[var(--brand-gradient)] flex items-center justify-center text-white font-semibold text-lg">
                {activity.user.avatar ? (
                  <img 
                    src={activity.user.avatar} 
                    alt={activity.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const wrapper = target.parentElement;
                      if (wrapper) {
                        wrapper.textContent = activity.user.initial || activity.user.name.charAt(0);
                      }
                    }}
                  />
                ) : (
                  <span>{activity.user.initial || activity.user.name.charAt(0)}</span>
                )}
              </div>
              {activity.isOnline && (
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[var(--bg-primary)] z-10"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[var(--text-primary)] m-0 mb-1.5">{activity.user.name}</div>
              <div className="text-[13px] text-[var(--text-secondary)] m-0 mb-1 leading-snug">
                <span>{activity.action}: </span>
                <span className="text-[var(--text-primary)] font-medium">{activity.target}</span>
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserJourney;

