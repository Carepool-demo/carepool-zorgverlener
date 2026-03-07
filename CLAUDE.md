# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Carepool Zorgverlener is the **caregiver (zorgverlener) version** of the Carepool app. It is the sister app to `carepool-app`, which is the **care-seeker (zorgvrager) version**. Both share the same design system, architecture patterns, and component structure. All UI text, aria-labels, and dummy data are in Dutch (lang="nl").

This project was initially created as a copy of `carepool-app` and then adapted for the caregiver perspective. Mobile-first web application (393x852 viewport, 393px max-width shell).

No git remote configured yet. Netlify auto-deploy via `netlify.toml` (build command: `npm run build`, publish: `dist`).

## Commands

All commands run from the `carepool-zorgverlener/` directory:

- `npm run dev` — Start Vite dev server on port 5174
- `npm run build` — Production build to dist/
- `npm run lint` — ESLint (flat config with React Hooks plugin; `no-unused-vars` ignores uppercase identifiers)
- `npm run preview` — Preview production build

Dev server is configured in `.claude/launch.json` as `carepool-zorgverlener-dev`.

## Architecture

React 19 + Vite 7, plain JavaScript (no TypeScript, no routing library, no state management library). Vanilla CSS with design tokens via CSS custom properties in `index.css`.

### Page Routing

`App.jsx` renders pages based on `activePage` state. BottomNav triggers changes via `onTabChange`. The shell adds a dynamic class `app-shell--${activePage}` for page-specific styling of shared components (TopBar, BottomNav).

Page and sub-page route identifiers are centralized in `constants/routes.js` as `PAGES`, `SUB_PAGES`, and `OVERLAY_PAGES`. All navigation code imports from this file instead of using string literals.

Overlay pages (listed in `OVERLAY_PAGES`) hide the BottomNav and render full-screen. Navigation flow: avatar click -> `profielInstellingen` -> `profiel` (Over mij), `zorgcategorieen`, `helpInfo`, `sjablonen`, `notificatieInstellingen`, or `notificaties`. Back buttons return to `profielInstellingen`, which itself returns to the `previousPage`.

Cross-page navigation: `App.jsx` exposes `handleNavigate(page, subPage, extra)` passed as `onNavigate` to pages that need to deep-link into another page's sub-page.

BottomNav hiding: Overlay pages always hide the nav. Carepool, Home, and Admin sub-pages also hide it via `onSubPageChange` callbacks.

### Page Component Tree

```
App.jsx (wrapped in PasswordGate)
├── Home.jsx                -> onNavigate(page, subPage) for deep-links, sub-page router
│   ├── NodigUit.jsx        -> onBack (uses qrcode.react for QR code)
│   └── AlleVerzoeken.jsx   -> onBack (all care requests, UNIQUE to zorgverlener)
├── Carepool.jsx            -> sub-page router (initialSubPage prop)
│   ├── MijnConnecties.jsx  -> onBack, onInvite
│   ├── NodigUit.jsx        -> onBack (also reachable from Home)
│   ├── Beschikbaarheid.jsx -> onBack
│   ├── Zoeken.jsx          -> onBack, onSelectResult
│   └── ZorgverlenerProfiel.jsx -> onBack, zorgverlener prop, internal CV sub-view
├── Agenda.jsx              -> sub-page router (initialSubPage prop)
│   └── NieuweAfspraak.jsx  -> onBack, multi-step (select -> form -> pickCategory / editDurations)
├── Berichten.jsx           -> internal tab state (chats/verzoeken)
├── Admin.jsx               -> tab router + sub-page router (initialTab, initialMonth props)
│   ├── ZorglogsTab.jsx     -> no own CSS (uses Admin.css), onDownload callback
│   ├── OverzichtenTab.jsx  -> no own CSS (uses Admin.css), accepts initialMonth, onDownload callback
│   ├── TarievenTab.jsx     -> no own CSS (uses Admin.css)
│   ├── DownloadZorglogs.jsx -> separate CSS, onBack callback (UNIQUE to zorgverlener)
│   ├── SvbDeclaratie.jsx   -> separate CSS, onBack callback
│   └── BudgetOverzicht.jsx -> separate CSS, onBack callback
│       └── BudgetDetail.jsx -> separate CSS, onBack callback
├── ProfielInstellingen.jsx -> overlay, settings hub (avatar click)
├── Profiel.jsx             -> overlay, "Over mij" personal info
├── Zorgcategorieen.jsx     -> overlay, toggle-based care category selection
├── HelpInfo.jsx            -> overlay, help & info page
├── Sjablonen.jsx           -> overlay, care templates management
├── Notificaties.jsx        -> overlay, notifications & to-do items
├── NotificatieInstellingen.jsx -> overlay, notification settings
└── Tour.jsx                -> onboarding walkthrough (standalone)
```

