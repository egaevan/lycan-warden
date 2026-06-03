import { AppLayout } from '@/shared/components/AppLayout'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, Volume2, Smartphone, Info } from 'lucide-react'

export function SettingsPage() {
  return (
    <AppLayout title="Settings" showBack>
      <div className="w-full max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-amber-100">Settings</h2>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Audio
          </h3>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Game Sounds</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Notifications</Label>
            <Switch defaultChecked />
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Appearance
          </h3>
          <p className="text-sm text-gray-400">Dark theme is always enabled</p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-4 space-y-4">
          <h3 className="font-semibold text-amber-100 flex items-center gap-2">
            <Info className="w-4 h-4" /> About
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
    </AppLayout>
  )
}
