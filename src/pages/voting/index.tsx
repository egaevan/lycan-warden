import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Vote, Skull } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'

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
        <PageTransition>
          <div className="w-full max-w-md mx-auto text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Skull className="w-12 h-12 text-red-400 mx-auto" aria-hidden="true" />
            </motion.div>
            <h2 className="text-2xl font-bold text-amber-100">Voting Complete</h2>
            <p className="text-gray-400">All votes have been cast. Finalize to see the result.</p>
            <Button
              onClick={handleFinalize}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base"
              aria-label="Finalize elimination results"
            >
              Finalize Elimination
            </Button>
          </div>
        </PageTransition>
      </GameLayout>
    )
  }

  return (
    <GameLayout currentPhase="voting" dayNumber={dayNumber}>
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-100 mb-2">Voting</h2>
            <p className="text-gray-400">Voter {voterIndex + 1} of {alivePlayers.length}</p>
            <p className="text-sm text-amber-300 mt-1" aria-live="polite">{currentVoter?.name}'s turn to vote</p>
          </div>

          <div className="space-y-3" role="list" aria-label="Players to vote for">
            {alivePlayers
              .filter((p) => p.id !== currentVoter?.id)
              .map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, type: 'spring', stiffness: 260, damping: 24 }}
                  role="listitem"
                >
                  <Card
                    onClick={() => setSelectedTarget(player.id)}
                    className={`p-4 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-amber-600 ${
                      selectedTarget === player.id
                        ? 'bg-red-900/30 border-red-700'
                        : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Vote for ${player.name}`}
                    aria-pressed={selectedTarget === player.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedTarget(player.id)
                      }
                    }}
                  >
                    <div className="flex items-center justify-between min-h-[2.75rem]">
                      <span className="text-amber-100 font-medium">{player.name}</span>
                      <span className="text-xs text-gray-400">#{player.number}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>

          <Button
            disabled={!selectedTarget}
            onClick={handleVote}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base"
            aria-label={selectedTarget ? 'Cast vote' : 'Select a player to vote for'}
          >
            <Vote className="w-4 h-4 mr-2" />
            {voterIndex < alivePlayers.length - 1 ? 'Cast Vote & Next' : 'Cast Final Vote'}
          </Button>
        </div>
      </PageTransition>
    </GameLayout>
  )
}
