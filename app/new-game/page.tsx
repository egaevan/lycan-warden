'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { AppLayout } from '@/src/shared/components/AppLayout'
import { GAME_PRESETS } from '@/src/shared/constants/roles'
import { ROUTES } from '@/src/shared/constants/app'

export default function NewGamePage() {
  const [step, setStep] = useState<'preset' | 'setup'>('preset')
  const [selectedPreset, setSelectedPreset] = useState<string>('')
  const [playerCount, setPlayerCount] = useState(8)
  const [gameName, setGameName] = useState('')

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    setStep('setup')
  }

  return (
    <AppLayout title="New Game">
      <div className="w-full max-w-2xl mx-auto">
        {step === 'preset' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-100 mb-2">
                Choose a Preset
              </h2>
              <p className="text-gray-400">
                Select a game configuration to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(GAME_PRESETS).map(([key, preset]) => (
                <Card
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  className="bg-gray-900/50 border-gray-700 hover:border-amber-700 cursor-pointer transition-all p-6 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-amber-100 mb-2">
                    {preset.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {preset.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(preset.roles).map((role) => (
                      <span
                        key={role}
                        className="text-xs bg-amber-900/30 text-amber-200 px-2 py-1 rounded border border-amber-700/50"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      {preset.minPlayers}-{preset.maxPlayers} players
                    </p>
                    <ChevronRight className="w-5 h-5 text-amber-600" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'setup' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-100 mb-2">
                Game Setup
              </h2>
              <p className="text-gray-400">
                {GAME_PRESETS[selectedPreset as keyof typeof GAME_PRESETS]?.name}{' '}
                Preset
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-amber-100 mb-2 block">Game Name</Label>
                <Input
                  placeholder="Enter game name"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-foreground placeholder:text-gray-500 focus:border-amber-600"
                />
              </div>

              <div>
                <Label className="text-amber-100 mb-2 block">
                  Player Count: {playerCount}
                </Label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>3 Players</span>
                  <span>20 Players</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep('preset')}
                variant="outline"
                className="flex-1 border-amber-700/50 text-amber-100 hover:bg-amber-900/20"
              >
                Back
              </Button>
              <Link href={`/role-selection?preset=${selectedPreset}&players=${playerCount}&game=${gameName || 'New Game'}`}>
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950">
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
