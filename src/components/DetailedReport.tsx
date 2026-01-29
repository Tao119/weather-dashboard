'use client'

import type { CurrentWeatherData, City, DailyForecast } from '@/types/weather'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { Modal } from './Modal'

interface DetailedReportProps {
  isOpen: boolean
  onClose: () => void
  city: City
  current: CurrentWeatherData
  daily: DailyForecast[]
}

export function DetailedReport({ isOpen, onClose, city, current, daily }: DetailedReportProps) {
  const weatherInfo = getWeatherInfo(current.weatherCode)
  const today = daily[0]
  const todayInfo = today ? getWeatherInfo(today.weatherCode) : null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detailed Weather Report">
      <div className="space-y-6">
        {/* Location Header */}
        <div className="flex items-center gap-4">
          <div className="text-6xl">{weatherInfo.icon}</div>
          <div>
            <h3 className="text-2xl font-bold">{city.name}, Japan</h3>
            <p className="text-text-secondary">{weatherInfo.label}</p>
          </div>
        </div>

        {/* Current Conditions */}
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Current Conditions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{Math.round(current.temperature)}°C</p>
              <p className="text-text-secondary text-sm">Temperature</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{current.humidity}%</p>
              <p className="text-text-secondary text-sm">Humidity</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{current.windSpeed}</p>
              <p className="text-text-secondary text-sm">Wind (km/h)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">1012</p>
              <p className="text-text-secondary text-sm">Pressure (hPa)</p>
            </div>
          </div>
        </div>

        {/* Today's Overview */}
        {todayInfo && today && (
          <div className="glass-card rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Today&apos;s Overview</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-secondary text-sm">High</p>
                <p className="text-2xl font-bold">{Math.round(today.temperatureMax)}°C</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Low</p>
                <p className="text-2xl font-bold">{Math.round(today.temperatureMin)}°C</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Additional Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">UV Index</span>
              <span className="font-medium">4 of 11 (Moderate)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Visibility</span>
              <span className="font-medium">10 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Sunrise</span>
              <span className="font-medium">06:12 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Sunset</span>
              <span className="font-medium">06:45 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Moon Phase</span>
              <span className="font-medium">Waxing Gibbous</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Dew Point</span>
              <span className="font-medium">{Math.round(current.temperature - 5)}°C</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
