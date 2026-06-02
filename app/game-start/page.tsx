'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PhaseIndicator } from '@/components/phase-indicator'
import { ArrowLeft, Moon, Users, Trophy } from 'lucide-react'

export default function GameStartPage() {
  const searchParams = useSearchParams()
  const playerCount = Number(searchParams.get('players')) || 8
  const gameName = searchParams.get('name') || 'Game'
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          {!gameStarted && (
            <Link href="/role-assignment">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-50">
              {gameStarted ? 'Night Phase' : 'Game Start'}
            </h1>
            <p className="text-xs text-gray-400">
              {gameName} • {playerCount} players
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto animate-in fade-in">
            {/* Game Overview */}
            <PhaseIndicator phase="setup" compact={false} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <Card className="bg-gray-900/50 border-gray-700 p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">Players</p>
                <p className="text-2xl font-bold text-amber-100">{playerCount}</p>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 p-6 text-center">
                <Moon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">First Phase</p>
                <p className="text-lg font-bold text-blue-300">Night</p>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 p-6 text-center">
                <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">Objective</p>
                <p className="text-lg font-bold text-amber-100">Eliminate All</p>
              </Card>
            </div>

            {/* Instructions */}
            <Card className="bg-gradient-to-b from-emerald-900/20 to-emerald-900/10 border-emerald-700/30 p-6 mb-6">
              <h2 className="text-lg font-bold text-emerald-100 mb-4">
                Instructions for Moderator
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold flex-shrink-0">
                    1.
                  </span>
                  <span>
                    Inform all players that the game is starting. Everyone must
                    close their eyes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold flex-shrink-0">
                    2.
                  </span>
                  <span>
                    You will begin with the Night Phase. The werewolves will
                    wake up and choose their first target.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold flex-shrink-0">
                    3.
                  </span>
                  <span>
                    All other roles will have their turn: Seer investigates,
                    Witch saves/poisons, Bodyguard protects, etc.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold flex-shrink-0">
                    4.
                  </span>
                  <span>
                    After all night actions, dawn breaks and you&apos;ll enter
                    the Day Phase.
                  </span>
                </li>
              </ul>
            </Card>

            {/* Rules Reminder */}
            <Card className="bg-amber-900/20 border-amber-700/30 p-6 mb-8">
              <h3 className="text-sm font-bold text-amber-100 mb-3">
                ⚠️ Important Rules
              </h3>
              <ul className="space-y-2 text-xs text-amber-100/80">
                <li>
                  • Keep all role assignments secret until game end
                </li>
                <li>
                  • Werewolves discuss and decide together on targets
                </li>
                <li>
                  • No role can act twice in the same night
                </li>
                <li>
                  • Players cannot vote for themselves during day phase
                </li>
              </ul>
            </Card>

            {/* Start Game Button */}
            <Button
              onClick={() => setGameStarted(true)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6 text-base"
            >
              Begin First Night
            </Button>
          </div>
        ) : (
          <Link href={`/night-phase?players=${playerCount}&night=1&name=${encodeURIComponent(gameName)}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base">
              Go to Night Phase
            </Button>
          </Link>
        )}
      </div>
    </main>
  )
}
