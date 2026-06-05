import type { GamePhase } from '@/shared/types/game'

export interface PhaseTransitionRule {
  from: GamePhase
  to: GamePhase[]
}

export const PHASE_TRANSITIONS: PhaseTransitionRule[] = [
  { from: 'setup', to: ['role-selection'] },
  { from: 'role-selection', to: ['role-assignment'] },
  { from: 'role-assignment', to: ['role-reveal'] },
  { from: 'role-reveal', to: ['night'] },
  { from: 'night', to: ['morning'] },
  { from: 'morning', to: ['discussion'] },
  { from: 'discussion', to: ['voting'] },
  { from: 'voting', to: ['elimination'] },
  { from: 'elimination', to: ['night', 'ended'] },
  { from: 'ended', to: ['setup'] },
]

export const PHASE_LABELS: Record<GamePhase, string> = {
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

export function getValidTransitions(currentPhase: GamePhase): GamePhase[] {
  const rule = PHASE_TRANSITIONS.find((t) => t.from === currentPhase)
  return rule?.to ?? []
}

export function canTransition(from: GamePhase, to: GamePhase): boolean {
  const valid = getValidTransitions(from)
  return valid.includes(to)
}

export function getNextPhase(currentPhase: GamePhase, gameEnded: boolean = false): GamePhase | null {
  if (gameEnded && currentPhase === 'elimination') return 'ended'
  const transitions = getValidTransitions(currentPhase)
  return transitions[0] ?? null
}
