import React, { useEffect, useState } from 'react';

interface Channel {
  id: string;
  name: string;
  type: string;
  icon: string;
  active: number;
  pending: number;
  resolved: number;
}

const Omnichat: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [stats, setStats] = useState({
    totalConversation: 0,
    unserved: 0,
    served: 0,
    resolved: 0,
    notHandled: 0,
    avgResponseTime: '00:00:00',
  });

  const [channels, setChannels] = useState<Channel[]>([
    { id: 'facebook', name: 'Facebook', type: 'facebook', icon: 'fab fa-facebook-messenger', active: 0, pending: 0, resolved: 0 },
    { id: 'instagram', name: 'Instagram', type: 'instagram', icon: 'fab fa-instagram', active: 0, pending: 0, resolved: 0 },
    { id: 'telegram', name: 'Telegram', type: 'telegram', icon: 'fab fa-telegram', active: 0, pending: 0, resolved: 0 },
    { id: 'whatsapp-unofficial', name: 'Whatsapp UnOfficial', type: 'whatsapp-unofficial', icon: 'fas fa-comment', active: 0, pending: 0, resolved: 0 },
    { id: 'chat-widget', name: 'Chat Widget', type: 'chat-widget', icon: 'fas fa-comments', active: 0, pending: 0, resolved: 0 },
    { id: 'web-socket-chat', name: 'Web Socket Chat', type: 'web-socket-chat', icon: 'fas fa-plug', active: 0, pending: 0, resolved: 0 },
    { id: 'whatsapp-center', name: 'Whatsapp Center', type: 'whatsapp-center', icon: 'fas fa-comment', active: 0, pending: 0, resolved: 0 },
    { id: 'whatsapp-meta', name: 'Whatsapp META', type: 'whatsapp-meta', icon: 'fas fa-comment', active: 0, pending: 0, resolved: 0 },
    { id: 'inbound-call', name: 'Inbound Call', type: 'inbound-call', icon: 'fas fa-comment', active: 0, pending: 0, resolved: 0 },
    { id: 'outbound-call', name: 'Outbound Call', type: 'outbound-call', icon: 'fas fa-comment', active: 0, pending: 0, resolved: 0 },
  ]);

  // Update waktu setiap detik
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const formattedTime = `${dayName}, ${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch data (placeholder - replace with actual API call)
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchStats();
    // fetchChannels();
  }, []);

  const getChannelColor = (type: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-500/20 border-blue-500/30',
      instagram: 'bg-pink-500/20 border-pink-500/30',
      telegram: 'bg-blue-400/20 border-blue-400/30',
      'whatsapp-unofficial': 'bg-green-500/20 border-green-500/30',
      'chat-widget': 'bg-purple-500/20 border-purple-500/30',
      'web-socket-chat': 'bg-orange-500/20 border-orange-500/30',
      'whatsapp-center': 'bg-green-600/20 border-green-600/30',
      'whatsapp-meta': 'bg-green-700/20 border-green-700/30',
      'inbound-call': 'bg-indigo-500/20 border-indigo-500/30',
      'outbound-call': 'bg-cyan-500/20 border-cyan-500/30',
    };
    return colors[type] || 'bg-gray-500/20 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 py-6">
          {/* Header */}
          <div className="header mb-6">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
              📊 Omnichannel Wallboard
            </h1>
            <div className="time text-lg text-[var(--text-secondary)]" id="currentTime">
              {currentTime}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Total Conversation</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="total-conversation">
                {stats.totalConversation}
              </div>
            </div>

            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Unserved</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="total-unserved">
                {stats.unserved}
              </div>
            </div>

            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Served</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="total-served">
                {stats.served}
              </div>
            </div>

            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Resolved</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="total-resolved">
                {stats.resolved}
              </div>
            </div>

            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Not Handled</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="total-not-reply">
                {stats.notHandled}
              </div>
            </div>

            <div className="stat-card bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg">
              <div className="label text-sm text-[var(--text-secondary)] mb-2">Avg Response Time</div>
              <div className="value text-3xl font-bold text-[var(--text-primary)]" id="average">
                {stats.avgResponseTime}
              </div>
            </div>
          </div>

          {/* Channels Grid */}
          <div className="channels-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" id="channelsContainer">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className={`channel-card ${channel.type} bg-[var(--bg-secondary)] rounded-xl p-4 border ${getChannelColor(channel.type)} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="channel-header flex items-center gap-3 mb-4">
                  <div className="channel-icon w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--bg-tertiary)]">
                    <i className={`${channel.icon} text-xl text-[var(--text-primary)]`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="channel-name font-semibold text-[var(--text-primary)]">
                      {channel.name}
                    </div>
                  </div>
                </div>

                <div className="channel-stats grid grid-cols-3 gap-2">
                  <div className="channel-stat text-center">
                    <div className="stat-label text-xs text-[var(--text-secondary)] mb-1">Active</div>
                    <div className="stat-value text-lg font-bold text-[var(--text-primary)]">
                      {channel.active}
                    </div>
                  </div>
                  <div className="channel-stat text-center">
                    <div className="stat-label text-xs text-[var(--text-secondary)] mb-1">Pending</div>
                    <div className="stat-value text-lg font-bold text-[var(--text-primary)]">
                      {channel.pending}
                    </div>
                  </div>
                  <div className="channel-stat text-center">
                    <div className="stat-label text-xs text-[var(--text-secondary)] mb-1">Resolved</div>
                    <div className="stat-value text-lg font-bold text-[var(--text-primary)]">
                      {channel.resolved}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Omnichat;

