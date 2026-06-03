import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Moon, ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/shared/config/routes'
import type { GamePhase } from '@/shared/types/game'

interface GameLayoutProps {
  children: React.ReactNode
  currentPhase: GamePhase
  dayNumber?: number
  nightNumber?: number
  gameName?: string
}

const PHASE_LABELS: Record<GamePhase, string> = {
  'setup': 'Setup',
  'role-selection': 'Role Selection',
  'role-assignment': 'Role Assignment',
  'role-reveal': 'Role Reveal',
  'night': 'Night',
  'morning': 'Morning',
  'discussion': 'Discussion',
  'voting': 'Voting',
  'elimination': 'Elimination',
  'ended': 'Game Over',
}

const PHASE_COLORS: Record<GamePhase, string> = {
  'setup': 'text-gray-400',
  'role-selection': 'text-amber-400',
  'role-assignment': 'text-amber-400',
  'role-reveal': 'text-amber-400',
  'night': 'text-indigo-400',
  'morning': 'text-amber-300',
  'discussion': 'text-amber-400',
  'voting': 'text-red-400',
  'elimination': 'text-red-600',
  'ended': 'text-gray-400',
}

export function GameLayout({
  children,
  currentPhase,
  dayNumber,
  gameName,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-100" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-400" />
                <div>
                  <h1 className="font-black text-amber-100 text-lg">Lycan Warden</h1>
                  {gameName && <p className="text-xs text-gray-400">{gameName}</p>}
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-100" asChild>
              <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className={PHASE_COLORS[currentPhase]}>
              {PHASE_LABELS[currentPhase]}
            </span>
            {dayNumber && dayNumber > 0 && (
              <>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">Day {dayNumber}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  )
}
