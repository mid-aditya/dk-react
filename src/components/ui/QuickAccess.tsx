import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';

export interface Alarm {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  note: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface QuickAccessProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ isOpen: externalIsOpen, onToggle }) => {
  const { theme } = useTheme();
  const { addNotification } = useNotification();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'alarms'>('tasks');
  const [isCreating, setIsCreating] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const alarmCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    note: '',
  });

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newValue = !isOpen;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsOpen(newValue);
    }
  };

  // Load alarms and tasks from localStorage
  useEffect(() => {
    const savedAlarms = localStorage.getItem('quickAccessAlarms');
    if (savedAlarms) {
      try {
        const parsed = JSON.parse(savedAlarms);
        setAlarms(parsed);
      } catch (e) {
        console.error('Error loading alarms:', e);
      }
    }

    const savedTasks = localStorage.getItem('quickAccessTasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(parsed);
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    } else {
      // Default tasks
      const defaultTasks: Task[] = [
        { id: '1', title: 'Follow up customer A', description: 'Call customer untuk follow up', status: 'pending', priority: 'high', createdAt: new Date().toISOString() },
        { id: '2', title: 'Review email draft', description: 'Review dan kirim email draft', status: 'in-progress', priority: 'medium', createdAt: new Date().toISOString() },
        { id: '3', title: 'Update report', description: 'Update laporan harian', status: 'completed', priority: 'low', createdAt: new Date().toISOString() },
      ];
      setTasks(defaultTasks);
    }
  }, []);

  // Save alarms to localStorage
  useEffect(() => {
    if (alarms.length > 0) {
      localStorage.setItem('quickAccessAlarms', JSON.stringify(alarms));
    }
  }, [alarms]);

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('quickAccessTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    setFormData((prev) => {
      if (!prev.date) {
        return { ...prev, date: todayString };
      }
      return prev;
    });
  }, []);

  // Alarm reminder checker
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const currentDate = now.toISOString().split('T')[0];

      alarms.forEach((alarm) => {
        if (!alarm.isCompleted && alarm.date === currentDate && alarm.time === currentTime) {
          // Check if notification already sent (using localStorage)
          const notificationKey = `alarm-notified-${alarm.id}-${alarm.date}-${alarm.time}`;
          const alreadyNotified = localStorage.getItem(notificationKey);
          
          if (!alreadyNotified) {
            addNotification({
              title: 'Alarm: ' + alarm.title,
              message: alarm.note || 'Waktunya untuk ' + alarm.title,
              type: 'info',
              duration: 10000,
            });
            localStorage.setItem(notificationKey, 'true');
            
            // Clear notification flag after 1 hour
            setTimeout(() => {
              localStorage.removeItem(notificationKey);
            }, 3600000);
          }
        }
      });
    };

    // Check immediately on mount and when alarms change
    checkAlarms();

    // Check every minute
    if (alarmCheckIntervalRef.current) {
      clearInterval(alarmCheckIntervalRef.current);
    }

    alarmCheckIntervalRef.current = setInterval(checkAlarms, 60000);

    return () => {
      if (alarmCheckIntervalRef.current) {
        clearInterval(alarmCheckIntervalRef.current);
      }
    };
  }, [alarms, addNotification]);


  const handleCreateAlarm = () => {
    if (!formData.title || !formData.date || !formData.time) {
      window.alert('Mohon isi title, tanggal, dan waktu!');
      return;
    }

    const newAlarm: Alarm = {
      id: `alarm-${Date.now()}-${Math.random()}`,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      note: formData.note,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    setAlarms((prev) => [...prev, newAlarm].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    }));

    // Reset form
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      note: '',
    });
    setIsCreating(false);
  };

  const handleDeleteAlarm = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus alarm ini?')) {
      setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    }
  };

  const handleToggleComplete = (id: string) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, isCompleted: !alarm.isCompleted } : alarm
      )
    );
  };

  // Task handlers
  const handleCreateTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random()}`,
      title: 'Task Baru',
      description: '',
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus task ini?')) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === 'pending'
                  ? 'in-progress'
                  : task.status === 'in-progress'
                  ? 'completed'
                  : 'pending',
            }
          : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isTomorrow =
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();

    if (isToday) return 'Hari Ini';
    if (isTomorrow) return 'Besok';

    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getUpcomingAlarms = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return alarms.filter((alarm) => {
      if (alarm.isCompleted) return false;
      const alarmDate = new Date(`${alarm.date}T${alarm.time}`);
      return alarmDate >= today;
    });
  };

  const upcomingAlarms = getUpcomingAlarms();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 z-[10000] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-[#2563EB] text-white'
            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-2 border-[var(--border-color)]'
        }`}
        aria-label="Quick Access"
      >
        <i className={`bx ${isOpen ? 'bx-x' : 'bx-alarm'} text-2xl`} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen z-[9999] bg-[var(--bg-secondary)] backdrop-blur-[16px] border-l border-[var(--border-color)] transition-all duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'w-96' : 'w-0 overflow-hidden'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--border-color)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <i className="bx bx-task text-xl text-[var(--text-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Quick Access</h3>
          </div>
          <button
            onClick={handleToggle}
            className="p-1 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close"
          >
            <i className="bx bx-x text-xl" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border-color)] flex-shrink-0">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB] bg-[#2563EB]/10'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <i className="bx bx-task" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab('alarms')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'alarms'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB] bg-[#2563EB]/10'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <i className="bx bx-alarm" />
            <span>Alarms</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 px-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)]">
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              <button
                onClick={handleCreateTask}
                className="w-full mb-2 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-all flex items-center justify-center gap-2 text-sm"
              >
                <i className="bx bx-plus text-lg" />
                <span>Tambah Task</span>
              </button>

              {tasks.length === 0 ? (
                <div className="text-center py-12 text-[var(--text-secondary)]">
                  <i className="bx bx-task text-5xl mb-3 opacity-50" />
                  <p className="text-sm">Tidak ada task</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[#2563EB] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {task.priority && (
                            <span
                              className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                              title={task.priority}
                            />
                          )}
                          <input
                            type="text"
                            value={task.title}
                            onChange={(e) => updateTask(task.id, { title: e.target.value })}
                            className="text-sm font-medium text-[var(--text-primary)] bg-transparent border-none p-0 focus:outline-none focus:ring-1 focus:ring-[#2563EB] rounded px-1"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <textarea
                          value={task.description || ''}
                          onChange={(e) => updateTask(task.id, { description: e.target.value })}
                          placeholder="Deskripsi..."
                          className="text-xs text-[var(--text-secondary)] bg-transparent border-none p-0 w-full resize-none focus:outline-none focus:ring-1 focus:ring-[#2563EB] rounded px-1 mt-1"
                          rows={2}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap cursor-pointer ${getStatusColor(
                            task.status
                          )}`}
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          {task.status.replace('-', ' ')}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                          aria-label="Delete task"
                        >
                          <i className="bx bx-trash text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Alarms Tab */}
          {activeTab === 'alarms' && (
            <>
              {/* Create Button */}
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="w-full mb-4 px-4 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-all flex items-center justify-center gap-2"
                >
                  <i className="bx bx-plus text-xl" />
                  <span>Buat Alarm Baru</span>
                </button>
              )}

          {/* Create Form */}
          {isCreating && (
            <div className="mb-4 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
              <div className="mb-3">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                  Judul Alarm *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Meeting dengan klien"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                    Waktu *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                  Catatan
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Tambahkan catatan untuk alarm ini..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCreateAlarm}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-all"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setFormData({
                      title: '',
                      date: new Date().toISOString().split('T')[0],
                      time: '',
                      note: '',
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)] font-medium transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

              {/* Create Form */}
              {isCreating && (
                <div className="mb-4 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                      Judul Alarm *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Contoh: Meeting dengan klien"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                        Tanggal *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                        Waktu *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                      Catatan
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Tambahkan catatan untuk alarm ini..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateAlarm}
                      className="flex-1 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-all"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setFormData({
                          title: '',
                          date: new Date().toISOString().split('T')[0],
                          time: '',
                          note: '',
                        });
                      }}
                      className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)] font-medium transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Alarms List */}
              <div className="space-y-3">
                {upcomingAlarms.length === 0 ? (
                  <div className="text-center py-12 text-[var(--text-secondary)]">
                    <i className="bx bx-alarm-off text-5xl mb-3 opacity-50" />
                    <p className="text-sm">Tidak ada alarm yang akan datang</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">
                      Buat alarm baru untuk mengingatkan tugas penting
                    </p>
                  </div>
                ) : (
                  upcomingAlarms.map((alarm) => {
                    const alarmDateTime = new Date(`${alarm.date}T${alarm.time}`);
                    const isPast = alarmDateTime < new Date();
                    const isToday =
                      alarm.date === new Date().toISOString().split('T')[0];

                    return (
                      <div
                        key={alarm.id}
                        className={`p-4 rounded-lg border transition-all ${
                          alarm.isCompleted
                            ? 'border-[var(--border-color)] bg-[var(--bg-tertiary)] opacity-60'
                            : isPast
                            ? 'border-yellow-500/50 bg-yellow-500/10'
                            : isToday
                            ? 'border-[#2563EB]/50 bg-[#2563EB]/10'
                            : 'border-[var(--border-color)] bg-[var(--bg-tertiary)]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="checkbox"
                                checked={alarm.isCompleted}
                                onChange={() => handleToggleComplete(alarm.id)}
                                className="w-4 h-4 rounded border-[var(--border-color)] text-[#2563EB] focus:ring-[#2563EB]"
                              />
                              <h4
                                className={`text-sm font-semibold text-[var(--text-primary)] ${
                                  alarm.isCompleted ? 'line-through' : ''
                                }`}
                              >
                                {alarm.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] ml-6">
                              <span className="flex items-center gap-1">
                                <i className="bx bx-calendar" />
                                {formatDate(alarm.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <i className="bx bx-time" />
                                {alarm.time}
                              </span>
                            </div>
                            {alarm.note && (
                              <p className="text-xs text-[var(--text-secondary)] mt-2 ml-6 line-clamp-2">
                                {alarm.note}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteAlarm(alarm.id)}
                            className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label="Delete alarm"
                          >
                            <i className="bx bx-trash text-lg" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default QuickAccess;
