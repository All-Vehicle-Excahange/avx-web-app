# GSC Indexing Triage (Reecomm)

How to read GSC “not indexed” reasons. Do **not** remove all `noindex`.

## Bucket summary

| Reason | Typical cause on Reecomm | Action |
|--------|-------------------------|--------|
| Excluded by `noindex` | Non-hub `/search/…` with **0 listings** (`MIN_INDEXABLE_LISTINGS = 1`) | **KEEP** |
| Alternate page with proper canonical | Alias, `?query`, old slug, redirect target | **KEEP** if 301/canonical correct |
| Crawled – currently not indexed | Thin / exotic / low-demand landings Google skips | **PRUNE** from sitemap or ignore; push only money pages |

## Sample classification

### KEEP — intentional noindex (empty)

| URL | Why |
|-----|-----|
| `/search/buy-used-aston-martin-cars-karnataka` | 0 listings → `noindex,follow` (verified live) |
| `/search/buy-used-opel-cars-maharashtra` | Empty brand×state |
| `/search/buy-used-byd-cars-west-bengal` | Empty / thin |
| `/seo-dashboard` | Internal tool |

### KEEP — intentional alternate canonical

| URL pattern | Canonical / redirect |
|-------------|----------------------|
| `/search?cityName=…` | 301 / slug landing |
| `/how-it-works` | → `/reecomm-works` |
| `/compare`, `/refund-policy` | → search / terms |
| Digit storefront usernames | → clean `/auto-consultant/{username}` |
| Creta alias slugs | → `buy-used-hyundai-creta-cars…` |

### FIX — investigate if they appear under noindex

Stocked focus GEO must stay **indexable** (`noindex: false`):

| URL | Live check |
|-----|------------|
| `/search/buy-used-hyundai-creta-cars-palanpur` | Indexed OK (`noindex: false`, listings present) |
| `/search/buy-used-cars-palanpur` | Should stay indexable when stock exists |
| `/search/buy-used-maruti-suzuki-ertiga-cars-visnagar` | Inventory-backed |
| `/auto-consultant/aabadmotors` | Storefront |

If any stocked focus URL shows **Excluded by noindex**, treat as a bug (SSR `totalCount`).

### PRUNE — sitemap / crawl budget (crawled not indexed)

Do not mass-request indexing:

- `/search/buy-used-petrol-two-wheelers`
- `/search/buy-used-sports-bikes-two-wheelers`
- `/search/buy-used-commuter-bikes-two-wheelers`
- Luxury brand × random state/city with no inventory strategy
- Tiny towns with no Gujarat focus / no stock

## Code guardrails

- Keep `MIN_INDEXABLE_LISTINGS = 1` and hub exception in [`src/pages/search/[slug].jsx`](../src/pages/search/[slug].jsx)
- Sitemap allowlist: `public/seo_sitemap_slugs.json` (from search-index cron) + pruned geo-brands grid
- One canonical winner: page-level Head; `_app` skips paths that set their own

## Money pages — Request indexing (GSC URL Inspection)

After deploy, request indexing for:

1. `https://www.reecomm.com/search/buy-used-hyundai-creta-cars-palanpur`
2. `https://www.reecomm.com/search/buy-used-cars-palanpur`
3. `https://www.reecomm.com/search/buy-used-cars-siddhpur`
4. `https://www.reecomm.com/search/buy-used-cars-kanodar`
5. `https://www.reecomm.com/search/buy-used-cars-visnagar`
6. `https://www.reecomm.com/search/buy-used-maruti-suzuki-ertiga-cars-visnagar`
7. `https://www.reecomm.com/search/buy-used-hyundai-santro-xing-cars-siddhpur`
8. `https://www.reecomm.com/search/buy-used-cars-ahmedabad`
9. `https://www.reecomm.com/auto-consultant/aabadmotors`
10. Plus current `public/seo_popular_links.json` entries

Do **not** request indexing for the full 1,000 “crawled not indexed” list.
