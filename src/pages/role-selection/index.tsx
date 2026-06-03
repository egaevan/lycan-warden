import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, ChevronRight } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { GAME_ROLES, GAME_PRESETS } from '@/shared/constants/roles'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function RoleSelectionPage() {
  const navigate = useNavigate()
  const storePlayers = useGameStore((s) => s.players)
  const storePreset = useGameStore((s) => s.preset)
  const selectedRoles = useGameStore((s) => s.selectedRoles)
  const setSelectedRoles = useGameStore((s) => s.setSelectedRoles)
  const setPhase = useGameStore((s) => s.setPhase)

  const playerCount = storePlayers.length

  const [roleCounts, setRoleCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {}
    for (const roleId of selectedRoles) {
      counts[roleId] = (counts[roleId] ?? 0) + 1
    }
    return counts
  })

  useEffect(() => {
    if (storePreset !== 'custom') {
      const presetConfig = GAME_PRESETS[storePreset as keyof typeof GAME_PRESETS]
      if (presetConfig) {
        const counts: Record<string, number> = {}
        for (const [roleId, count] of Object.entries(presetConfig.roles)) {
          counts[roleId] = count
        }
        setRoleCounts(counts)
      }
    }
  }, [storePreset])

  const totalSelected = Object.values(roleCounts).reduce((sum, c) => sum + c, 0)
  const isValid = totalSelected === playerCount

  const incrementRole = (roleId: string) => {
    if (totalSelected >= playerCount) return
    setRoleCounts((prev) => ({
      ...prev,
      [roleId]: (prev[roleId] ?? 0) + 1,
    }))
  }

  const decrementRole = (roleId: string) => {
    setRoleCounts((prev) => {
      const current = prev[roleId] ?? 0
      if (current <= 0) return prev
      return { ...prev, [roleId]: current - 1 }
    })
  }

  const handleConfirm = () => {
    const roleList: string[] = []
    for (const [roleId, count] of Object.entries(roleCounts)) {
      for (let i = 0; i < count; i++) {
        roleList.push(roleId)
      }
    }

    setSelectedRoles(roleList)
    setPhase('role-selection')
    navigate(ROUTES.PLAYER_INPUT)
  }

  if (storePlayers.length === 0) {
    return (
      <AppLayout title="Role Selection" showBack>
        <div className="text-center py-12 text-gray-400">
          No game in progress. Start a new game first.
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Role Selection" showBack>
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-100 mb-1">Select Roles</h2>
            <p className="text-gray-400 text-sm">
              {totalSelected} of {playerCount} roles assigned
              {isValid ? ' ✓' : ''}
            </p>
          </div>
          <Button
            onClick={handleConfirm}
            disabled={!isValid}
            className="bg-amber-600 hover:bg-amber-700 text-amber-950"
          >
            Confirm <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(GAME_ROLES).map(([id, role]) => {
            const count = roleCounts[id] ?? 0
            return (
              <Card
                key={id}
                className={`bg-gray-900/50 border-gray-700 p-5 flex items-start gap-4 ${
                  count > 0 ? 'ring-1 ring-amber-600/50' : 'opacity-60'
                }`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-amber-100">{role.name}</h3>
                    <Badge
                      variant="outline"
                      className={`text-xs border ${
                        role.alignment === 'werewolf'
                          ? 'bg-red-900/50 text-red-200 border-red-700'
                          : role.alignment === 'village'
                          ? 'bg-emerald-900/50 text-emerald-200 border-emerald-700'
                          : 'bg-amber-900/50 text-amber-200 border-amber-700'
                      }`}
                    >
                      {role.alignment}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{role.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 text-gray-400 hover:text-amber-100 hover:border-amber-600"
                    onClick={() => decrementRole(id)}
                    disabled={count <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center font-bold text-amber-100 text-sm">
                    {count}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 text-gray-400 hover:text-amber-100 hover:border-amber-600"
                    onClick={() => incrementRole(id)}
                    disabled={totalSelected >= playerCount}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Roles selected: <strong className="text-amber-100">{totalSelected}</strong> / {playerCount}
          </span>
          {!isValid && totalSelected !== playerCount && (
            <span className="text-amber-400">
              {totalSelected < playerCount
                ? `Need ${playerCount - totalSelected} more`
                : `${totalSelected - playerCount} too many`}
            </span>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
