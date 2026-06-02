import type { GameSession, Player, GameStats } from '../types/game'
import { GAME_ROLES } from '../constants/roles'

export const mockPlayers: Player[] = Array.from({ length: 8 }, (_, i) => ({
  id: `player-${i + 1}`,
  number: i + 1,
  role: Object.values(GAME_ROLES)[i % Object.keys(GAME_ROLES).length],
  alive: i < 6,
  eliminated: i >= 6,
  voteCount: Math.floor(Math.random() * 3),
}))

export const mockGameSession: GameSession = {
  id: 'game-001',
  name: 'Tuesday Night Game',
  preset: 'classic',
  playerCount: 8,
  players: mockPlayers,
  currentPhase: 'night',
  dayNumber: 2,
  nightNumber: 3,
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
    winner: 'villagers',
    duration: 38,
  },
  {
    id: 'game-002',
    name: 'The Great Hunt',
    date: new Date(Date.now() - 172800000),
    playerCount: 8,
    winner: 'werewolves',
    duration: 25,
  },
  {
    id: 'game-003',
    name: 'Silent Night',
    date: new Date(Date.now() - 259200000),
    playerCount: 12,
    winner: 'villagers',
    duration: 45,
  },
]
