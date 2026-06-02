import { Moon, Sun, Hand } from 'lucide-react'

export type GamePhase = 'night' | 'day' | 'voting' | 'setup'

export interface PhaseIndicatorProps {
  phase: GamePhase
  dayNumber?: number
  compact?: boolean
}

export function PhaseIndicator({
  phase,
  dayNumber,
  compact,
}: PhaseIndicatorProps) {
  const phaseConfig = {
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
    setup: {
      icon: Hand,
      label: 'Setup',
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/30 border-amber-700/50',
      description: 'Game initialization',
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
          {dayNumber && phase !== 'setup' && ` ${dayNumber}`}
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
            {dayNumber && phase !== 'setup' && ` ${dayNumber}`}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{config.description}</p>
        </div>
      </div>
    </div>
  )
}
