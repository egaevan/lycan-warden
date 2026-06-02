import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface RoleCardProps {
  title: string
  description: string
  alignment: 'village' | 'werewolf' | 'neutral'
  isSelected?: boolean
  onClick?: () => void
  showAbilities?: boolean
  abilities?: string[]
  disabled?: boolean
}

export function RoleCard({
  title,
  description,
  alignment,
  isSelected,
  onClick,
  showAbilities,
  abilities,
  disabled,
}: RoleCardProps) {
  const alignmentColors = {
    village: 'bg-emerald-900/30 border-emerald-700/50 hover:border-emerald-600',
    werewolf: 'bg-red-900/30 border-red-700/50 hover:border-red-600',
    neutral: 'bg-amber-900/30 border-amber-700/50 hover:border-amber-600',
  }

  const alignmentBadgeColors = {
    village: 'bg-emerald-900 text-emerald-100 border-emerald-700',
    werewolf: 'bg-red-900 text-red-100 border-red-700',
    neutral: 'bg-amber-900 text-amber-100 border-amber-700',
  }

  return (
    <Card
      className={`${alignmentColors[alignment]} ${
        isSelected ? 'ring-2 ring-amber-600' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300 p-6 border backdrop-blur-sm`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-amber-100">{title}</h3>
        <Badge
          className={`${alignmentBadgeColors[alignment]} border`}
          variant="outline"
        >
          {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
        </Badge>
      </div>

      <p className="text-sm text-gray-300 mb-4">{description}</p>

      {showAbilities && abilities && abilities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs font-semibold text-amber-400 mb-2">
            Abilities:
          </p>
          <ul className="space-y-1">
            {abilities.map((ability, idx) => (
              <li key={idx} className="text-xs text-gray-300">
                • {ability}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
