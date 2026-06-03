import type { RoleConfig } from '../types/game'

export const GAME_ROLES: Record<string, RoleConfig> = {
  villager: {
    id: 'villager',
    name: 'Villager',
    alignment: 'village',
    description: 'A regular villager with no special abilities',
    abilities: ['Vote during the day'],
    count: 1,
    maxCount: 99,
    nightAction: null,
    nightActionPriority: 0,
    passiveAbility: null,
  },
  werewolf: {
    id: 'werewolf',
    name: 'Werewolf',
    alignment: 'werewolf',
    description: 'Eliminate villagers at night',
    abilities: ['Choose a target at night to eliminate', 'Vote during the day'],
    count: 1,
    maxCount: 10,
    nightAction: 'kill',
    nightActionPriority: 2,
    passiveAbility: null,
  },
  seer: {
    id: 'seer',
    name: 'Seer',
    alignment: 'village',
    description: 'Investigate one player each night / all-seeing guardian of truth',
    abilities: ['Investigate a player to learn their true alignment'],
    count: 1,
    maxCount: 2,
    nightAction: 'investigate',
    nightActionPriority: 4,
    passiveAbility: null,
    teamDetectionResult: 'village',
  },
  witch: {
    id: 'witch',
    name: 'Witch',
    alignment: 'village',
    description: 'Master of potions who can save or poison',
    abilities: [
      'Save a player from being eliminated at night (once per game)',
      'Poison a player at night (once per game)',
    ],
    count: 1,
    maxCount: 2,
    nightAction: 'poison',
    nightActionPriority: 3,
    passiveAbility: 'heal',
  },
  bodyguard: {
    id: 'bodyguard',
    name: 'Bodyguard',
    alignment: 'village',
    description: 'Protect one player each night',
    abilities: ['Protect a player from being eliminated at night'],
    count: 1,
    maxCount: 2,
    nightAction: 'protect',
    nightActionPriority: 1,
    passiveAbility: null,
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    alignment: 'village',
    description: 'Eliminate someone when eliminated',
    abilities: ['Eliminate your killer before dying', 'Vote during the day'],
    count: 1,
    maxCount: 2,
    nightAction: null,
    nightActionPriority: 0,
    passiveAbility: 'revengeKill',
  },
}

export const CLASSIC_PRESET = {
  name: 'Classic',
  description: '3-8 players, simple rules',
  roles: {
    villager: 2,
    werewolf: 1,
    seer: 1,
  },
  minPlayers: 3,
  maxPlayers: 8,
}

export const EXTENDED_PRESET = {
  name: 'Extended',
  description: '6-15 players, more roles',
  roles: {
    villager: 4,
    werewolf: 2,
    seer: 1,
    witch: 1,
    bodyguard: 1,
  },
  minPlayers: 6,
  maxPlayers: 15,
}

export const COMPETITIVE_PRESET = {
  name: 'Competitive',
  description: '8-20 players, advanced play',
  roles: {
    villager: 6,
    werewolf: 3,
    seer: 1,
    witch: 1,
    bodyguard: 1,
    hunter: 1,
  },
  minPlayers: 8,
  maxPlayers: 20,
}

export const GAME_PRESETS = {
  classic: CLASSIC_PRESET,
  extended: EXTENDED_PRESET,
  competitive: COMPETITIVE_PRESET,
}
