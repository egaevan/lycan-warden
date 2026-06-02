'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Moon, ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/src/shared/constants/app'
import { PhaseIndicator } from '@/src/widgets/PhaseIndicator'
import type { GamePhase } from '@/src/shared/types/game'

interface GameLayoutProps {
  children: React.ReactNode
  currentPhase: GamePhase
  dayNumber?: number
  nightNumber?: number
  gameName?: string
  showBackButton?: boolean
}

export function GameLayout({
  children,
  currentPhase,
  dayNumber,
  nightNumber,
  gameName,
  showBackButton = true,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col">
      {/* Header with game status */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-amber-100"
                >
                  <Link href={ROUTES.HOME}>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Link>
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-400" />
                <div>
                  <h1 className="font-black text-amber-100 text-lg">
                    Lycan Warden
                  </h1>
                  {gameName && (
                    <p className="text-xs text-gray-400">{gameName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <PhaseIndicator
                phase={currentPhase}
                dayNumber={dayNumber}
                nightNumber={nightNumber}
                compact
              />
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-amber-100"
              >
                <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  )
}
