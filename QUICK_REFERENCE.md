# Lycan Warden - Quick Reference Card

## File Structure at a Glance

```
src/
├── entities/          → Pure UI components (no state)
├── features/          → Business logic containers (with state)
├── widgets/           → Reusable UI pieces (timers, indicators)
├── shared/
│   ├── components/    → Layout wrappers (AppLayout, GameLayout)
│   ├── constants/     → Configuration (routes, colors, game rules)
│   ├── hooks/         → State management (useGameState)
│   ├── types/         → TypeScript definitions
│   └── utils/         → Helpers and mock data
└── index.ts           → All exports (barrel file)
```

## Essential Imports

```tsx
// Everything from one place
import {
  RoleCard,
  PlayerCard,
  PhaseIndicator,
  CountdownTimer,
  RoleSelectionContainer,
  PlayerSelectionContainer,
  VotingContainer,
  AppLayout,
  GameLayout,
  useGameState,
  GAME_ROLES,
  GAME_PRESETS,
  ROUTES,
  formatTime,
} from '@/src'

// Or specific imports
import { RoleCard } from '@/src/entities/role/RoleCard'
import { useGameState } from '@/src/shared/hooks/useGameState'
```

## Component Types

### Entity (Display Only)
```tsx
// Use for: Pure presentation, no state management
<RoleCard role={role} isSelected={selected} onClick={handleClick} />
<PlayerCard player={player} showRole={true} showVotes={true} />
```

### Feature Container (With Logic)
```tsx
// Use for: State, business logic, user interactions
<RoleSelectionContainer onComplete={handleDone} maxRoles={6} />
<PlayerSelectionContainer players={players} onSelect={handleSelect} />
<VotingContainer players={players} onVotingComplete={handleDone} />
```

### Widget (Reusable)
```tsx
// Use for: Generic UI elements across features
<PhaseIndicator phase="night" dayNumber={2} compact={false} />
<CountdownTimer initialSeconds={120} onComplete={handleTimeUp} autoStart={true} />
```

### Layout (Structure)
```tsx
// Use for: Page wrappers with consistent styling
<AppLayout title="New Game">
  {children}
</AppLayout>

<GameLayout currentPhase="night" gameName="Game 1">
  {children}
</GameLayout>
```

## State Management

```tsx
// Get game state
const {
  gameSession,           // Current game: GameSession | null
  createGame,            // Create new game
  updatePhase,           // Change phase
  assignRoles,           // Assign roles to players
  eliminatePlayer,       // Mark player eliminated
  addVote,              // Record vote
  resetVotes,           // Clear votes
  endGame,              // End game
} = useGameState()

// Create a game
createGame('My Game', 'classic', 8)

// Update phase
updatePhase('night')

// Assign roles
assignRoles({
  'player-1': 'werewolf',
  'player-2': 'seer',
  'player-3': 'villager',
})
```

## Key Types

```tsx
type GamePhase = 'setup' | 'role-selection' | 'role-assignment' 
               | 'night' | 'day' | 'voting' | 'ended'

type PlayerAlignment = 'village' | 'werewolf' | 'neutral'

type GamePreset = 'classic' | 'extended' | 'competitive' | 'custom'

interface Player {
  id: string
  number: number
  role: GameRole | null
  alive: boolean
  eliminated: boolean
  voteCount: number
  votedFor?: string
}

interface GameSession {
  id: string
  name: string
  preset: GamePreset
  playerCount: number
  players: Player[]
  currentPhase: GamePhase
  dayNumber: number
  nightNumber: number
}
```

## Utility Functions

```tsx
import { 
  formatTime,            // 120 → "2:00"
  getPlayersByAlignment, // Filter by 'village'/'werewolf'
  getAlivePlayerCount,   // Count living players
  getWinCondition,       // Check for winner
  getHighestVoted,       // Find player with most votes
  shuffleArray,          // Randomize array
  generateGameId,        // Create unique ID
} from '@/src'

// Usage
const time = formatTime(120)           // "2:00"
const villagers = getPlayersByAlignment(players, 'village')
const alive = getAlivePlayerCount(players)
const winner = getWinCondition(players) // 'villagers' | 'werewolves' | null
const topVoted = getHighestVoted(players)
const shuffled = shuffleArray(items)
const id = generateGameId()
```

## Common Patterns

### Create a New Page
```tsx
// app/my-feature/page.tsx
'use client'

import { AppLayout } from '@/src'
import { MyFeatureContainer } from '@/src/features/my-feature/MyFeatureContainer'

export default function MyFeaturePage() {
  return (
    <AppLayout title="My Feature">
      <MyFeatureContainer />
    </AppLayout>
  )
}
```

