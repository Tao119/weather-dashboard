'use client'

import type { CurrentWeatherData, City } from '@/types/weather'
import { getWeatherInfo } from '@/lib/weatherCodes'

interface CurrentWeatherProps {
  city: City
  data: CurrentWeatherData
}

export function CurrentWeather({ city, data }: CurrentWeatherProps) {
  const weatherInfo = getWeatherInfo(data.weatherCode)
  const feelsLike = Math.round(data.temperature + 2)

  return (
    <section className="mb-10">
      <div className="glass-card rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 min-h-[320px] relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />

        {/* Left: Weather Info */}
        <div className="flex flex-col gap-2 z-10 text-center md:text-left">
          <div className="flex items-center gap-2 text-text-secondary justify-center md:justify-start">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p className="text-sm font-medium uppercase tracking-widest">Current Weather</p>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mt-4">
            {Math.round(data.temperature)}°C
          </h1>

          <div className="flex flex-col gap-1 mt-2">
            <p className="text-xl md:text-2xl font-semibold text-white">{city.name}, Japan</p>
            <p className="text-text-secondary text-base md:text-lg">
              {weatherInfo.label} • Feels like {feelsLike}°C
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 md:mt-8 justify-center md:justify-start">
            <button className="bg-primary hover:bg-primary/80 transition-all text-white px-6 md:px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 text-sm md:text-base">
              Detailed Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="glass-card glass-card-hover text-white px-6 md:px-8 py-3 rounded-xl font-semibold transition-all text-sm md:text-base">
              Forecast History
            </button>
          </div>
        </div>

        {/* Center: Weather Icon */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 order-first md:order-none">
          <span className="text-[100px] md:text-[160px] drop-shadow-2xl leading-none">
            {weatherInfo.icon}
          </span>
        </div>

        {/* Right: Stats Grid - 4 cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 min-w-[280px] md:min-w-[300px] z-10">
          {/* Humidity */}
          <div className="glass-card p-4 md:p-5 rounded-xl flex flex-col items-center gap-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
            </svg>
            <p className="text-text-secondary text-xs font-medium uppercase">Humidity</p>
            <p className="text-lg md:text-xl font-bold">{data.humidity}%</p>
          </div>

          {/* Wind Speed */}
          <div className="glass-card p-4 md:p-5 rounded-xl flex flex-col items-center gap-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5c0-1.65-1.35-3-3-3S13 4.85 13 6.5h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h12c1.65 0 3-1.35 3-3zM19.5 13H2v2h17.5c.55 0 1 .45 1 1s-.45 1-1 1-.99-.45-1-1h-2c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3z" />
            </svg>
            <p className="text-text-secondary text-xs font-medium uppercase">Wind Speed</p>
            <p className="text-lg md:text-xl font-bold">{data.windSpeed} km/h</p>
          </div>

          {/* UV Index */}
          <div className="glass-card p-4 md:p-5 rounded-xl flex flex-col items-center gap-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
            </svg>
            <p className="text-text-secondary text-xs font-medium uppercase">UV Index</p>
            <p className="text-lg md:text-xl font-bold">4 of 11</p>
          </div>

          {/* Pressure */}
          <div className="glass-card p-4 md:p-5 rounded-xl flex flex-col items-center gap-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C6.5 3 2 6.58 2 11c0 4.42 4.5 8 10 8s10-3.58 10-8c0-4.42-4.5-8-10-8zm0 14c-4.41 0-8-2.69-8-6s3.59-6 8-6 8 2.69 8 6-3.59 6-8 6z" />
              <path d="M12 7c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            <p className="text-text-secondary text-xs font-medium uppercase">Pressure</p>
            <p className="text-lg md:text-xl font-bold">1012 hPa</p>
          </div>
        </div>
      </div>
    </section>
  )
}
