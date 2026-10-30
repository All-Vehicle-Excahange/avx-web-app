# Reecomm Vehicle Search & Filter State Management Guidelines

## 1. Backend Filter Payload Contract
- When sending vehicle filter requests to `/vehicle/filter/sections` or `/consultation/filter/based-on-vehicles-filter`:
  - ALWAYS use `makerIds: number[]` (array of numbers).
  - NEVER pass `makerId` (singular) in the POST body; doing so causes a 500 Internal Server Error in Spring Boot.
  - Selected models must be formatted as `modelIds: number[]`.
  - Filter empty or non-numeric entries before dispatching.

## 2. Brand & Model Hierarchy & State Synchronization
- Reecomm's SEO URL routes (`generateSeoSlug`), H1 headers, schemas, and landing pages reflect a single brand and model context (`buy-used-[brand]-[model]-cars`).
- When a user transitions from a global search landing page and selects a new brand or model from the sidebar:
  - Clear/replace previous global-search brand and model filters.
  - When switching parent brands, clear previous model selections that belonged to the former brand.
  - When selecting a brand, preselect the brand and its applicable models.
  - When selecting a specific model, set its parent brand as the active brand and ensure only relevant models remain selected.

## 3. Pagination & Vehicle Deduplication Invariant
- Whenever any search filter (brand, model, price, location, fuel, etc.) is modified:
  - Reset `currentPage` to 1 immediately.
  - Reset accumulated vehicles so stale results do not persist during fetching.
- When appending vehicles from pagination/Load More (`currentPage > 1`):
  - Always deduplicate incoming vehicles by `vehicle.id` against already accumulated vehicles before appending.
  - Ensure `topPicksPageResponse.currentPage` matches `currentPage` before appending to avoid race conditions.

## 4. URL & UI Synchronization
- Keep the browser URL (via `replaceState`), filter count badges, active filter chips, selected checkboxes, and result counts synchronized in a single cohesive state lifecycle.