### Create a Container
```tsx
// src/features/my-feature/MyFeatureContainer.tsx
'use client'

import { useState } from 'react'

export function MyFeatureContainer({ onComplete }) {
  const [data, setData] = useState(null)

  return (
    <div className="space-y-6">
      {/* Use entities and widgets */}
      <MyEntity data={data} onChange={setData} />
      <button onClick={() => onComplete(data)}>
        Done
      </button>
    </div>
  )
}
```

### Create an Entity
```tsx
// src/entities/my-entity/MyEntity.tsx
'use client'

interface MyEntityProps {
  data: any
  onChange?: (data: any) => void
}

export function MyEntity({ data, onChange }: MyEntityProps) {
  return (
    <div>
      {/* Pure presentation */}
    </div>
  )
}
```

## Styling Quick Tips

```tsx
// ✅ Correct
className="space-y-6 p-4 bg-gray-900/50 border border-gray-700"
className="text-2xl font-bold text-amber-100"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ❌ Wrong
className="p-[16px] bg-[#1a1a1a]"
className="w-screen h-screen"

// Color Reference
// Primary: amber-600 (gold) → actions
// Secondary: emerald-600 (green) → village
// Accent: red-600 (red) → werewolves/errors
// Neutral: gray-700 (dark) → backgrounds
```

## Routes

```tsx
import { ROUTES } from '@/src'

ROUTES.HOME              // '/'
ROUTES.NEW_GAME          // '/new-game'
ROUTES.GAME_SETUP        // '/game-setup'
ROUTES.ROLE_SELECTION    // '/role-selection'
ROUTES.ROLE_ASSIGNMENT   // '/role-assignment'
ROUTES.GAME_START        // '/game-start'
ROUTES.NIGHT_PHASE       // '/night-phase'
ROUTES.DAY_PHASE         // '/day-phase'
ROUTES.VOTING_PHASE      // '/voting-phase'
ROUTES.DASHBOARD         // '/dashboard'
ROUTES.GAME_OVER         // '/game-over'
ROUTES.SETTINGS          // '/settings'
ROUTES.HELP              // '/help'
ROUTES.CONTINUE          // '/continue'
```

## Game Constants

```tsx
import { GAME_ROLES, GAME_PRESETS } from '@/src'

// All available roles
GAME_ROLES.villager     // { name, description, abilities, ... }
GAME_ROLES.werewolf
GAME_ROLES.seer
GAME_ROLES.witch
GAME_ROLES.bodyguard
GAME_ROLES.hunter

// Game presets
GAME_PRESETS.classic      // 3-8 players
GAME_PRESETS.extended     // 6-15 players
GAME_PRESETS.competitive  // 8-20 players
```

## Mock Data

```tsx
import {
  mockPlayers,
  mockGameSession,
  mockGameStats,
  mockGameHistory,
} from '@/src'

// Use in development
const players = mockPlayers           // Array<Player>
const game = mockGameSession          // GameSession
const stats = mockGameStats           // GameStats
const history = mockGameHistory       // GameHistory[]
```

## Testing Template

```tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from '@/src/entities/my-entity/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent data={mockData} />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Useful Packages

```tsx
import { Button } from '@/components/ui/button'      // Shadcn button
import { Card } from '@/components/ui/card'          // Shadcn card
import { Badge } from '@/components/ui/badge'        // Shadcn badge
import { Input } from '@/components/ui/input'        // Shadcn input
import { Tabs } from '@/components/ui/tabs'          // Shadcn tabs

import { Moon, Sun, Users } from 'lucide-react'      // Icons
```

## Build & Deploy

```bash
# Development
pnpm dev                 # Start dev server

# Production
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run linter
pnpm type-check         # Check TypeScript

# Deployment
vercel deploy           # Deploy to Vercel
```

## Debugging Tips

```tsx
// Log component render
console.log('[MyComponent] Render with props:', props)

// Log state changes
console.log('[GameState] Phase changed to:', phase)

// Log errors
console.error('[API] Failed to fetch:', error.message)

// Type checking
// Cmd+/ hover over variable for type info
const data: MyType = fetchData()
```

## Documentation

- `ARCHITECTURE.md` - Full architecture guide
- `DEVELOPER_GUIDE.md` - Detailed development patterns
- `REFACTORING_SUMMARY.md` - Refactoring overview
- Code comments - Implementation details

## Key Principles

1. **Separation of Concerns** - Each layer has one job
2. **Reusability** - Components work across features
3. **Type Safety** - Everything is typed
4. **Mock Data** - No backend required
5. **Scalability** - Easy to add new features
6. **Testability** - Components are testable
7. **Accessibility** - WCAG compliant
8. **Performance** - Optimized rendering

## Need Help?

1. Check ARCHITECTURE.md for structure details
2. Look at similar components for patterns
3. Search codebase for examples
4. Check TypeScript errors for type hints
5. Review console logs for runtime issues
