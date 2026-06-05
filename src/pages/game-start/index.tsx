import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Moon, Users, Swords } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'

export function GameStartPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const setPhase = useGameStore((s) => s.setPhase)
  const aliveCount = players.filter((p) => p.alive).length
  const werewolfCount = players.filter((p) => p.role?.alignment === 'werewolf').length
  const villagerCount = players.filter((p) => p.role?.alignment === 'village').length

  const handleBegin = () => {
    setPhase('night')
    navigate(ROUTES.NIGHT_PHASE)
  }

  return (
    <GameLayout currentPhase="setup" gameName="New Game">
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-indigo-400" aria-hidden="true" />
                <h2 className="text-xl font-bold text-amber-100">Game Ready</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" aria-hidden="true" />
                  <p className="text-2xl font-bold text-amber-100">{aliveCount}</p>
                  <p className="text-xs text-gray-400">Players</p>
                </div>
                <div>
                  <Swords className="w-5 h-5 text-red-400 mx-auto mb-1" aria-hidden="true" />
                  <p className="text-2xl font-bold text-amber-100">{werewolfCount}</p>
                  <p className="text-xs text-gray-400">Werewolves</p>
                </div>
                <div>
                  <Users className="w-5 h-5 text-emerald-400 mx-auto mb-1" aria-hidden="true" />
                  <p className="text-2xl font-bold text-amber-100">{villagerCount}</p>
                  <p className="text-xs text-gray-400">Villagers</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 p-6 space-y-3">
              <h3 className="font-semibold text-amber-100">Moderator Instructions</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>&bull; Guide players through the night phase</li>
                <li>&bull; Call players in order of night actions</li>
                <li>&bull; Record all night actions accurately</li>
                <li>&bull; Announce results at dawn</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Button
              onClick={handleBegin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
              aria-label="Begin the first night phase"
            >
              Begin First Night
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </GameLayout>
  )
}
