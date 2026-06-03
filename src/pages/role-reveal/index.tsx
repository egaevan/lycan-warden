import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function RoleRevealPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const toggleReveal = (playerId: string) => {
    setRevealed((prev) => ({ ...prev, [playerId]: !prev[playerId] }))
  }

  const handleContinue = () => {
    navigate(ROUTES.GAME_START)
  }

  const currentPlayer = players[currentIndex]
  const allRevealed = players.every((p) => revealed[p.id])

  return (
    <AppLayout title="Role Reveal" showBack>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-100 mb-2">Role Reveal</h2>
          <p className="text-gray-400">
            Player {currentIndex + 1} of {players.length}
          </p>
        </div>

        {currentPlayer && (
          <Card
            className="bg-gray-900/50 border-gray-700 p-8 text-center cursor-pointer"
            onClick={() => toggleReveal(currentPlayer.id)}
          >
            <p className="text-lg text-gray-300 mb-4">{currentPlayer.name}</p>
            {revealed[currentPlayer.id] ? (
              <div className="space-y-2">
                <Eye className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="text-2xl font-bold text-amber-100">
                  {currentPlayer.role?.name}
                </p>
                <p className="text-sm text-gray-400">{currentPlayer.role?.description}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <EyeOff className="w-8 h-8 text-gray-500 mx-auto" />
                <p className="text-gray-500">Tap to reveal role</p>
              </div>
            )}
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          >
            Previous
          </Button>
          {currentIndex < players.length - 1 ? (
            <Button
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next Player
            </Button>
          ) : (
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!allRevealed}
              onClick={handleContinue}
            >
              Start Game
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
