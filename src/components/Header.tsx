'use client'

import type { City } from '@/types/weather'
import { cities } from '@/lib/cities'
import { NotificationsDropdown } from './NotificationsDropdown'
import { SettingsDropdown } from './SettingsDropdown'

interface HeaderProps {
  selectedCity: City
  onCityChange: (city: City) => void
  onGetLocation: () => void
  isGeoLoading: boolean
  temperatureUnit: 'celsius' | 'fahrenheit'
  onTemperatureUnitChange: (unit: 'celsius' | 'fahrenheit') => void
}

export function Header({
  selectedCity,
  onCityChange,
  onGetLocation,
  isGeoLoading,
  temperatureUnit,
  onTemperatureUnitChange,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap px-6 md:px-10 py-6 max-w-[1280px] w-full mx-auto">
      <div className="flex items-center gap-6 md:gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">
            WeatherGlass
          </h2>
        </div>

        {/* City Selector - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <label className="flex flex-col min-w-[280px] h-11">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full glass-card">
              <div className="text-text-secondary flex items-center justify-center pl-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={selectedCity.name}
                onChange={(e) => {
                  const city = cities.find((c) => c.name === e.target.value)
                  if (city) onCityChange(city)
                }}
                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-white px-4 text-sm font-normal cursor-pointer appearance-none"
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name} className="bg-background-dark text-white">
                    {city.name}, Japan
                  </option>
                ))}
              </select>
            </div>
          </label>
          <button
            onClick={onGetLocation}
            disabled={isGeoLoading}
            className="flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all disabled:opacity-50"
            title="Get current location"
          >
            {isGeoLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Right Side - Navigation & User */}
      <div className="flex items-center gap-6">
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-white text-sm font-medium hover:text-primary transition-colors" href="#">
            Dashboard
          </a>
          <a className="text-text-secondary text-sm font-medium hover:text-white transition-colors" href="#">
            Maps
          </a>
          <a className="text-text-secondary text-sm font-medium hover:text-white transition-colors" href="#">
            Air Quality
          </a>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex gap-2">
          <NotificationsDropdown />
          <SettingsDropdown
            temperatureUnit={temperatureUnit}
            onTemperatureUnitChange={onTemperatureUnitChange}
          />
        </div>

        {/* User Avatar */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-purple-500 border-2 border-primary/50 flex items-center justify-center text-white font-semibold">
          U
        </div>

        {/* Mobile City Selector */}
        <div className="md:hidden">
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find((c) => c.name === e.target.value)
              if (city) onCityChange(city)
            }}
            className="flex h-11 items-center justify-center glass-card rounded-xl text-white px-4 text-sm font-semibold bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name} className="bg-background-dark text-white">
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