### Sub-page Navigation

Pages with sub-pages use internal `useState`. The parent conditionally renders sub-page components and passes `onBack` callbacks.

```jsx
// Carepool.jsx
import { PAGES, SUB_PAGES } from '../constants/routes'
const [subPage, setSubPage] = useState(initialSubPage)
if (subPage === SUB_PAGES.BESCHIKBAARHEID) return <Beschikbaarheid onBack={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)} />
```

Admin.jsx uses `openSubPage`/`closeSubPage` helpers for its three sub-pages (DownloadZorglogs, BudgetOverzicht, SvbDeclaratie). Berichten.jsx uses internal tab state for chats/verzoeken but has no sub-pages.

## Differences from carepool-app (zorgvrager)

| Aspect | carepool-app (zorgvrager) | carepool-zorgverlener |
|--------|--------------------------|----------------------|
| Perspective | Care seeker | Caregiver |
| Vite port | 5173 | 5174 |
| launch.json name | `carepool-dev` | `carepool-zorgverlener-dev` |
| DownloadZorglogs page | Not present | Sub-page of Admin (accessible from ZorglogsTab and OverzichtenTab) |
| AlleVerzoeken page | Not present | Sub-page of Home (all care requests) |
| Home sub-pages | NodigUit | NodigUit, AlleVerzoeken |
| Unique routes | — | `PAGES.BESCHIKBAARHEID` (overlay), `SUB_PAGES.ALLE_VERZOEKEN`, `SUB_PAGES.OPENSTAANDE_VERZOEKEN` |
| Git remote | `Carepool-demo/carepool-app` | Not configured yet |

## File Structure

```
src/
├── main.jsx                          # Entry point (StrictMode, React 19)
├── App.jsx / App.css                 # Shell: 393px, page routing, bottom nav
├── index.css                         # Design system tokens
├── constants/
│   └── routes.js                     # PAGES, SUB_PAGES, OVERLAY_PAGES constants
├── components/
│   ├── Icons.jsx                     # ALL shared SVG icons (centralized, named exports)
│   ├── TopBar.jsx/css                # Sticky header: title + bell + avatar
│   ├── BottomNav.jsx/css             # 5-tab nav (Home, Carepool, Agenda, Berichten, Admin)
│   ├── ConnectionRow.jsx/css         # Reusable connection row (name, initials, tags)
│   ├── ErrorBoundary.jsx             # React error boundary (class component)
│   ├── PasswordGate.jsx/css          # Demo password gate (sessionStorage, password: demo2026)
│   ├── ZorgverlenerSelector.jsx/css  # Caregiver dropdown (used in Admin tabs)
│   └── MonthRow.jsx/css              # Month picker + download (used in Admin tabs)
├── pages/
│   ├── Home.jsx/css                  # Landing + sub-page router
│   ├── AlleVerzoeken.jsx/css         # All care requests (UNIQUE, sub-page of Home)
│   ├── NodigUit.jsx/css              # Invite page with QR code (sub-page of Home and Carepool)
│   ├── Carepool.jsx/css              # Landing + sub-page router
│   ├── MijnConnecties.jsx/css        # Connections list (sub-page of Carepool)
│   ├── Beschikbaarheid.jsx/css       # Weekly availability grid + overlay (sub-page)
│   ├── Zoeken.jsx/css                # Search zorgverleners (sub-page of Carepool)
│   ├── ZorgverlenerProfiel.jsx/css   # Zorgverlener detail profile + CV (sub-page of Carepool)
│   ├── Agenda.jsx/css                # Calendar week view + sub-page router
│   ├── NieuweAfspraak.jsx/css        # New appointment flow (sub-page of Agenda)
│   ├── Berichten.jsx/css             # Messages page with Chats/Verzoeken tabs
│   ├── Admin.jsx/css                 # Admin shell with 3 tab components + 3 sub-pages
│   ├── ZorglogsTab.jsx               # Care log entries (uses Admin.css)
│   ├── OverzichtenTab.jsx            # Monthly summaries (uses Admin.css)
│   ├── TarievenTab.jsx               # Rate cards (uses Admin.css)
│   ├── DownloadZorglogs.jsx/css      # Zorglogs download page (UNIQUE, sub-page of Admin)
│   ├── SvbDeclaratie.jsx/css         # SVB declaration (sub-page of Admin)
│   ├── BudgetOverzicht.jsx/css       # Budget overview (sub-page of Admin)
│   ├── BudgetDetail.jsx/css          # Budget detail (sub-page of BudgetOverzicht)
│   ├── ProfielInstellingen.jsx/css   # Settings hub (overlay, avatar click)
│   ├── Profiel.jsx/css               # "Over mij" personal info (overlay)
│   ├── Zorgcategorieen.jsx/css       # Care category toggles (overlay)
│   ├── HelpInfo.jsx/css              # Help & info page (overlay)
│   ├── Sjablonen.jsx/css             # Templates management (overlay)
│   ├── Notificaties.jsx/css          # Notifications & to-do items (overlay)
│   ├── NotificatieInstellingen.jsx/css # Notification settings (overlay)
│   └── Tour.jsx/css                  # Onboarding walkthrough
└── data/
    └── dummyData.js                  # ALL centralized dummy data
```

