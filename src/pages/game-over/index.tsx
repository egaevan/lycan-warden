import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Crown, Users, RotateCcw, Home } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function GameOverPage() {
  const navigate = useNavigate()
  const winner = useGameStore((s) => s.winner)
  const players = useGameStore((s) => s.players)
  const resetGame = useGameStore((s) => s.resetGame)

  const winnerLabel = winner === 'werewolf' ? 'Werewolves Win!' : winner === 'village' ? 'Village Wins!' : 'Unknown'

  const handlePlayAgain = () => {
    resetGame()
    navigate(ROUTES.NEW_GAME)
  }

  const handleHome = () => {
    resetGame()
    navigate(ROUTES.HOME)
  }

  return (
    <AppLayout title="Game Over">
      <div className="w-full max-w-md mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <Crown className="w-16 h-16 text-amber-400 mx-auto" />
          <h1 className="text-4xl font-black text-amber-100">Game Over</h1>
          <p className="text-xl text-amber-300">{winnerLabel} Win!</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <h3 className="font-semibold text-amber-100 mb-4">Final Standings</h3>
          <div className="space-y-2">
            {players.map((player) => (
              <div key={player.id} className="flex justify-between text-sm">
                <span className="text-gray-300">{player.name}</span>
                <span className={player.alive ? 'text-emerald-400' : 'text-red-400'}>
                  {player.alive ? 'Survived' : 'Eliminated'} &bull; {player.role?.name || '-'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={handlePlayAgain}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={handleHome}
            variant="outline"
            className="flex-1 border-amber-700/50 text-amber-100"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
