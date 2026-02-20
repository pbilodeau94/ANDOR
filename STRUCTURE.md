# ANDOR Website Structure

Next.js 15 (App Router) + Tailwind CSS, deployed on Vercel.

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage — hero with ANDOR logo, research program cards, mission, stats, support CTA |
| `/research` | `app/research/page.tsx` | Disease-tabbed view of research groups with publication cards |
| `/team` | `app/team/page.tsx` | Team roster (12 members across 4 role groups with photos) |
| `/support` | `app/support/page.tsx` | Philanthropic support / giving page |
| `/portal` | `app/portal/page.tsx` | Portal dashboard (internal) |
| `/portal/grants` | `app/portal/grants/page.tsx` | Grants tracker — table/board views, MGB deadline calculator, notifications |
| `/portal/projects` | `app/portal/projects/page.tsx` | Research projects tracker — 69 projects, table/board views |
| `/portal/agreements` | `app/portal/agreements/page.tsx` | DUA/MTA tracker — 7 agreements |
| `/portal/documents` | `app/portal/documents/page.tsx` | Shared documents |

### Portal layout

`app/portal/layout.tsx` wraps all `/portal/*` pages with `PortalTabs` navigation.

---

## Components

### Shared

| File | Description |
|------|-------------|
| `Hero.tsx` | Gradient hero banner with optional ANDOR logo (`showLogo` prop) |
| `Logo.tsx` | SVG ANDOR logo (neural network motif + text) |
| `Navbar.tsx` | Top navigation bar |
| `Footer.tsx` | Site footer |
| `SectionWrapper.tsx` | Consistent section padding/max-width wrapper, optional `alt` bg |
| `StatsBar.tsx` | Horizontal stats display (value + label pairs) |
| `DiseaseTabs.tsx` | Reusable horizontal tab bar for 6 disease groups + "All" |
| `PublicationCard.tsx` | Publication card with journal badge, year, authors, DOI link |
| `ResearchGroupCard.tsx` | Research group summary card (used on homepage) |
| `TeamCard.tsx` | Team member card with photo/initials fallback |
| `DeadlineCard.tsx` | Upcoming deadline display card |
| `GrantRow.tsx` | Grant row component |

### Portal-specific (`components/portal/`)

| File | Description |
|------|-------------|
| `PortalTabs.tsx` | Portal section navigation (Dashboard, Grants, Projects, Agreements, Documents) |
| `ViewToggle.tsx` | Table/Board view switcher |
| `BoardView.tsx` | Kanban-style board layout with status columns |
| `GrantCard.tsx` | Grant card for board view |
| `ProjectCard.tsx` | Project card for board view |

---

## Data

| File | Records | Description |
|------|---------|-------------|
| `team.ts` | 12 | Team members — 4 leadership, 3 faculty, 3 fellows, 2 staff |
| `research-groups.ts` | 6 | MOGAD, NMOSD, Autoimmune Encephalitis, Neurosarcoidosis, CNS Vasculitis, Translational Neuroimmunology |
| `projects.ts` | 69 | Research projects with lead, PI, diseases, stage, research type |
| `grants.ts` | 16 | Grant applications with PI, agency, mechanism, amount, deadline, status |
| `agreements.ts` | 7 | DUA/MTA agreements with partner, type, direction, status |
| `publications.ts` | 0 | Publication entries (type defined, awaiting real data) |
| `documents.ts` | — | Shared document references |

### Utilities

| File | Description |
|------|-------------|
| `disease-utils.ts` | Shared disease mapping (`diseaseMap`), `matchesDisease()`, `filterByDisease()` — maps research group names to disease strings used across projects/grants/agreements |
| `cross-links.ts` | `getRelatedProjects()`, `getRelatedGrants()`, `getRelatedAgreements()` — finds related items by shared disease areas |
| `deadline-calculator.ts` | MGB proposal timeline calculator — computes 8 internal milestones from sponsor deadline using business days (excludes weekends + MGB holidays 2025-2027) |

---

## Disease Groups & Mapping

6 research programs, each mapped to disease strings found in project/grant/agreement data:

| Research Group | Disease Keys | Icon |
|---------------|-------------|------|
| MOGAD | MOGAD | `🧬` |
| NMOSD | NMOSD | `🔬` |
| Autoimmune Encephalitis | Autoimmune Encephalitis, Encephalitis | `🧠` |
| Neurosarcoidosis | Neurosarcoidosis, Sarcoidosis | `🫁` |
| CNS Vasculitis | Vasculitis | `🩸` |
| Translational Neuroimmunology | MS | `⚗️` |

`DiseaseTabs` component is used on: `/research`, `/portal/grants`, `/portal/projects`, `/portal/agreements`.

---

## MGB Deadline Calculator

Milestones computed from sponsor deadline (business days exclude weekends + MGB holidays):

| Milestone | Timing | Owner |
|-----------|--------|-------|
| Notify Grants Admin | 8 weeks before | PI |
| Budget meeting & tasks | 6 weeks before | PI + Admin |
| Finalize budget | 4 weeks before | PI + Admin |
| Subcontractor docs due | 18 business days | PI |
| Internal admin docs to GA | 14 business days | PI + Admin |
| Admin component to Research Mgmt | 8 business days | Admin |
| Internal science docs to GA | 5 business days | PI + Admin |
| Science component to Research Mgmt | 3 business days | Admin |

Urgency levels: overdue (red), urgent <3 days (orange), soon <2 weeks (amber), on track (green), future (gray).

Grants tracker shows: alerts banner, next-milestone badges in table, full timeline in expanded rows.

---

## Cross-Linking

Expanded rows on portal pages show related items by shared disease areas:

- **Grants** expanded row shows: related projects, related agreements
- **Projects** expanded row shows: related grants, related agreements
- **Agreements** expanded row shows: related projects, related grants

Up to 5 items shown as badges with `+N more` overflow.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Language**: TypeScript
- **Deployment**: Vercel
- **Data**: Static TypeScript arrays (no database/CMS)
