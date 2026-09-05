# Reecomm SEO / GEO KPI Tracking

Use this checklist weekly in **Google Search Console** and **GA4**. Keyword seeds live in `src/data/seoTargetKeywords.js`. Inventory-driven popular links: `public/seo_popular_links.json` (from search-index cron).

## Setup (one-time)

1. **Google Search Console**: Verify `https://www.reecomm.com` and submit `https://www.reecomm.com/sitemap.xml`
2. **GA4 Key Events**: mark `inquire_initiated`, `inquiry_submit`, `view_vehicle`, `view_search_results`
3. **Bing Webmaster Tools**: same sitemap for Copilot / Bing GEO

## Rolling keyword matrix (not Creta-only)

Track **query classes**, not a fixed Creta list:

| Class | Example | Target surface |
|-------|---------|----------------|
| `used {model} {city}` | used creta palanpur / used swift ahmedabad | `/search/buy-used-{brand}-{model}-cars-{city}` |
| `used {brand} {city}` | used hyundai palanpur | `/search/buy-used-{brand}-cars-{city}` |
| `used {model} near me` | used creta near me | city model landing (same URL; near-me keywords in index) |
| Storefront | auto consultant palanpur / `{name}` cars | `/auto-consultant/{username}` |

**Monthly:** pull top 20 models × top inventory cities from cron / GSC pages report; refresh sample in `seoTargetKeywords.js` if needed. Keep Creta×Palanpur as the **acceptance / Gemini smoke test**.

## Seed keywords (weekly position check)

| Keyword | Target page | Page 1 goal | Horizon |
|---------|-------------|-------------|---------|
| used creta in palanpur | `/search/buy-used-hyundai-creta-cars-palanpur` | Top 3 | 3 mo |
| used creta near me | same + GBP | Top 10 | 6 mo |
| used car in palanpur | `/search/buy-used-cars-palanpur` | Top 5 | 3 mo |
| used swift in ahmedabad | `/search/buy-used-maruti-suzuki-swift-cars-ahmedabad` | Top 10 | 6 mo |
| used honda city in surat | `/search/buy-used-honda-city-cars-surat` | Top 10 | 6 mo |
| used toyota cars | `/search/buy-used-toyota-cars` | Top 5 | 6 mo |
| used cars (Ahmedabad) | `/search/buy-used-cars-ahmedabad` | Top 10 | 12 mo |
| auto consultant palanpur | top Palanpur storefront | Top 10 | 6 mo |

## Coverage success criteria (code + crawl)

1. Sample **10** inventoriable brand×model×city URLs → in sitemap + `index,follow` + FAQ/intro
2. Sample **3** storefronts → AutoDealer/LocalBusiness + FAQ JSON-LD validate in Rich Results
3. Home / footer popular links update after search-index cron (not only Creta/Palanpur hardcodes)

## AI Overview / Gemini retest (monthly)

Screenshot **10–20** queries (mix of matrix + acceptance):

- Used Creta near me / Used Creta in Palanpur
- Used Swift in Ahmedabad / Used Honda City in Surat
- 2–3 consultant name queries

Track **% where Reecomm is named or linked**. Expect gradual lift after organic page-1 + GBP — not overnight vs CarWale/OLX.

## 90-Day KPI Targets

| Metric | Baseline (GA4) | 90-day target |
|--------|----------------|---------------|
| Organic Search sessions | 570 | 1,500+ |
| Organic new users | 100 | 400+ |
| Organic % of new users | 1.4% | 8–10% |
| `view_search_results` events | 3 | 500+ |
| Inquiries (all channels) | 49 | 100+ |
| Organic inquiries (est.) | ~10 | 50+ |
| 404 page views | 95 | < 20 |
| Blog organic entrances | ~20 total | 100+/month |

## Weekly review checklist

- [ ] GSC → Performance: matrix queries (filter `used` + city/model), not only Creta
- [ ] GSC → Pages: `/search/buy-used-*` and `/auto-consultant/*` impressions
- [ ] GSC → Indexing: inventoriable GEO should not stay “Excluded”
- [ ] GA4 → Organic sessions vs prior week
- [ ] Spot-check: empty city pages still `noindex`; hubs indexable
- [ ] Spot-check: `seo_popular_links.json` exists after cron

## Monthly actions

- Regenerate search index: `npm run generate:search-index` (writes `search_index.json` + `seo_popular_links.json`)
- Confirm geo-brands / search-pages sitemap shards healthy; re-submit in GSC if needed
- Publish / refresh 1–2 blog guides for AI-citable FAQs
- Complete off-site steps in `docs/GEO_OFFSITE_GBP_CHECKLIST.md`

## Notes

- National head terms (“used cars”) remain hard vs CarWale / OLX / CarDekho / Spinny.
- Code makes every inventoriable combo **eligible**; GBP, reviews, and inventory density decide Gemini citations.
