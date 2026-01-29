'use client'

import type { City } from '@/types/weather'
import { cities } from '@/lib/cities'

interface HeaderProps {
  selectedCity: City
  onCityChange: (city: City) => void
}

export function Header({ selectedCity, onCityChange }: HeaderProps) {
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
          <button className="flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
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
          <button className="flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>
          <button className="flex h-11 w-11 items-center justify-center glass-card rounded-xl text-white hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
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
