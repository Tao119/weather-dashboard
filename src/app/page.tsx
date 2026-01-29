'use client'

import { useState } from 'react'
import type { City } from '@/types/weather'
import { cities } from '@/lib/cities'
import { useWeather } from '@/hooks/useWeather'
import { useGeolocation } from '@/hooks/useGeolocation'
import { Header } from '@/components/Header'
import { CurrentWeather } from '@/components/CurrentWeather'
import { ForecastList } from '@/components/ForecastList'
import { PrecipitationMap } from '@/components/PrecipitationMap'
import { SunMoon } from '@/components/SunMoon'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { DetailedReport } from '@/components/DetailedReport'
import { ForecastHistory } from '@/components/ForecastHistory'
import { FullMap } from '@/components/FullMap'

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0])
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius')
  const [isDetailedReportOpen, setIsDetailedReportOpen] = useState(false)
  const [isForecastHistoryOpen, setIsForecastHistoryOpen] = useState(false)
  const [isFullMapOpen, setIsFullMapOpen] = useState(false)

  const { data, isLoading, error, lastUpdated, refetch } = useWeather(selectedCity)
  const { getNearestCity, isLoading: isGeoLoading } = useGeolocation()

  const handleGetLocation = async () => {
    const nearestCity = await getNearestCity()
    if (nearestCity) {
      setSelectedCity(nearestCity)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex h-full grow flex-col">
        <Header
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          onGetLocation={handleGetLocation}
          isGeoLoading={isGeoLoading}
          temperatureUnit={temperatureUnit}
          onTemperatureUnitChange={setTemperatureUnit}
        />

        <main className="flex-1 px-6 md:px-10 py-4 max-w-[1280px] w-full mx-auto">
          {isLoading && <LoadingSkeleton />}

          {error && <ErrorDisplay onRetry={refetch} />}

          {data && !isLoading && !error && (
            <>
              <CurrentWeather
                city={selectedCity}
                data={data.current}
                temperatureUnit={temperatureUnit}
                onDetailedReportClick={() => setIsDetailedReportOpen(true)}
                onForecastHistoryClick={() => setIsForecastHistoryOpen(true)}
              />
              <ForecastList
                forecasts={data.daily}
                lastUpdated={lastUpdated}
                onRefresh={refetch}
                temperatureUnit={temperatureUnit}
              />

              {/* Additional Info Grid */}
              <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
                <PrecipitationMap
                  city={selectedCity}
                  onFullMapClick={() => setIsFullMapOpen(true)}
                />
                <SunMoon />
              </section>

              {/* Modals */}
              <DetailedReport
                isOpen={isDetailedReportOpen}
                onClose={() => setIsDetailedReportOpen(false)}
                city={selectedCity}
                current={data.current}
                daily={data.daily}
              />
              <ForecastHistory
                isOpen={isForecastHistoryOpen}
                onClose={() => setIsForecastHistoryOpen(false)}
                city={selectedCity}
                daily={data.daily}
              />
              <FullMap
                isOpen={isFullMapOpen}
                onClose={() => setIsFullMapOpen(false)}
                city={selectedCity}
              />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
