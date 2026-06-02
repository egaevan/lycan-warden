# Lycan Warden - Developer Guide

## Quick Start

### Project Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Import Patterns

### Importing from the New Architecture

```tsx
// ✅ Good - Using barrel exports from src/index.ts
import {
  RoleCard,
  PlayerCard,
  PhaseIndicator,
  CountdownTimer,
  RoleSelectionContainer,
  useGameState,
  GAME_ROLES,
  ROUTES,
  formatTime,
} from '@/src'

// ✅ Also good - Direct imports for specificity
import { RoleCard } from '@/src/entities/role/RoleCard'
import { useGameState } from '@/src/shared/hooks/useGameState'
import { GAME_PRESETS } from '@/src/shared/constants/roles'

// ❌ Avoid - Circular imports or read-only files
import { something } from '@/components' // Too vague
import { RoleCard as RC } from 'user_read_only_context/' // Read-only
```

## Creating a New Page

### Step 1: Create the Page File

```bash
mkdir -p app/my-feature
touch app/my-feature/page.tsx
```

### Step 2: Use AppLayout or GameLayout

```tsx
// app/my-feature/page.tsx
'use client'

import { AppLayout } from '@/src/shared/components/AppLayout'
import { MyFeatureContainer } from '@/src/features/my-feature/MyFeatureContainer'

export default function MyFeaturePage() {
  return (
    <AppLayout title="My Feature">
      <MyFeatureContainer />
    </AppLayout>
  )
}
```

### Step 3: Create Container Component

```tsx
// src/features/my-feature/MyFeatureContainer.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MyEntity } from '@/src/entities/my-entity/MyEntity'

export function MyFeatureContainer() {
  const [data, setData] = useState(null)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-100">My Feature</h2>
      <MyEntity data={data} onChange={setData} />
      <Button className="bg-amber-600 hover:bg-amber-700">
        Continue
      </Button>
    </div>
  )
}
```

### Step 4: Create Entity Component

```tsx
// src/entities/my-entity/MyEntity.tsx
'use client'

import { Card } from '@/components/ui/card'

interface MyEntityProps {
  data: any
  onChange?: (data: any) => void
}

export function MyEntity({ data, onChange }: MyEntityProps) {
  return <Card className="p-6">My Entity Content</Card>
}
```

## Using Game State

### Setup Game State in a Container

```tsx
'use client'

import { useGameState } from '@/src/shared/hooks/useGameState'
import { Button } from '@/components/ui/button'

export function GameSetupContainer() {
  const { gameSession, createGame, updatePhase } = useGameState()

  const handleStartGame = () => {
    createGame('My Game', 'classic', 8)
    updatePhase('night')
  }

  return (
    <div>
      {gameSession && (
        <p>Game: {gameSession.name}</p>
      )}
      <Button onClick={handleStartGame}>Start</Button>
    </div>
  )
}
```

### Available State Methods

```tsx
const {
  gameSession,        // Current game session
  createGame,         // (name, preset, playerCount) => GameSession
  updatePhase,        // (phase) => void
  assignRoles,        // (assignments) => void
  eliminatePlayer,    // (playerId) => void
  addVote,           // (voterId, targetId) => void
  resetVotes,        // () => void
  endGame,           // () => void
} = useGameState()
```

## Styling Guidelines

### Use Tailwind Classes

```tsx
// ✅ Good - Using standard Tailwind classes
<div className="space-y-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
  <h2 className="text-2xl font-bold text-amber-100">Title</h2>
  <p className="text-gray-400">Description</p>
</div>

// ❌ Avoid - Arbitrary values or magic numbers
<div className="p-[16px] w-[250px] bg-[#1a1a1a]">
  Content
</div>

// ✅ Use semantic colors
<button className="bg-amber-600 hover:bg-amber-700 text-amber-950">
  Action
</button>

// ✅ Use responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

### Color Reference

From `src/shared/constants/app.ts`:
- Primary: `#c9a961` (amber) - Main actions, highlights
- Secondary: `#2d5a3d` (green) - Village alignment
- Accent: `#8b3a3a` (red) - Werewolves, errors
- Background: `#0a0a0a` (black) - Page backgrounds
- Foreground: `#f5f1eb` (white) - Text
- Muted: `#3a3a3a` (dark gray) - Disabled state

## Mock Data Usage

### Development with Mock Data

```tsx
import { mockGameSession, mockPlayers } from '@/src/shared/utils/mockData'

export function GameOverview() {
  // Use mock data for development
  const game = mockGameSession
  const players = mockPlayers

  return (
    <div>
      <h2>{game.name}</h2>
      <p>Players: {players.length}</p>
    </div>
  )
}
```

