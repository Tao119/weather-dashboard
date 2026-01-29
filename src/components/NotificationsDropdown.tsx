'use client'

import { useState, useRef, useEffect } from 'react'

const notifications = [
  {
    id: 1,
    type: 'weather',
    title: 'Rain Expected',
    message: 'Rain is expected tomorrow afternoon. Don\'t forget your umbrella!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'alert',
    title: 'High UV Index',
    message: 'UV index will be high today. Consider wearing sunscreen.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Weather Updated',
    message: 'Weather data has been refreshed.',
    time: '1 day ago',
    read: true,
  },
]

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(notifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = items.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return '🌧️'
      case 'alert':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-80 glass-card rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {items.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  <span className="text-xl">{getIcon(notification.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-text-secondary text-xs mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-text-secondary text-xs mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10">
            <button className="w-full text-center text-sm text-primary hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
