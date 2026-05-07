# TV Shows Dashboard

A Vue 3 + TypeScript single-page application that browses TV shows from the [TVMaze API](https://www.tvmaze.com/api), grouped by genre and sorted by rating, with show details and search.

## Stack

- **Vue 3** (`<script setup>`, Composition API) — required by ABN AMRO.
- **TypeScript** — type-safe API contracts and component props.
- **Vite** — dev server and build.
- **Vue Router** — client-side routing.
- **TanStack Vue Query** — server-state caching, request deduplication, abort-on-unmount, automatic refetch.
- **DOMPurify** — sanitizes HTML summaries from TVMaze before rendering.
- **Vitest** — unit tests for pure utilities.
- **ESLint + Prettier** — linting and formatting.

## Requirements

- **Node.js** ≥ 20
- **npm** ≥ 10

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm test         # run unit tests
npm run lint     # run ESLint
```

## Architecture
```
src/
├── components/ # Presentational, reusable UI
│ ├── common/ # Cross-cutting (AppHeader)
│ └── show/ # Show-specific (ShowCard, ShowsRow)
├── pages/ # Route-level views
├── modules/
│ ├── api/ # TVMaze API calls (raw → normalized)
│ ├── composables/ # Vue Query wrappers (useShows, useShow, useSearchShows)
│ └── types/ # Shared TypeScript types
├── services/ # Generic infrastructure (httpService)
├── utils/ # Pure helpers (grouping, sorting, sanitization)
├── tests/ # Unit tests
├── router/ # Route definitions
└── style.css # Global styles and CSS variables
```

## Testing

Unit tests cover the pure utility layer (`normalizeShow`, `groupShowsByGenre`, `sortShowsByRating`, `groupAndSortShows`) including edge cases: missing optional fields, multi-genre shows, null ratings, alphabetical genre order, and input-mutation guarantees. The Vue Query layer is intentionally not retested — it's well-covered upstream.

## Trade-offs and decisions

- **Pagination.** TVMaze's `/shows` endpoint is paginated; only page 0 is loaded. A `useInfiniteQuery` would surface the full catalog. 
- **Component-level tests.** Page-level integration tests with a mocked `QueryClient` would lock in render behavior.
- **Filtration.** TVMaze's `/shows` endpoint does not support filters. Due to this limitation creating `Genre` page is ommited.