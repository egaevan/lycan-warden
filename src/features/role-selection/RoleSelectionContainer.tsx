'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RoleCard } from '@/entities/role/RoleCard'
import { GAME_ROLES } from '@/shared/constants/roles'
import type { GameRole } from '@/shared/types/game'

interface RoleSelectionContainerProps {
  onComplete: (selectedRoles: string[]) => void
  availableRoles?: string[]
  minRoles?: number
  maxRoles?: number
}

export function RoleSelectionContainer({
  onComplete,
  availableRoles = Object.keys(GAME_ROLES),
  minRoles = 2,
  maxRoles = 6,
}: RoleSelectionContainerProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((r) => r !== roleId)
      } else if (prev.length < maxRoles) {
        return [...prev, roleId]
      }
      return prev
    })
  }

  const handleComplete = () => {
    if (selectedRoles.length >= minRoles) {
      onComplete(selectedRoles)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-100 mb-2">
          Select Roles
        </h2>
        <p className="text-gray-400">
          Choose {minRoles}-{maxRoles} roles for this game
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableRoles.map((roleId) => {
          const role = GAME_ROLES[roleId]
          if (!role) return null
          return (
            <RoleCard
              key={roleId}
              role={role}
              isSelected={selectedRoles.includes(roleId)}
              onClick={() => toggleRole(roleId)}
            />
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleComplete}
          disabled={selectedRoles.length < minRoles}
          className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
        >
          Continue ({selectedRoles.length}/{maxRoles})
        </Button>
      </div>
    </div>
  )
}
