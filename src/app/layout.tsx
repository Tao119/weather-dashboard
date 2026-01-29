import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WeatherGlass - Modern Weather Dashboard',
  description: 'A beautiful weather dashboard with glassmorphism design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark">
      <body className="font-display text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
