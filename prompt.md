# Global Product Context

Product Name:

Lycan Warden

Subtitle:

Werewolf Moderator Companion

Description:

Lycan Warden is a Progressive Web App designed for Werewolf game moderators.

The application manages:

* Role assignment
* Night actions
* Voting
* Eliminations
* Win conditions

The application is NOT used by players.

Only moderators interact with the application.

Brand Attributes:

* Premium
* Dark Fantasy
* Strategic
* Modern
* Mobile First

Visual Theme:

* Full moon
* Medieval village
* Wolf symbolism
* Guardian symbolism
* Dark UI

Primary Colors:

* Charcoal Black
* Midnight Gray
* Deep Forest Green
* Blood Red Accent
* Antique Gold

Design Style:

* Premium SaaS
* Modern board game companion
* Fantasy inspired
* Not cartoonish
* Not horror

# Prompt - Logo

Create a premium mobile app icon for a product called Lycan Warden.

The icon combines three elements into a single unified symbol:

- Wolf head
- Crescent moon
- Medieval shield

The design must be geometric, minimalist, and instantly recognizable.

Visual style:

- Modern SaaS logo
- Premium fantasy board game companion
- Flat vector
- Clean negative space
- Strong silhouette

Colors:

- Antique gold symbol
- Charcoal black background

Requirements:

- No text
- No gradients
- No 3D effects
- No cartoon style
- No horror style
- No background scenery

The icon must remain recognizable at 48x48 pixels.

Suitable for:
- PWA
- Android
- iOS
- Website favicon

Centered composition.


# Prompt 1 - UI Design Generation (v0.app)

Create a complete mobile-first PWA UI for a Werewolf Moderator application.

Requirements:

* Dark fantasy theme
* Inspired by modern board game companion apps
* Medieval village atmosphere
* Elegant fantasy typography
* Mobile-first design
* PWA friendly
* Touch optimized
* Clean and modern UX

Application purpose:

The app is used ONLY by the moderator of a Werewolf game.

Players never interact with the application directly except when viewing their assigned role during role reveal.

Pages required:

1. Splash Screen
2. Home Screen
3. New Game Setup
4. Role Selection
5. Player Input
6. Role Assignment Confirmation
7. Role Reveal Screen
8. Night Phase Guide
9. Day Phase Screen
10. Voting Screen
11. Moderator Dashboard
12. End Game Screen

Design requirements:

* Shadcn UI compatible
* TailwindCSS friendly
* React compatible
* Responsive
* Dark mode only

Color palette:

* Dark charcoal
* Deep forest green
* Blood red accents
* Gold highlights

Include:

* Fantasy role cards
* Alive/dead indicators
* Phase indicators
* Countdown timer
* Voting cards
* Dashboard table
* Win condition modal

Generate complete page designs and component hierarchy.

---

# Prompt 2 - Generate Production React Code (v0.app)

Convert the generated UI into production-ready React + TypeScript code.

Requirements:

* React
* TypeScript
* TailwindCSS
* Shadcn UI
* Component-driven architecture

Create:

* entities
* features
* widgets
* pages
* shared
* Reusable components
* Responsive layouts
* Mobile-first implementation
* Clean file structure

Use mock data.

No backend integration.

No API calls.

All state should be mocked.

---

# Prompt 3 - OpenCode Project Bootstrap

You are a senior React architect.

Create a complete production-ready project based on the generated UI.

Use Feature-Sliced Design architecture.

Stack:

* React
* TypeScript
* Vite
* TailwindCSS
* Shadcn UI
* Zustand
* React Router
* PWA

Requirements:

* Follow plan.md exactly
* Generate folder structure
* Generate routes
* Generate Zustand store
* Generate mock role data
* Generate reusable UI components
* Generate page skeletons

Do not implement business logic yet.

Focus only on architecture and navigation.

---

# Prompt 4 - OpenCode Feature Development

Continue implementation.

Read plan.md.

Implement:

* Game setup
* Role selection
* Player input
* Random role assignment

Requirements:

* Clean code
* Type-safe
* Reusable hooks
* Zustand integration

Use local state persistence.

No backend.

---

# Prompt 5 - OpenCode Game Engine

Read plan.md.

Implement the complete Werewolf game engine.

