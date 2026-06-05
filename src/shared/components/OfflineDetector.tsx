import { useState, useEffect } from 'react'
import { WifiOff } from 'lucide-react'

export function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-red-900/90 backdrop-blur-sm border-b border-red-700/50 py-2 px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4 text-red-200" />
        <p className="text-sm text-red-200 font-medium">
          You are offline — Lycan Warden will still work
        </p>
      </div>
    </div>
  )
}
