import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { GAME_PRESETS } from '@/shared/constants/roles'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'

export function NewGamePage() {
  const navigate = useNavigate()
  const [selectedPreset, setSelectedPreset] = useState<string>('')

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    navigate(`${ROUTES.GAME_SETUP}?preset=${preset}`)
  }

  return (
    <AppLayout title="New Game" showBack>
      <PageTransition>
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-amber-100 mb-2">Choose a Preset</h2>
            <p className="text-gray-400">Select a game configuration to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(GAME_PRESETS).map(([key, preset], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
              >
                <Card
                  onClick={() => handlePresetSelect(key)}
                  className="bg-gray-900/50 border-gray-700 hover:border-amber-700 cursor-pointer transition-all p-6 backdrop-blur-sm focus-within:ring-2 focus-within:ring-amber-600"
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${preset.name} preset: ${preset.description}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handlePresetSelect(key)
                    }
                  }}
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
                    <ChevronRight className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  )
}
