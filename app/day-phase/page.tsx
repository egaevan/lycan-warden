'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PhaseIndicator } from '@/components/phase-indicator'
import { PlayerCard } from '@/components/player-card'
import { CountdownTimer } from '@/components/countdown-timer'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, AlertCircle } from 'lucide-react'

export default function DayPhasePage() {
  const searchParams = useSearchParams()
  const playerCount = Number(searchParams.get('players')) || 8
  const dayNumber = Number(searchParams.get('day')) || 1
  const nightNumber = Number(searchParams.get('night')) || 1
  const gameName = searchParams.get('name') || 'Game'

  const [eliminatedPlayer, setEliminatedPlayer] = useState<number | null>(null)
  const [phaseStatus, setPhaseStatus] = useState<'discussion' | 'voting' | 'result'>(
    'discussion'
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          {phaseStatus === 'discussion' && (
            <Link
              href={`/night-phase?players=${playerCount}&night=${nightNumber}&name=${encodeURIComponent(gameName)}`}
            >
              <Button variant="ghost" size="icon" className="text-gray-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-50">Day {dayNumber}</h1>
            <p className="text-xs text-gray-400">
              {gameName} • {playerCount} players
            </p>
          </div>
          <Badge className="bg-yellow-900 text-yellow-100 border-yellow-700 border">
            {phaseStatus === 'discussion'
              ? 'Discussion'
              : phaseStatus === 'voting'
                ? 'Voting'
                : 'Results'}
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 py-8">
        {phaseStatus === 'discussion' && (
          <div className="animate-in fade-in">
            {/* Phase Indicator */}
            <div className="mb-8">
              <PhaseIndicator phase="day" dayNumber={dayNumber} />
            </div>

            {/* Discussion Instructions */}
            <Card className="bg-yellow-900/20 border-yellow-700/30 p-6 mb-8">
              <div className="flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-100 mb-2">
                    Discussion Phase
                  </h3>
                  <p className="text-sm text-yellow-100/80">
                    Players now have {' '}
                    <span className="font-bold">5 minutes</span> to discuss who
                    they think the werewolves are. Anyone can accuse anyone else.
                    Make your case!
                  </p>
                </div>
              </div>
            </Card>

            {/* Timer */}
            <div className="flex justify-center mb-8">
              <CountdownTimer
                seconds={300}
                title="Discussion Time"
                size="md"
                onComplete={() => setPhaseStatus('voting')}
              />
            </div>

            {/* Player List */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Alive Players ({playerCount})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: playerCount }).map((_, idx) => (
                  <PlayerCard key={idx} playerNumber={idx + 1} alive={true} />
                ))}
              </div>
            </div>

            {/* Skip Button */}
            <Button
              onClick={() => setPhaseStatus('voting')}
              variant="outline"
              className="w-full border-gray-700 text-amber-100 hover:bg-gray-800"
            >
              Skip to Voting
            </Button>
          </div>
        )}

        {phaseStatus === 'voting' && (
          <div className="animate-in fade-in">
            {/* Phase Indicator */}
            <div className="mb-8">
              <PhaseIndicator phase="voting" dayNumber={dayNumber} />
            </div>

            {/* Voting Instructions */}
            <Card className="bg-orange-900/20 border-orange-700/30 p-6 mb-8">
              <h3 className="font-semibold text-orange-100 mb-2">
                Vote to Eliminate
              </h3>
              <p className="text-sm text-orange-100/80">
                Players vote on who to eliminate. Majority vote wins. Ties result
                in no elimination.
              </p>
            </Card>

            {/* Vote Options */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-amber-50 mb-4">Select Elimination</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: playerCount }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setEliminatedPlayer(idx)}
                    className={`cursor-pointer transition-all ${
                      eliminatedPlayer === idx
                        ? 'ring-2 ring-red-500'
                        : ''
                    }`}
                  >
                    <PlayerCard
                      playerNumber={idx + 1}
                      alive={true}
                      voteCount={Math.floor(Math.random() * 3)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-amber-100 hover:bg-gray-800"
                onClick={() => setPhaseStatus('discussion')}
              >
                Back to Discussion
              </Button>
              <Button
                disabled={eliminatedPlayer === null}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
                onClick={() => setPhaseStatus('result')}
              >
                Confirm Elimination
              </Button>
            </div>
          </div>
        )}

        {phaseStatus === 'result' && (
          <div className="max-w-2xl mx-auto text-center animate-in fade-in">
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-4">Player Eliminated</p>
              <h2 className="text-6xl font-black text-red-500 mb-4">
                Player {(eliminatedPlayer ?? 0) + 1}
              </h2>
              <Card className="bg-gray-900/50 border-red-700/30 p-6">
                <p className="text-gray-300">
                  This player has been eliminated and is out of the game.
                </p>
              </Card>
            </div>

            {/* Check Win Conditions */}
            <Card className="bg-gradient-to-b from-emerald-900/20 to-emerald-900/10 border-emerald-700/30 p-6 mb-8">
              <h3 className="text-emerald-100 font-semibold mb-2">
                Check Win Conditions
              </h3>
              <p className="text-sm text-emerald-100/80">
                Have all werewolves been eliminated? Or do werewolves equal or
                outnumber villagers?
              </p>
            </Card>

            {/* Next Phase */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">If game continues:</p>
              <Link
                href={`/night-phase?players=${playerCount}&night=${nightNumber + 1}&name=${encodeURIComponent(gameName)}`}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6">
                  Next Night Phase
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
