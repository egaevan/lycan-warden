'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PhaseIndicator } from '@/components/phase-indicator'
import { PlayerCard } from '@/components/player-card'
import { CountdownTimer } from '@/components/countdown-timer'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'

const NIGHT_ACTIONS = [
  {
    role: 'Werewolves',
    action: 'Choose a target to eliminate',
    time: 90,
    color: 'red',
  },
  {
    role: 'Seer',
    action: 'Investigate a player',
    time: 60,
    color: 'blue',
  },
  {
    role: 'Witch',
    action: 'Save or poison a player',
    time: 60,
    color: 'purple',
  },
  {
    role: 'Bodyguard',
    action: 'Protect a player',
    time: 60,
    color: 'green',
  },
]

export default function NightPhasePage() {
  const searchParams = useSearchParams()
  const playerCount = Number(searchParams.get('players')) || 8
  const nightNumber = Number(searchParams.get('night')) || 1
  const gameName = searchParams.get('name') || 'Game'

  const [currentActionIdx, setCurrentActionIdx] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null)
  const [completedActions, setCompletedActions] = useState<number[]>([])
  const [phaseComplete, setPhaseComplete] = useState(false)

  const currentAction = NIGHT_ACTIONS[currentActionIdx]
  const isActionComplete = completedActions.includes(currentActionIdx)

  const handleCompleteAction = () => {
    if (!completedActions.includes(currentActionIdx)) {
      setCompletedActions([...completedActions, currentActionIdx])
    }
    handleNextAction()
  }

  const handleNextAction = () => {
    if (currentActionIdx < NIGHT_ACTIONS.length - 1) {
      setCurrentActionIdx(currentActionIdx + 1)
      setSelectedTarget(null)
    } else {
      setPhaseComplete(true)
    }
  }

  const handlePreviousAction = () => {
    if (currentActionIdx > 0) {
      setCurrentActionIdx(currentActionIdx - 1)
      setSelectedTarget(null)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          {!phaseComplete && (
            <Link href={`/game-start?players=${playerCount}&name=${encodeURIComponent(gameName)}`}>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-50">Night {nightNumber}</h1>
            <p className="text-xs text-gray-400">
              {gameName} • {playerCount} players
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-blue-300">
              {completedActions.length}/{NIGHT_ACTIONS.length}
            </p>
            <p className="text-xs text-gray-400">actions complete</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 py-8">
        {!phaseComplete ? (
          <div className="animate-in fade-in">
            {/* Phase Indicator */}
            <div className="mb-8">
              <PhaseIndicator phase="night" dayNumber={nightNumber} />
            </div>

            {/* Current Action */}
            <Card className="bg-gray-900/50 border-gray-700 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Action</p>
                  <h2 className="text-2xl font-bold text-amber-50">
                    {currentAction.role}
                  </h2>
                </div>
                <Badge className="bg-blue-900 text-blue-100 border-blue-700 border">
                  {currentActionIdx + 1}/{NIGHT_ACTIONS.length}
                </Badge>
              </div>

              <p className="text-gray-300 mb-8">{currentAction.action}</p>

              {/* Player Selection */}
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-3">Select target:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                  {Array.from({ length: playerCount }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTarget(idx)}
                      className={`p-3 rounded border text-center transition-all ${
                        selectedTarget === idx
                          ? 'border-amber-600 bg-amber-900/20 ring-2 ring-amber-500'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                      }`}
                    >
                      <p className="text-sm font-semibold text-amber-100">
                        P{idx + 1}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="flex justify-center mb-8">
                <CountdownTimer
                  seconds={currentAction.time}
                  title={`Time remaining for ${currentAction.role}`}
                  size="sm"
                  onComplete={() => {
                    if (!completedActions.includes(currentActionIdx)) {
                      handleCompleteAction()
                    }
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-amber-100 hover:bg-gray-800"
                  onClick={handlePreviousAction}
                  disabled={currentActionIdx === 0}
                >
                  ← Previous
                </Button>
                <Button
                  disabled={selectedTarget === null}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold disabled:opacity-50"
                  onClick={handleCompleteAction}
                >
                  {currentActionIdx === NIGHT_ACTIONS.length - 1
                    ? 'Complete Night'
                    : 'Continue'}
                </Button>
              </div>
            </Card>

            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-400">Night action progress</p>
              <p className="text-xs text-gray-500">
                Skip timer: Auto-advances when time expires
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentActionIdx + 1) / NIGHT_ACTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center animate-in fade-in">
            <h2 className="text-3xl font-bold text-amber-50 mb-4">
              Night Complete
            </h2>
            <p className="text-gray-300 mb-8">
              All night actions have been resolved. The sun rises on a new day.
            </p>

            <Card className="bg-gray-900/50 border-gray-700 p-6 mb-8">
              <p className="text-gray-400 mb-3">Proceed to:</p>
              <div className="space-y-2">
                <p className="text-amber-100 font-semibold">Day Phase</p>
                <p className="text-sm text-gray-400">
                  Players discuss and vote during the day
                </p>
              </div>
            </Card>

            <Link
              href={`/day-phase?players=${playerCount}&day=1&night=${nightNumber}&name=${encodeURIComponent(gameName)}`}
            >
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-yellow-950 font-semibold py-6 text-base">
                Begin Day Phase
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
