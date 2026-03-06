# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Carepool is a Dutch care/healthcare coordination app built as a mobile-first web application (393x852 viewport, 393px max-width shell). All UI text, aria-labels, and dummy data are in Dutch (lang="nl").

Deployed on Netlify via GitHub (`Carepool-demo/carepool-app`). Pushes to `main` trigger auto-deploy.

## Commands

All commands run from the `carepool-app/` directory:

- `npm run dev` — Start Vite dev server on port 5173
- `npm run build` — Production build to dist/
- `npm run lint` — ESLint (flat config with React Hooks plugin; `no-unused-vars` ignores uppercase identifiers)
- `npm run preview` — Preview production build

Dev server is configured in `.claude/launch.json` as `carepool-dev`.

## Architecture

React 19 + Vite 7, plain JavaScript (no TypeScript, no routing library, no state management library). Vanilla CSS with design tokens via CSS custom properties in `index.css`.

### Page Routing

`App.jsx` renders pages based on `activePage` state. BottomNav triggers changes via `onTabChange`. The shell adds a dynamic class `app-shell--${activePage}` for page-specific styling of shared components (TopBar, BottomNav).

Page and sub-page route identifiers are centralized in `constants/routes.js` as `PAGES`, `SUB_PAGES`, and `OVERLAY_PAGES`. All navigation code imports from this file instead of using string literals.

Overlay pages (listed in `OVERLAY_PAGES`) hide the BottomNav and render full-screen. Navigation flow: avatar click → `profielInstellingen` → `profiel` (Over mij), `zorgcategorieen`, `helpInfo`, `sjablonen`, `notificatieInstellingen`, or `notificaties`. Back buttons return to `profielInstellingen`, which itself returns to the `previousPage`.

Cross-page navigation: `App.jsx` exposes `handleNavigate(page, subPage, extra)` passed as `onNavigate` to pages that need to deep-link into another page's sub-page (e.g. Home linking directly to Carepool > MijnConnecties, or Agenda linking to Admin > Overzichten with a specific month via `extra`).

BottomNav hiding: Overlay pages always hide the nav. Carepool and Home sub-pages also hide it via `onSubPageChange` callbacks that report the current sub-page to App.jsx, which sets `hideNavForCarepoolSub` / `hideNavForHomeSub` when the sub-page is non-null.

### Page Component Tree

```
App.jsx (wrapped in PasswordGate)
├── Home.jsx                → onNavigate(page, subPage) for deep-links, sub-page router
│   └── NodigUit.jsx        → onBack
├── Carepool.jsx            → sub-page router (initialSubPage prop)
│   ├── MijnConnecties.jsx  → onBack, onOpenBeschikbaarheid, onInvite
│   ├── NodigUit.jsx        → onBack (also reachable from Home)
│   ├── Beschikbaarheid.jsx → onBack
│   ├── Zoeken.jsx          → onBack, onSelectResult
│   └── ZorgverlenerProfiel.jsx → onBack, zorgverlener prop, internal CV sub-view
├── Agenda.jsx              → sub-page router (initialSubPage prop)
│   └── NieuweAfspraak.jsx  → onBack, multi-step (select → form → pickCategory / editDurations)
├── Berichten.jsx           → internal tab state (chats/verzoeken)
├── Admin.jsx               → tab router + sub-page router (initialTab, initialMonth props)
│   ├── ZorglogsTab.jsx     → no own CSS (uses Admin.css)
│   ├── OverzichtenTab.jsx  → no own CSS (uses Admin.css), accepts initialMonth
│   ├── TarievenTab.jsx     → no own CSS (uses Admin.css)
│   ├── SvbDeclaratie.jsx   → separate CSS, onBack callback
│   └── BudgetOverzicht.jsx → separate CSS, onBack callback
│       └── BudgetDetail.jsx → separate CSS, onBack callback
├── ProfielInstellingen.jsx → overlay, settings hub (avatar click)
├── Profiel.jsx             → overlay, "Over mij" personal info
├── Zorgcategorieen.jsx     → overlay, toggle-based care category selection
├── HelpInfo.jsx            → overlay, help & info page
├── Sjablonen.jsx           → overlay, care templates management
├── Notificaties.jsx        → overlay, notifications & to-do items
├── NotificatieInstellingen.jsx → overlay, notification settings
└── Tour.jsx                → onboarding walkthrough (standalone)
```

