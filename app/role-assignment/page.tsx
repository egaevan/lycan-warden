'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlayerCard } from '@/components/player-card'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Shuffle } from 'lucide-react'

const ROLE_NAMES: Record<string, string> = {
  villager: 'Villager',
  werewolf: 'Werewolf',
  seer: 'Seer',
  hunter: 'Hunter',
  witch: 'Witch',
  bodyguard: 'Bodyguard',
  jester: 'Jester',
}

export default function RoleAssignmentPage() {
  const searchParams = useSearchParams()
  const playerCount = Number(searchParams.get('players')) || 8
  const rolesString = searchParams.get('roles') || ''
  const gameName = searchParams.get('name') || ''

  const [playerRoles, setPlayerRoles] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [revealed, setRevealed] = useState<number[]>([])

  useEffect(() => {
    const roles = rolesString.split(',').filter((r) => r)
    const shuffled = [...roles].sort(() => Math.random() - 0.5)
    setPlayerRoles(shuffled)
  }, [rolesString])

  const handleRevealRole = (playerIdx: number) => {
    if (!revealed.includes(playerIdx)) {
      setRevealed([...revealed, playerIdx])
    }
  }

  const handleNext = () => {
    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPlayer > 0) {
      setCurrentPlayer(currentPlayer - 1)
    }
  }

  const shuffleRoles = () => {
    const shuffled = [...playerRoles].sort(() => Math.random() - 0.5)
    setPlayerRoles(shuffled)
  }

  const currentRole = playerRoles[currentPlayer]
  const isCurrentRevealed = revealed.includes(currentPlayer)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/role-selection">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-50">Role Assignment</h1>
            <p className="text-xs text-gray-400">
              {gameName || 'Game'} • {playerCount} players
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 py-8">
        {/* Current Player Role Reveal */}
        <div className="mb-8 animate-in fade-in">
          <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-amber-700/30 p-8 text-center mb-6">
            <p className="text-gray-400 text-sm mb-4">Player {currentPlayer + 1}</p>

            {!isCurrentRevealed ? (
              <div className="space-y-6">
                <div className="text-6xl">🔮</div>
                <p className="text-gray-300 mb-6">
                  Player {currentPlayer + 1}, reveal your role by tapping below
                </p>
                <Button
                  onClick={() => handleRevealRole(currentPlayer)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6 text-lg"
                >
                  Reveal My Role
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl font-black text-amber-100 drop-shadow-lg">
                  {ROLE_NAMES[currentRole] || currentRole}
                </div>
                <p className="text-gray-300 text-sm">
                  Remember your role. Don&apos;t reveal it to others!
                </p>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-amber-100 hover:bg-gray-800"
                    onClick={handlePrevious}
                    disabled={currentPlayer === 0}
                  >
                    ← Previous
                  </Button>
                  <Button
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold"
                    onClick={handleNext}
                  >
                    {currentPlayer === playerCount - 1
                      ? 'All Done'
                      : 'Next Player →'}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-400">
              {revealed.length} of {playerCount} players have seen their role
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-amber-100 hover:bg-gray-800"
              onClick={shuffleRoles}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Reshuffle
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(revealed.length / playerCount) * 100}%` }}
            />
          </div>
        </div>

        {/* All Players Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-amber-50 mb-4">Players</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {Array.from({ length: playerCount }).map((_, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border text-center cursor-pointer transition-all ${
                  currentPlayer === idx
                    ? 'border-amber-600 bg-amber-900/20'
                    : 'border-gray-700 hover:border-gray-600'
                } ${revealed.includes(idx) ? 'bg-green-900/20' : 'bg-gray-800/30'}`}
                onClick={() => setCurrentPlayer(idx)}
              >
                <p className="text-sm font-semibold text-amber-100">
                  P{idx + 1}
                </p>
                {revealed.includes(idx) && (
                  <p className="text-xs text-green-300 mt-1">✓ Revealed</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {revealed.length === playerCount && (
          <Link href={`/game-start?players=${playerCount}&name=${encodeURIComponent(gameName)}`}>
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6 text-base animate-pulse">
              Start Game
            </Button>
          </Link>
        )}
      </div>
    </main>
  )
}
