import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsVisible(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-in slide-in-from-bottom-4 fade-in duration-300"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-gray-900 border border-amber-700/50 rounded-xl p-4 shadow-2xl backdrop-blur-xl flex items-center gap-4">
        <div className="p-2 rounded-lg bg-amber-600/20 border border-amber-600/50 flex-shrink-0">
          <Download className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-100">Install Lycan Warden</p>
          <p className="text-xs text-gray-400 truncate">Add to home screen for the best experience</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            onClick={handleInstall}
            className="bg-amber-600 hover:bg-amber-700 text-amber-950 text-xs h-8"
          >
            Install
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
