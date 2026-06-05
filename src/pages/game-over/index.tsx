import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Crown, Users, RotateCcw, Home } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
      <PageTransition>
        <div className="w-full max-w-md mx-auto text-center space-y-8 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="space-y-4"
          >
            <Crown className="w-16 h-16 text-amber-400 mx-auto" aria-hidden="true" />
            <h1 className="text-4xl font-black text-amber-100">Game Over</h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-amber-300"
              aria-live="polite"
            >
              {winnerLabel}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 p-6">
              <h3 className="font-semibold text-amber-100 mb-4">Final Standings</h3>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.04, type: 'spring', stiffness: 260, damping: 24 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-300">{player.name}</span>
                    <span className={player.alive ? 'text-emerald-400' : 'text-red-400'}>
                      {player.alive ? 'Survived' : 'Eliminated'} &bull; {player.role?.name || '-'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 24 }}
            className="flex gap-3"
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base" aria-label="Play another game">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-amber-100">Play Again?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This will reset the current game and start a new one.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-amber-600 hover:bg-amber-700 text-amber-950"
                    onClick={handlePlayAgain}
                  >
                    Play Again
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1 border-amber-700/50 text-amber-100 py-6 text-base" aria-label="Go to home screen">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-amber-100">Go Home?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This will clear the current game and return to the home screen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-amber-600 hover:bg-amber-700 text-amber-950"
                    onClick={handleHome}
                  >
                    Go Home
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </div>
      </PageTransition>
    </AppLayout>
  )
}
