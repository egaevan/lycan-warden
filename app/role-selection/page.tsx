'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RoleCard } from '@/components/role-card'
import { ArrowLeft } from 'lucide-react'

const AVAILABLE_ROLES = {
  villager: {
    title: 'Villager',
    description: 'Pure heart, voting power, no special abilities',
    alignment: 'village' as const,
    abilities: ['Vote during day phase', 'No special night actions'],
  },
  werewolf: {
    title: 'Werewolf',
    description: 'Hunt at night, eliminate one villager each round',
    alignment: 'werewolf' as const,
    abilities: [
      'Choose target at night',
      'Target eliminated in morning',
      'Know other werewolves',
    ],
  },
  seer: {
    title: 'Seer',
    description: 'Divine role alignment of another player each night',
    alignment: 'village' as const,
    abilities: [
      'Investigate one player per night',
      'Learn their alignment (Village/Werewolf/Neutral)',
      'Cannot investigate same player twice',
    ],
  },
  hunter: {
    title: 'Hunter',
    description: 'When eliminated, choose one player to eliminate with you',
    alignment: 'village' as const,
    abilities: [
      'Upon elimination, shoot a player',
      'Target is immediately removed',
    ],
  },
  witch: {
    title: 'Witch',
    description: 'Save one player from elimination and poison one per game',
    alignment: 'village' as const,
    abilities: [
      'Save one player per night',
      'Poison one player per game',
      'Cannot save/poison self',
    ],
  },
  bodyguard: {
    title: 'Bodyguard',
    description: 'Protect another player from being eliminated each night',
    alignment: 'village' as const,
    abilities: [
      'Guard one player per night',
      'They cannot be eliminated that night',
      'Cannot guard same player consecutively',
    ],
  },
  jester: {
    title: 'Jester',
    description: 'Win by being eliminated during the day phase',
    alignment: 'neutral' as const,
    abilities: ['Win if voted out during day', 'Otherwise, play as villager'],
  },
}

export default function RoleSelectionPage() {
  const searchParams = useSearchParams()
  const playerCount = Number(searchParams.get('players')) || 8
  const preset = searchParams.get('preset') || 'classic'
  const gameName = searchParams.get('name') || ''

  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const toggleRole = (roleKey: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleKey)
        ? prev.filter((r) => r !== roleKey)
        : [...prev, roleKey]
    )
  }

  const canProceed = selectedRoles.length === playerCount

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/new-game">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-50">Assign Roles</h1>
            <p className="text-xs text-gray-400">
              Select {playerCount} roles for your {playerCount}-player game
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-amber-100">
              {selectedRoles.length}/{playerCount}
            </p>
            <p className="text-xs text-gray-400">roles selected</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 py-8">
        {/* Role Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(AVAILABLE_ROLES).map(([key, role]) => (
            <div
              key={key}
              onClick={() => selectedRoles.length < playerCount && toggleRole(key)}
              className={selectedRoles.includes(key) ? '' : ''}
            >
              <RoleCard
                {...role}
                showAbilities={true}
                isSelected={selectedRoles.includes(key)}
                disabled={
                  !selectedRoles.includes(key) &&
                  selectedRoles.length >= playerCount
                }
                onClick={() => toggleRole(key)}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 max-w-2xl">
          <Link href="/new-game" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-700 text-amber-100 hover:bg-gray-800"
            >
              Back
            </Button>
          </Link>
          <Link
            href={`/role-assignment?players=${playerCount}&roles=${selectedRoles.join(',')}${gameName ? `&name=${encodeURIComponent(gameName)}` : ''}`}
            className={`flex-1 ${!canProceed ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button
              disabled={!canProceed}
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold"
            >
              Assign to Players
            </Button>
          </Link>
        </div>

        {!canProceed && (
          <p className="text-sm text-amber-200/70 mt-4">
            ⚠️ Select exactly {playerCount} roles to continue
          </p>
        )}
      </div>
    </main>
  )
}
