# AdSense low-value content — fix & review checklist

After the code fix: ads run only on inventory-backed pages. Empty / `noindex` search landings do not request AdSense units. The global `adsbygoogle.js` loader loads only on `/`, `/search/*`, `/vehicle/details/*`, and `/auto-consultant/*`.

## What changed (engineering)

| Area | Behavior |
|------|----------|
| Search slug landings | Ads only if `totalCount >= 1` and not `noindex` |
| Search units | Max 2: banner + desktop rail (promo carousel is banners only, no AdSense) |
| Home / VDP | Unchanged — ads still eligible |
| Loader | Not injected on auth, dashboards, help-only routes, etc. |

`ads.txt` unchanged: `google.com, pub-1185685643057405, DIRECT, f08c47fec0942fa0`

## Spot-check before requesting review

1. **Deploy** this build to production.
2. Empty / thin search (expect **no** ad iframes / no `adsbygoogle` push):
   - Open a known empty brand×place landing (or any `/search/...` that shows “No Vehicles Found” as a non-hub with 0 stock).
3. **Stocked** search (expect ads still work):
   - e.g. `https://www.reecomm.com/search/buy-used-cars-palanpur` or another hub with listings — banner and/or rail may fill.
4. **Home** — home banner slot still loads as before.
5. **VDP** — special-offer fallback / similar slot still behave as before.
6. DevTools Network: on `/help` or `/seo-dashboard`, `adsbygoogle.js` should **not** load.

## AdSense “Request review”

1. AdSense → Sites → your site → **Request review** (after deploy + spot-check).
2. Suggested note:

> We removed AdSense from empty and noindex search landings. Ads now appear only on pages with live vehicle inventory (home, stocked search, vehicle details). Sitewide ad script is limited to those route types.

3. Wait a few days after deploy when possible so crawlers see the updated HTML.
4. Approval is not guaranteed; Google also weighs overall traffic and content quality. This fix addresses ads-on-thin-pages specifically.

## Local helpers

- [`src/lib/adsenseEligibility.js`](../src/lib/adsenseEligibility.js) — `isSearchLandingAdEligible`, `isAdSenseLoaderPath`
- [`src/components/common/AdSenseAd.jsx`](../src/components/common/AdSenseAd.jsx) — `enabled` prop
