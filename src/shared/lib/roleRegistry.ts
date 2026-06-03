import type { RoleConfig, NightActionType, PlayerAlignment } from '@/shared/types/game'
import { GAME_ROLES } from '@/shared/constants/roles'

const roleCache = new Map<string, RoleConfig>()

export function getRoleConfig(roleId: string): RoleConfig | null {
  if (roleCache.has(roleId)) return roleCache.get(roleId)!
  const role = GAME_ROLES[roleId]
  if (role) {
    roleCache.set(roleId, role)
    return role
  }
  return null
}

export function getRolesWithNightAction(): RoleConfig[] {
  return Object.values(GAME_ROLES).filter((r) => r.nightAction !== null)
}

export function getNightActionPriority(actionType: NightActionType): number {
  const actionPriorities: Record<NightActionType, number> = {
    revive: 10,
    heal: 20,
    protect: 30,
    kill: 40,
    poison: 50,
    investigate: 60,
  }
  return actionPriorities[actionType] ?? 100
}

export function getPriorityOrderedNightRoles(): RoleConfig[] {
  return Object.values(GAME_ROLES)
    .filter((r) => r.nightAction !== null)
    .sort((a, b) => a.nightActionPriority - b.nightActionPriority)
}

export function getRoleAlignment(roleId: string): PlayerAlignment | null {
  const role = getRoleConfig(roleId)
  return role?.alignment ?? null
}

export function getAlivePlayersWithNightAction(
  players: { id: string; role: RoleConfig | null; alive: boolean }[]
): { id: string; role: RoleConfig }[] {
  return players
    .filter((p): p is { id: string; role: RoleConfig; alive: boolean } =>
      p.alive && p.role !== null && p.role.nightAction !== null
    )
    .map((p) => ({ id: p.id, role: p.role }))
}

export function resolvePassiveAbility(
  role: RoleConfig,
  _context: { players: { id: string; role: RoleConfig | null; alive: boolean }[]; dayNumber: number }
): string | null {
  if (!role.passiveAbility || role.passiveAbility === 'none') return null
  return role.passiveAbility
}

export function getAliveWerewolfCount(
  players: { id: string; role: RoleConfig | null; alive: boolean }[]
): number {
  return players.filter((p) => p.alive && p.role?.alignment === 'werewolf').length
}

export function getAliveNonWerewolfCount(
  players: { id: string; role: RoleConfig | null; alive: boolean }[]
): number {
  return players.filter((p) => p.alive && p.role?.alignment !== 'werewolf').length
}

export function getAliveVillagerCount(
  players: { id: string; role: RoleConfig | null; alive: boolean }[]
): number {
  return players.filter((p) => p.alive && p.role?.alignment === 'village').length
}
