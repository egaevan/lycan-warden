import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sun, MessageCircle, Vote } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'

type DayStep = 'morning' | 'discussion' | 'voting'

export function DayPhasePage() {
  const navigate = useNavigate()
  const dayNumber = useGameStore((s) => s.dayNumber)
  const nightNumber = useGameStore((s) => s.nightNumber)
  const eliminationHistory = useGameStore((s) => s.eliminationHistory)
  const checkWinner = useGameStore((s) => s.checkWinner)
  const advanceToDiscussion = useGameStore((s) => s.advanceToDiscussion)
  const [step, setStep] = useState<DayStep>(
    eliminationHistory.length > 0 ? 'morning' : 'discussion'
  )

  const nightKills = eliminationHistory.filter((e) => e.method === 'night-kill' || e.method === 'poison')

  const handleVotingDone = () => {
    const winner = checkWinner()
    if (winner) {
      navigate(ROUTES.GAME_OVER)
    } else {
      navigate(ROUTES.NIGHT_PHASE)
    }
  }

  const stepContent = {
    morning: {
      icon: Sun,
      title: 'Morning Results',
      color: 'text-amber-400',
      content: (
        <>
          {nightKills.length > 0 ? (
            <div className="space-y-2">
              {nightKills.map((e) => (
                <motion.p
                  key={e.playerId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 font-semibold"
                >
                  {e.playerName} was found dead this morning!
                </motion.p>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-400"
            >
              The night passed peacefully. No one died.
            </motion.p>
          )}
          <Button
            className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base"
            onClick={() => {
              advanceToDiscussion()
              setStep('discussion')
            }}
            aria-label="Begin discussion phase"
          >
            Begin Discussion
          </Button>
        </>
      ),
    },
    discussion: {
      icon: MessageCircle,
      title: 'Discussion',
      color: 'text-amber-400',
      content: (
        <>
          <p className="text-gray-400">Allow players to discuss and debate</p>
          <Button
            className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base"
            onClick={() => setStep('voting')}
            aria-label="Start voting phase"
          >
            Start Voting
          </Button>
        </>
      ),
    },
    voting: {
      icon: Vote,
      title: 'Voting',
      color: 'text-red-400',
      content: (
        <>
          <p className="text-gray-400">Cast votes to eliminate a player</p>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base"
            onClick={() => navigate(ROUTES.VOTING)}
            aria-label="Go to voting page"
          >
            Go to Voting
          </Button>
        </>
      ),
    },
  }

  const current = stepContent[step]

  return (
    <GameLayout currentPhase={step} dayNumber={dayNumber} nightNumber={nightNumber}>
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-100 mb-2">Day {dayNumber || 1}</h2>
            <p className="text-gray-400">Manage the day phase</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
                <current.icon className={`w-12 h-12 mx-auto ${current.color}`} aria-hidden="true" />
                <h3 className="text-xl font-bold text-amber-100">{current.title}</h3>
                {current.content}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </PageTransition>
    </GameLayout>
  )
}
