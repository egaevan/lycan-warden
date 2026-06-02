'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatTime } from '@/src/shared/utils/helpers'

interface CountdownTimerProps {
  initialSeconds: number
  onComplete?: () => void
  autoStart?: boolean
  showControls?: boolean
}

export function CountdownTimer({
  initialSeconds,
  onComplete,
  autoStart = false,
  showControls = true,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete])

  const progress = ((initialSeconds - timeLeft) / initialSeconds) * 100
  const isWarning = timeLeft < 30 && timeLeft > 0
  const isCritical = timeLeft < 10 && timeLeft > 0

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Circular progress */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-800"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
            className={`transition-colors ${
              isCritical
                ? 'text-red-500'
                : isWarning
                  ? 'text-yellow-500'
                  : 'text-amber-400'
            }`}
          />
        </svg>

        {/* Time display */}
        <div className="text-center z-10">
          <div
            className={`text-5xl font-black font-mono transition-colors ${
              isCritical
                ? 'text-red-500'
                : isWarning
                  ? 'text-yellow-400'
                  : 'text-amber-300'
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <p className="text-sm text-gray-400 mt-2">Remaining</p>
        </div>
      </div>

      {showControls && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isRunning ? 'default' : 'outline'}
            onClick={() => setIsRunning(!isRunning)}
            className={
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'border-amber-700/50 hover:bg-amber-900/20'
            }
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setTimeLeft(initialSeconds)
              setIsRunning(false)
            }}
            className="border-amber-700/50 hover:bg-amber-900/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
