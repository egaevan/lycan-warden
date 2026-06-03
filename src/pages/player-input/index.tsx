import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function PlayerInputPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const updatePlayerName = useGameStore((s) => s.updatePlayerName)
  const currentPhase = useGameStore((s) => s.currentPhase)

  const [names, setNames] = useState<Record<string, string>>(() =>
    Object.fromEntries(players.map((p) => [p.id, p.name]))
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (players.length === 0 || currentPhase === 'setup') {
    return (
      <AppLayout title="Player Input" showBack>
        <div className="text-center py-12 text-gray-400">
          No game in progress. Start a new game first.
        </div>
      </AppLayout>
    )
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    const usedNames = new Set<string>()

    for (const player of players) {
      const name = names[player.id]?.trim()

      if (!name) {
        newErrors[player.id] = 'Name cannot be empty'
      } else if (name.length < 2) {
        newErrors[player.id] = 'Name must be at least 2 characters'
      } else if (usedNames.has(name.toLowerCase())) {
        newErrors[player.id] = 'Duplicate name'
      }

      usedNames.add(name?.toLowerCase() ?? '')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNameChange = (playerId: string, value: string) => {
    setNames((prev) => ({ ...prev, [playerId]: value }))
    updatePlayerName(playerId, value)
    if (errors[playerId]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[playerId]
        return next
      })
    }
  }

  const handleContinue = () => {
    if (!validate()) return

    for (const player of players) {
      updatePlayerName(player.id, names[player.id].trim())
    }

    navigate(ROUTES.ROLE_ASSIGNMENT)
  }

  const allFilled = players.every((p) => names[p.id]?.trim())
  const hasErrors = Object.keys(errors).length > 0

  return (
    <AppLayout title="Player Names" showBack>
      <div className="w-full max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-100 mb-1">Enter Player Names</h2>
            <p className="text-gray-400 text-sm">
              {players.length} players — no duplicates, no empty names
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <Card
              key={player.id}
              className="bg-gray-900/50 border-gray-700 p-4 flex items-center gap-4"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600/20 border border-amber-600/50 text-amber-400 text-sm font-bold flex-shrink-0">
                {player.number}
              </div>
              <div className="flex-1">
                <Input
                  value={names[player.id] ?? ''}
                  onChange={(e) => handleNameChange(player.id, e.target.value)}
                  placeholder={`Player ${player.number}`}
                  className={`bg-gray-800/50 border-gray-600 text-foreground placeholder:text-gray-500 ${
                    errors[player.id] ? 'border-red-500 focus:border-red-500' : 'focus:border-amber-600'
                  }`}
                />
                {errors[player.id] && (
                  <p className="text-xs text-red-400 mt-1">{errors[player.id]}</p>
                )}
              </div>
              {names[player.id]?.trim() && !errors[player.id] && (
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
            </Card>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!allFilled || hasErrors}
          className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base"
        >
          Confirm Names & Continue
        </Button>
      </div>
    </AppLayout>
  )
}
