'use client'

import { useState, useEffect, useCallback } from 'react'
import type { City, WeatherResponse } from '@/types/weather'
import { fetchWeather } from '@/lib/api'

interface UseWeatherResult {
  data: WeatherResponse | null
  isLoading: boolean
  error: Error | null
  lastUpdated: Date | null
  refetch: () => void
}

export function useWeather(city: City): UseWeatherResult {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchWeather(city.lat, city.lon)
      setData(result)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [city.lat, city.lon])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchData,
  }
}
