import type { Player, PlayerAlignment } from '@/shared/types/game'

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getPlayersByAlignment(players: Player[], alignment: PlayerAlignment): Player[] {
  return players.filter((p) => p.role?.alignment === alignment)
}

export function getAlivePlayerCount(players: Player[]): number {
  return players.filter((p) => p.alive).length
}

export function getWinCondition(players: Player[]): PlayerAlignment | null {
  const aliveWerewolves = players.filter(
    (p) => p.alive && p.role?.alignment === 'werewolf'
  ).length
  const aliveNonWerewolves = players.filter(
    (p) => p.alive && p.role?.alignment !== 'werewolf'
  ).length

  if (aliveWerewolves === 0) return 'village'
  if (aliveWerewolves >= aliveNonWerewolves) return 'werewolf'
  return null
}

export function getHighestVoted(players: Player[]): Player | null {
  return players.reduce<Player | null>((highest, player) => {
    if (!player.alive) return highest
    if (!highest || player.voteCount > highest.voteCount) return player
    return highest
  }, null)
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateGameId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
