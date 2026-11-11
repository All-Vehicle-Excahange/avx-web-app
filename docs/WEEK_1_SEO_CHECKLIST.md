# Week-1 SEO sprint checklist (page-1 focus)

Use with [`REECOMM_GSC_ONE_PAGE_REPORT.md`](./REECOMM_GSC_ONE_PAGE_REPORT.md).  
**Do not** mass-request the ~14k not-indexed URLs.

**AdSense low-value fix:** see [`ADSENSE_POLICY_FIX.md`](./ADSENSE_POLICY_FIX.md) — deploy, wait 7–14 days, spot-check, then Request review. Do not remove empty-landing `noindex`.

---

## Indexed vs not indexed (remember)

| Status | ~Count | This week |
|--------|-------:|-----------|
| Indexed | ~1,016 | Improve ranking; Request indexing only if stale |
| Not indexed | ~14,748 | Ignore bulk |
| Crawled – not indexed | 6,181 | IGNORE unless money URL |
| Discovered – not indexed | 4,383 | Link + sitemap; request P0/P1 only |
| Excluded by `noindex` | 2,554 | KEEP empty hubs; FIX if stocked hub wrongly noindex |
| Google chose different canonical | 355 | Prefer clean storefront URL |
| 404 | 116 | Fix broken internal links when found |

---

## Day 1 — Indexing triage + redirects + GSC

### Done in code / live verify
- [x] Aabad digit URL **308 →** `/auto-consultant/aabadmotors` (live)
- [x] Money hubs live **indexable** with count titles, ItemList, CDN `og:image`:
  - Toyota / Fortuner / Ertiga Ahmedabad, cars Ahmedabad, bikes Ahmedabad, cars Palanpur
- [x] Popular search fallback + `public/seo_popular_links.json` updated for those hubs
- [x] `notifyTopSearchLandings.js` money URL list updated (Ahmedabad maker/model/GEO/bikes)
- [x] Storefront notify priority: Aabad digit DELETE + clean storefronts UPDATED
- [ ] Fortune/Naam digit usernames are **canonical** (clean `/fortuneauto` 404) — rename in backend later if desired

### You do in GSC (URL Inspection → Request indexing)
Skip if already “URL is on Google” and fresh:

1. `https://www.reecomm.com/search/buy-used-toyota-cars-ahmedabad`
2. `https://www.reecomm.com/search/buy-used-toyota-fortuner-cars-ahmedabad`
3. `https://www.reecomm.com/search/buy-used-maruti-suzuki-ertiga-cars-ahmedabad`
4. `https://www.reecomm.com/search/buy-used-cars-ahmedabad`
5. `https://www.reecomm.com/search/buy-used-two-wheelers-ahmedabad`
6. `https://www.reecomm.com/search/buy-used-cars-palanpur`
7. `https://www.reecomm.com/search/buy-used-hyundai-creta-cars-palanpur`
8. `https://www.reecomm.com/auto-consultant/aabadmotors`
9. `https://www.reecomm.com/auto-consultant/sikotarmotors`
10. `https://www.reecomm.com/auto-consultant/janvimotors`
11. `https://www.reecomm.com/sitemap.xml`
12. `https://www.reecomm.com/sitemaps/vehicles.xml`
13. `https://www.reecomm.com/sitemaps/storefronts.xml`
14. `https://www.reecomm.com/api/sitemap/geo-brands.xml`

Optional CLI (Google Indexing API in `.env`):
```bash
npm run notify:storefronts
npm run notify:search-landings
```

**Note (2026-11-09):** Indexing API **daily quota already hit** — `URL_DELETED` for Aabad digit succeeded; most `URL_UPDATED` failed with quota exceeded. **Use GSC Request indexing** for the 14 URLs above today; retry CLI tomorrow: `npm run notify:search-landings`.

### Page Indexing triage (GSC → Pages)
- [ ] `noindex` samples — Toyota/Fortuner/Ertiga Ahmedabad **not** listed
- [ ] `Crawled – not indexed` — if any money URL above appears → link + re-request once
- [ ] `Google chose different canonical` — Aabad winner should be clean URL after 308

---

## Day 2 — Googlebot HTML spot-check

After deploy, for each money URL:
- [ ] Title has **count** + city/maker (or consultant name)
- [ ] CDN `og:image` (not logo-only on VDPs)
- [ ] ItemList or Car/Motorcycle schema
- [ ] No accidental `noindex`
- [ ] VDP breadcrumb → brand×city hub

---

## Day 3–4 — On-page / internal links

- [x] VDP SeoInternalLinkHub: brand×city + model×city first
- [x] VehicleHeader breadcrumbs → brand / brand×city
- [x] Home popular searches → Ahmedabad maker/model/GEO/bikes
- [ ] After deploy: homepage Popular Searches opens Fortuner / Toyota / bikes Ahmedabad
- [ ] Spot-check one Ahmedabad Fortuner VDP related links

---

## Day 5–6 — Off-site + Images (manual)

### GBP — Aabad, Sikotar, Janvi, Falak, Alen
See [`GEO_OFFSITE_GBP_CHECKLIST.md`](./GEO_OFFSITE_GBP_CHECKLIST.md)

- [ ] Website = `https://www.reecomm.com/auto-consultant/{cleanUsername}`
- [ ] NAP matches storefront
- [ ] Logo on Reecomm storefront
- [ ] 2–3 real Google reviews this week

### Images
- [ ] GSC → Performance → Search type **Image**
- [ ] Spot-check Fortuner/Creta covers not sideways
- [ ] Ops: CloudFront EXIF auto-orient if still pending

### Content
- [ ] Palanpur consultants blog (or next edit): links to Toyota / Fortuner / bikes Ahmedabad hubs

---

## Day 7 — Measure

- [ ] Re-export GSC (last 7 days) or `npm run report:seo-gsc`
- [ ] Scorecard:

| Target | Baseline (3mo) | Day 7 | Pass? |
|--------|----------------|-------|-------|
| Clean Aabad clicks ≥ digit URL | Digit was winning | | |
| used fortuner ahmedabad position | ~22 (page 3) | | Toward ≤15 |
| used toyota cars ahmedabad hub | thin | | Indexed + impressions |
| used cars ahmedabad position | ~30 | | Improve |
| used bikes ahmedabad | thin | | Indexed |
| Indexed URL count | ~1,016 | | Stable/up |
| Did not mass-index 14k URLs | — | | Must pass |

- [ ] Append “Week-1 results” to [`REECOMM_GSC_ONE_PAGE_REPORT.md`](./REECOMM_GSC_ONE_PAGE_REPORT.md)

---

## Do not do this week

- Mass-index empty exotic brand×city pages
- Expect page 1 for `used cars in surat/pune/bangalore`
- **Do NOT** remove `noindex` on empty / thin search landings (AdSense low-value + thin crawl risk; keep `MIN_INDEXABLE_LISTINGS`)
- UI redesign of search/VDP

---

## Success (honest)

**Pass:** clean Aabad preferred; money hubs indexed with correct meta; ≥3 model×city queries move closer to page 1 **or** clear impression growth.  
**Not required:** national metro head-term page 1 in 7 days.