### Sub-page Navigation

Pages with sub-pages use internal `useState`. The parent conditionally renders sub-page components and passes `onBack` callbacks.

```jsx
// Carepool.jsx
import { PAGES, SUB_PAGES } from '../constants/routes'
const [subPage, setSubPage] = useState(initialSubPage)
if (subPage === SUB_PAGES.BESCHIKBAARHEID) return <Beschikbaarheid onBack={() => setSubPage(SUB_PAGES.MIJN_CONNECTIES)} />
if (subPage === SUB_PAGES.ZOEKEN) return <Zoeken onBack={() => setSubPage(null)} onSelectResult={...} />
```

Admin.jsx uses a similar pattern for its tabs (zorglogs/overzichten/tarieven) and sub-page (SvbDeclaratie). Berichten.jsx uses internal tab state for chats/verzoeken but has no sub-pages.

### Multi-step Form Pattern (NieuweAfspraak)

NieuweAfspraak uses a `step` state with 4 values for its internal flow:
- `'select'` — Template picker (choose "Nieuw" or a care template)
- `'form'` — Main appointment form (title, date, start/end time, categories, address, note)
- `'pickCategory'` — Multi-select overlay: shows enabled categories from `zorgCategorieenInstellingen`
- `'editDurations'` — Duration editor: adjust per-category time allocation

Back navigation: `pickCategory`/`editDurations` → `form` → `select` → `onBack()`. The form uses start+end time as primary input, with category durations distributed from the time range. A mismatch warning appears when category totals don't match the time range (useful for bereikbaarheidsdiensten where availability window differs from actual care time).

### Sub-page Header Pattern

Sub-pages with a back button use a consistent header:
- Flexbox with `align-items: flex-end`, `gap: var(--space-3)`, height 80px
- 40px circular back button with `border-radius: var(--radius-full)` and hover state
- Title with `line-height: 40px` to vertically align with the back button

TopBar (shared component used by main pages) also uses 80px height.

### Agenda Sticky Header Layout

The Agenda sticky header is exactly 234px, split into 3 fixed blocks (all `box-sizing: border-box`):
- **Header block** (80px) — Month title, week label, Vandaag button, Pin
- **Day selector block** (70px, 8px padding top/bottom) — Week arrows + 7 day buttons
- **Sub-header block** (52px, 4px padding top/bottom) — Shows "Selecteren" (default), "Bekijk het overzicht" (past weeks), or a toast notification (after actions like +Zorglog)

Toast: 44px height, 8px border-radius, auto-dismisses after 4 seconds with timer cleanup via `useRef`.

### Page-specific Shared Component Styling

When a page needs to restyle TopBar or BottomNav (which live outside the page component), use the `app-shell--${activePage}` class:
```css
.app-shell--carepool .bottom-nav { background: var(--color-surface-secondary); }
```

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
│   ├── BottomNav.jsx/css             # 5-tab nav, 16px side padding
│   ├── ConnectionRow.jsx/css         # Reusable connection row (name, initials, tags)
│   ├── ErrorBoundary.jsx             # React error boundary (class component)
│   ├── PasswordGate.jsx/css          # Demo password gate (sessionStorage, password: demo2026)
│   ├── ZorgverlenerSelector.jsx/css  # Caregiver dropdown (used in Admin tabs)
│   └── MonthRow.jsx/css              # Month picker + download (used in Admin tabs)
├── pages/
│   ├── Home.jsx/css                  # Landing + sub-page router
│   ├── NodigUit.jsx/css              # Invite page (sub-page of Home and Carepool)
│   ├── Carepool.jsx/css              # Landing + sub-page router
│   ├── MijnConnecties.jsx/css        # Connections list (sub-page of Carepool)
│   ├── Beschikbaarheid.jsx/css       # Weekly availability grid + overlay (sub-page)
│   ├── Zoeken.jsx/css                # Search zorgverleners (sub-page of Carepool)
│   ├── ZorgverlenerProfiel.jsx/css   # Zorgverlener detail profile + CV (sub-page of Carepool)
│   ├── Agenda.jsx/css                # Calendar week view + sub-page router
│   ├── NieuweAfspraak.jsx/css        # New appointment flow (sub-page of Agenda)
│   ├── Berichten.jsx/css             # Messages page with Chats/Verzoeken tabs
│   ├── Admin.jsx/css                 # Admin shell with 3 tab components
│   ├── ZorglogsTab.jsx               # Care log entries
│   ├── OverzichtenTab.jsx            # Monthly summaries
│   ├── TarievenTab.jsx               # Rate cards
│   ├── SvbDeclaratie.jsx/css         # SVB declaration (sub-page of Admin)
│   ├── BudgetOverzicht.jsx/css      # Budget overview (sub-page of Admin)
│   ├── BudgetDetail.jsx/css         # Budget detail (sub-page of BudgetOverzicht)
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

