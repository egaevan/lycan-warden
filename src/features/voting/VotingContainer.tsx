'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayerCard } from '@/entities/player/PlayerCard'
import { Card } from '@/components/ui/card'
import type { Player } from '@/shared/types/game'
import { getHighestVoted } from '@/shared/utils/helpers'

interface VotingContainerProps {
  players: Player[]
  onVotingComplete: () => void
  maxVotesPerPlayer?: number
}

export function VotingContainer({
  players,
  onVotingComplete,
  maxVotesPerPlayer = 1,
}: VotingContainerProps) {
  const [votesCast, setVotesCast] = useState<Record<string, string>>({})
  const alivePlayers = players.filter((p) => p.alive)
  const highestVoted = getHighestVoted(players)

  const toggleVote = (voterId: string, targetId: string) => {
    setVotesCast((prev) => {
      const currentVote = prev[voterId]
      if (currentVote === targetId) {
        const { [voterId]: _, ...rest } = prev
        return rest
      }
      return {
        ...prev,
        [voterId]: targetId,
      }
    })
  }

  const votingProgress = Object.keys(votesCast).length
  const totalVoters = alivePlayers.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-100 mb-2">
          Vote to Eliminate
        </h2>
        <p className="text-gray-400">
          Cast your votes ({votingProgress}/{totalVoters})
        </p>
      </div>

      {highestVoted && (
        <Card className="bg-red-900/30 border-red-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Currently Losing</p>
              <p className="text-lg font-bold text-red-300">
                Player {highestVoted.number}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Votes</p>
              <p className="text-2xl font-bold text-red-500">
                {highestVoted.voteCount}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alivePlayers.map((voter) => (
          <Card
            key={voter.id}
            className="bg-gray-900/50 border-gray-700 p-4 space-y-3"
          >
            <div>
              <h4 className="font-semibold text-amber-100">
                Player {voter.number}
              </h4>
              <p className="text-xs text-gray-400">Voting for</p>
            </div>

            <div className="space-y-2">
              {alivePlayers
                .filter((p) => p.id !== voter.id)
                .map((candidate) => (
                  <Button
                    key={candidate.id}
                    variant="outline"
                    onClick={() => toggleVote(voter.id, candidate.id)}
                    className={`w-full justify-start ${
                      votesCast[voter.id] === candidate.id
                        ? 'bg-red-900/50 border-red-600 text-red-200'
                        : 'border-gray-700 hover:border-amber-600'
                    }`}
                  >
                    {votesCast[voter.id] === candidate.id && (
                      <span className="mr-2">✓</span>
                    )}
                    Player {candidate.number}
                  </Button>
                ))}
            </div>
          </Card>
        ))}
      </div>

      <Button
        onClick={onVotingComplete}
        disabled={votingProgress < totalVoters}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
      >
        End Voting Phase
      </Button>
    </div>
  )
}
