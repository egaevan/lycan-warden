# Lycan Warden - Complete File Index

## Documentation Files

| File | Lines | Purpose |
|------|-------|---------|
| `ARCHITECTURE.md` | 293 | Complete architecture guide explaining structure, patterns, and design principles |
| `DEVELOPER_GUIDE.md` | 512 | Development handbook with setup, patterns, and best practices |
| `REFACTORING_SUMMARY.md` | 408 | Overview of refactoring, what was built, and migration guide |
| `QUICK_REFERENCE.md` | 385 | Quick lookup for common patterns, imports, and utilities |
| `FILE_INDEX.md` | This | Index of all files and their purposes |

## Type Definitions

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/shared/types/game.ts` | 44 | `GamePhase`, `Player`, `GameRole`, `GameSession`, `GameStats`, `PlayerAlignment`, `GamePreset` | Core game type definitions |

## Constants

| File | Lines | Key Exports | Purpose |
|------|-------|----------|---------|
| `src/shared/constants/app.ts` | 36 | `ROUTES`, `COLORS`, `PHASE_DURATIONS`, `APP_NAME` | App-wide configuration |
| `src/shared/constants/roles.ts` | 103 | `GAME_ROLES`, `GAME_PRESETS`, `CLASSIC_PRESET`, `EXTENDED_PRESET`, `COMPETITIVE_PRESET` | Game rules and role definitions |

## Hooks

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/shared/hooks/useGameState.ts` | 149 | `useGameState` | Central game state management hook |

## Utilities

| File | Lines | Key Exports | Purpose |
|------|-------|----------|---------|
| `src/shared/utils/helpers.ts` | 50 | `formatTime`, `getPlayersByAlignment`, `getAlivePlayerCount`, `getWinCondition`, `getHighestVoted`, `shuffleArray`, `generateGameId` | Helper functions for game logic |
| `src/shared/utils/mockData.ts` | 60 | `mockPlayers`, `mockGameSession`, `mockGameStats`, `mockGameHistory` | Mock data for development |

## Shared Components (Layout)

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/shared/components/AppLayout.tsx` | 86 | `AppLayout` | Main application layout wrapper |
| `src/shared/components/GameLayout.tsx` | 86 | `GameLayout` | Game-specific layout with phase display |

## Entities (Presentation Layer)

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/entities/role/RoleCard.tsx` | 68 | `RoleCard` | Display individual game role with abilities |
| `src/entities/player/PlayerCard.tsx` | 66 | `PlayerCard` | Display individual player with status |

## Features (Business Logic Layer)

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/features/role-selection/RoleSelectionContainer.tsx` | 79 | `RoleSelectionContainer` | Handle role selection with constraints |
| `src/features/player-selection/PlayerSelectionContainer.tsx` | 77 | `PlayerSelectionContainer` | Handle player selection logic |
| `src/features/voting/VotingContainer.tsx` | 120 | `VotingContainer` | Manage voting mechanics and vote tracking |

## Widgets (Reusable Components)

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `src/widgets/PhaseIndicator.tsx` | 109 | `PhaseIndicator` | Display current game phase with icon |
| `src/widgets/CountdownTimer.tsx` | 131 | `CountdownTimer` | Animated countdown timer with controls |

## Barrel Exports

| File | Lines | Purpose |
|------|-------|---------|
| `src/index.ts` | 53 | Central export file for all public APIs |

## Application Pages

| File | Purpose | Updated |
|------|---------|---------|
| `app/page.tsx` | Home/splash screen | Original |
| `app/new-game/page.tsx` | Game preset selection | ✅ Refactored |
| `app/game-setup/page.tsx` | Configure game players | Original |
| `app/role-selection/page.tsx` | Select roles for game | Original |
| `app/role-assignment/page.tsx` | Assign roles to players | Original |
| `app/game-start/page.tsx` | Game start guide | Original |
| `app/night-phase/page.tsx` | Night phase management | Original |
| `app/day-phase/page.tsx` | Day phase discussion | Original |
| `app/dashboard/page.tsx` | Game moderator dashboard | Original |
| `app/game-over/page.tsx` | Game end and results | Original |
| `app/settings/page.tsx` | User settings | Original |
| `app/help/page.tsx` | Help and rules guide | Original |
| `app/continue/page.tsx` | Resume saved games | Original |

## Total Code Statistics

| Category | Files | Lines |
|----------|-------|-------|
| Documentation | 5 | 1,583 |
| Types & Constants | 3 | 183 |
| Hooks & Utilities | 2 | 209 |
| Shared Components | 2 | 172 |
| Entities | 2 | 134 |
| Features | 3 | 276 |
| Widgets | 2 | 240 |
| Barrel Exports | 1 | 53 |
| **Total New Code** | **20** | **~2,850** |

## Architecture Layers

### Layer 1: Types & Constants (`src/shared/`)
Foundation for the entire application
- Type definitions for all data structures
- Configuration and game rules
- Constants for routes and colors

### Layer 2: Hooks & Utilities (`src/shared/`)
Reusable logic and helpers
- Game state management hook
- Helper functions for game logic
- Mock data for development

### Layer 3: Entities (`src/entities/`)
Presentation components (no state)
- RoleCard - display roles
- PlayerCard - display players

### Layer 4: Features (`src/features/`)
Business logic containers (with state)
- RoleSelectionContainer - role selection UI
- PlayerSelectionContainer - player selection UI
- VotingContainer - voting mechanics

### Layer 5: Widgets (`src/widgets/`)
Reusable UI components across features
- PhaseIndicator - phase display
- CountdownTimer - countdown timer

### Layer 6: Shared Components (`src/shared/components/`)
Layout wrappers and structure
- AppLayout - main layout
- GameLayout - game layout

### Layer 7: Pages (`app/`)
Feature-complete pages
- Each page uses layout + containers + entities + widgets

## File Organization Rules

### Do's ✅
- Put presentation-only components in `entities/`
- Put state management in `features/`
- Put reusable UI in `widgets/`
- Put shared logic in `shared/`
- Use barrel exports for clean imports
- Create subdirectories for organization

### Don'ts ❌
- Mix state and presentation in entities
- Create deeply nested directories
- Put all code in one file
- Use circular imports
- Create components not used anywhere

## Dependency Graph

```
Pages (app/)
  ↓
