
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Notification {
  id: string
  type: 'message' | 'reminder' | 'achievement' | 'system' | 'study'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'How to integrate Stripe webhooks?',
    message: 'There is helper waiting you to join the session.',
    timestamp: '2 minutes ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Congratulations!',
    message: 'You\'ve completed 10 questions today. Keep up the great work!',
    timestamp: '1 hour ago',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Study Reminder',
    message: 'Don\'t forget your daily study goal. You\'re 2 questions away from your target.',
    timestamp: '3 hours ago',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New features have been added to improve your learning experience.',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'study',
    title: 'Study Streak',
    message: 'You\'ve maintained a 7-day study streak! Consistency is key to success.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'high'
  },
  {
    id: '6',
    type: 'message',
    title: 'Question Answered',
    message: 'Your question about "JavaScript Promises" has been answered.',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'medium'
  }
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'Just now'
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead))
  }

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications')
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications))
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error)
      }
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAllRead
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
