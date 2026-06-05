import { AppLayout } from '@/shared/components/AppLayout'
import { Card } from '@/components/ui/card'
import { Book, Moon, Sun, Vote, Shield } from 'lucide-react'
import { PageTransition } from '@/shared/components/PageTransition'

const sections = [
  {
    icon: Book,
    title: 'Getting Started',
    text: 'Create a new game, select a preset, add players, and assign roles. The app guides you through each phase.',
    color: 'text-amber-400',
  },
  {
    icon: Moon,
    title: 'Night Phase',
    text: 'Call each role in order. Werewolves choose their target, the Doctor heals, the Seer investigates. Record all actions.',
    color: 'text-indigo-400',
  },
  {
    icon: Sun,
    title: 'Day Phase',
    text: 'Announce night results, allow discussion, manage the voting process, and eliminate a player.',
    color: 'text-amber-400',
  },
  {
    icon: Shield,
    title: 'Win Conditions',
    text: 'Villagers win when all werewolves are eliminated. Werewolves win when they equal or outnumber the villagers.',
    color: 'text-emerald-400',
  },
]

export function HelpPage() {
  return (
    <AppLayout title="Guide" showBack>
      <PageTransition>
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-amber-100">Game Guide</h2>
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="bg-gray-900/50 border-gray-700 p-4 space-y-3">
                <h3 className="font-semibold text-amber-100 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${section.color}`} aria-hidden="true" />
                  {section.title}
                </h3>
                <p className="text-sm text-gray-400">{section.text}</p>
              </Card>
            )
          })}
        </div>
      </PageTransition>
    </AppLayout>
  )
}
