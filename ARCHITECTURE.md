# Lycan Warden - Architecture Documentation

## Project Structure

```
src/
├── entities/           # Domain models and pure components
│   ├── role/          # Role entity components
│   └── player/        # Player entity components
├── features/          # Feature-specific containers and logic
│   ├── role-selection/
│   ├── player-selection/
│   └── voting/
├── widgets/           # Reusable UI widgets
│   ├── PhaseIndicator.tsx
│   └── CountdownTimer.tsx
├── pages/             # Feature-complete pages
│   └── (Page components using features)
└── shared/            # Shared utilities, hooks, and types
    ├── components/    # Layout and shared components
    ├── constants/     # App constants and configurations
    ├── hooks/         # Custom React hooks
    ├── types/         # TypeScript type definitions
    └── utils/         # Helper functions and mock data
```

## Architecture Patterns

### 1. **Entities** (`src/entities/`)
Pure, reusable domain model components that don't manage state. Examples:
- `RoleCard` - Displays role information
- `PlayerCard` - Displays player information

**Usage:**
```tsx
import { PlayerCard } from '@/src/entities/player/PlayerCard'

<PlayerCard 
  player={player}
  isSelected={isSelected}
  onClick={handleSelect}
  showRole={true}
/>
```

### 2. **Features** (`src/features/`)
Feature-specific containers that manage state and orchestrate entities. Include business logic specific to features.

Examples:
- `RoleSelectionContainer` - Handles role selection state
- `PlayerSelectionContainer` - Handles player selection state
- `VotingContainer` - Handles voting logic

**Usage:**
```tsx
import { RoleSelectionContainer } from '@/src/features/role-selection/RoleSelectionContainer'

<RoleSelectionContainer 
  onComplete={handleRoleSelection}
  minRoles={2}
  maxRoles={6}
/>
```

### 3. **Widgets** (`src/widgets/`)
General-purpose, reusable UI components that can be used across different features.

Examples:
- `PhaseIndicator` - Shows current game phase
- `CountdownTimer` - Displays countdown with auto-complete

**Usage:**
```tsx
import { CountdownTimer } from '@/src/widgets/CountdownTimer'

<CountdownTimer 
  initialSeconds={120}
  onComplete={handlePhaseEnd}
  autoStart={true}
/>
```

### 4. **Shared** (`src/shared/`)

#### Types (`shared/types/`)
- `game.ts` - Core game types (GamePhase, Player, GameSession, etc.)

#### Constants (`shared/constants/`)
- `app.ts` - App-level constants (routes, durations, colors)
- `roles.ts` - Game roles and presets configuration

#### Hooks (`shared/hooks/`)
- `useGameState.ts` - Main game state management hook

#### Utils (`shared/utils/`)
- `helpers.ts` - Helper functions (formatTime, getWinCondition, etc.)
- `mockData.ts` - Mock data for development

#### Components (`shared/components/`)
- `AppLayout.tsx` - Main app layout wrapper
- `GameLayout.tsx` - Game-specific layout wrapper

## State Management Pattern

### Using `useGameState` Hook

The `useGameState` hook provides centralized game state management:

```tsx
'use client'

import { useGameState } from '@/src/shared/hooks/useGameState'

export default function Page() {
  const { gameSession, createGame, updatePhase, assignRoles } = useGameState()

  // Create a new game
  const handleNewGame = () => {
    createGame('My Game', 'classic', 8)
  }

  // Update phase
  const handlePhaseChange = () => {
    updatePhase('night')
  }

  return (
    // Your component
  )
}
```

Available methods:
- `createGame(name, preset, playerCount)` - Create new game
- `updatePhase(phase)` - Change game phase
- `assignRoles(assignments)` - Assign roles to players
- `eliminatePlayer(playerId)` - Mark player as eliminated
- `addVote(voterId, targetId)` - Record a vote
- `resetVotes()` - Clear all votes
- `endGame()` - End the game