- **Icons (two-tier system)** — Shared icons live in `components/Icons.jsx` as named exports (BackArrow, Chevron, Download, Edit, Undo, Plus, Info, Link, Alert, Message, Calendar, SmallCare, LogIcon, CareIcon). Page-specific icons stay local in the page file (e.g. MegaphoneIcon in Carepool, PeopleIcon in Agenda, GroupIcon in Berichten, 11 menu icons in ProfielInstellingen, contact/care icons in Profiel, 15+ icons in ZorgverlenerProfiel). All SVGs use `currentColor`. Source SVGs are in the `Iconen/` folder outside the app. When converting Figma SVGs to JSX: `fill-rule` → `fillRule`, `clip-rule` → `clipRule`, hardcoded `fill="#3F2561"` → `fill="currentColor"`. Keep all sub-paths intact (truncated paths cause solid blob rendering due to missing winding rules).
- **Data** — All dummy data is centralized in `data/dummyData.js`. Pages import what they need. `zorgCategorieenInstellingen` is shared between Zorgcategorieen.jsx (toggle settings) and NieuweAfspraak.jsx (category picker reads enabled items).
- **Route constants** — All page and sub-page identifiers are in `constants/routes.js`. Use `PAGES.HOME` instead of `'home'`, `SUB_PAGES.ZOEKEN` instead of `'zoeken'`, etc. When adding a new page, add its identifier to the appropriate object and update `OVERLAY_PAGES` if it hides the BottomNav.
- **Connection schema** — Unified across pages: `{ id, name, initials, tags: string[], warning?, messages? }`. Always use `initials` (not `avatar`), and `tags` is always an array (never undefined). Rendered via `ConnectionRow` component.
- **CSS naming** — BEM: `.block__element--modifier`. Short prefixes for long page names (e.g. `.pi__` for ProfielInstellingen, `.zorgcat__` for Zorgcategorieen, `.zvp__` for ZorgverlenerProfiel). Root modifier classes (e.g. `.zvp--cv`) override styles for sub-views within the same page.
- **Tab components** — Admin tabs are separate files that rely on Admin.css being loaded by Admin.jsx. Berichten uses inline tab state within the same component file.
- **Aria** — Interactive elements have `aria-label` attributes in Dutch.
- **Horizontal scroll** — Break out of section padding with `margin: 0 calc(-1 * var(--space-5))` and matching inner padding.
- **Unimplemented features** — Use `onClick={() => alert('Feature name (nog niet geïmplementeerd)')}` as placeholder.
- **Caregiver data consistency** — All caregiver names must come from the `mijnConnecties` array in `dummyData.js`. No other caregivers exist. The same 5 people appear in Beschikbaarheid (`caregiversData`), Agenda appointments, Home appointments, and Berichten.
- **Native date picker** — Agenda uses a hidden `<input type="date">` with `showPicker()` API for day selection. On iOS Safari this renders the native iOS calendar picker automatically.

## Design System (index.css)

### Spacing (8px Grid)

