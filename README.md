# Lycan Warden

A **Progressive Web App (PWA)** Werewolf / Mafia game moderator companion. Designed for the moderator to manage entire game sessions — setup, role assignment, night actions, voting, elimination, and win condition tracking — with an offline-first, mobile-first experience and a dark fantasy theme.

## Features

- **Game Setup** — Choose from Classic (3–8), Extended (6–15), or Competitive (8–20) presets, configure roles and player names
- **Role Assignment** — Random shuffle and tap-to-reveal role distribution
- **Night Phase** — Guided step-by-step night actions in priority order (Werewolf → Seer → Witch → Bodyguard)
- **Day Phase** — Morning results, timed discussion, sequential voting with tie handling
- **Hunter Revenge** — Eliminated Hunter can take down their attacker
- **Win Detection** — Automatic village/werewolf win condition checks after each elimination
- **6 Roles** — Villager, Werewolf, Seer, Witch, Bodyguard, Hunter
- **PWA** — Installable, works offline, service worker caching
- **State Persistence** — Game state saved to localStorage, resume anytime

## Tech Stack

**TypeScript** · **React 19** · **Vite 6** · **TailwindCSS 4** · **Zustand 5** · **React Router 7** · **Shadcn UI** · **Zod** · **vite-plugin-pwa**

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── shared/          # Types, constants, store, hooks, game engine, phase machine
├── entities/        # RoleCard, PlayerCard
├── features/        # Role selection, player selection, voting
├── widgets/         # PhaseIndicator, CountdownTimer
├── pages/           # 15 page components (home, setup, night, voting, etc.)
└── App.tsx          # Router with 17 routes
```

## Architecture

The app follows a Feature-Sliced Design–inspired 7-layer architecture:

- **Pages** — Route-level page components
- **Features** — Business logic (role selection, voting, etc.)
- **Entities** — Domain objects (RoleCard, PlayerCard)
- **Widgets** — Reusable UI blocks (PhaseIndicator, CountdownTimer)
- **Shared** — Types, constants, store, hooks, game engine, utilities
- **Components** — Shadcn UI primitives

The **Game Engine** (`src/shared/lib/gameEngine.ts`) handles night action resolution, vote calculation, elimination (with Hunter revenge), and win condition checks. The **Phase Machine** (`src/shared/lib/phaseMachine.ts`) enforces valid state transitions. The **Zustand Store** (`src/shared/store/gameStore.ts`) manages all game state with localStorage persistence.

## License

MIT
