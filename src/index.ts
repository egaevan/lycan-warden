// Entities
export { RoleCard } from './entities/role/RoleCard'
export { PlayerCard } from './entities/player/PlayerCard'

// Features
export { RoleSelectionContainer } from './features/role-selection/RoleSelectionContainer'
export { PlayerSelectionContainer } from './features/player-selection/PlayerSelectionContainer'
export { VotingContainer } from './features/voting/VotingContainer'

// Widgets
export { PhaseIndicator } from './widgets/PhaseIndicator'
export { CountdownTimer } from './widgets/CountdownTimer'

// Shared - Components
export { AppLayout } from './shared/components/AppLayout'
export { GameLayout } from './shared/components/GameLayout'

// Shared - Hooks
export { useGameState } from './shared/hooks/useGameState'

// Shared - Types
export type { 
  GamePhase,
  PlayerAlignment,
  GamePreset,
  Player,
  GameRole,
  GameSession,
  GameStats,
} from './shared/types/game'

// Shared - Constants
export { GAME_ROLES, GAME_PRESETS, CLASSIC_PRESET, EXTENDED_PRESET, COMPETITIVE_PRESET } from './shared/constants/roles'
export { APP_NAME, APP_VERSION, APP_DESCRIPTION, PHASE_DURATIONS, COLORS, ROUTES } from './shared/constants/app'

// Shared - Utils
export {
  formatTime,
  getPlayersByAlignment,
  getAlivePlayerCount,
  getWinCondition,
  getHighestVoted,
  shuffleArray,
  generateGameId,
} from './shared/utils/helpers'

export {
  mockPlayers,
  mockGameSession,
  mockGameStats,
  mockGameHistory,
} from './shared/utils/mockData'
