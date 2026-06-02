'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

export interface CountdownTimerProps {
  seconds: number
  onComplete?: () => void
  size?: 'sm' | 'md' | 'lg'
  title?: string
}

export function CountdownTimer({
  seconds,
  onComplete,
  size = 'md',
  title,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.()
      return
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [remaining, onComplete])

  const sizeClasses = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl',
  }

  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  const progress = ((seconds - remaining) / seconds) * 100

  return (
    <div className="flex flex-col items-center gap-3">
      {title && <p className="text-sm text-gray-400">{title}</p>}
      <Card className="relative border border-amber-700/50 bg-gray-800/50 backdrop-blur-sm p-0 flex items-center justify-center overflow-hidden">
        <svg
          className={`${sizeClasses[size]} transform -rotate-90 absolute`}
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3a3a3a"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#c9a961"
            strokeWidth="3"
            strokeDasharray={`${(progress / 100) * 283} 283`}
            style={{ transition: 'stroke-dasharray 1s linear' }}
          />
        </svg>

        <div className={`${sizeClasses[size]} flex items-center justify-center relative z-10`}>
          <span className="font-bold text-amber-100">{formattedTime}</span>
        </div>
      </Card>
    </div>
  )
}
