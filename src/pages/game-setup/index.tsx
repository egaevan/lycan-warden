import { useState, useEffect, type ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight } from 'lucide-react'
import { AppLayout } from '@/shared/components/AppLayout'
import { GAME_PRESETS } from '@/shared/constants/roles'
import { ROUTES } from '@/shared/config/routes'
import { useGameStore } from '@/shared/store'
import { PageTransition } from '@/shared/components/PageTransition'

export function GameSetupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preset = searchParams.get('preset') || 'classic'
  const createGame = useGameStore((s) => s.createGame)

  const [gameName, setGameName] = useState('')
  const [playerCount, setPlayerCount] = useState(8)

  const presetConfig = GAME_PRESETS[preset as keyof typeof GAME_PRESETS]

  useEffect(() => {
    if (presetConfig) {
      setPlayerCount(presetConfig.minPlayers + 2)
    }
  }, [preset])

  const handleStart = () => {
    createGame(gameName || 'New Game', preset as any, playerCount)
    navigate(`${ROUTES.ROLE_SELECTION}?preset=${preset}&players=${playerCount}`)
  }

  if (!presetConfig) {
    return (
      <AppLayout title="Setup" showBack>
        <div className="text-center py-12 text-gray-400" role="alert">Invalid preset selected</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Game Setup" showBack>
      <PageTransition>
        <div className="w-full max-w-md mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-amber-100 mb-2">Game Setup</h2>
            <p className="text-gray-400">{presetConfig.name} Preset</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="game-name" className="text-amber-100 mb-2 block">Game Name</Label>
              <Input
                id="game-name"
                placeholder="Enter game name"
                value={gameName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGameName(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-foreground placeholder:text-gray-500 focus:border-amber-600"
                aria-describedby="game-name-description"
              />
            </div>

            <div>
              <Label htmlFor="player-count" className="text-amber-100 mb-2 block">
                Player Count: <span className="font-bold">{playerCount}</span>
              </Label>
              <input
                id="player-count"
                type="range"
                min={presetConfig.minPlayers}
                max={presetConfig.maxPlayers}
                value={playerCount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPlayerCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-400"
                aria-valuemin={presetConfig.minPlayers}
                aria-valuemax={presetConfig.maxPlayers}
                aria-valuenow={playerCount}
                aria-label="Number of players"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{presetConfig.minPlayers} Players</span>
                <span>{presetConfig.maxPlayers} Players</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 py-6 text-base"
            aria-label="Start game with current settings"
          >
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </PageTransition>
    </AppLayout>
  )
}
