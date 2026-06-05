import { useState } from 'react'
import { AppLayout } from '@/shared/components/AppLayout'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, Volume2, Smartphone, Info, Moon } from 'lucide-react'
import { PageTransition } from '@/shared/components/PageTransition'

const SETTINGS_KEY = 'lycan-warden-settings'

interface SettingsState {
  gameSounds: boolean
  notifications: boolean
}

function loadSettings(): SettingsState {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { gameSounds: true, notifications: true }
}

function saveSettings(settings: SettingsState) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(loadSettings)

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    const next = { ...settings, [key]: value }
    setSettings(next)
    saveSettings(next)
  }

  return (
    <AppLayout title="Settings" showBack>
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-amber-100">Settings</h2>

          <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
            <h3 className="font-semibold text-amber-100 flex items-center gap-2">
              <Volume2 className="w-4 h-4" aria-hidden="true" /> Audio
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="game-sounds" className="text-gray-300 cursor-pointer">Game Sounds</Label>
              <Switch
                id="game-sounds"
                checked={settings.gameSounds}
                onCheckedChange={(checked) => updateSetting('gameSounds', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-gray-300 cursor-pointer">Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
            <h3 className="font-semibold text-amber-100 flex items-center gap-2">
              <Moon className="w-4 h-4" aria-hidden="true" /> Appearance
            </h3>
            <p className="text-sm text-gray-400">Dark theme is always enabled</p>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
            <h3 className="font-semibold text-amber-100 flex items-center gap-2">
              <Info className="w-4 h-4" aria-hidden="true" /> About
            </h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Version</span>
              <span className="text-gray-300">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">PWA</span>
              <span className="text-gray-300">Installable</span>
            </div>
          </Card>
        </div>
      </PageTransition>
    </AppLayout>
  )
}