## Component Integration Example

### Creating a New Feature

1. **Define Types** (`src/shared/types/game.ts`):
```tsx
export interface MyFeature {
  id: string
  data: string
}
```

2. **Create Entity** (`src/entities/myfeature/MyCard.tsx`):
```tsx
'use client'

import { Card } from '@/components/ui/card'

interface MyCardProps {
  data: MyFeature
}

export function MyCard({ data }: MyCardProps) {
  return <Card>{/* Display data */}</Card>
}
```

3. **Create Feature Container** (`src/features/myfeature/MyFeatureContainer.tsx`):
```tsx
'use client'

import { useState } from 'react'
import { MyCard } from '@/src/entities/myfeature/MyCard'

interface MyFeatureContainerProps {
  onComplete: (data: MyFeature) => void
}

export function MyFeatureContainer({ onComplete }: MyFeatureContainerProps) {
  const [selected, setSelected] = useState<MyFeature | null>(null)

  return (
    <div>
      {/* Use MyCard entity */}
      <MyCard data={selected} />
      {/* Handle logic */}
    </div>
  )
}
```

4. **Use in Page** (`app/myfeature/page.tsx`):
```tsx
'use client'

import { MyFeatureContainer } from '@/src/features/myfeature/MyFeatureContainer'
import { AppLayout } from '@/src/shared/components/AppLayout'

export default function MyFeaturePage() {
  return (
    <AppLayout title="My Feature">
      <MyFeatureContainer onComplete={handleComplete} />
    </AppLayout>
  )
}
```

## Key Design Principles

### 1. **Separation of Concerns**
- Entities focus on presentation
- Features focus on logic and state
- Shared utilities handle cross-cutting concerns

### 2. **Reusability**
- Entities can be used in multiple features
- Widgets are feature-agnostic
- Hooks provide composable logic

### 3. **Type Safety**
- All types centralized in `src/shared/types/`
- Full TypeScript coverage
- Props interfaces for all components

### 4. **Mock Data First**
- All state is mocked (no backend calls)
- `mockData.ts` provides default datasets
- Easy to swap for real API later

### 5. **Responsive Design**
- Mobile-first approach
- Tailwind CSS for styling
- Shadcn UI for components

## Color System

Defined in `src/shared/constants/app.ts`:
- **Primary**: `#c9a961` - Antique gold
- **Secondary**: `#2d5a3d` - Deep forest green
- **Accent**: `#8b3a3a` - Blood red
- **Background**: `#0a0a0a` - Charcoal black
- **Foreground**: `#f5f1eb` - Antique white

## File Naming Conventions

- **Components**: PascalCase (e.g., `PlayerCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useGameState.ts`)
- **Utilities**: camelCase (e.g., `helpers.ts`)
- **Constants**: camelCase or UPPER_CASE (e.g., `app.ts`)
- **Types**: PascalCase (e.g., `game.ts`)

## Development Workflow

1. Define types in `src/shared/types/`
2. Create mock data in `src/shared/utils/mockData.ts`
3. Build entity components in `src/entities/`
4. Build feature containers in `src/features/`
5. Build widgets in `src/widgets/` (if reusable across features)
6. Integrate into pages in `app/`

## Testing Strategy

For each component type:
- **Entities**: Unit tests for props handling
- **Features**: Integration tests for state logic
- **Widgets**: Snapshot tests for visual regression
- **Hooks**: Hook tests for state changes

## Future Enhancements

- [ ] Backend integration (replace mock data)
- [ ] Redux or Zustand for complex state
- [ ] API layer in `src/api/`
- [ ] Error boundary components
- [ ] Analytics integration
- [ ] Internationalization (i18n)
- [ ] Theme system improvements

## Performance Optimization

- Memoized components where needed
- Client-side only (no SSR for game features)
- Lazy loading for pages
- Image optimization with Next.js Image

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Color contrast compliance
- Semantic HTML structure
