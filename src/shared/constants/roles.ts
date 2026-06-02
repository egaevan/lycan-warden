import type { GameRole } from '../types/game'

export const GAME_ROLES: Record<string, GameRole> = {
  villager: {
    id: 'villager',
    name: 'Villager',
    alignment: 'village',
    description: 'A regular villager with no special abilities',
    abilities: ['Vote during the day'],
    count: 1,
  },
  werewolf: {
    id: 'werewolf',
    name: 'Werewolf',
    alignment: 'werewolf',
    description: 'Eliminate villagers at night',
    abilities: ['Choose a target at night to eliminate', 'Vote during the day'],
    count: 1,
  },
  seer: {
    id: 'seer',
    name: 'Seer',
    alignment: 'village',
    description: 'Investigate one player each night',
    abilities: ['Investigate a player to learn their role'],
    count: 1,
  },
  witch: {
    id: 'witch',
    name: 'Witch',
    alignment: 'village',
    description: 'Use potions to save or poison',
    abilities: [
      'Save a player from being eliminated at night',
      'Poison a player at night',
    ],
    count: 1,
  },
  bodyguard: {
    id: 'bodyguard',
    name: 'Bodyguard',
    alignment: 'village',
    description: 'Protect one player each night',
    abilities: ['Protect a player from being eliminated at night'],
    count: 1,
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    alignment: 'village',
    description: 'Eliminate someone when eliminated',
    abilities: ['Eliminate your killer before dying'],
    count: 1,
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