### Replacing with Real API Later

```tsx
// When backend is ready, replace mock data with API calls
import { getGameSession, getPlayers } from '@/src/api/game'

export function GameOverview() {
  const [game, setGame] = useState(null)

  useEffect(() => {
    getGameSession(id).then(setGame)
  }, [id])

  return (
    <div>
      <h2>{game?.name}</h2>
    </div>
  )
}
```

## Component Props Pattern

### Entity Component Props

```tsx
interface EntityProps {
  // Primary data
  entity: Entity
  
  // Interaction handlers
  onClick?: () => void
  onChange?: (value: any) => void
  
  // Display options
  isSelected?: boolean
  disabled?: boolean
  showDetails?: boolean
}
```

### Feature Container Props

```tsx
interface ContainerProps {
  // Callbacks for parent
  onComplete: (data: any) => void
  onCancel?: () => void
  
  // Optional overrides
  maxSelectable?: number
  customOptions?: any[]
}
```

## Type Safety

### Defining New Types

```tsx
// src/shared/types/game.ts
export interface MyNewType {
  id: string
  name: string
  created At: Date
}

export type MyUnion = 'option1' | 'option2' | 'option3'
```

### Using Types in Components

```tsx
import type { MyNewType, MyUnion } from '@/src/shared/types/game'

interface MyComponentProps {
  data: MyNewType
  type: MyUnion
}

export function MyComponent({ data, type }: MyComponentProps) {
  // TypeScript ensures type safety
  return <div>{data.name}</div>
}
```

## Performance Tips

### Memoization

```tsx
import { useMemo } from 'react'

export function PlayerList({ players }) {
  // Memoize expensive calculations
  const sortedPlayers = useMemo(
    () => [...players].sort((a, b) => a.number - b.number),
    [players]
  )

  return (
    <div>
      {sortedPlayers.map(player => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  )
}
```

### Client-side Only

```tsx
// Use 'use client' for interactive components
'use client'

import { useState } from 'react'

export function InteractiveFeature() {
  const [state, setState] = useState(null)
  // Component logic
}
```

## Testing Strategy

### Component Testing Example

```tsx
// __tests__/entities/role/RoleCard.test.tsx
import { render, screen } from '@testing-library/react'
import { RoleCard } from '@/src/entities/role/RoleCard'
import { GAME_ROLES } from '@/src/shared/constants/roles'

describe('RoleCard', () => {
  it('displays role information correctly', () => {
    const role = GAME_ROLES.villager
    render(<RoleCard role={role} />)
    
    expect(screen.getByText('Villager')).toBeInTheDocument()
    expect(screen.getByText(role.description)).toBeInTheDocument()
  })
})
```

## Common Patterns

### Form Handling

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FormFeature({ onSubmit }) {
  const [formData, setFormData] = useState({ name: '' })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      onSubmit(formData)
    }}>
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Selection Logic

```tsx
import { useState } from 'react'

export function SelectionFeature({ items, onSelect }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => toggleItem(item.id)}
          className={selected.includes(item.id) ? 'selected' : ''}
        >
          {item.name}
        </button>
      ))}
      <button onClick={() => onSelect(selected)}>
        Submit ({selected.length})
      </button>
    </div>
  )
}
```

## Debugging

### Console Debugging

```tsx
// Use descriptive console logs
console.log('[MyComponent] Rendering with props:', props)
console.log('[GameState] Updated phase to:', phase)
console.error('[API] Failed to load game:', error)
```

### React DevTools

```bash
# Enable React DevTools in development
agent-browser open --enable react-devtools "http://localhost:3000"
agent-browser react tree
```

## Deployment

### Building for Production

```bash
# Build the project
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel
vercel deploy
```

### Environment Variables

```bash
# Create .env.local in project root
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Troubleshooting

### Common Issues

**Build Error: "Module not found"**
- Check import paths use `@/` alias
- Ensure file exists in correct location
- Run `pnpm install` to ensure dependencies

**Component not rendering**
- Check 'use client' directive for interactive components
- Verify props are passed correctly
- Check browser console for errors

**Styling not applied**
- Verify Tailwind classes are correct
- Check class isn't overridden by other styles
- Run `pnpm dev` to rebuild CSS

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues or questions:
1. Check existing documentation in `ARCHITECTURE.md`
2. Review similar components for patterns
3. Check console for error messages
4. Review TypeScript errors for type hints
