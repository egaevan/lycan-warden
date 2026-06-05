import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GamePhase, Player, GamePreset, PlayerAlignment, NightActionRecord, VoteRecord, EliminationRecord, GameLogEntry } from '@/shared/types/game'
import { GAME_ROLES, GAME_PRESETS } from '@/shared/constants/roles'
import { resolveNightActions, determineElimination, executeElimination, checkWinCondition, createGameLog } from '@/shared/lib/gameEngine'
import { canTransition } from '@/shared/lib/phaseMachine'

export interface GameState {
  id: string | null
  name: string
  preset: GamePreset
  playerCount: number
  players: Player[]
  selectedRoles: string[]
  currentPhase: GamePhase
  dayNumber: number
  nightNumber: number
  winner: PlayerAlignment | null
  nightActions: NightActionRecord[]
  votes: VoteRecord[]
  eliminationHistory: EliminationRecord[]
  log: GameLogEntry[]
  currentStep: number
}

interface GameActions {
  createGame: (name: string, preset: GamePreset, playerCount: number) => void
  setSelectedRoles: (roleIds: string[]) => void
  updatePlayerName: (playerId: string, name: string) => void
  assignRoles: (assignments: Record<string, string>) => void
  setPhase: (phase: GamePhase) => void
  eliminatePlayer: (playerId: string) => void
  revivePlayer: (playerId: string) => void
  setWinner: (alignment: PlayerAlignment) => void
  resetGame: () => void
  recordNightAction: (record: Omit<NightActionRecord, 'id' | 'resolved' | 'result'>) => void
  resolveCurrentNight: () => void
  recordVote: (voterId: string, targetId: string) => void
  resolveVoting: () => void
  advanceToNight: () => void
  advanceToMorning: () => void
  advanceToDiscussion: () => void
  advanceToElimination: () => void
  checkWinner: () => PlayerAlignment | null
  addLog: (entry: GameLogEntry) => void
  setCurrentStep: (step: number) => void
}

const initialState: GameState = {
  id: null,
  name: '',
  preset: 'classic',
  playerCount: 8,
  players: [],
  selectedRoles: [],
  currentPhase: 'setup',
  dayNumber: 0,
  nightNumber: 0,
  winner: null,
  nightActions: [],
  votes: [],
  eliminationHistory: [],
  log: [],
  currentStep: 0,
}

