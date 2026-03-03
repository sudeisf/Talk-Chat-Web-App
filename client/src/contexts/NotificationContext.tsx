'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  clearReadNotifications,
  deleteNotificationById,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  NotificationApiItem,
} from '@/lib/api/notificationsApi';

export interface Notification {
  id: string;
  type: 'message' | 'reminder' | 'achievement' | 'system' | 'study';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const mapNotificationType = (notificationType: string): Notification['type'] => {
  if (
    notificationType === 'message_replied' ||
    notificationType === 'message_announcement'
  ) {
    return 'message';
  }

  if (notificationType === 'streak_announcement') {
    return 'achievement';
  }

  if (notificationType === 'question_announcement' || notificationType === 'question_answered') {
    return 'study';
  }

  if (
    notificationType === 'helper_joined' ||
    notificationType === 'helper_left' ||
    notificationType === 'helper_removed' ||
    notificationType === 'helper_announcement'
  ) {
    return 'reminder';
  }

  return 'system';
};

const mapPriority = (notificationType: string): Notification['priority'] => {
  if (notificationType === 'helper_removed' || notificationType === 'message_replied') {
    return 'high';
  }
  if (notificationType === 'helper_joined' || notificationType === 'question_answered') {
    return 'medium';
  }
  return 'low';
};

const toRelativeTime = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Just now';

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSeconds < 60) return 'Just now';
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const mapApiNotification = (item: NotificationApiItem): Notification => ({
  id: String(item.id),
  type: mapNotificationType(item.notification_type),
  title: item.title,
  message: item.message,
  timestamp: toRelativeTime(item.created_at),
  isRead: item.is_read,
  priority: mapPriority(item.notification_type),
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationIdCounter, setNotificationIdCounter] = useState(1000);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const loadNotifications = useCallback(() => {
    getNotifications()
      .then((items) => {
        setNotifications(items.map(mapApiNotification));
      })
      .catch((error) => {
        console.error('Failed to load notifications:', error);
      });
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let websocket: WebSocket | null = null;
    let disposed = false;

    const connect = () => {
      if (disposed) return;

      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      websocket = new WebSocket(`${protocol}://${window.location.host}/ws/notifications/`);

      websocket.onmessage = () => {
        loadNotifications();
      };

      websocket.onclose = () => {
        if (disposed) return;
        reconnectTimeoutRef.current = setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      websocket?.close();
    };
  }, []);

  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${notificationIdCounter}`,
      timestamp: 'Just now',
    };
    setNotificationIdCounter(prev => prev + 1);
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    const numericId = Number(id);
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    if (!Number.isNaN(numericId)) {
      markNotificationRead(numericId).catch((error) => {
        console.error('Failed to mark notification as read:', error);
      });
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    markAllNotificationsRead().catch((error) => {
      console.error('Failed to mark all notifications as read:', error);
    });
  };

  const deleteNotification = (id: string) => {
    const numericId = Number(id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    if (!Number.isNaN(numericId)) {
      deleteNotificationById(numericId).catch((error) => {
        console.error('Failed to delete notification:', error);
      });
    }
  };

  const clearAllRead = () => {
    setNotifications((prev) =>
      prev.filter((notification) => !notification.isRead)
    );
    clearReadNotifications().catch((error) => {
      console.error('Failed to clear read notifications:', error);
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
}
