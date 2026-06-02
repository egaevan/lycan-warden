'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Volume2, Moon, Zap } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [timerAutoAdvance, setTimerAutoAdvance] = useState(true)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-amber-50">Settings</h1>
            <p className="text-xs text-gray-400">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Audio Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            Audio
          </h2>

          <Card className="bg-gray-900/50 border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-amber-100 font-semibold">Game Sounds</Label>
                <p className="text-xs text-gray-400 mt-1">
                  Phase transitions and notifications
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div>
                <Label className="text-amber-100 font-semibold">
                  Notifications
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Alerts for phase changes
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </Card>
        </div>

        {/* Game Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Gameplay
          </h2>

          <Card className="bg-gray-900/50 border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-amber-100 font-semibold">
                  Auto-Advance Timer
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Automatically move to next phase when timer expires
                </p>
              </div>
              <Switch
                checked={timerAutoAdvance}
                onCheckedChange={setTimerAutoAdvance}
              />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <Label className="text-amber-100 font-semibold block mb-2">
                Phase Durations
              </Label>
              <p className="text-xs text-gray-400 mb-3">
                Customize timing for your group
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-sm text-gray-300">Night Phase</span>
                  <span className="text-sm font-semibold text-amber-100">3 min</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-sm text-gray-300">Day Discussion</span>
                  <span className="text-sm font-semibold text-amber-100">5 min</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-sm text-gray-300">Voting</span>
                  <span className="text-sm font-semibold text-amber-100">2 min</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Theme Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" />
            Appearance
          </h2>

          <Card className="bg-gray-900/50 border-gray-700 p-6">
            <div>
              <Label className="text-amber-100 font-semibold block mb-2">Theme</Label>
              <div className="flex gap-3">
                <button className="flex-1 p-3 rounded border-2 border-amber-600 bg-gray-800/50">
                  <p className="text-sm font-semibold text-amber-100">Dark</p>
                  <p className="text-xs text-gray-400 mt-1">Default</p>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Light theme coming soon
              </p>
            </div>
          </Card>
        </div>

        {/* About */}
        <div>
          <h2 className="text-lg font-bold text-amber-50 mb-4">About</h2>

          <Card className="bg-gray-900/50 border-gray-700 p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">App Version</span>
                <span className="text-amber-100 font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Platform</span>
                <span className="text-amber-100 font-semibold">PWA</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-amber-100 font-semibold">Today</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