let nightActionIdCounter = 0

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      createGame: (name, preset, playerCount) => {
        const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
          id: `player-${i + 1}`,
          number: i + 1,
          name: `Player ${i + 1}`,
          role: null,
          alive: true,
          eliminated: false,
          voteCount: 0,
        }))

        const presetConfig = GAME_PRESETS[preset as keyof typeof GAME_PRESETS]
        const roleIds: string[] = presetConfig
          ? Object.entries(presetConfig.roles).flatMap(([roleId, count]) =>
              Array<string>(count).fill(roleId)
            )
          : []

        set({
          id: `game-${Date.now()}`,
          name,
          preset,
          playerCount,
          players,
          selectedRoles: roleIds,
          currentPhase: 'setup',
          dayNumber: 0,
          nightNumber: 0,
          winner: null,
          nightActions: [],
          votes: [],
          eliminationHistory: [],
          log: [],
          currentStep: 0,
        })
      },

      setSelectedRoles: (roleIds) => {
        set({ selectedRoles: roleIds })
      },

      updatePlayerName: (playerId, name) => {
        const { players } = get()
        set({
          players: players.map((p) =>
            p.id === playerId ? { ...p, name } : p
          ),
        })
      },

      assignRoles: (assignments) => {
        const { players } = get()
        const updatedPlayers = players.map((player) => ({
          ...player,
          role: assignments[player.id]
            ? (GAME_ROLES[assignments[player.id]] ?? null)
            : null,
          voteCount: 0,
        }))
        set({ players: updatedPlayers, currentPhase: 'role-assignment', currentStep: 0 })
      },

      setPhase: (phase) => {
        const { currentPhase, dayNumber, nightNumber } = get()
        if (!canTransition(currentPhase, phase)) {
          console.warn(`Invalid phase transition: ${currentPhase} → ${phase}`)
          return
        }
        set({
          currentPhase: phase,
          dayNumber: phase === 'discussion' || phase === 'voting' || phase === 'elimination' ? dayNumber + 1 : dayNumber,
          nightNumber: phase === 'night' ? nightNumber + 1 : nightNumber,
          currentStep: 0,
        })
      },

      eliminatePlayer: (playerId) => {
        const { players, dayNumber } = get()
        const player = players.find((p) => p.id === playerId)
        const updatedPlayers = players.map((p) =>
          p.id === playerId ? { ...p, alive: false, eliminated: true } : p
        )
        const entry: EliminationRecord = {
          dayNumber,
          playerId,
          playerName: player?.name ?? '',
          roleName: player?.role?.name ?? '',
          method: 'vote',
          alignment: player?.role?.alignment ?? 'village',
        }
        set({
          players: updatedPlayers,
          eliminationHistory: [...get().eliminationHistory, entry],
        })
      },

      revivePlayer: (playerId) => {
        const { players } = get()
        set({
          players: players.map((p) =>
            p.id === playerId ? { ...p, alive: true, eliminated: false } : p
          ),
        })
      },

      setWinner: (alignment) => {
        set({ winner: alignment, currentPhase: 'ended' })
      },

      resetGame: () => {
        set(initialState)
      },

      recordNightAction: (record) => {
        const id = `na-${Date.now()}-${++nightActionIdCounter}`
        const actionRecord: NightActionRecord = {
          ...record,
          id,
          resolved: false,
          result: null,
        }
        set({
          nightActions: [...get().nightActions, actionRecord],
        })
      },

      resolveCurrentNight: () => {
        const { players, nightNumber, nightActions } = get()
        const result = resolveNightActions(players, nightNumber, nightActions)
        set({
          players: result.updatedPlayers,
          nightActions: result.resolvedActions,
          eliminationHistory: [...get().eliminationHistory, ...result.eliminationRecords],
          log: [...get().log, ...result.logEntries],
        })
      },

      recordVote: (voterId, targetId) => {
        const { players } = get()
        const updatedPlayers = players.map((p) => {
          if (p.id === voterId) return { ...p, votedFor: targetId }
          return p
        })
        const record: VoteRecord = { voterId, targetId }
        set({
          votes: [...get().votes, record],
          players: updatedPlayers,
        })
      },

      resolveVoting: () => {
        const { votes, players, dayNumber } = get()
        const { eliminatedId, voteCounts, tie } = determineElimination(votes, players)

        const updatedVoteCounts = players.map((p) => ({
          ...p,
          voteCount: voteCounts[p.id] ?? 0,
        }))

        if (tie || !eliminatedId) {
          const logEntry = createGameLog('voting', dayNumber, 0, tie ? 'Vote resulted in a tie — no elimination' : 'No votes cast — no elimination', 'result')
          set({ players: updatedVoteCounts, log: [...get().log, logEntry] })
          return
        }

        const eliminationResult = executeElimination(updatedVoteCounts, eliminatedId, dayNumber, 'vote')
        set({
          players: eliminationResult.updatedPlayers,
          eliminationHistory: eliminationResult.eliminationRecord
            ? [...get().eliminationHistory, eliminationResult.eliminationRecord]
            : get().eliminationHistory,
          log: eliminationResult.logEntry
            ? [...get().log, eliminationResult.logEntry]
            : get().log,
        })

        if (eliminationResult.revengeKill) {
          const rkElimination = executeElimination(
            get().players,
            eliminationResult.revengeKill,
            dayNumber,
            'revenge'
          )
          if (rkElimination.eliminationRecord) {
            set({
              players: rkElimination.updatedPlayers,
              eliminationHistory: [...get().eliminationHistory, rkElimination.eliminationRecord],
              log: rkElimination.logEntry ? [...get().log, rkElimination.logEntry] : get().log,
            })
          }
        }
      },

      advanceToNight: () => {
        const { nightNumber } = get()
        set({
          currentPhase: 'night',
          nightNumber: nightNumber + 1,
          votes: [],
          nightActions: [],
          currentStep: 0,
        })
      },

      advanceToMorning: () => {
        set({ currentPhase: 'morning', currentStep: 0 })
      },

      advanceToDiscussion: () => {
        const { dayNumber } = get()
        set({ currentPhase: 'discussion', dayNumber: dayNumber + 1, currentStep: 0 })
      },

      advanceToElimination: () => {
        set({ currentPhase: 'elimination', currentStep: 0 })
      },

      checkWinner: () => {
        const { players } = get()
        const winner = checkWinCondition(players)
        if (winner) {
          set({ winner, currentPhase: 'ended' })
        }
        return winner
      },

      addLog: (entry) => {
        set({ log: [...get().log, entry] })
      },

      setCurrentStep: (step) => {
        set({ currentStep: step })
      },
    }),
    {
      name: 'lycan-warden-game',
      partialize: (state) => ({
        id: state.id,
        name: state.name,
        preset: state.preset,
        playerCount: state.playerCount,
        players: state.players,
        selectedRoles: state.selectedRoles,
        currentPhase: state.currentPhase,
        dayNumber: state.dayNumber,
        nightNumber: state.nightNumber,
        winner: state.winner,
        nightActions: state.nightActions,
        votes: state.votes,
        eliminationHistory: state.eliminationHistory,
        log: state.log,
        currentStep: state.currentStep,
      }),
    }
  )
)
