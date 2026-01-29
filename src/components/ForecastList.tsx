'use client'

import type { DailyForecast } from '@/types/weather'
import { ForecastCard } from './ForecastCard'

interface ForecastListProps {
  forecasts: DailyForecast[]
  lastUpdated: Date | null
  onRefresh: () => void
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ForecastList({ forecasts, lastUpdated, onRefresh }: ForecastListProps) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">7-Day Forecast</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-text-secondary">
            Last updated: {lastUpdated ? formatTime(lastUpdated) : '--:--'}
          </span>
          <button
            onClick={onRefresh}
            className="text-text-secondary hover:text-white transition-colors"
            aria-label="Refresh"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-7 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard
            key={forecast.date}
            forecast={forecast}
            isToday={forecast.date === today}
          />
        ))}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {forecasts.map((forecast) => (
            <div key={forecast.date} className="min-w-[100px]">
              <ForecastCard forecast={forecast} isToday={forecast.date === today} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