## Key Conventions

- **Icons** — All shared icons live in `shared/components/Icons.jsx` (imported via `@shared/components/Icons`) as named exports (~39 icons). Only truly page-specific icons that are used in a single file stay local (e.g. ArrowRightSmall, NoteIcon, CareTypeIcon in Home). All SVGs use `currentColor`. Source SVGs are in the `Iconen/` folder outside the app. When converting Figma SVGs to JSX: `fill-rule` -> `fillRule`, `clip-rule` -> `clipRule`, hardcoded `fill="#3F2561"` -> `fill="currentColor"`. Keep all sub-paths intact. Use the `/icon-import` skill to automate SVG -> JSX conversion.
- **Data** — All dummy data is centralized in `data/dummyData.js`. Pages import what they need. `zorgCategorieenInstellingen` is shared between Zorgcategorieen.jsx and NieuweAfspraak.jsx.
- **Route constants** — All page and sub-page identifiers are in `constants/routes.js`. Use `PAGES.HOME` instead of `'home'`, `SUB_PAGES.ZOEKEN` instead of `'zoeken'`, etc.
- **CSS naming** — BEM: `.block__element--modifier`. Short prefixes for long page names (e.g. `.pi__` for ProfielInstellingen, `.zorgcat__` for Zorgcategorieen, `.zvp__` for ZorgverlenerProfiel).
- **Tab components** — Admin tabs are separate files that rely on Admin.css being loaded by Admin.jsx.
- **Sub-page header pattern** — Flexbox with `align-items: flex-end`, `gap: var(--space-3)`, height 80px. 40px circular back button. Title with `line-height: 40px`.
- **Aria** — Interactive elements have `aria-label` attributes in Dutch.
- **Unimplemented features** — Use `onClick={() => alert('Feature name (nog niet geimplementeerd)')}` as placeholder.
- **PasswordGate** — Demo password gate wraps the app (sessionStorage-based, password: `demo2026`).

## Design System (index.css)

Identical to carepool-app. See the shared design system documentation in the parent `CLAUDE.md`.

### Key Tokens

- **Spacing**: 8px grid, `--space-1` (4px) through `--space-20` (80px). Side margins: `--space-5` (20px).
- **Colors**: `--color-cta` (#6100FF), `--color-text-primary` (#0A0A0A), `--color-text-secondary` (#3F2561), `--color-surface-secondary` (#F4F0FE).
- **Typography**: Mulish 400-900. `--font-size-xs` (12px) through `--font-size-2xl` (32px).
- **Radius**: `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-xl` (20px), `--radius-full` (9999px).
- **Button heights**: 40px (primary CTAs), 32px (secondary/icon buttons).

## Known Pitfalls

- **Scroll container** — `.app-shell` has `overflow: hidden`; all page scrolling happens inside `.app-content` (`overflow-y: auto`).
- **Vite module cache** — After renaming or restructuring exports in `dummyData.js`, restart the dev server.
- **Bottom nav overlap** — Non-overlay pages render below BottomNav (~71px). Pages with bottom action buttons need sufficient bottom padding.
- **Sister app divergence** — This project started as a copy of carepool-app. Changes made in one app are NOT automatically reflected in the other. Keep track of which changes are app-specific vs. shared patterns.

## Figma & Assets

Design files at the project root (`../` relative to carepool-zorgverlener/):
- `Figma ontwerpen app/` — Page mockups (PNG)
- `Styles/Colors.pdf`, `Styles/Text.pdf` — Color and typography definitions
- `Iconen/` — SVG icon exports organized by page
- `Illustrations/` — SVG illustrations
