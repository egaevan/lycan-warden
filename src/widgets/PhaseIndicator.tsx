'use client'

import { Moon, Sun, Hand, Settings } from 'lucide-react'
import type { GamePhase } from '@/src/shared/types/game'

interface PhaseIndicatorProps {
  phase: GamePhase
  dayNumber?: number
  nightNumber?: number
  compact?: boolean
}

export function PhaseIndicator({
  phase,
  dayNumber,
  nightNumber,
  compact,
}: PhaseIndicatorProps) {
  const phaseConfig = {
    setup: {
      icon: Settings,
      label: 'Setup',
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/30 border-amber-700/50',
      description: 'Game initialization',
    },
    'role-selection': {
      icon: Settings,
      label: 'Role Selection',
      color: 'text-violet-400',
      bgColor: 'bg-violet-900/30 border-violet-700/50',
      description: 'Choose game roles',
    },
    'role-assignment': {
      icon: Settings,
      label: 'Role Assignment',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-900/30 border-indigo-700/50',
      description: 'Assigning roles to players',
    },
    night: {
      icon: Moon,
      label: 'Night Phase',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/30 border-blue-700/50',
      description: 'Werewolves choose their target',
    },
    day: {
      icon: Sun,
      label: 'Day Phase',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/30 border-yellow-700/50',
      description: 'Discussion & accusations',
    },
    voting: {
      icon: Hand,
      label: 'Voting Phase',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/30 border-orange-700/50',
      description: 'Cast your votes',
    },
    ended: {
      icon: Sun,
      label: 'Game Ended',
      color: 'text-gray-400',
      bgColor: 'bg-gray-900/30 border-gray-700/50',
      description: 'Game has concluded',
    },
  }

  const config = phaseConfig[phase]
  const Icon = config.icon

  if (compact) {
    return (
      <div className={`${config.bgColor} border px-3 py-2 rounded-full inline-flex items-center gap-2 backdrop-blur-sm`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs font-semibold ${config.color}`}>
          {config.label}
          {dayNumber && phase === 'day' && ` ${dayNumber}`}
          {nightNumber && phase === 'night' && ` ${nightNumber}`}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${config.bgColor} border rounded-lg p-6 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-lg bg-gray-800/50 border ${config.color.replace('text', 'border')}`}
        >
          <Icon className={`w-8 h-8 ${config.color}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${config.color}`}>
            {config.label}
            {dayNumber && phase === 'day' && ` ${dayNumber}`}
            {nightNumber && phase === 'night' && ` ${nightNumber}`}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{config.description}</p>
        </div>
      </div>
    </div>
  )
}
