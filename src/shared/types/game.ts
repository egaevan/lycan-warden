export type GamePhase = 'setup' | 'role-selection' | 'role-assignment' | 'night' | 'day' | 'voting' | 'ended'
export type PlayerAlignment = 'village' | 'werewolf' | 'neutral'
export type GamePreset = 'classic' | 'extended' | 'competitive' | 'custom'

export interface Player {
  id: string
  number: number
  role: GameRole | null
  alive: boolean
  eliminated: boolean
  voteCount: number
  votedFor?: string
}

export interface GameRole {
  id: string
  name: string
  alignment: PlayerAlignment
  description: string
  abilities: string[]
  count: number
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
  createdAt: Date
  updatedAt: Date
}

export interface GameStats {
  totalGames: number
  villagersWins: number
  werewolvesWins: number
  averagePlayerCount: number
  longestGame: number
}
