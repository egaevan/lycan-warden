export type GamePhase =
  | 'setup'
  | 'role-selection'
  | 'role-assignment'
  | 'role-reveal'
  | 'night'
  | 'morning'
  | 'discussion'
  | 'voting'
  | 'elimination'
  | 'ended'

export type PlayerAlignment = 'village' | 'werewolf' | 'neutral'

export type GamePreset = 'classic' | 'extended' | 'competitive' | 'custom'

export type NightActionType =
  | 'kill'
  | 'protect'
  | 'heal'
  | 'investigate'
  | 'poison'
  | 'revive'

export type PassiveAbilityType =
  | NightActionType
  | 'revengeKill'
  | 'none'

export interface NightActionConfig {
  id: NightActionType
  label: string
  description: string
  priority: number
  requiresTarget: boolean
  maxTargets: number
  allowSelf: boolean
  icon: string
}

export interface NightActionRecord {
  id: string
  nightNumber: number
  actorId: string
  actionType: NightActionType
  targetId: string | null
  resolved: boolean
  result: 'success' | 'blocked' | 'failed' | null
}

export interface VoteRecord {
  voterId: string
  targetId: string
}

export interface WinConditionOverride {
  check: (players: Player[], aliveWerewolves: number, aliveVillagers: number) => PlayerAlignment | null
  description: string
}

export interface RoleConfig {
  id: string
  name: string
  alignment: PlayerAlignment
  description: string
  abilities: string[]
  count: number
  nightAction: NightActionType | null
  nightActionPriority: number
  passiveAbility: PassiveAbilityType | null
  teamDetectionResult?: PlayerAlignment
  winConditionOverride?: WinConditionOverride
  maxCount: number
}

export type GameRole = RoleConfig

export interface Player {
  id: string
  number: number
  name: string
  role: RoleConfig | null
  alive: boolean
  eliminated: boolean
  voteCount: number
  votedFor?: string
  protectedBy?: string
  investigated?: boolean
  investigatedResult?: PlayerAlignment
  poisoned?: boolean
}

export interface GameSession {
  id: string
  name: string
  preset: GamePreset
  playerCount: number
  players: Player[]
  currentPhase: GamePhase
  dayNumber: number
  nightNumber: number
  nightActions: NightActionRecord[]
  votes: Record<number, VoteRecord[]>
  eliminationHistory: EliminationRecord[]
  log: GameLogEntry[]
  winner: PlayerAlignment | null
  createdAt: Date
  updatedAt: Date
}

export interface EliminationRecord {
  dayNumber: number
  playerId: string
  playerName: string
  roleName: string
  method: 'vote' | 'night-kill' | 'poison' | 'revenge'
  alignment: PlayerAlignment
}

export interface GameLogEntry {
  id: string
  phase: GamePhase
  dayNumber: number
  nightNumber: number
  timestamp: Date
  message: string
  type: 'action' | 'result' | 'system'
}

export interface GameStats {
  totalGames: number
  villagersWins: number
  werewolvesWins: number
  averagePlayerCount: number
  longestGame: number
}

export interface PhaseTransition {
  from: GamePhase
  to: GamePhase[]
  guard?: () => boolean
}

export const NIGHT_ACTION_PRIORITIES: Record<NightActionType, number> = {
  heal: 10,
  protect: 20,
  kill: 30,
  poison: 40,
  investigate: 50,
  revive: 5,
}

export const NIGHT_ACTION_CONFIGS: Record<NightActionType, NightActionConfig> = {
  heal: {
    id: 'heal',
    label: 'Heal',
    description: 'Save a player from being eliminated at night',
    priority: 10,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: true,
    icon: 'heart',
  },
  protect: {
    id: 'protect',
    label: 'Protect',
    description: 'Protect a player from being killed at night',
    priority: 20,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: false,
    icon: 'shield',
  },
  kill: {
    id: 'kill',
    label: 'Kill',
    description: 'Choose a target to eliminate',
    priority: 30,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: false,
    icon: 'skull',
  },
  poison: {
    id: 'poison',
    label: 'Poison',
    description: 'Poison a player at night',
    priority: 40,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: false,
    icon: 'flask',
  },
  investigate: {
    id: 'investigate',
    label: 'Investigate',
    description: 'Learn a player\'s true alignment',
    priority: 50,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: false,
    icon: 'eye',
  },
  revive: {
    id: 'revive',
    label: 'Revive',
    description: 'Bring a dead player back to life',
    priority: 5,
    requiresTarget: true,
    maxTargets: 1,
    allowSelf: false,
    icon: 'zap',
  },
}
