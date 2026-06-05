import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users, Skull, Moon, Sun, Swords, AlertTriangle } from 'lucide-react'
import { GameLayout } from '@/shared/components/GameLayout'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function DashboardPage() {
  const navigate = useNavigate()
  const players = useGameStore((s) => s.players)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const dayNumber = useGameStore((s) => s.dayNumber)
  const nightNumber = useGameStore((s) => s.nightNumber)

  const aliveCount = players.filter((p) => p.alive).length
  const deadCount = players.filter((p) => !p.alive).length
  const werewolfCount = players.filter((p) => p.role?.alignment === 'werewolf' && p.alive).length
  const villagerCount = players.filter((p) => p.role?.alignment === 'village' && p.alive).length

  const statsCards = [
    { icon: Users, label: 'Alive', value: aliveCount, color: 'text-blue-400' },
    { icon: Skull, label: 'Dead', value: deadCount, color: 'text-red-400' },
    { icon: Swords, label: 'Werewolves', value: werewolfCount, color: 'text-red-400' },
    { icon: Users, label: 'Villagers', value: villagerCount, color: 'text-emerald-400' },
  ]

  return (
    <GameLayout currentPhase={currentPhase} dayNumber={dayNumber} nightNumber={nightNumber}>
      <PageTransition>
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <Card className="bg-gray-900/50 border-gray-700 p-4 text-center">
                    <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} aria-hidden="true" />
                    <p className="text-2xl font-bold text-amber-100">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <Tabs defaultValue="players" className="w-full">
            <TabsList className="bg-gray-900 border-gray-700">
              <TabsTrigger value="players" className="data-[state=active]:bg-gray-800">Players</TabsTrigger>
              <TabsTrigger value="roles" className="data-[state=active]:bg-gray-800">Roles</TabsTrigger>
              <TabsTrigger value="actions" className="data-[state=active]:bg-gray-800">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="players" className="mt-4">
              <Card className="bg-gray-900/50 border-gray-700 overflow-x-auto">
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
                        <TableCell className="text-amber-100 font-medium">{player.name}</TableCell>
                        <TableCell>
                          {player.role ? (
                            <span className={`text-xs px-2 py-1 rounded ${
                              player.role.alignment === 'werewolf'
                                ? 'bg-red-900/50 text-red-300'
                                : player.role.alignment === 'neutral'
                                  ? 'bg-purple-900/50 text-purple-300'
                                  : 'bg-emerald-900/50 text-emerald-300'
                            }`}>
                              {player.role.name}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            player.alive
                              ? 'bg-emerald-900/50 text-emerald-300'
                              : player.poisoned
                                ? 'bg-purple-900/50 text-purple-300'
                                : 'bg-red-900/50 text-red-300'
                          }`}>
                            {player.alive ? 'Alive' : player.poisoned ? 'Poisoned' : 'Dead'}
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full"
                    aria-label="End the current game"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    End Game
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-amber-100">End Game?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      This will end the current game and show the game over screen. 
                      All progress will be preserved in the game log.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => navigate(ROUTES.GAME_OVER)}
                    >
                      End Game
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </GameLayout>
  )
}
