# Werewolf Moderator PWA

## Overview

A Progressive Web App (PWA) designed specifically for offline Werewolf moderators.

The application is not intended for players. Only the moderator operates the application throughout the game.

Primary goals:

* Fast game setup
* Automatic role assignment
* Guided night actions
* Voting management
* Automatic win condition checking
* Offline-first experience
* Mobile-first UI
* Installable as Android PWA

---

# Branding

## Product Name

Lycan Warden

## Subtitle

Werewolf Moderator Companion

## Positioning

Lycan Warden is an offline-first moderator companion designed to simplify and enhance physical Werewolf games.

The application assists moderators in:

* Role assignment
* Night phase management
* Voting management
* Win condition tracking
* Player management

without replacing the social interaction of the game.

## Brand Personality

* Mysterious
* Strategic
* Intelligent
* Fantasy-inspired
* Elegant
* Modern

## Visual Identity

Primary Theme:

* Dark Fantasy
* Medieval Village
* Moonlit Night

Primary Colors:

* Charcoal Black
* Midnight Gray
* Deep Forest Green
* Blood Red Accent
* Antique Gold

## Logo Direction

The logo should combine:

* Wolf head silhouette
* Full moon
* Shield or crest
* Guardian symbolism

The logo should communicate:

* Protection
* Leadership
* Mystery
* Night
* Strategy

Avoid:

* Cartoon wolves
* Cute mascots
* Horror/gore aesthetics
* Overly complex details

Target style:

* Modern SaaS quality
* Premium board game companion
* Mobile app icon friendly


# Tech Stack

Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Shadcn UI
* Zustand
* React Router
* Framer Motion

PWA

* vite-plugin-pwa
* Service Worker
* Offline Cache

Data Storage

* LocalStorage

Future

* IndexedDB
* Cloud Sync

---

# Core Features

## Game Setup

Moderator can:

* Create a new game
* Select role presets
* Customize roles
* Configure player count

---

## Role Management

System provides:

### Basic Preset

* Werewolf
* Seer
* Doctor
* Villager

### Advanced Preset

* Werewolf
* Alpha Wolf
* Seer
* Doctor
* Hunter
* Witch
* Cupid
* Villager

### Custom

Moderator manually selects roles.

---

## Player Management

Moderator inputs:

* Player names

Validation:

* No duplicates
* No empty values

---

## Role Assignment

System automatically:

* Shuffles players
* Shuffles roles
* Assigns role to player

Assignment must be random.

---

## Role Reveal Mode

For each player:

1. Display player name
2. Hide role initially
3. Reveal role on tap
4. Show:

* Role image
* Role name
* Role description
* Team affiliation

5. Continue to next player

---

## Game Phase Engine

### Night Phase

Guided step-by-step flow.

Example:

1. Werewolves Wake Up
2. Doctor Wake Up
3. Seer Wake Up

Moderator records actions.

### Night Action Target Selection

For each role with a night ability, the moderator selects a target:

1. Display the role name and ability description
2. Show a list of alive players
3. Moderator selects which player the ability targets
4. Record the action with the selected target
5. Move to the next role step

Examples:

* Werewolf → selects one alive player to kill
* Doctor → selects one alive player to heal
* Seer → selects one alive player to investigate
* Witch → selects one alive player to poison or heal

If a role has multiple actors (e.g., two werewolves), each actor selects independently or the moderator selects once for the group.

---

### Day Phase

Moderator can:

* Announce deaths
* Start discussion timer

Timer options:

* 5 minutes
* 10 minutes
* 15 minutes
* 20 minutes
* Custom

---

### Voting Phase

Moderator records:

* Vote result
* Eliminated player

System updates:

* Player status
* Alive count

---

## Moderator Dashboard

Display:

* Player list
* Role list
* Alive/dead status
* Current day
* Current phase

Visible only to moderator.

### Player Status Table

A table view displaying all players with their current game status:

| Column | Description |
|--------|-------------|
| # | Player number |
| Name | Player name |
| Role | Assigned role name |
| Status | Alive or Dead (with color indicator) |

Features:
* Sortable by player number or name
* Color-coded status badges (green for alive, red for dead)
* Role visibility only for moderator
* Updated in real-time as eliminations occur
* Accessible via a dedicated "Players" tab in the dashboard

---

## Win Condition Engine

### Villager Victory

All Werewolves eliminated.

### Werewolf Victory

Number of Werewolves >= number of non-Werewolves.

### Neutral Roles

Prepared for future implementation.

---

# Architecture

src/

* app/
* pages/
* features/

  * game-setup/
  * player-management/
  * role-assignment/
  * role-reveal/
  * night-phase/
  * day-phase/
  * voting/
  * dashboard/
* shared/

  * ui/
  * hooks/
  * utils/
  * constants/
* store/
* assets/
* data/

---

# Zustand Store

Global state:

* currentGame
* players
* roles
* assignments
* phase
* day
* timer
* votes
* nightActions

---

# Data Model

Player

* id
* name
* roleId
* alive

Role

* id
* name
* team
* description
* image

Game

* id
* day
* phase
* players
* winner

---

# Milestone 1

Setup:

* React
* Tailwind
* Shadcn
* PWA
* Routing

---

# Milestone 2

Game Setup

* Role selection
* Presets
* Player input

---

# Milestone 3

Role Assignment

* Shuffle engine
* Reveal flow

---

# Milestone 4

Night System

* Guided actions
* Action recording

---

# Milestone 5

Day & Voting

* Discussion timer
* Voting system

---

# Milestone 6

Win Conditions

* Automatic winner detection

---

# Milestone 7

Polish

* Animations
* Dark fantasy theme
* Sound effects
* Offline optimization

---

# Non Functional Requirements

* Mobile first
* Responsive
* Offline support
* Fast loading
* No backend dependency
* PWA installable
* Touch friendly UI

---

# Future Features

* Custom role builder
* Game history
* Statistics
* Multiplayer moderator sync
* AI moderator assistant
* Online save


---

# Role Engine

Every role must be configuration-driven.

Role structure:

- id
- name
- team
- description
- image
- nightAction
- passiveAbility
- winCondition

Example:

Werewolf
- nightAction: kill

Doctor
- nightAction: heal

Seer
- nightAction: investigate

Hunter
- passiveAbility: revengeKill

---

# Phase State Machine

Setup
→ Role Reveal
→ Night
→ Morning Result
→ Discussion
→ Voting
→ Elimination
→ Win Check
→ Night

Implement as a finite state machine to simplify future role expansion.

---

# Night Action Resolution

Night actions must be resolved using priority order.

Default Priority:

1. Protection / Heal
2. Kill
3. Investigation
4. Passive Effects
5. Win Condition Check

All priorities must be configurable.

---

# Save System

Persist automatically:

- Current game
- Players
- Roles
- Day
- Phase
- Night actions
- Votes

Requirements:

- Auto-save after every action
- Restore unfinished game on startup
- Offline-first behavior

---

# Role Assets

Store all role assets locally.

assets/roles/

- werewolf.webp
- seer.webp
- doctor.webp
- villager.webp
- hunter.webp
- witch.webp

---

# MVP Roles

Core Roles:

- Villager
- Werewolf
- Seer
- Doctor
- Hunter
- Witch

Future Roles:

- Alpha Wolf
- Cupid
- Bodyguard
- Tanner
- Sheriff
- Jester
