'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Users, Moon, Sun } from 'lucide-react'

export default function HelpPage() {
  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      content: [
        'Lycan Warden is designed specifically for Werewolf game moderators.',
        'Use this app to manage role assignments, guide phases, and track eliminations.',
        'Only the moderator interacts with the app during gameplay.',
      ],
    },
    {
      title: 'Player Roles',
      icon: Users,
      content: [
        'Villager: Standard player with voting power only.',
        'Werewolf: Hunts villagers at night, knows other werewolves.',
        'Seer: Investigates one player per night to learn their alignment.',
        'Witch: Can save one player and poison one per game.',
        'Hunter: Shoots one player upon elimination.',
        'Bodyguard: Protects one player per night.',
        'Jester: Wins if voted out during the day phase.',
      ],
    },
    {
      title: 'Game Flow',
      icon: Moon,
      content: [
        'Night: Werewolves choose target, special roles act in order.',
        'Day: Players discuss and accuse each other.',
        'Voting: Players vote to eliminate someone.',
        'Repeat until a win condition is met.',
      ],
    },
    {
      title: 'Win Conditions',
      icon: Sun,
      content: [
        'Villagers Win: All werewolves eliminated.',
        'Werewolves Win: Equal or outnumber remaining villagers.',
        'Jester Wins: Voted out during day phase.',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-amber-50">Game Guide</h1>
            <p className="text-xs text-gray-400">Learn how to play and moderate</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <Card key={idx} className="bg-gray-900/50 border-gray-700 p-6">
                <h2 className="text-xl font-bold text-amber-50 mb-4 flex items-center gap-3">
                  <Icon className="w-6 h-6 text-amber-400" />
                  {section.title}
                </h2>

                <ul className="space-y-2">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3">
                      <span className="text-amber-400 font-bold flex-shrink-0">
                        •
                      </span>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}

          {/* Tips */}
          <Card className="bg-gradient-to-b from-emerald-900/20 to-emerald-900/10 border-emerald-700/30 p-6">
            <h2 className="text-lg font-bold text-emerald-100 mb-4">
              💡 Moderator Tips
            </h2>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold flex-shrink-0">
                  ✓
                </span>
                <span className="text-emerald-100/80 text-sm">
                  Keep roles secret until game end
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold flex-shrink-0">
                  ✓
                </span>
                <span className="text-emerald-100/80 text-sm">
                  Maintain consistent timer lengths for fair play
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold flex-shrink-0">
                  ✓
                </span>
                <span className="text-emerald-100/80 text-sm">
                  Require closed eyes during night phase
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold flex-shrink-0">
                  ✓
                </span>
                <span className="text-emerald-100/80 text-sm">
                  Resolve conflicts fairly and consistently
                </span>
              </li>
            </ul>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-gray-900/50 border-gray-700 p-6">
            <h2 className="text-lg font-bold text-amber-50 mb-4">FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="text-amber-100 font-semibold mb-1">
                  What if two players have the same number of votes?
                </p>
                <p className="text-sm text-gray-400">
                  A tie results in no elimination. The player is safe for that round.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-amber-100 font-semibold mb-1">
                  Can players be elected as moderator mid-game?
                </p>
                <p className="text-sm text-gray-400">
                  The moderator role is permanent and separate from in-game roles.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-amber-100 font-semibold mb-1">
                  What happens if the Witch poisons and saves the same person?
                </p>
                <p className="text-sm text-gray-400">
                  The save takes precedence. The player is protected from harm.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
