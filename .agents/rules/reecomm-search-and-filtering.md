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

## 5. Two-Wheeler vs Four-Wheeler Strict Isolation & Dual-Maker IDs
- **Strict Isolation Invariant**:
  - NEVER alter four-wheeler search logic, maker mappings (e.g., Honda `14`, BMW `5`, Mahindra `20`), model shortcuts, or `-cars` SEO slugs when implementing two-wheeler enhancements.
  - Four-wheelers and two-wheelers must maintain dedicated namespaces and parameter types:
    - Four-Wheelers: `vehicleType: "FOUR_WHEELER"`, URL suffix: `-cars`, Maker IDs: Honda (`14`), BMW (`5`), Mahindra (`20`), etc.
    - Two-Wheelers: `vehicleType: "TWO_WHEELER"`, URL suffix: `-two-wheelers`, Maker IDs: Honda (`15011`), BMW (`15004`), Mahindra (`15016`), Suzuki (`15020`), etc.
- **Two-Wheeler Brand & Model Intent**:
  - Pure two-wheeler brands (Hero, Hero Electric, KTM, TVS, Bajaj, Royal Enfield, Yamaha, Ather, OLA, Kawasaki, Harley-Davidson, Ducati, Triumph, Aprilia, Vespa, Jawa, Yezdi, Benelli) must ALWAYS resolve `isTwoWheeler: true`, route to `buy-used-[brand]-two-wheelers`, display "Used [Brand] Bikes" in suggestions (NEVER "Cars"), display bike icons, and preselect the brand under two-wheelers.
  - Two-wheeler model queries across all brands (e.g., Activa, Shine, Dio, Unicorn, Access, Burgman, Gixxer, Splendor, HF Deluxe, Passion, Glamour, Pulsar, Platina, Avenger, Jupiter, Apache, Ntorq, Raider, Classic 350, Bullet, Hunter, Meteor, Himalayan, R15, MT 15, FZ, Duke, RC, 450X, S1 Pro, etc.) must ALWAYS resolve `isTwoWheeler: true`, route to `buy-used-[brand]-[model]-two-wheelers`, and use the two-wheeler maker ID.
  - Any attempt to route a known two-wheeler brand or model to a `-cars` URL must be caught and 301-redirected to the canonical `-two-wheelers` URL.
  - Four-wheeler brands (Maruti Suzuki, Hyundai, Tata, Honda Cars, Toyota, Kia, etc.) and models (Creta, Swift, City, etc.) must remain 100% untouched with `isTwoWheeler: false` and `-cars` URLs.


