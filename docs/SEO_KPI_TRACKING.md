# Reecomm SEO / GEO KPI Tracking (Fasttrack vs Cars24)

Use **this matrix**, not Semrush Keyword Gap vs Cars24, to judge 90-day progress.

Keyword seeds: [`src/data/seoTargetKeywords.js`](../src/data/seoTargetKeywords.js)  
Popular links: `public/seo_popular_links.json` (cron)  
Off-site: [`GEO_OFFSITE_GBP_CHECKLIST.md`](./GEO_OFFSITE_GBP_CHECKLIST.md)  
Content calendar: [`SEO_CONTENT_CALENDAR_90D.md`](./SEO_CONTENT_CALENDAR_90D.md)

## Setup (one-time)

1. **GSC**: property `https://www.reecomm.com` — submit `sitemap.xml`
2. **GA4 Key Events**: `inquire_initiated`, `inquiry_submit`, `view_vehicle`, `view_search_results`
3. **Semrush Position Tracking** (India, Google, English):
   - Import all non-`longHorizon` keywords from `SEO_TARGET_KEYWORDS`
   - **Do not** measure success by Cars24 Keyword Gap national wins
4. **Semrush Site Audit**:
   - Raise crawl limit to **≥ 5,000 pages** (100 is useless for GEO scale)
   - Enable JS rendering if available
   - Re-run after deploying 404 link fixes

## Gujarat win matrix (track weekly)

| Class | Examples | Target page pattern |
|-------|----------|---------------------|
| Model × city | used creta palanpur, used ertiga visnagar | `/search/buy-used-{brand}-{model}-cars-{city}` |
| City hub | used cars palanpur / siddhpur / kanodar | `/search/buy-used-cars-{city}` |
| Near me | used creta near me | same city model landing |
| Storefront | auto consultant palanpur, aabad motors | `/auto-consultant/{username}` |
| National (benchmark only) | used cars, buy used car | expect Cars24 to keep winning |

## 90-day targets

| Metric | Baseline | 90-day target |
|--------|----------|---------------|
| Organic sessions | ~570 | 1,500+ |
| Referring domains | ~58 | **80+** |
| Mid-tail page-1/2 wins (matrix) | ~0 | **3–5** |
| Matrix queries with rising GSC impressions | — | **10+** |
| 404 page views | 95 | < 20 |
| Semrush broken internal links | 110 | near 0 (after footer/compare fix) |

## Weekly GSC checklist

- [ ] Performance → filter queries containing focus cities (palanpur, siddhpur, kanodar, visnagar, ahmedabad, surat)
- [ ] Note Top 20 / Top 10 movement on matrix keywords
- [ ] Pages: impressions on `/search/buy-used-*` and `/auto-consultant/*`
- [ ] Indexing: inventoriable GEO should not stay Excluded
- [ ] Confirm no crawl spikes to `/compare` or `/refund-policy` (should 301)

## Monthly AI / Gemini retest (screenshot)

Sample 10–15 queries:

1. Used Creta near me  
2. Used Creta in Palanpur  
3. Used cars in Palanpur  
4. Used Ertiga Visnagar  
5. Used Swift Ahmedabad  
6. Used Honda City Surat  
7. Auto consultant Palanpur  
8. Aabad Motors Palanpur  
9. Used Santro Xing Siddhpur  
10. Used bikes Ahmedabad  

Track **% where Reecomm is named or linked**.

## After each deploy

URL Inspection (GSC) for top GEO URLs — see full list in [`docs/GSC_INDEXING_TRIAGE.md`](./GSC_INDEXING_TRIAGE.md):

- `https://www.reecomm.com/search/buy-used-hyundai-creta-cars-palanpur`
- `https://www.reecomm.com/search/buy-used-cars-palanpur`
- `https://www.reecomm.com/search/buy-used-cars-siddhpur`
- `https://www.reecomm.com/search/buy-used-cars-kanodar`
- `https://www.reecomm.com/search/buy-used-cars-visnagar`
- `https://www.reecomm.com/auto-consultant/aabadmotors`
- Plus entries from `public/seo_popular_links.json`

Request indexing if “URL is not on Google”. Resubmit `sitemap.xml`.

**Do not** mass-request indexing for “Crawled – currently not indexed” exotic/empty URLs — those are pruned from sitemaps via `seo_sitemap_slugs.json`.

## Storefront ranking checklist

On-page meta/images make every `/auto-consultant/{username}` **eligible** for a correct SERP snippet. Page position still needs inventory + off-site trust.

1. **GSC weekly** — Pages filter `/auto-consultant/*`; queries with consultant brand name + city; watch impressions before position.
2. **After storefront SEO deploy** — URL Inspection → Request indexing for priority storefronts (Aabad, Ekta, Yes Car Bazaar, Fortune Auto, etc.). Optionally run `node src/scripts/notifyStorefrontIndexing.js`.
3. **Off-site (required for page 1 / near-me)** — Per consultant, follow [`GEO_OFFSITE_GBP_CHECKLIST.md`](./GEO_OFFSITE_GBP_CHECKLIST.md): claim GBP, set website to `https://www.reecomm.com/auto-consultant/{username}`, match NAP, collect real reviews, cite the same URL on JustDial/social.
4. **Product ops** — Ask consultants without logos to upload one; keep live listings with photos/prices in focus cities.

## Notes

- Empty cities stay `noindex` by design (`MIN_INDEXABLE_LISTINGS`).
- Authority Score moves slowly; prioritize GSC matrix + referring domains.
- National head terms vs Cars24 are **long-horizon** only.
