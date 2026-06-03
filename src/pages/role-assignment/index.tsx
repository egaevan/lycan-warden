import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Shuffle, Check, Users, Swords } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { shuffleArray } from '@/shared/utils/helpers'

export function RoleAssignmentPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const selectedRoles = useGameStore((s) => s.selectedRoles)
  const assignRoles = useGameStore((s) => s.assignRoles)
  const currentPhase = useGameStore((s) => s.currentPhase)

  const [isAssigning, setIsAssigning] = useState(false)
  const [isAssigned, setIsAssigned] = useState(false)

  if (players.length === 0 || currentPhase === 'setup') {
    return (
      <AppLayout title="Role Assignment" showBack>
        <div className="text-center py-12 text-gray-400">
          No game in progress. Complete player setup first.
        </div>
      </AppLayout>
    )
  }

  if (selectedRoles.length !== players.length) {
    return (
      <AppLayout title="Role Assignment" showBack>
        <div className="text-center py-12 text-gray-400">
          Role count mismatch ({selectedRoles.length} roles, {players.length} players).
          Go back and adjust role selection.
        </div>
      </AppLayout>
    )
  }

  const handleAssign = () => {
    setIsAssigning(true)

    const shuffledPlayers = shuffleArray([...players])
    const shuffledRoles = shuffleArray([...selectedRoles])

    const assignments: Record<string, string> = {}
    shuffledPlayers.forEach((player, index) => {
      assignments[player.id] = shuffledRoles[index]
    })

    assignRoles(assignments)
    setIsAssigned(true)

    setTimeout(() => {
      navigate(ROUTES.ROLE_REVEAL)
    }, 1200)
  }

  return (
    <AppLayout title="Role Assignment" showBack>
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-amber-100 mb-2">Assign Roles</h2>
          <p className="text-gray-400">
            {players.length} players &bull; {selectedRoles.length} roles
          </p>
        </div>

        {!isAssigning && !isAssigned && (
          <>
            <Card className="bg-gray-900/50 border-gray-700 p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-amber-100">{players.length}</p>
                  <p className="text-xs text-gray-400">Players</p>
                </div>
                <div>
                  <Swords className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-amber-100">{selectedRoles.length}</p>
                  <p className="text-xs text-gray-400">Roles</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleAssign}
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 text-lg py-7"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Randomly Assign Roles
            </Button>

            <p className="text-center text-xs text-gray-500">
              Players and roles will be independently shuffled for fair random assignment.
            </p>
          </>
        )}

        {isAssigning && !isAssigned && (
          <div className="space-y-6 text-center">
            <div className="animate-pulse">
              <Shuffle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            </div>
            <Progress value={66} className="w-full" />
            <p className="text-amber-400 text-sm">Shuffling players and roles...</p>
          </div>
        )}

        {isAssigned && (
          <div className="space-y-6 text-center">
            <div className="text-emerald-400">
              <Check className="w-16 h-16 mx-auto mb-2" />
            </div>
            <Progress value={100} className="w-full" />
            <p className="text-emerald-400 font-semibold">Roles assigned successfully!</p>
            <p className="text-gray-500 text-sm">Redirecting to role reveal...</p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
