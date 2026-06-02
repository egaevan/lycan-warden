'use client'

import { useState, useCallback } from 'react'
import type { GameSession, Player, GamePhase } from '../types/game'
import { GAME_ROLES, GAME_PRESETS } from '../constants/roles'

export function useGameState() {
  const [gameSession, setGameSession] = useState<GameSession | null>(null)

  const createGame = useCallback(
    (name: string, preset: string, playerCount: number) => {
      const presetConfig = GAME_PRESETS[preset as keyof typeof GAME_PRESETS]
      const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
        id: `player-${i + 1}`,
        number: i + 1,
        role: null,
        alive: true,
        eliminated: false,
        voteCount: 0,
      }))

      const newSession: GameSession = {
        id: `game-${Date.now()}`,
        name,
        preset: preset as any,
        playerCount,
        players,
        currentPhase: 'setup',
        dayNumber: 0,
        nightNumber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setGameSession(newSession)
      return newSession
    },
    [],
  )

  const updatePhase = useCallback((phase: GamePhase) => {
    setGameSession((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        currentPhase: phase,
        dayNumber: phase.includes('day') ? prev.dayNumber + 1 : prev.dayNumber,
        nightNumber: phase === 'night' ? prev.nightNumber + 1 : prev.nightNumber,
        updatedAt: new Date(),
      }
    })
  }, [])

  const assignRoles = useCallback((assignments: Record<string, string>) => {
    setGameSession((prev) => {
      if (!prev) return prev
      const updatedPlayers = prev.players.map((player) => ({
        ...player,
        role: assignments[player.id]
          ? GAME_ROLES[assignments[player.id]]
          : null,
      }))
      return {
        ...prev,
        players: updatedPlayers,
        currentPhase: 'night',
        updatedAt: new Date(),
      }
    })
  }, [])

  const eliminatePlayer = useCallback((playerId: string) => {
    setGameSession((prev) => {
      if (!prev) return prev
      const updatedPlayers = prev.players.map((player) =>
        player.id === playerId
          ? { ...player, alive: false, eliminated: true }
          : player,
      )
      return {
        ...prev,
        players: updatedPlayers,
        updatedAt: new Date(),
      }
    })
  }, [])

  const addVote = useCallback((voterId: string, targetId: string) => {
    setGameSession((prev) => {
      if (!prev) return prev
      const updatedPlayers = prev.players.map((player) =>
        player.id === voterId
          ? { ...player, votedFor: targetId }
          : player,
      )
      // Count votes for target
      const voteTarget = updatedPlayers.find((p) => p.id === targetId)
      if (voteTarget) {
        voteTarget.voteCount = updatedPlayers.filter(
          (p) => p.votedFor === targetId,
        ).length
      }
      return {
        ...prev,
        players: updatedPlayers,
        updatedAt: new Date(),
      }
    })
  }, [])

  const resetVotes = useCallback(() => {
    setGameSession((prev) => {
      if (!prev) return prev
      const updatedPlayers = prev.players.map((player) => ({
        ...player,
        voteCount: 0,
        votedFor: undefined,
      }))
      return {
        ...prev,
        players: updatedPlayers,
        updatedAt: new Date(),
      }
    })
  }, [])

  const endGame = useCallback(() => {
    setGameSession((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        currentPhase: 'ended',
        updatedAt: new Date(),
      }
    })
  }, [])

  return {
    gameSession,
    createGame,
    updatePhase,
    assignRoles,
    eliminatePlayer,
    addVote,
    resetVotes,
    endGame,
  }
}
