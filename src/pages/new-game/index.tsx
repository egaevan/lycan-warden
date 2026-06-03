import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { GAME_PRESETS } from '@/shared/constants/roles'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'

export function NewGamePage() {
  const navigate = useNavigate()
  const [selectedPreset, setSelectedPreset] = useState<string>('')

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    navigate(`${ROUTES.GAME_SETUP}?preset=${preset}`)
  }

  return (
    <AppLayout title="New Game" showBack>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-100 mb-2">Choose a Preset</h2>
          <p className="text-gray-400">Select a game configuration to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(GAME_PRESETS).map(([key, preset]) => (
            <Card
              key={key}
              onClick={() => handlePresetSelect(key)}
              className="bg-gray-900/50 border-gray-700 hover:border-amber-700 cursor-pointer transition-all p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-amber-100 mb-2">{preset.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{preset.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(preset.roles).map((role) => (
                  <span key={role} className="text-xs bg-amber-900/30 text-amber-200 px-2 py-1 rounded border border-amber-700/50">
                    {role}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">{preset.minPlayers}-{preset.maxPlayers} players</p>
                <ChevronRight className="w-5 h-5 text-amber-600" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
