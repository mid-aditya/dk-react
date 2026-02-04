import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification as useNotificationContext } from '../../contexts/NotificationContext';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  timestamp?: Date;
}

interface NotificationProps {
  notifications?: NotificationItem[];
  maxNotifications?: number;
}

const Notification: React.FC<NotificationProps> = ({
  notifications: externalNotifications,
  maxNotifications = 5,
}) => {
  const { theme } = useTheme();
  const { notifications: contextNotifications, removeNotification } = useNotificationContext();
  
  // Use external notifications if provided, otherwise use context notifications
  const notifications = externalNotifications || contextNotifications;

  // Auto-remove notifications after duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach((notification) => {
      const duration = notification.duration || 5000; // Default 5 seconds
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, duration);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'bx-check-circle';
      case 'warning':
        return 'bx-error-circle';
      case 'error':
        return 'bx-x-circle';
      default:
        return 'bx-info-circle';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'bg-red-500/20 border-red-500/50 text-red-600 dark:text-red-400';
      default:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[10001] w-full max-w-md px-4 pointer-events-none">
      <div className="space-y-3">
        {notifications.slice(0, maxNotifications).map((notification) => (
          <div
            key={notification.id}
            className={`pointer-events-auto p-4 rounded-lg border backdrop-blur-[16px] bg-[var(--bg-secondary)] shadow-lg animate-[slideDown_0.3s_ease-out] ${getNotificationColor(
              notification.type
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                <i className={`bx ${getNotificationIcon(notification.type)} text-2xl`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                  {notification.message}
                </p>
                {notification.timestamp && (
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close notification"
              >
                <i className="bx bx-x text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;

