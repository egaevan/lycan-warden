import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Moon, Skull, Eye, Heart, Shield, FlaskConical } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { getPriorityOrderedNightRoles } from '@/shared/lib/roleRegistry'

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
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-100 mb-2">
            Night {nightNumber || 1}
          </h2>
          <p className="text-gray-400">Guide the night phase</p>
        </div>

        <Progress value={progress} className="w-full" />

        {step && (
          <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
            <step.icon className="w-12 h-12 text-indigo-400 mx-auto" />
            <h3 className="text-xl font-bold text-amber-100">{step.label}</h3>
            <p className="text-gray-400">{step.description}</p>
          </Card>
        )}

        <div className="flex gap-3">
          {currentStep < nightSteps.length - 1 ? (
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleNightAction}
            >
              Record Action & Next
            </Button>
          ) : (
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950"
              onClick={handleComplete}
            >
              End Night Phase
            </Button>
          )}
        </div>
      </div>
    </GameLayout>
  )
}
