import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface PlayerCardProps {
  playerNumber: number
  role?: string
  alive?: boolean
  voteCount?: number
  isSelected?: boolean
  onClick?: () => void
  showRole?: boolean
}

export function PlayerCard({
  playerNumber,
  role,
  alive = true,
  voteCount = 0,
  isSelected,
  onClick,
  showRole,
}: PlayerCardProps) {
  return (
    <Card
      className={`${
        isSelected ? 'ring-2 ring-amber-600' : ''
      } ${!alive ? 'opacity-50 bg-gray-900/50' : ''} ${
        onClick ? 'cursor-pointer hover:border-amber-700' : ''
      } transition-all duration-300 p-4 border border-gray-700 backdrop-blur-sm`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-amber-100">
          Player {playerNumber}
        </h3>
        {!alive && (
          <Badge className="bg-red-900 text-red-100 border-red-700 border">
            Eliminated
          </Badge>
        )}
        {alive && (
          <Badge className="bg-emerald-900 text-emerald-100 border-emerald-700 border">
            Alive
          </Badge>
        )}
      </div>

      {showRole && role && (
        <div className="mb-3 p-2 bg-gray-800/50 rounded border border-amber-700/30">
          <p className="text-xs text-gray-400">Role:</p>
          <p className="text-sm font-semibold text-amber-300">{role}</p>
        </div>
      )}

      {voteCount > 0 && (
        <div className="text-center pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-400">Votes</p>
          <p className="text-lg font-bold text-red-400">{voteCount}</p>
        </div>
      )}
    </Card>
  )
}
