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
