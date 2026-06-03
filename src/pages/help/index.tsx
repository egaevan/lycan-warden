import { AppLayout } from '@/shared/components/AppLayout'
import { Card } from '@/components/ui/card'
import { Book, Moon, Sun, Vote, Shield } from 'lucide-react'

export function HelpPage() {
  return (
    <AppLayout title="Guide" showBack>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-amber-100">Game Guide</h2>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-3">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Book className="w-4 h-4" /> Getting Started
          </h3>
          <p className="text-sm text-gray-400">
            Create a new game, select a preset, add players, and assign roles.
            The app guides you through each phase.
          </p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-3">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-400" /> Night Phase
          </h3>
          <p className="text-sm text-gray-400">
            Call each role in order. Werewolves choose their target, the Doctor heals,
            the Seer investigates. Record all actions.
          </p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-3">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" /> Day Phase
          </h3>
          <p className="text-sm text-gray-400">
            Announce night results, allow discussion, manage the voting process,
            and eliminate a player.
          </p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-3">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Win Conditions
          </h3>
          <p className="text-sm text-gray-400">
            Villagers win when all werewolves are eliminated. Werewolves win when
            they equal or outnumber the villagers.
          </p>
        </Card>
      </div>
    </AppLayout>
  )
}
