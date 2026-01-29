'use client'

interface ErrorDisplayProps {
  onRetry: () => void
}

export function ErrorDisplay({ onRetry }: ErrorDisplayProps) {
  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="flex flex-col max-w-[480px] w-full">
        {/* Centered Glassmorphism Card */}
        <div className="glass-card rounded-xl p-8 md:p-12 flex flex-col items-center text-center gap-8">
          {/* Custom Cloud Off Icon */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" />
            <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 text-white/80">
              <svg
                className="w-20 h-20 md:w-28 md:h-28"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Unable to load weather data
            </h1>
            <p className="text-white/60 text-base font-normal leading-relaxed max-w-[320px] mx-auto">
              We're having trouble reaching the weather station. Please check your connection or try again.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onRetry}
            className="group flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/25"
          >
            <span className="truncate">Try again</span>
            <svg
              className="ml-2 w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}
