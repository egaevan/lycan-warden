import type {
  NightActionType,
  NightActionRecord,
  VoteRecord,
  EliminationRecord,
  GameLogEntry,
  Player,
  PlayerAlignment,
} from '@/shared/types/game'
import {
  getAlivePlayersWithNightAction,
  getNightActionPriority,
} from './roleRegistry'
import { getNextPhase } from './phaseMachine'

let logIdCounter = 0
function nextLogId(): string {
  return `log-${Date.now()}-${++logIdCounter}`
}

function nextActionId(): string {
  return `action-${Date.now()}-${++logIdCounter}`
}

export function createGameLog(
  phase: GameLogEntry['phase'],
  dayNumber: number,
  nightNumber: number,
  message: string,
  type: GameLogEntry['type']
): GameLogEntry {
  return {
    id: nextLogId(),
    phase,
    dayNumber,
    nightNumber,
    timestamp: new Date(),
    message,
    type,
  }
}

export function getNightActionOrder(
  nightActionRecords: NightActionRecord[]
): NightActionRecord[] {
  return [...nightActionRecords]
    .filter((r) => !r.resolved)
    .sort((a, b) => {
      const prioA = getNightActionPriority(a.actionType)
      const prioB = getNightActionPriority(b.actionType)
      return prioA - prioB
    })
}

