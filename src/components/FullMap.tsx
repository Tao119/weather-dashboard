'use client'

import type { City } from '@/types/weather'
import { Modal } from './Modal'

interface FullMapProps {
  isOpen: boolean
  onClose: () => void
  city: City
}

export function FullMap({ isOpen, onClose, city }: FullMapProps) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${city.lon - 0.2}%2C${city.lat - 0.1}%2C${city.lon + 0.2}%2C${city.lat + 0.1}&layer=mapnik&marker=${city.lat}%2C${city.lon}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${city.name} Map`}>
      <div className="space-y-4">
        <p className="text-text-secondary">
          Weather map for {city.name}, Japan ({city.lat.toFixed(4)}, {city.lon.toFixed(4)})
        </p>

        {/* Map */}
        <div className="w-full h-[400px] rounded-xl border border-white/10 overflow-hidden">
          <iframe
            src={mapUrl}
            className="w-full h-full border-0"
            title={`Map of ${city.name}`}
            loading="lazy"
          />
        </div>

        {/* Map Info */}
        <div className="glass-card rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Latitude: </span>
              <span className="font-medium">{city.lat.toFixed(4)}°N</span>
            </div>
            <div>
              <span className="text-text-secondary">Longitude: </span>
              <span className="font-medium">{city.lon.toFixed(4)}°E</span>
            </div>
          </div>
        </div>

        {/* Open in new tab button */}
        <a
          href={`https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${city.lon}#map=12/${city.lat}/${city.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/80 transition-all text-white px-6 py-3 rounded-xl font-semibold"
        >
          Open in OpenStreetMap
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </Modal>
  )
}
