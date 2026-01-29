'use client'

import type { City, DailyForecast } from '@/types/weather'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { Modal } from './Modal'

interface ForecastHistoryProps {
  isOpen: boolean
  onClose: () => void
  city: City
  daily: DailyForecast[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })
}

export function ForecastHistory({ isOpen, onClose, city, daily }: ForecastHistoryProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="7-Day Forecast History">
      <div className="space-y-4">
        <p className="text-text-secondary">
          Weather forecast for {city.name}, Japan
        </p>

        {/* Forecast Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-text-secondary text-sm font-medium">Date</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Weather</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">High</th>
                <th className="text-center p-4 text-text-secondary text-sm font-medium">Low</th>
              </tr>
            </thead>
            <tbody>
              {daily.map((forecast, index) => {
                const weatherInfo = getWeatherInfo(forecast.weatherCode)
                const isToday = index === 0
                return (
                  <tr
                    key={forecast.date}
                    className={`border-b border-white/5 ${isToday ? 'bg-primary/10' : ''}`}
                  >
                    <td className="p-4">
                      <span className={isToday ? 'font-semibold' : ''}>
                        {isToday ? 'Today' : formatDate(forecast.date)}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">{weatherInfo.icon}</span>
                        <span className="text-sm text-text-secondary hidden sm:inline">
                          {weatherInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold">
                      {Math.round(forecast.temperatureMax)}°
                    </td>
                    <td className="p-4 text-center text-text-secondary">
                      {Math.round(forecast.temperatureMin)}°
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-xl p-4">
          <h4 className="font-semibold mb-2">Weekly Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Avg High: </span>
              <span className="font-medium">
                {Math.round(daily.reduce((sum, d) => sum + d.temperatureMax, 0) / daily.length)}°C
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Avg Low: </span>
              <span className="font-medium">
                {Math.round(daily.reduce((sum, d) => sum + d.temperatureMin, 0) / daily.length)}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
