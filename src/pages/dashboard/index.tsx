import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users, Skull, Moon, Sun, Swords } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function DashboardPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const dayNumber = useGameStore((s) => s.dayNumber)
  const nightNumber = useGameStore((s) => s.nightNumber)
  const resetGame = useGameStore((s) => s.resetGame)

  const aliveCount = players.filter((p) => p.alive).length
  const deadCount = players.filter((p) => !p.alive).length
  const werewolfCount = players.filter((p) => p.role?.alignment === 'werewolf' && p.alive).length
  const villagerCount = players.filter((p) => p.role?.alignment === 'village' && p.alive).length

  const handleEndGame = () => {
    navigate(ROUTES.GAME_OVER)
  }

  return (
    <GameLayout currentPhase={currentPhase} dayNumber={dayNumber} nightNumber={nightNumber}>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 border-gray-700 p-4 text-center">
            <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-amber-100">{aliveCount}</p>
            <p className="text-xs text-gray-400">Alive</p>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700 p-4 text-center">
            <Skull className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-amber-100">{deadCount}</p>
            <p className="text-xs text-gray-400">Dead</p>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700 p-4 text-center">
            <Swords className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-amber-100">{werewolfCount}</p>
            <p className="text-xs text-gray-400">Werewolves</p>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700 p-4 text-center">
            <Users className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-amber-100">{villagerCount}</p>
            <p className="text-xs text-gray-400">Villagers</p>
          </Card>
        </div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="players" className="data-[state=active]:bg-gray-800">Players</TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-gray-800">Roles</TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-gray-800">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="mt-4">
            <Card className="bg-gray-900/50 border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">#</TableHead>
                    <TableHead className="text-gray-400">Name</TableHead>
                    <TableHead className="text-gray-400">Role</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.id} className="border-gray-700">
                      <TableCell className="text-gray-400">{player.number}</TableCell>
                      <TableCell className="text-amber-100">{player.name}</TableCell>
                      <TableCell className="text-gray-300">{player.role?.name || '-'}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded ${
                          player.alive ? 'bg-emerald-900/50 text-emerald-300' : 'bg-red-900/50 text-red-300'
                        }`}>
                          {player.alive ? 'Alive' : 'Dead'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-4 space-y-4">
            <Card className="bg-gray-900/50 border-gray-700 p-6 text-center text-gray-400">
              Game statistics and actions will be shown here
            </Card>
            <Button
              variant="destructive"
              onClick={handleEndGame}
              className="w-full"
            >
              End Game
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </GameLayout>
  )
}
