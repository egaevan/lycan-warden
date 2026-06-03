import type { GameSession, Player, GameStats } from '@/shared/types/game'
import { GAME_ROLES } from '@/shared/constants/roles'

export const mockPlayers: Player[] = [
  { id: 'player-1', number: 1, name: 'Alice', role: GAME_ROLES.werewolf, alive: true, eliminated: false, voteCount: 0 },
  { id: 'player-2', number: 2, name: 'Bob', role: GAME_ROLES.seer, alive: true, eliminated: false, voteCount: 0 },
  { id: 'player-3', number: 3, name: 'Charlie', role: GAME_ROLES.villager, alive: true, eliminated: false, voteCount: 0 },
  { id: 'player-4', number: 4, name: 'Diana', role: GAME_ROLES.villager, alive: true, eliminated: false, voteCount: 0 },
  { id: 'player-5', number: 5, name: 'Eve', role: GAME_ROLES.villager, alive: true, eliminated: false, voteCount: 0 },
  { id: 'player-6', number: 6, name: 'Frank', role: GAME_ROLES.hunter, alive: false, eliminated: true, voteCount: 0 },
  { id: 'player-7', number: 7, name: 'Grace', role: GAME_ROLES.witch, alive: false, eliminated: true, voteCount: 0 },
  { id: 'player-8', number: 8, name: 'Henry', role: GAME_ROLES.villager, alive: true, eliminated: false, voteCount: 0 },
]

export const mockGameSession: GameSession = {
  id: 'game-001',
  name: 'Tuesday Night Game',
  preset: 'classic',
  playerCount: 8,
  players: mockPlayers,
  currentPhase: 'night',
  dayNumber: 2,
  nightNumber: 3,
  nightActions: [],
  votes: {},
  eliminationHistory: [],
  log: [],
  winner: null,
  createdAt: new Date(Date.now() - 3600000),
  updatedAt: new Date(),
}

export const mockGameStats: GameStats = {
  totalGames: 42,
  villagersWins: 24,
  werewolvesWins: 18,
  averagePlayerCount: 8.5,
  longestGame: 45,
}

export const mockGameHistory = [
  {
    id: 'game-001',
    name: 'Tuesday Night Massacre',
    date: new Date(Date.now() - 86400000),
    playerCount: 10,
    winner: 'village' as const,
    duration: 38,
  },
  {
    id: 'game-002',
    name: 'The Great Hunt',
    date: new Date(Date.now() - 172800000),
    playerCount: 8,
    winner: 'werewolf' as const,
    duration: 25,
  },
  {
    id: 'game-003',
    name: 'Silent Night',
    date: new Date(Date.now() - 259200000),
    playerCount: 12,
    winner: 'village' as const,
    duration: 45,
  },
]
