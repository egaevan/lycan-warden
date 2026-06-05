import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FolderOpen, Play } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import type { GamePhase } from '@/shared/types/game'

const PHASE_ROUTES: Record<GamePhase, string> = {
  'setup': ROUTES.GAME_SETUP,
  'role-selection': ROUTES.ROLE_SELECTION,
  'role-assignment': ROUTES.ROLE_ASSIGNMENT,
  'role-reveal': ROUTES.ROLE_REVEAL,
  'night': ROUTES.NIGHT_PHASE,
  'morning': ROUTES.DAY_PHASE,
  'discussion': ROUTES.DAY_PHASE,
  'voting': ROUTES.VOTING,
  'elimination': ROUTES.VOTING,
  'ended': ROUTES.GAME_OVER,
}

export function ContinuePage() {
  const navigate = useNavigate()
  const id = useGameStore((s) => s.id)
  const name = useGameStore((s) => s.name)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const hasSavedGame = id !== null

  const handleContinue = () => {
    const route = PHASE_ROUTES[currentPhase] || ROUTES.HOME
    navigate(route)
  }

  return (
    <AppLayout title="Continue Game" showBack>
      <div className="w-full max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-amber-100">Continue Game</h2>

        {hasSavedGame ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-8 h-8 text-amber-400" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-amber-100">{name}</p>
                  <p className="text-xs text-gray-400 capitalize">Phase: {currentPhase?.replace('-', ' ')}</p>
                </div>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950"
                aria-label={`Continue ${name} from ${currentPhase} phase`}
              >
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Card className="bg-gray-900/50 border-gray-700 p-12 text-center space-y-4">
              <FolderOpen className="w-12 h-12 text-gray-600 mx-auto" aria-hidden="true" />
              <p className="text-gray-400">No saved games found</p>
              <Button
                variant="outline"
                className="border-amber-700/50 text-amber-100"
                onClick={() => navigate(ROUTES.NEW_GAME)}
              >
                Start New Game
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </AppLayout>
  )
}
