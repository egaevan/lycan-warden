export const APP_NAME = 'Lycan Warden'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Premium PWA for Werewolf game moderation'

export const PHASE_DURATIONS = {
  night: 120, // 2 minutes
  day: 180, // 3 minutes
  voting: 120, // 2 minutes
}

export const COLORS = {
  primary: '#c9a961',
  secondary: '#2d5a3d',
  accent: '#8b3a3a',
  background: '#0a0a0a',
  foreground: '#f5f1eb',
  muted: '#3a3a3a',
}

export const ROUTES = {
  HOME: '/',
  NEW_GAME: '/new-game',
  GAME_SETUP: '/game-setup',
  ROLE_SELECTION: '/role-selection',
  ROLE_ASSIGNMENT: '/role-assignment',
  GAME_START: '/game-start',
  NIGHT_PHASE: '/night-phase',
  DAY_PHASE: '/day-phase',
  VOTING_PHASE: '/voting-phase',
  DASHBOARD: '/dashboard',
  GAME_OVER: '/game-over',
  SETTINGS: '/settings',
  HELP: '/help',
  CONTINUE: '/continue',
}
