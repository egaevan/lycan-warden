'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayerCard } from '@/components/player-card'
import { Trophy, Crown, Skull } from 'lucide-react'

export default function GameOverPage() {
  const searchParams = useSearchParams()
  const winner = (searchParams.get('winner') || 'villagers') as
    | 'villagers'
    | 'werewolves'
    | 'jester'
  const players = [
    { id: 1, role: 'Villager', alive: true, team: 'villagers' },
    { id: 2, role: 'Werewolf', alive: false, team: 'werewolves' },
    { id: 3, role: 'Seer', alive: true, team: 'villagers' },
    { id: 4, role: 'Werewolf', alive: true, team: 'werewolves' },
    { id: 5, role: 'Witch', alive: true, team: 'villagers' },
    { id: 6, role: 'Villager', alive: false, team: 'villagers' },
    { id: 7, role: 'Hunter', alive: true, team: 'villagers' },
    { id: 8, role: 'Jester', alive: true, team: 'neutral' },
  ]

  const [showRoles, setShowRoles] = useState(false)

  const winnerConfig = {
    villagers: {
      title: 'Villagers Win!',
      subtitle: 'The werewolves have been vanquished!',
      color: 'from-emerald-900 to-emerald-950',
      icon: Trophy,
      badge: 'bg-emerald-900 text-emerald-100 border-emerald-700',
      description: 'All werewolves have been eliminated. The village is safe.',
    },
    werewolves: {
      title: 'Werewolves Win!',
      subtitle: 'The town has fallen to darkness.',
      color: 'from-red-900 to-red-950',
      icon: Skull,
      badge: 'bg-red-900 text-red-100 border-red-700',
      description: 'Werewolves now equal or outnumber villagers. They have taken over.',
    },
    jester: {
      title: 'Jester Wins!',
      subtitle: 'Chaos reigns supreme.',
      color: 'from-purple-900 to-purple-950',
      icon: Crown,
      badge: 'bg-purple-900 text-purple-100 border-purple-700',
      description: 'The Jester was voted out during the day and achieved their goal.',
    },
  }

  const config = winnerConfig[winner]
  const Icon = config.icon

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${config.color} opacity-10 blur-3xl -z-10`}
      />

      <div className="w-full max-w-2xl animate-in fade-in zoom-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600 to-amber-900 blur-xl opacity-30 rounded-full w-32 h-32" />
              <Icon className="w-32 h-32 text-amber-400 relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl font-black mb-2 text-amber-50 drop-shadow-lg">
            {config.title}
          </h1>
          <p className="text-xl text-amber-300/80 font-medium mb-4">
            {config.subtitle}
          </p>
        </div>

        {/* Description */}
        <Card className="bg-gradient-to-b from-gray-900/50 to-gray-800/50 border-gray-700 p-6 mb-8 backdrop-blur-sm">
          <p className="text-gray-300 text-center">{config.description}</p>
        </Card>

        {/* Winning Team */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-amber-50 text-center mb-4">
            Victory goes to the {winner === 'jester' ? 'Jester' : winner.charAt(0).toUpperCase() + winner.slice(1)}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {players
              .filter((p) => p.team === winner || winner === 'jester')
              .map((player) => (
                <Card
                  key={player.id}
                  className={`${config.badge} border text-center p-4 rounded-lg`}
                >
                  <p className="font-bold mb-1">P{player.id}</p>
                  <p className="text-xs font-medium">{player.role}</p>
                </Card>
              ))}
          </div>
        </div>

        {/* Final Statistics */}
        <Card className="bg-gray-900/50 border-gray-700 p-6 mb-8">
          <h3 className="font-bold text-amber-50 mb-4 text-center">Game Summary</h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-400 mb-1">Game Length</p>
              <p className="text-lg font-bold text-amber-100">4 Rounds</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Players</p>
              <p className="text-lg font-bold text-amber-100">8</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Duration</p>
              <p className="text-lg font-bold text-amber-100">45 min</p>
            </div>
          </div>
        </Card>

        {/* Reveal Roles Button */}
        {!showRoles ? (
          <Button
            onClick={() => setShowRoles(true)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6 text-base mb-3"
          >
            Reveal All Roles
          </Button>
        ) : (
          <Card className="bg-gray-900/50 border-amber-700/30 p-6 mb-3">
            <h3 className="font-bold text-amber-100 mb-4">Final Roles</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {players.map((player) => (
                <div key={player.id} className="flex justify-between p-2 bg-gray-800/50 rounded border border-gray-700">
                  <span className="text-amber-100">Player {player.id}</span>
                  <span className="text-gray-300">{player.role}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6">
              Return Home
            </Button>
          </Link>
          <Link href="/new-game" className="block">
            <Button
              variant="outline"
              className="w-full border-amber-700/50 text-amber-100 hover:bg-amber-900/20 py-6"
            >
              Play Again
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Thanks for playing Lycan Warden
        </p>
      </div>
    </main>
  )
}
