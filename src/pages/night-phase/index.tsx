import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Moon, Skull, Eye, Heart, Shield, FlaskConical, Crosshair } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { getPriorityOrderedNightRoles } from '@/shared/lib/roleRegistry'
import { getNightActionLabel } from '@/shared/lib/gameEngine'
import { PageTransition } from '@/shared/components/PageTransition'
import { CountdownTimer } from '@/widgets/CountdownTimer'
import { PHASE_DURATIONS } from '@/shared/constants/app'

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
  const recordNightAction = useGameStore((s) => s.recordNightAction)
  const resolveCurrentNight = useGameStore((s) => s.resolveCurrentNight)
  const advanceToMorning = useGameStore((s) => s.advanceToMorning)
  const checkWinner = useGameStore((s) => s.checkWinner)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)

  const nightRoles = getPriorityOrderedNightRoles().filter(
    (r) => players.some((p) => p.alive && p.role?.id === r.id)
  )

  const nightSteps = nightRoles.map((role) => {
    const Icon = (role.nightAction && ACTION_ICONS[role.nightAction]) ?? Moon
    return {
      id: role.id,
      label: role.name,
      icon: Icon,
      description: role.nightAction ? getNightActionLabel(role.nightAction) : `${role.name} takes their night action`,
    }
  })

  const currentRole = nightRoles[currentStep]
  const alivePlayers = players.filter((p) => p.alive)
  const actors = currentRole
    ? players.filter((p) => p.alive && p.role?.id === currentRole.id)
    : []

  const handleRecordAction = () => {
    if (!currentRole || !currentRole.nightAction || !selectedTarget) return

    for (const actor of actors) {
      recordNightAction({
        actorId: actor.id,
        nightNumber: nightNumber || 1,
        actionType: currentRole.nightAction,
        targetId: selectedTarget,
      })
    }

    setSelectedTarget(null)
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
  const showTargetPicker = !!(currentRole && currentRole.nightAction)

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
                  {actors.length > 1 && (
                    <Badge variant="outline" className="border-amber-700/50 text-amber-300 text-xs">
                      {actors.length} actors — one target for all
                    </Badge>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center">
            <CountdownTimer
              initialSeconds={PHASE_DURATIONS.night}
              autoStart={false}
              showControls={true}
            />
          </div>

          <AnimatePresence mode="wait">
            {currentStep < nightSteps.length && showTargetPicker && (
              <motion.div
                key={`targets-${currentStep}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-100 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    Select target
                  </p>
                  <div className="space-y-2" role="listbox" aria-label="Select a target player">
                    {alivePlayers
                      .filter((p) => !actors.some((a) => a.id === p.id))
                      .map((player) => (
                        <motion.button
                          key={player.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          onClick={() => setSelectedTarget(player.id)}
                          className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                            selectedTarget === player.id
                              ? 'bg-amber-900/30 border-amber-600 shadow-[0_0_12px_rgba(201,169,97,0.15)]'
                              : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                          }`}
                          role="option"
                          aria-selected={selectedTarget === player.id}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 text-amber-300 text-sm font-bold">
                                {player.number}
                              </span>
                              <span className="text-amber-100 font-medium">{player.name}</span>
                            </div>
                            {selectedTarget === player.id && (
                              <Badge className="bg-amber-600 text-amber-950 border-amber-500 text-xs">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {currentStep < nightSteps.length - 1 ? (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-base"
                disabled={!selectedTarget && showTargetPicker}
                onClick={handleRecordAction}
                aria-label={selectedTarget ? 'Record action and proceed' : 'Select a target first'}
              >
                {showTargetPicker && !selectedTarget ? 'Select a Target' : 'Record Action & Next'}
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