Use state machine architecture.
Use role registry pattern.
Do not hardcode role behavior.
All role behavior must be extensible through configuration.

Features:

* Night actions
* Day phase
* Voting
* Elimination
* Win conditions

Requirements:

* Extensible architecture
* Support future custom roles
* Support future online multiplayer

Avoid hardcoded logic.

Use role configuration driven design.

Store game state in Zustand.

Persist automatically to local storage.

---

# Prompt 6 - OpenCode Final Polish

Read plan.md.

Perform a full project review.

Improve:

* UX
* Accessibility
* Performance
* Mobile responsiveness
* PWA behavior
* Animations

Add:

* Framer Motion transitions
* Install PWA banner
* Offline handling
* Error boundaries

Ensure production readiness.

---

# Prompt 7 - OpenCode Night Target Selection & Player Table

Read plan.md.

Implement the two pending features described in the updated plan:

### 1. Night Action Target Selection

During night phase, each role with a night ability needs a target picker:

- For the current night step (e.g. Werewolves), show a list of alive players
- Moderator selects which player the ability targets
- Record the night action with the selected target ID
- Support the case where multiple players have the same role (e.g. two werewolves) — either each picks independently or the moderator picks once for the group
- Move to next step after target is confirmed

Current night-phase page (`src/pages/night-phase/index.tsx`) already steps through roles but records actions with `targetId: null`. Update it to:

1. Display a player selection list when a night role step is active
2. Let the moderator pick a target before recording the action
3. Pass the selected `targetId` to `recordNightAction`
4. For group roles, allow selecting one target for all actors of that role

### 2. Player Status Table

The dashboard (`src/pages/dashboard/index.tsx`) already has a players tab with a basic table. Enhance it:

- Ensure the table displays: player number, name, role, and alive/dead status
- Color-coded status badges (emerald for alive, red for dead)
- Read-only table — information display only
- Already exists but may need styling/accessibility polish to match plan spec

Also add the status table to the Moderator Dashboard section of the game layout as the primary view.

Requirements:

- Reuse existing `PlayerCard` or `Table` components
- Type-safe
- Use Zustand store for player data
- Responsive (scrollable on mobile)

---

# Prompt 8 - OpenCode Game Engine Deep Dive

Read plan.md.

Refine and harden the existing game engine implementation.

### Phase State Machine
Ensure the phase sequence is implemented as a strict finite state machine:
- Setup → Role Reveal → Night → Morning → Discussion → Voting → Elimination → Win Check → Night (repeat)
- Transitions must be validated — only allowed transitions can execute
- Guard conditions: elimination can go to ended (if win condition met) or back to night
- Reject invalid transitions with a clear error

### Night Action Resolution
Verify actions are resolved in priority order:
- Protection / Heal (priority 10-20) execute first
- Kill (priority 30) executes next — blocked if target is protected or healed
- Poison (priority 40) executes next — blocked if target is healed
- Investigation (priority 50) executes last
- All priorities must be configurable per role definition
- Protection blocks kills only; heal saves from both kill and poison

### Day Phase
- Announce night results: show which players died (or peaceful night)
- Allow starting a discussion timer (5/10/15/20 min or custom)
- Transition to voting phase

### Voting & Elimination
- Each alive player casts one vote
- Player with the most votes is eliminated
- Ties result in no elimination
- Record every elimination in the history log
- Support passive abilities on elimination (e.g. Hunter's revenge kill kills a random voter)

### Win Condition Engine
- Villager victory: all werewolves eliminated
- Werewolf victory: number of werewolves >= number of non-werewolves
- Check after every elimination (both night kills and vote eliminations)
- Support neutral/override win conditions per role config

### Player Status Table
- Read-only table with columns: player number, name, role, alive/dead status
- Color-coded status badges (emerald for alive, red for dead)
- Updated in real-time as eliminations occur
- Accessible via the moderator dashboard

### Save System
- Auto-save after every action via Zustand persist middleware
- Restore unfinished game on startup
- Persist: current game, players, roles, day, phase, night actions, votes, elimination history, game log

Requirements:

- All role behavior must be configuration-driven, not hardcoded
- Use role registry pattern for extensibility
- Support future custom roles without engine changes
- Store game state in Zustand with persist middleware
- Use state machine pattern for phase transitions
- Type-safe throughout
- No backend dependency
