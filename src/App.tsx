import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { ROUTES } from '@/shared/config/routes'
import { HomePage } from '@/pages/home'
import { NewGamePage } from '@/pages/new-game'
import { GameSetupPage } from '@/pages/game-setup'
import { RoleSelectionPage } from '@/pages/role-selection'
import { PlayerInputPage } from '@/pages/player-input'
import { RoleAssignmentPage } from '@/pages/role-assignment'
import { RoleRevealPage } from '@/pages/role-reveal'
import { GameStartPage } from '@/pages/game-start'
import { NightPhasePage } from '@/pages/night-phase'
import { DayPhasePage } from '@/pages/day-phase'
import { VotingPage } from '@/pages/voting'
import { DashboardPage } from '@/pages/dashboard'
import { GameOverPage } from '@/pages/game-over'
import { SettingsPage } from '@/pages/settings'
import { HelpPage } from '@/pages/help'
import { ContinuePage } from '@/pages/continue'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.NEW_GAME} element={<NewGamePage />} />
        <Route path={ROUTES.GAME_SETUP} element={<GameSetupPage />} />
        <Route path={ROUTES.ROLE_SELECTION} element={<RoleSelectionPage />} />
        <Route path={ROUTES.PLAYER_INPUT} element={<PlayerInputPage />} />
        <Route path={ROUTES.ROLE_ASSIGNMENT} element={<RoleAssignmentPage />} />
        <Route path={ROUTES.ROLE_REVEAL} element={<RoleRevealPage />} />
        <Route path={ROUTES.GAME_START} element={<GameStartPage />} />
        <Route path={ROUTES.NIGHT_PHASE} element={<NightPhasePage />} />
        <Route path={ROUTES.DAY_PHASE} element={<DayPhasePage />} />
        <Route path={ROUTES.VOTING} element={<VotingPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.GAME_OVER} element={<GameOverPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />
        <Route path={ROUTES.CONTINUE} element={<ContinuePage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
