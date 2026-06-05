import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { ROUTES } from '@/shared/config/routes'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { OfflineDetector } from '@/shared/components/OfflineDetector'
import { InstallPrompt } from '@/shared/components/InstallPrompt'
import { Spinner } from '@/components/ui/spinner'

const HomePage = lazy(() => import('@/pages/home').then(m => ({ default: m.HomePage })))
const NewGamePage = lazy(() => import('@/pages/new-game').then(m => ({ default: m.NewGamePage })))
const GameSetupPage = lazy(() => import('@/pages/game-setup').then(m => ({ default: m.GameSetupPage })))
const RoleSelectionPage = lazy(() => import('@/pages/role-selection').then(m => ({ default: m.RoleSelectionPage })))
const PlayerInputPage = lazy(() => import('@/pages/player-input').then(m => ({ default: m.PlayerInputPage })))
const RoleAssignmentPage = lazy(() => import('@/pages/role-assignment').then(m => ({ default: m.RoleAssignmentPage })))
const RoleRevealPage = lazy(() => import('@/pages/role-reveal').then(m => ({ default: m.RoleRevealPage })))
const GameStartPage = lazy(() => import('@/pages/game-start').then(m => ({ default: m.GameStartPage })))
const NightPhasePage = lazy(() => import('@/pages/night-phase').then(m => ({ default: m.NightPhasePage })))
const DayPhasePage = lazy(() => import('@/pages/day-phase').then(m => ({ default: m.DayPhasePage })))
const VotingPage = lazy(() => import('@/pages/voting').then(m => ({ default: m.VotingPage })))
const DashboardPage = lazy(() => import('@/pages/dashboard').then(m => ({ default: m.DashboardPage })))
const GameOverPage = lazy(() => import('@/pages/game-over').then(m => ({ default: m.GameOverPage })))
const SettingsPage = lazy(() => import('@/pages/settings').then(m => ({ default: m.SettingsPage })))
const HelpPage = lazy(() => import('@/pages/help').then(m => ({ default: m.HelpPage })))
const ContinuePage = lazy(() => import('@/pages/continue').then(m => ({ default: m.ContinuePage })))

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-label="Loading page">
      <Spinner className="w-8 h-8 text-amber-400" />
      <span className="sr-only">Loading page...</span>
    </div>
  )
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <OfflineDetector />
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </AnimatePresence>
        <InstallPrompt />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid rgba(201, 169, 97, 0.3)',
              color: '#f5f1eb',
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
