import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Moon, Skull, Eye, Heart, Shield, FlaskConical } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { getPriorityOrderedNightRoles } from '@/shared/lib/roleRegistry'
import { PageTransition } from '@/shared/components/PageTransition'

const ACTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  kill: Skull,
  heal: Heart,
  protect: Shield,
  investigate: Eye,
  poison: FlaskConical,
}

export function NightPhasePage() {
  const navigate = useNavigate()
  const nightNumber = useGameStore((s) => s.nightNumber)
  const players = useGameStore((s) => s.players)
  const [currentStep, setCurrentStep] = useState(0)

  const recordNightAction = useGameStore((s) => s.recordNightAction)
  const resolveCurrentNight = useGameStore((s) => s.resolveCurrentNight)
  const advanceToMorning = useGameStore((s) => s.advanceToMorning)
  const checkWinner = useGameStore((s) => s.checkWinner)

  const nightRoles = getPriorityOrderedNightRoles().filter(
    (r) => players.some((p) => p.alive && p.role?.id === r.id)
  )

  const nightSteps = nightRoles.map((role) => {
    const Icon = (role.nightAction && ACTION_ICONS[role.nightAction]) ?? Moon
    return {
      id: role.id,
      label: role.name,
      icon: Icon,
      description: `${role.name} takes their night action`,
    }
  })

  const handleNightAction = () => {
    const role = nightRoles[currentStep]
    if (!role || !role.nightAction) return

    const actors = players.filter(
      (p) => p.alive && p.role?.id === role.id
    )

    for (const actor of actors) {
      recordNightAction({
        actorId: actor.id,
        nightNumber: nightNumber || 1,
        actionType: role.nightAction,
        targetId: null,
      })
    }

    setCurrentStep((s) => s + 1)
  }

  const handleComplete = () => {
    resolveCurrentNight()
    const winner = checkWinner()
    if (winner) {
      navigate(ROUTES.GAME_OVER)
    } else {
      advanceToMorning()
      navigate(ROUTES.DAY_PHASE)
    }
  }

  const step = nightSteps[currentStep]
  const progress = nightSteps.length > 0 ? ((currentStep + 1) / nightSteps.length) * 100 : 100

  return (
    <GameLayout currentPhase="night" nightNumber={nightNumber}>
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-100 mb-2">
              Night {nightNumber || 1}
            </h2>
            <p className="text-gray-400">Guide the night phase</p>
          </div>

          <Progress value={progress} className="w-full" aria-label={`Night phase progress: step ${currentStep + 1} of ${nightSteps.length}`} />

          <AnimatePresence mode="wait">
            {step && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
                  <step.icon className="w-12 h-12 text-indigo-400 mx-auto" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-amber-100">{step.label}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {currentStep < nightSteps.length - 1 ? (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-base"
                onClick={handleNightAction}
                aria-label={`Record ${step?.label} action and proceed`}
              >
                Record Action & Next
              </Button>
            ) : (
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base"
                onClick={handleComplete}
                aria-label="End the night phase and proceed to morning"
              >
                End Night Phase
              </Button>
            )}
          </div>
        </div>
      </PageTransition>
    </GameLayout>
  )
}
