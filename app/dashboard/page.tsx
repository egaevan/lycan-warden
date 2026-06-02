'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PhaseIndicator } from '@/components/phase-indicator'
import { PlayerCard } from '@/components/player-card'
import { ArrowLeft, BarChart3, Users, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const [gameStatus] = useState({
    name: 'Midnight Deception',
    currentPhase: 'day' as const,
    dayNumber: 3,
    nightNumber: 3,
    playersAlive: 6,
    playersTotal: 10,
    werewolvesAlive: 2,
    villagersAlive: 4,
  })

  const [players] = useState([
    {
      id: 1,
      alive: true,
      role: 'Werewolf',
      notes: 'Active in discussion',
    },
    { id: 2, alive: true, role: 'Villager', notes: '' },
    { id: 3, alive: false, role: 'Seer', notes: 'Eliminated Day 1' },
    { id: 4, alive: true, role: 'Witch', notes: 'Saved night 2' },
    { id: 5, alive: true, role: 'Werewolf', notes: '' },
    { id: 6, alive: false, role: 'Villager', notes: 'Eliminated Night 2' },
    { id: 7, alive: true, role: 'Hunter', notes: 'Vigilant' },
    { id: 8, alive: true, role: 'Villager', notes: '' },
    { id: 9, alive: false, role: 'Bodyguard', notes: 'Eliminated Day 2' },
    { id: 10, alive: true, role: 'Villager', notes: '' },
  ])

  const [selectedTab, setSelectedTab] = useState<'overview' | 'players' | 'actions'>(
    'overview'
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-amber-50">Moderator Dashboard</h1>
              <p className="text-xs text-gray-400">{gameStatus.name}</p>
            </div>
          </div>

          <Link href="/day-phase">
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-yellow-950 font-semibold">
              Continue Game
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 py-8">
        {/* Game Status */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gray-900/50 border-gray-700 p-4">
            <p className="text-xs text-gray-400 mb-1">Current Phase</p>
            <Badge className="bg-yellow-900 text-yellow-100 border-yellow-700 border">
              Day {gameStatus.dayNumber}
            </Badge>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 p-4">
            <p className="text-xs text-gray-400 mb-2">Players Alive</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">
                {gameStatus.playersAlive}
              </span>
              <span className="text-xs text-gray-500">/{gameStatus.playersTotal}</span>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 p-4">
            <p className="text-xs text-gray-400 mb-2">Werewolves</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-500">
                {gameStatus.werewolvesAlive}
              </span>
              <span className="text-xs text-gray-500">alive</span>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 p-4">
            <p className="text-xs text-gray-400 mb-2">Villagers</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">
                {gameStatus.villagersAlive}
              </span>
              <span className="text-xs text-gray-500">alive</span>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-900/10 border-amber-700/50 p-4">
            <p className="text-xs text-amber-300 mb-2">Rounds</p>
            <p className="text-sm font-semibold text-amber-100">
              N{gameStatus.nightNumber} / D{gameStatus.dayNumber}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-700">
          {(['overview', 'players', 'actions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                selectedTab === tab
                  ? 'text-amber-100 border-b-2 border-amber-600'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Current Phase Info */}
            <div>
              <h2 className="text-lg font-bold text-amber-50 mb-4">Current Phase</h2>
              <PhaseIndicator phase="day" dayNumber={gameStatus.dayNumber} />
            </div>

            {/* Win Conditions */}
            <Card className="bg-gray-900/50 border-gray-700 p-6">
              <h3 className="font-bold text-amber-50 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Win Conditions
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-gray-300">
                    <span className="text-emerald-100 font-semibold">Villagers Win:</span> All
                    werewolves eliminated
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                  <span className="text-gray-300">
                    <span className="text-red-100 font-semibold">Werewolves Win:</span> Equal or
                    outnumber villagers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold flex-shrink-0">✦</span>
                  <span className="text-gray-300">
                    <span className="text-purple-100 font-semibold">Jester Wins:</span> Voted out
                    during day phase
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Players Tab */}
        {selectedTab === 'players' && (
          <div className="animate-in fade-in">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-amber-100">Player</TableHead>
                    <TableHead className="text-amber-100">Status</TableHead>
                    <TableHead className="text-amber-100">Role</TableHead>
                    <TableHead className="text-amber-100">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.id} className="border-gray-700">
                      <TableCell className="font-semibold text-amber-100">
                        Player {player.id}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            player.alive
                              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                              : 'bg-red-900 text-red-100 border-red-700'
                          } border`}
                        >
                          {player.alive ? 'Alive' : 'Eliminated'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-amber-100 font-medium">{player.role}</span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {player.notes || '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Actions Tab */}
        {selectedTab === 'actions' && (
          <div className="animate-in fade-in space-y-4">
            <Card className="bg-gray-900/50 border-gray-700 p-6">
              <h3 className="font-bold text-amber-50 mb-4">Game Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-amber-100 hover:bg-gray-800 justify-start"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Game Statistics
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-amber-100 hover:bg-gray-800 justify-start"
                >
                  Export Game Log
                </Button>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-red-700/50 text-red-300 hover:bg-red-900/20 justify-start"
                  >
                    End Game
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