export function resolveNightActions(
  players: Player[],
  nightNumber: number,
  nightActionRecords: NightActionRecord[]
): {
  updatedPlayers: Player[]
  resolvedActions: NightActionRecord[]
  eliminationRecords: EliminationRecord[]
  logEntries: GameLogEntry[]
  morningAnnouncements: string[]
} {
  const orderedActions = getNightActionOrder(nightActionRecords)
  const resolvedActions: NightActionRecord[] = []
  const eliminationRecords: EliminationRecord[] = []
  const logEntries: GameLogEntry[] = []
  const morningAnnouncements: string[] = []
  const killTargets = new Set<string>()
  const protectedPlayers = new Set<string>()
  const healedPlayers = new Set<string>()
  const revivedPlayers = new Set<string>()
  const poisonedPlayers = new Set<string>()
  const blockedKills = new Set<string>()
  const blockedPoisons = new Set<string>()
  let updatedPlayers = structuredClone(players)

  for (const action of orderedActions) {
    const actor = updatedPlayers.find((p) => p.id === action.actorId)
    if (!actor || !actor.alive) {
      resolvedActions.push({ ...action, resolved: true, result: 'failed' })
      continue
    }

    const role = actor.role
    if (!role) {
      resolvedActions.push({ ...action, resolved: true, result: 'failed' })
      continue
    }

    const target = updatedPlayers.find((p) => p.id === action.targetId)

    switch (action.actionType) {
      case 'protect': {
        if (target) {
          protectedPlayers.add(target.id)
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} protected ${target.name}`, 'action')
          )
        }
        break
      }
      case 'heal': {
        if (target) {
          healedPlayers.add(target.id)
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} healed ${target.name}`, 'action')
          )
        }
        break
      }
      case 'kill': {
        if (target) {
          if (!protectedPlayers.has(target.id) && !healedPlayers.has(target.id)) {
            killTargets.add(target.id)
          } else {
            blockedKills.add(target.id)
          }
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} targeted ${target.name}`, 'action')
          )
        }
        break
      }
      case 'poison': {
        if (target) {
          if (!healedPlayers.has(target.id)) {
            poisonedPlayers.add(target.id)
          } else {
            blockedPoisons.add(target.id)
          }
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} poisoned ${target.name}`, 'action')
          )
        }
        break
      }
      case 'investigate': {
        if (target && target.role) {
          const result = target.role.teamDetectionResult ?? target.role.alignment
          const playerIndex = updatedPlayers.findIndex((p) => p.id === target.id)
          if (playerIndex !== -1) {
            updatedPlayers[playerIndex] = {
              ...updatedPlayers[playerIndex],
              investigated: true,
              investigatedResult: result,
            }
          }
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          const label = result === 'werewolf' ? 'a Werewolf' : result === 'village' ? 'a Villager' : result
          morningAnnouncements.push(`${actor.name} investigated ${target.name} — they are ${label}.`)
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} investigated ${target.name} — ${label}`, 'action')
          )
        }
        break
      }
      case 'revive': {
        if (target && !target.alive) {
          revivedPlayers.add(target.id)
          resolvedActions.push({ ...action, resolved: true, result: 'success' })
          logEntries.push(
            createGameLog('night', 0, nightNumber, `${actor.name} revived ${target.name}`, 'action')
          )
        } else {
          resolvedActions.push({ ...action, resolved: true, result: 'failed' })
        }
        break
      }
      default:
        resolvedActions.push({ ...action, resolved: true, result: 'failed' })
    }
  }

  for (const playerId of revivedPlayers) {
    const idx = updatedPlayers.findIndex((p) => p.id === playerId)
    if (idx !== -1) {
      updatedPlayers[idx] = { ...updatedPlayers[idx], alive: true, eliminated: false }
      const p = updatedPlayers[idx]
      morningAnnouncements.push(`${p.name} has been revived!`)
      logEntries.push(
        createGameLog('night', 0, nightNumber, `${p.name} has been revived!`, 'result')
      )
    }
  }

  for (const playerId of blockedKills) {
    const p = updatedPlayers.find((p) => p.id === playerId)
    if (p) {
      morningAnnouncements.push(`${p.name} was protected from an attack last night.`)
    }
  }

  for (const playerId of blockedPoisons) {
    const p = updatedPlayers.find((p) => p.id === playerId)
    if (p) {
      morningAnnouncements.push(`${p.name} was saved from poison last night.`)
    }
  }

  for (const playerId of killTargets) {
    const idx = updatedPlayers.findIndex((p) => p.id === playerId)
    if (idx !== -1) {
      updatedPlayers[idx] = { ...updatedPlayers[idx], alive: false, eliminated: true }
      const p = updatedPlayers[idx]
      eliminationRecords.push({
        dayNumber: 0,
        playerId: p.id,
        playerName: p.name,
        roleName: p.role?.name ?? 'Unknown',
        method: 'night-kill',
        alignment: p.role?.alignment ?? 'village',
      })
      logEntries.push(
        createGameLog('night', 0, nightNumber, `${p.name} was killed during the night!`, 'result')
      )
    }
  }

  for (const playerId of poisonedPlayers) {
    const idx = updatedPlayers.findIndex((p) => p.id === playerId)
    if (idx !== -1) {
      updatedPlayers[idx] = { ...updatedPlayers[idx], poisoned: true, alive: false, eliminated: true }
      const p = updatedPlayers[idx]
      eliminationRecords.push({
        dayNumber: 0,
        playerId: p.id,
        playerName: p.name,
        roleName: p.role?.name ?? 'Unknown',
        method: 'poison',
        alignment: p.role?.alignment ?? 'village',
      })
      logEntries.push(
        createGameLog('night', 0, nightNumber, `${p.name} was poisoned!`, 'result')
      )
    }
  }

  return { updatedPlayers, resolvedActions, eliminationRecords, logEntries, morningAnnouncements }
}

export function calculateVoteResults(
  votes: VoteRecord[]
): Map<string, string[]> {
  const voteMap = new Map<string, string[]>()
  for (const v of votes) {
    const existing = voteMap.get(v.targetId) ?? []
    existing.push(v.voterId)
    voteMap.set(v.targetId, existing)
  }
  return voteMap
}

export function determineElimination(
  votes: VoteRecord[],
  players: Player[]
): {
  eliminatedId: string | null
  voteCounts: Record<string, number>
  tie: boolean
} {
  if (votes.length === 0) {
    return { eliminatedId: null, voteCounts: {}, tie: false }
  }

  const voteCounts: Record<string, number> = {}
  for (const v of votes) {
    voteCounts[v.targetId] = (voteCounts[v.targetId] ?? 0) + 1
  }

  const alivePlayers = players.filter((p) => p.alive)
  if (alivePlayers.length === 0) {
    return { eliminatedId: null, voteCounts, tie: false }
  }

  let maxVotes = 0
  let topCandidate: string | null = null
  let tie = false

  for (const [playerId, count] of Object.entries(voteCounts)) {
    if (count > maxVotes) {
      maxVotes = count
      topCandidate = playerId
      tie = false
    } else if (count === maxVotes && count > 0) {
      tie = true
    }
  }

  if (tie || maxVotes === 0) {
    return { eliminatedId: null, voteCounts, tie: true }
  }

  return { eliminatedId: topCandidate, voteCounts, tie: false }
}

export function executeElimination(
  players: Player[],
  eliminatedId: string | null,
  dayNumber: number,
  method: EliminationRecord['method']
): {
  updatedPlayers: Player[]
  eliminationRecord: EliminationRecord | null
  revengeKill: string | null
  logEntry: GameLogEntry | null
} {
  if (!eliminatedId) {
    return { updatedPlayers: players, eliminationRecord: null, revengeKill: null, logEntry: null }
  }

  const idx = players.findIndex((p) => p.id === eliminatedId)
  if (idx === -1) {
    return { updatedPlayers: players, eliminationRecord: null, revengeKill: null, logEntry: null }
  }

  const player = players[idx]
  const updatedPlayers = [...players]
  updatedPlayers[idx] = { ...player, alive: false, eliminated: true }

  let revengeKill: string | null = null
  if (player.role?.passiveAbility === 'revengeKill') {
    if (method === 'vote') {
      const voters = players.filter((p) => p.votedFor === eliminatedId && p.alive)
      if (voters.length > 0) {
        const randomIndex = Math.floor(Math.random() * voters.length)
        const target = voters[randomIndex]
        const targetIdx = updatedPlayers.findIndex((p) => p.id === target.id)
        if (targetIdx !== -1) {
          updatedPlayers[targetIdx] = { ...updatedPlayers[targetIdx], alive: false, eliminated: true }
          revengeKill = target.id
        }
      }
    } else if (method === 'night-kill') {
      const attackers = players.filter((p) => p.role?.nightAction === 'kill' && p.alive)
      if (attackers.length > 0) {
        const randomIndex = Math.floor(Math.random() * attackers.length)
        const target = attackers[randomIndex]
        const targetIdx = updatedPlayers.findIndex((p) => p.id === target.id)
        if (targetIdx !== -1) {
          updatedPlayers[targetIdx] = { ...updatedPlayers[targetIdx], alive: false, eliminated: true }
          revengeKill = target.id
        }
      }
    }
  }

  const eliminationRecord: EliminationRecord = {
    dayNumber,
    playerId: player.id,
    playerName: player.name,
    roleName: player.role?.name ?? 'Unknown',
    method,
    alignment: player.role?.alignment ?? 'village',
  }

  let logMessage: string
  if (method === 'vote') {
    logMessage = `${player.name} (${player.role?.name ?? 'Unknown'}) was eliminated by vote`
  } else {
    logMessage = `${player.name} (${player.role?.name ?? 'Unknown'}) was eliminated`
  }

  const logEntry = createGameLog('elimination', dayNumber, 0, logMessage, 'result')

  return { updatedPlayers, eliminationRecord, revengeKill, logEntry }
}

export function checkWinCondition(
  players: Player[]
): PlayerAlignment | null {
  const alivePlayers = players.filter((p) => p.alive)

  const neutralWinners: PlayerAlignment[] = []
  for (const p of alivePlayers) {
    if (p.role?.winConditionOverride) {
      const result = p.role.winConditionOverride.check(
        alivePlayers,
        alivePlayers.filter((pl) => pl.role?.alignment === 'werewolf').length,
        alivePlayers.filter((pl) => pl.role?.alignment === 'village').length
      )
      if (result && !neutralWinners.includes(result)) {
        neutralWinners.push(result)
      }
    }
  }

  if (neutralWinners.length > 0) {
    return neutralWinners[0]
  }

  const aliveWerewolves = alivePlayers.filter((p) => p.role?.alignment === 'werewolf').length
  const aliveNonWerewolves = alivePlayers.filter(
    (p) => p.alive && p.role?.alignment !== 'werewolf'
  ).length

  if (aliveWerewolves === 0) return 'village'
  if (aliveWerewolves >= aliveNonWerewolves) return 'werewolf'

  return null
}

export function getPhaseLabel(phase: string): string {
  const labels: Record<string, string> = {
    setup: 'Setup',
    'role-selection': 'Role Selection',
    'role-assignment': 'Role Assignment',
    'role-reveal': 'Role Reveal',
    night: 'Night Phase',
    morning: 'Morning',
    discussion: 'Discussion',
    voting: 'Voting',
    elimination: 'Elimination',
    ended: 'Game Over',
  }
  return labels[phase] ?? phase
}

export function getNightActionLabel(actionType: NightActionType): string {
  const labels: Record<string, string> = {
    kill: 'Choose a target to eliminate',
    protect: 'Choose who to protect',
    heal: 'Choose who to save',
    investigate: 'Choose who to investigate',
    poison: 'Choose who to poison',
    revive: 'Choose who to revive',
  }
  return labels[actionType] ?? 'Unknown action'
}