Features (src/features/)
  ↓
Entities (src/entities/)
  ↓
Widgets (src/widgets/)
  ↓
Shared (src/shared/)
  └─ Components, Hooks, Types, Constants, Utils
```

## Adding New Features

1. **Create Entity** → `src/entities/my-feature/MyEntity.tsx`
2. **Create Feature** → `src/features/my-feature/MyFeatureContainer.tsx`
3. **Create Page** → `app/my-feature/page.tsx`
4. **Export from** → `src/index.ts`

## Import Path Reference

```tsx
// From barrel (recommended for most imports)
import { ComponentName } from '@/src'

// Direct import (for specificity)
import { ComponentName } from '@/src/entities/my-entity/ComponentName'

// Shared utilities
import { useGameState } from '@/src/shared/hooks/useGameState'
import { GAME_ROLES } from '@/src/shared/constants/roles'
import type { GameSession } from '@/src/shared/types/game'

// Shadcn UI components
import { Button } from '@/components/ui/button'

// Icons
import { Moon, Sun } from 'lucide-react'

// Next.js utilities
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
```

## File Size Distribution

- **Documentation**: ~33% (1,583 lines)
- **Components**: ~37% (938 lines)
- **Utilities & Hooks**: ~11% (330 lines)
- **Types & Constants**: ~7% (183 lines)
- **Configuration**: ~12% (318 lines total)

## Maintenance Notes

### When to Create New Files
- New entity → create in `entities/`
- New feature → create in `features/`
- New page → create in `app/`
- New utility → add to `shared/utils/`
- New constant → add to `shared/constants/`
- New type → add to `shared/types/`

### When to Update Existing Files
- New export → update `src/index.ts`
- New route → update `src/shared/constants/app.ts`
- New role → update `src/shared/constants/roles.ts`
- New game type → update `src/shared/types/game.ts`

### Code Review Checklist
- [ ] Follows folder structure
- [ ] Proper TypeScript types
- [ ] Using barrel exports or direct imports
- [ ] Components properly split (entities vs features)
- [ ] No circular dependencies
- [ ] Styled with Tailwind classes
- [ ] Responsive design
- [ ] Accessibility considered
- [ ] Documented with JSDoc comments
- [ ] No console errors/warnings

## Quick Navigation

**Want to...**
- Understand the architecture? → Read `ARCHITECTURE.md`
- Learn development patterns? → Read `DEVELOPER_GUIDE.md`
- See what was built? → Read `REFACTORING_SUMMARY.md`
- Quick lookup? → Read `QUICK_REFERENCE.md`
- Find a specific file? → Use this `FILE_INDEX.md`

**Quick imports for:**
- Components → `import { ... } from '@/src'`
- Hooks → `import { useGameState } from '@/src'`
- Types → `import type { ... } from '@/src'`
- Constants → `import { GAME_ROLES, ROUTES } from '@/src'`
- Utilities → `import { formatTime, ... } from '@/src'`

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024 | Initial production refactoring |

## Support

For questions about file organization or architecture:
1. Check ARCHITECTURE.md for design decisions
2. Review similar files for patterns
3. Check DEVELOPER_GUIDE.md for specific patterns
4. Review FILE_INDEX.md for file locations
