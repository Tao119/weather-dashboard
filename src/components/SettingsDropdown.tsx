'use client'

import { useState, useRef, useEffect } from 'react'

interface SettingsDropdownProps {
  temperatureUnit: 'celsius' | 'fahrenheit'
  onTemperatureUnitChange: (unit: 'celsius' | 'fahrenheit') => void
}

export function SettingsDropdown({ temperatureUnit, onTemperatureUnitChange }: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-64 glass-card rounded-xl p-4 shadow-xl z-50">
          <h3 className="font-semibold mb-4">Settings</h3>

          {/* Temperature Unit */}
          <div className="space-y-3">
            <label className="text-sm text-text-secondary">Temperature Unit</label>
            <div className="flex gap-2">
              <button
                onClick={() => onTemperatureUnitChange('celsius')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  temperatureUnit === 'celsius'
                    ? 'bg-primary text-white'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onTemperatureUnitChange('fahrenheit')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  temperatureUnit === 'fahrenheit'
                    ? 'bg-primary text-white'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-4" />

          {/* Theme */}
          <div className="space-y-3">
            <label className="text-sm text-text-secondary">Theme</label>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
