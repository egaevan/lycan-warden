import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Vote, Skull } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function VotingPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const dayNumber = useGameStore((s) => s.dayNumber)
  const recordVote = useGameStore((s) => s.recordVote)
  const resolveVoting = useGameStore((s) => s.resolveVoting)
  const checkWinner = useGameStore((s) => s.checkWinner)
  const advanceToNight = useGameStore((s) => s.advanceToNight)
  const [voterIndex, setVoterIndex] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [votingComplete, setVotingComplete] = useState(false)

  const alivePlayers = players.filter((p) => p.alive)
  const currentVoter = alivePlayers[voterIndex]

  const handleVote = () => {
    if (!currentVoter || !selectedTarget) return
    recordVote(currentVoter.id, selectedTarget)
    setSelectedTarget(null)
    if (voterIndex < alivePlayers.length - 1) {
      setVoterIndex((i) => i + 1)
    } else {
      setVotingComplete(true)
    }
  }

  const handleFinalize = () => {
    resolveVoting()
    const winner = checkWinner()
    if (winner) {
      navigate(ROUTES.GAME_OVER)
    } else {
      advanceToNight()
      navigate(ROUTES.NIGHT_PHASE)
    }
  }

  if (votingComplete) {
    return (
      <GameLayout currentPhase="voting" dayNumber={dayNumber}>
        <div className="w-full max-w-md mx-auto text-center space-y-6">
          <Skull className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-amber-100">Voting Complete</h2>
          <p className="text-gray-400">All votes have been cast. Finalize to see the result.</p>
          <Button
            onClick={handleFinalize}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Finalize Elimination
          </Button>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout currentPhase="voting" dayNumber={dayNumber}>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-100 mb-2">Voting</h2>
          <p className="text-gray-400">Voter {voterIndex + 1} of {alivePlayers.length}</p>
          <p className="text-sm text-amber-300 mt-1">{currentVoter?.name}'s turn to vote</p>
        </div>

        <div className="space-y-3">
          {alivePlayers
            .filter((p) => p.id !== currentVoter?.id)
            .map((player) => (
              <Card
                key={player.id}
                onClick={() => setSelectedTarget(player.id)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedTarget === player.id
                    ? 'bg-red-900/30 border-red-700'
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-100 font-medium">{player.name}</span>
                  <span className="text-xs text-gray-400">#{player.number}</span>
                </div>
              </Card>
            ))}
        </div>

        <Button
          disabled={!selectedTarget}
          onClick={handleVote}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Vote className="w-4 h-4 mr-2" />
          {voterIndex < alivePlayers.length - 1 ? 'Cast Vote & Next' : 'Cast Final Vote'}
        </Button>
      </div>
    </GameLayout>
  )
}
