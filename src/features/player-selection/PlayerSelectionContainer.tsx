'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayerCard } from '@/entities/player/PlayerCard'
import type { Player } from '@/shared/types/game'

interface PlayerSelectionContainerProps {
  players: Player[]
  onSelect: (selectedPlayers: string[]) => void
  maxSelectable?: number
  title?: string
  description?: string
  actionLabel?: string
  allowMultiple?: boolean
}

export function PlayerSelectionContainer({
  players,
  onSelect,
  maxSelectable = 1,
  title = 'Select Players',
  description = '',
  actionLabel = 'Continue',
  allowMultiple = false,
}: PlayerSelectionContainerProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])

  const togglePlayer = (playerId: string) => {
    setSelectedPlayers((prev) => {
      if (!allowMultiple) {
        return prev.includes(playerId) ? [] : [playerId]
      }

      if (prev.includes(playerId)) {
        return prev.filter((p) => p !== playerId)
      } else if (prev.length < maxSelectable) {
        return [...prev, playerId]
      }
      return prev
    })
  }

  const alivePlayers = players.filter((p) => p.alive)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-100 mb-2">{title}</h2>
        {description && <p className="text-gray-400">{description}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {alivePlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isSelected={selectedPlayers.includes(player.id)}
            onClick={() => togglePlayer(player.id)}
            showRole={false}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => onSelect(selectedPlayers)}
          disabled={selectedPlayers.length === 0}
          className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
        >
          {actionLabel} ({selectedPlayers.length}/{maxSelectable})
        </Button>
      </div>
    </div>
  )
}
