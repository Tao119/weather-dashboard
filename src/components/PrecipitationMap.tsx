'use client'

import type { City } from '@/types/weather'

interface PrecipitationMapProps {
  city: City
}

export function PrecipitationMap({ city }: PrecipitationMapProps) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${city.lon - 0.1}%2C${city.lat - 0.05}%2C${city.lon + 0.1}%2C${city.lat + 0.05}&layer=mapnik&marker=${city.lat}%2C${city.lon}`

  return (
    <div className="glass-card rounded-xl p-6 col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Precipitation Map</h3>
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
          Full Map
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
      <div className="w-full h-48 rounded-lg border border-white/5 overflow-hidden">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          title={`Map of ${city.name}`}
          loading="lazy"
        />
      </div>
    </div>
  )
}
