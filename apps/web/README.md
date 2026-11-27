# Klados web app (Phase 1, design screens)

SvelteKit (Svelte 5, TypeScript) web app for the Phase 1 MVP. Phase 1 is web-first; the Tauri
offline client comes in Phase 2. The backend (ElysiaJS on Bun, SurrealDB) is not part of this app
yet: these are **UI-only design screens** driven by clearly labelled sample fixtures.

## Screens

| Route                               | Screen                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `/`                                 | Learner home: the goal the learner picked, what's next, mastery map, optional study circle |
| `/goal`                             | Pick or change your own goal (or write one)                                                |
| `/learn/[concept]/diagnose`         | Core loop 1: diagnose                                                                      |
| `/learn/[concept]/practise`         | Core loop 2: practise, with the provisional 90% practice bar                               |
| `/learn/[concept]/provisional-pass` | Core loop 3: provisional pass                                                              |
| `/learn/[concept]/retention-check`  | Core loop 4: 7-day retention check                                                         |
| `/learn/[concept]/unlock`           | Core loop 5: what opens next                                                               |
| `/review`                           | Peer and mentor reviews, Security Circle (vouching), credentials                           |
| `/profile`                          | Levels, and optional teaching and contributing above level 3                               |

The walkthrough content is written for `recursion`; other concepts show the same five steps.

## Run

```sh
cd apps/web
npm install
npm run dev        # http://localhost:5173
npm run check      # svelte-check
npm run lint       # prettier + eslint
npm test           # vitest (domain rules)
npm run build      # static build into build/
```

## Where things live

- `src/lib/site.ts`: the product name (`PRODUCT_NAME`). A rename is one line here.
- `src/lib/brand.ts`: logo files, imported straight from `../../assets/brand/` (no copies). Ink on
  light, inverse on dark, per `docs/brand/BRAND.md`.
- `src/lib/domain/`: types and rules (loop stages, provisional bar, 7-day check, levels, Security
  Circle gate). Tested in `mastery.spec.ts`.
- `src/lib/fixtures/`: **sample content only**. Every screen that renders it shows a "Sample
  content" notice.
- `src/app.css`: brand colour tokens, light and dark.

## Phase 1 rules these screens follow

- No gamification: no points, XP, streaks, badges, leaderboards or rank language.
- 90% is a **provisional** practice bar, labelled as such everywhere. There is no credential
  threshold in the code: the credential cut is set after the pilot.
- Security Circles only gate reviewing and credentials. Learning is never gated.
- Study circles and teaching or contributing are optional.
