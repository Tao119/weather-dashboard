'use client'

import { useState } from 'react'
import type { City } from '@/types/weather'
import { cities } from '@/lib/cities'
import { useWeather } from '@/hooks/useWeather'
import { Header } from '@/components/Header'
import { CurrentWeather } from '@/components/CurrentWeather'
import { ForecastList } from '@/components/ForecastList'
import { PrecipitationMap } from '@/components/PrecipitationMap'
import { SunMoon } from '@/components/SunMoon'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'
import { ErrorDisplay } from '@/components/ErrorDisplay'

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0])
  const { data, isLoading, error, lastUpdated, refetch } = useWeather(selectedCity)

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex h-full grow flex-col">
        <Header selectedCity={selectedCity} onCityChange={setSelectedCity} />

        <main className="flex-1 px-6 md:px-10 py-4 max-w-[1280px] w-full mx-auto">
          {isLoading && <LoadingSkeleton />}

          {error && <ErrorDisplay onRetry={refetch} />}

          {data && !isLoading && !error && (
            <>
              <CurrentWeather city={selectedCity} data={data.current} />
              <ForecastList
                forecasts={data.daily}
                lastUpdated={lastUpdated}
                onRefresh={refetch}
              />

              {/* Additional Info Grid */}
              <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
                <PrecipitationMap city={selectedCity} />
                <SunMoon />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
