'use client'

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Current Weather Skeleton */}
      <section className="mb-10">
        <div className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[320px]">
          <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-auto">
            <div className="h-24 w-48 skeleton rounded-xl" />
            <div className="h-6 w-32 skeleton rounded-lg opacity-50" />
            <div className="flex gap-3 mt-4">
              <div className="h-10 w-24 skeleton rounded-lg opacity-30" />
              <div className="h-10 w-24 skeleton rounded-lg opacity-30" />
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 skeleton rounded-full opacity-20" />
            <div className="absolute w-32 h-32 md:w-40 md:h-40 skeleton rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-6 min-w-[300px]">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card p-5 rounded-xl flex flex-col items-center gap-3">
                <div className="w-8 h-8 skeleton rounded-lg opacity-40" />
                <div className="h-4 w-16 skeleton rounded-md opacity-30" />
                <div className="h-6 w-20 skeleton rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forecast Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 w-40 skeleton rounded-lg" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="glass-card p-6 rounded-xl flex flex-col items-center gap-4">
              <div className="h-4 w-12 skeleton rounded-md opacity-50" />
              <div className="w-12 h-12 skeleton rounded-full" />
              <div className="flex gap-2">
                <div className="h-4 w-8 skeleton rounded-md" />
                <div className="h-4 w-8 skeleton rounded-md opacity-30" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Loading Message Footer */}
      <footer className="flex justify-center py-10">
        <div className="flex items-center gap-3 glass-card px-6 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-medium text-white/60">Fetching weather data...</p>
        </div>
      </footer>
    </div>
  )
}
