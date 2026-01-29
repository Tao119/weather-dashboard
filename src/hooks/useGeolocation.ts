'use client'

import { useState, useCallback } from 'react'
import type { City } from '@/types/weather'
import { cities } from '@/lib/cities'

interface UseGeolocationResult {
  isLoading: boolean
  error: string | null
  getNearestCity: () => Promise<City | null>
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function useGeolocation(): UseGeolocationResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getNearestCity = useCallback(async (): Promise<City | null> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return null
    }

    setIsLoading(true)
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          let nearestCity = cities[0]
          let minDistance = calculateDistance(latitude, longitude, nearestCity.lat, nearestCity.lon)

          for (const city of cities) {
            const distance = calculateDistance(latitude, longitude, city.lat, city.lon)
            if (distance < minDistance) {
              minDistance = distance
              nearestCity = city
            }
          }

          setIsLoading(false)
          resolve(nearestCity)
        },
        (err) => {
          setIsLoading(false)
          setError(err.message)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    })
  }, [])

  return {
    isLoading,
    error,
    getNearestCity,
  }
}
