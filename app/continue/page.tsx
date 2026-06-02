'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, Users } from 'lucide-react'

export default function ContinuePage() {
  const savedGames = [
    {
      id: 1,
      name: 'Midnight Deception',
      players: 10,
      currentPhase: 'Day 3',
      lastPlayed: '2 hours ago',
    },
    {
      id: 2,
      name: 'Forest Secrets',
      players: 8,
      currentPhase: 'Night 2',
      lastPlayed: 'Yesterday',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-amber-50">Continue Game</h1>
            <p className="text-xs text-gray-400">Resume your saved games</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        {savedGames.length > 0 ? (
          <div className="space-y-3">
            {savedGames.map((game) => (
              <Link key={game.id} href="/dashboard">
                <Card className="bg-gray-900/50 border-gray-700 hover:border-amber-700 cursor-pointer transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-amber-50">
                        {game.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {game.currentPhase} • {game.players} players
                      </p>
                    </div>
                    <Badge className="bg-amber-900 text-amber-100 border-amber-700 border">
                      {game.currentPhase}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {game.players} players
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {game.lastPlayed}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-900/50 border-gray-700 p-12 text-center">
            <p className="text-gray-400 mb-6">No saved games found</p>
            <Link href="/new-game">
              <Button className="bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold">
                Start New Game
              </Button>
            </Link>
          </Card>
        )}

        {/* Info */}
        <Card className="bg-amber-900/20 border-amber-700/30 p-6 mt-8">
          <p className="text-sm text-amber-100/80">
            Games are automatically saved when you continue playing. Your progress
            is preserved across sessions.
          </p>
        </Card>
      </div>
    </main>
  )
}