`--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (20px), `--space-6` (24px), `--space-8` (32px), `--space-10` (40px), `--space-12` (48px), `--space-16` (64px), `--space-20` (80px). Side margins are consistently `--space-5` (20px).

### Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-cta` | #6100FF | Buttons, links, interactive |
| `--color-hover` | #3600AA | Hover states |
| `--color-pressed` | #200066 | Hero greeting text |
| `--color-surface` | #FFFFFF | Primary background |
| `--color-surface-secondary` | #F4F0FE | Card/element backgrounds |
| `--color-border` | #DAD4EC | Dividers |
| `--color-focus` | #D9CCF5 | Avatar backgrounds |
| `--color-focus-medium` | #EAE1FD | Clickable items |
| `--color-focus-light` | #F0EAFF | Tag backgrounds, active pills |
| `--color-notification` | #D3008B | Notification badges |
| `--color-notification-surface` | #FBE6F3 | Notification backgrounds |
| `--color-success` | #00FFC2 | Success indicators |
| `--color-success-surface` | #CFFFF8 | Success backgrounds |
| `--color-pale-pink` | #FFE9D9 | Walkthrough, profiel |
| `--color-text-primary` | #0A0A0A | Main text |
| `--color-text-secondary` | #3F2561 | Supporting text, icons |
| `--color-text-tertiary` | #757575 | Meta info |

### Typography

Mulish font (weights 400-900). Key sizes: `--font-size-xs` (12px), `--font-size-sm` (14px), `--font-size-base` (16px), `--font-size-lg` (18px), `--font-size-xl` (24px), `--font-size-2xl` (32px).

Figma name mapping (from `Styles/Text.pdf`):

| Figma Name | CSS Size | Weight |
|------------|----------|--------|
| Heading L | `--font-size-xl` (24px) | 700 |
| Heading S | `--font-size-lg` (18px) | 700 |
| Text M | `--font-size-base` (16px) | 400 |
| Text S | `--font-size-sm` (14px) | 400 |
| Text XS | `--font-size-xs` (12px) | 400 |

### Button Heights

Two standard button heights, enforced with explicit `height` + `padding: 0 Xpx`:

| Height | Type | Examples |
|--------|------|----------|
| **40px** | Primary CTAs, full-width actions, back buttons | `.carepool__cta-btn`, `.mijn-connecties__cta`, `.nodig-uit__action-btn`, `.sja__save-btn`, `.pw-gate__btn`, `.error-boundary__btn` |
| **32px** | Secondary buttons, icon buttons, filters, text links | `.home__add-btn`, `.home__search-btn`, `.agenda__vandaag-btn`, `.agenda__action-btn`, `.tarieven__add-btn`, `.zorglogs__edit-btn`, `.sja__day-btn`, `.beschikbaarheid__hour` |

Back buttons in sub-page headers are 40x40 circles (part of the 80px header pattern). Navigation arrows (`.beschikbaarheid__nav-arrow`, `.beschikbaarheid-overlay__nav`, `.beschikbaarheid-overlay__close`) are 32x32 squares.

### Border Radius

`--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-xl` (20px), `--radius-full` (9999px).

### Shadows

`--shadow-sm`, `--shadow-md`, `--shadow-lg` — progressive elevation (2px → 8px → 16px blur).

## Known Pitfalls

- **Scroll container** — `.app-shell` has `overflow: hidden`; all page scrolling happens inside `.app-content` (`overflow-y: auto`). New pages must ensure content scrolls within this container, not the body.
- **Vite module cache** — After renaming or restructuring exports in `dummyData.js`, Vite's HMR cache can become stale. Restart the dev server if components show old data or import errors.
- **Bottom nav overlap** — Non-overlay pages render below BottomNav (~71px with padding). Pages with action buttons at the bottom need sufficient bottom padding (e.g. `--space-16` or more) to avoid being hidden behind the nav.

## Figma & Assets

Design files at the project root (`../` relative to carepool-app/):
- `Figma ontwerpen app/` — Page mockups (PNG)
- `Styles/Colors.pdf`, `Styles/Text.pdf` — Color and typography definitions
- `Iconen/` — SVG icon exports organized by page (e.g. `Iconen/Mijn Carepool/alert-02.svg`)
- `Illustrations/` — SVG illustrations (e.g. `Illustrations/Mijn Carepool/Illustration.svg`)
