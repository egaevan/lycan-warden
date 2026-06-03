import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sun, MessageCircle, Vote } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

type DayStep = 'morning' | 'discussion' | 'voting'

export function DayPhasePage() {
  const navigate = useNavigate()
  const dayNumber = useGameStore((s) => s.dayNumber)
  const nightNumber = useGameStore((s) => s.nightNumber)
  const eliminationHistory = useGameStore((s) => s.eliminationHistory)
  const log = useGameStore((s) => s.log)
  const checkWinner = useGameStore((s) => s.checkWinner)
  const advanceToDiscussion = useGameStore((s) => s.advanceToDiscussion)
  const [step, setStep] = useState<DayStep>(
    eliminationHistory.length > 0 ? 'morning' : 'discussion'
  )

  const nightLog = log.filter((l) => l.phase === 'night' || l.phase === 'morning')
  const nightKills = eliminationHistory.filter((e) => e.method === 'night-kill' || e.method === 'poison')

  const handleVotingDone = () => {
    const winner = checkWinner()
    if (winner) {
      navigate(ROUTES.GAME_OVER)
    } else {
      navigate(ROUTES.NIGHT_PHASE)
    }
  }

  return (
    <GameLayout currentPhase={step} dayNumber={dayNumber} nightNumber={nightNumber}>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-100 mb-2">Day {dayNumber || 1}</h2>
          <p className="text-gray-400">Manage the day phase</p>
        </div>

        {step === 'morning' && (
          <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
            <Sun className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-amber-100">Morning Results</h3>
            {nightKills.length > 0 ? (
              <div className="space-y-2">
                {nightKills.map((e) => (
                  <p key={e.playerId} className="text-red-400 font-semibold">
                    {e.playerName} was found dead this morning!
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-emerald-400">The night passed peacefully. No one died.</p>
            )}
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950"
              onClick={() => {
                advanceToDiscussion()
                setStep('discussion')
              }}
            >
              Begin Discussion
            </Button>
          </Card>
        )}

        {step === 'discussion' && (
          <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
            <MessageCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-amber-100">Discussion</h3>
            <p className="text-gray-400">Allow players to discuss and debate</p>
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950"
              onClick={() => setStep('voting')}
            >
              Start Voting
            </Button>
          </Card>
        )}

        {step === 'voting' && (
          <Card className="bg-gray-900/50 border-gray-700 p-6 text-center space-y-4">
            <Vote className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-xl font-bold text-amber-100">Voting</h3>
            <p className="text-gray-400">Cast votes to eliminate a player</p>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => navigate(ROUTES.VOTING)}
            >
              Go to Voting
            </Button>
          </Card>
        )}
      </div>
    </GameLayout>
  )
}
