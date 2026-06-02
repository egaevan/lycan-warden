import type { Player } from '../types/game'

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const getPlayersByAlignment = (
  players: Player[],
  alignment: string,
) => {
  return players.filter((p) => p.role?.alignment === alignment && p.alive)
}

export const getAlivePlayerCount = (players: Player[]): number => {
  return players.filter((p) => p.alive).length
}

export const getWinCondition = (
  players: Player[],
): 'villagers' | 'werewolves' | null => {
  const aliveWerewolves = getPlayersByAlignment(players, 'werewolf')
  const aliveVillagers = getPlayersByAlignment(players, 'village')

  if (aliveWerewolves.length === 0) return 'villagers'
  if (aliveWerewolves.length >= aliveVillagers.length) return 'werewolves'
  return null
}

export const getHighestVoted = (players: Player[]): Player | null => {
  if (players.length === 0) return null
  return players.reduce((prev, current) =>
    prev.voteCount > current.voteCount ? prev : current,
  )
}

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const generateGameId = (): string => {
  return `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
