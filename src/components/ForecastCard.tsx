'use client'

import type { DailyForecast } from '@/types/weather'
import { getWeatherInfo } from '@/lib/weatherCodes'

interface ForecastCardProps {
  forecast: DailyForecast
  isToday?: boolean
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString)
  const days = ['日', '月', '火', '水', '木', '金', '土']
  return days[date.getDay()]
}

export function ForecastCard({ forecast, isToday = false }: ForecastCardProps) {
  const weatherInfo = getWeatherInfo(forecast.weatherCode)
  const dayOfWeek = getDayOfWeek(forecast.date)

  return (
    <div
      className={`glass-card glass-card-hover rounded-xl p-6 flex flex-col items-center gap-4 transition-all group ${
        isToday ? 'border-primary/30 bg-primary/10' : ''
      }`}
    >
      <p className={`font-medium ${isToday ? 'text-white' : 'text-text-secondary'}`}>
        {dayOfWeek}
      </p>
      <span
        className={`text-4xl group-hover:scale-110 transition-transform ${
          isToday ? 'text-primary' : 'text-white'
        }`}
      >
        {weatherInfo.icon}
      </span>
      <div className="text-center">
        <p className="text-xl font-bold">{Math.round(forecast.temperatureMax)}°</p>
        <p className="text-text-secondary text-sm font-medium">
          {Math.round(forecast.temperatureMin)}°
        </p>
      </div>
      <p className="text-xs text-text-secondary font-medium uppercase">{weatherInfo.label}</p>
    </div>
  )
}
