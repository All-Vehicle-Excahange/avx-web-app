# AdSense low-value content — fix & review checklist

AdSense rejected `reecomm.com` for **site-level “Low value content”** (not a broken `ads.txt` / ownership issue). The rejection expects **substantial unique value**, **ongoing curation**, and **genuine user interest**.

This doc is the post-fix checklist. Do **not** Request review until deploy + spot-checks below are done.

## Why it failed (short)

| Factor | What Google saw |
|--------|-----------------|
| Scaled search landings | Many `/search/buy-used-…` URLs with similar template intro/FAQ |
| Weak monetization bar | Ads could appear on thin stocked pages (1+ listings) |
| Thin supporting guides | Short GEO blog stubs linked from landings |
| Interest signal | GSC clicks concentrated on brand/consultant names; GEO hubs weak |

SEO thin crawl made it worse, but the flag is **AdSense inventory-value / thin-content policy**, not “one meta tag wrong.”

## What engineering changed

| Area | Behavior |
|------|----------|
| Search ads | Only if `!noindex` **and** `totalCount >= MIN_ADSENSE_LISTINGS` (**5**) |
| Search index `/search` | Redirects to hubs; `adsEnabled={false}` if ever rendered |
| `SearchWithCard` | Default `adsEnabled={false}` |
| Loader prefixes | `/`, `/search/*`, `/vehicle/details/*` only — **no** `/auto-consultant` |
| Non-hub indexing | `MIN_INDEXABLE_LISTINGS = 3` → thinner city×model pages stay `noindex,follow` |
| Money-hub body | City-specific buying notes + richer intro/FAQ on stocked city landings |
| GEO blogs | Expanded buyer guides (inspection, docs, local tips) |
| Sitemap GEO | Inventory GEO URLs gated by allowlist (or volume brands if no allowlist) |

`ads.txt` unchanged: `google.com, pub-1185685643057405, DIRECT, f08c47fec0942fa0`

### Code pointers

- [`src/lib/adsenseEligibility.js`](../src/lib/adsenseEligibility.js) — `MIN_ADSENSE_LISTINGS`, `isSearchLandingAdEligible`, `isAdSenseLoaderPath`
- [`src/lib/searchLandingSeo.js`](../src/lib/searchLandingSeo.js) — `MIN_INDEXABLE_LISTINGS`, `buildCityBuyingNotes`
- [`src/components/common/AdSenseAd.jsx`](../src/components/common/AdSenseAd.jsx) — `enabled` prop
- [`src/components/features/Blog/geoCalendarPosts.js`](../src/components/features/Blog/geoCalendarPosts.js) — expanded guides

## Spot-check before requesting review

1. **Deploy** this build to production.
2. Wait **7–14 days** when possible so AdSense crawlers see updated HTML.
3. Empty / thin non-hub (`totalCount < 3`): expect **`noindex`** and **no** `adsbygoogle.push`.
4. Stocked but thin (`3–4` listings): may be indexable; expect **no ads** until ≥5.
5. Money hub with ≥5 listings (e.g. Palanpur / Ahmedabad cars): ads may fill; View Source should show intro + **local buying tips** + FAQ + related guides.
6. Storefront `/auto-consultant/…`: **`adsbygoogle.js` must not load**.
7. `/help` or `/seo-dashboard`: AdSense script must **not** load.
8. Home / VDP: existing slots still behave (home banner, VDP special/similar).

## AdSense “Request review”

1. AdSense → Sites → `reecomm.com` → confirm fixes → **Request review**.
2. Suggested note:

> We tightened AdSense to inventory-backed pages only (search ads require 5+ live listings; empty/thin landings stay noindex and do not request ads). Storefront routes no longer load the AdSense script. Stocked city hubs now include city-specific buying guidance and expanded buyer guides. We continue curating verified consultant inventory on Reecomm.

3. Approval is **not guaranteed**. Google also weighs traffic and overall uniqueness. Re-submitting the same thin footprint will fail again.

## Ops alignment

- Keep empty/thin landings **noindex** — never “fix” that for GSC vanity ([`WEEK_1_SEO_CHECKLIST.md`](./WEEK_1_SEO_CHECKLIST.md)).
- Request indexing only for **money URLs**, not the bulk not-indexed queue.
- Treat ongoing listing/consultant curation as part of the AdSense “user interest” signal.
