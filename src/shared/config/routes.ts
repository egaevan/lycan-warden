export const ROUTES = {
  HOME: '/',
  NEW_GAME: '/new-game',
  GAME_SETUP: '/game-setup',
  ROLE_SELECTION: '/role-selection',
  PLAYER_INPUT: '/player-input',
  ROLE_ASSIGNMENT: '/role-assignment',
  ROLE_REVEAL: '/role-reveal',
  GAME_START: '/game-start',
  NIGHT_PHASE: '/night-phase',
  DAY_PHASE: '/day-phase',
  VOTING: '/voting',
  DASHBOARD: '/dashboard',
  GAME_OVER: '/game-over',
  SETTINGS: '/settings',
  HELP: '/help',
  CONTINUE: '/continue',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]

export const NAV_ITEMS = [
  { label: 'New Game', path: ROUTES.NEW_GAME },
  { label: 'Continue', path: ROUTES.CONTINUE },
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Settings', path: ROUTES.SETTINGS },
  { label: 'Guide', path: ROUTES.HELP },
] as const
