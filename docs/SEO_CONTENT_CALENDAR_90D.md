# 90-Day Blog → Money-Page Content Calendar (GEO Fasttrack)

Goal: publish **~8 guides in 90 days** that deep-link to inventoriable `/search/buy-used-…` landings and storefronts. Empty cities: do not invent pages.

Refresh inventory targets monthly from `public/seo_popular_links.json`.

## Rules

1. One primary money URL per article (canonical search landing or storefront)
2. Answer-first H2s (quotable for AI Overviews)
3. Internal links: city hub + brand×model×city + 1–2 nearby storefronts
4. No doorway fluff — only cities/models with live listings

## Calendar

| Week | Draft title | Primary money URL | Status |
|------|-------------|-------------------|--------|
| 1 | Used Hyundai Creta in Palanpur — Price & Buying Checklist | `/search/buy-used-hyundai-creta-cars-palanpur` | Shipped `/blog/used-hyundai-creta-palanpur-price-buying-checklist` |
| 2 | How to Buy a Used Car Safely in North Gujarat | `/search/buy-used-cars-palanpur` | Shipped `/blog/how-to-buy-used-car-safely-north-gujarat` |
| 3 | Used Maruti Ertiga in Visnagar — What to Check | `/search/buy-used-maruti-suzuki-ertiga-cars-visnagar` | Shipped `/blog/used-maruti-ertiga-visnagar-what-to-check` |
| 4 | Used Bikes in Ahmedabad — Budget Guide | `/search/buy-used-two-wheelers-ahmedabad` | Shipped `/blog/used-bikes-ahmedabad-budget-guide` |
| 5 | Used Santro Xing in Siddhpur — Fair Price Range | `/search/buy-used-hyundai-santro-xing-cars-siddhpur` | Shipped `/blog/used-santro-xing-siddhpur-fair-price` |
| 6 | Auto Consultants in Palanpur — How Reecomm Storefronts Work | `/auto-consultant/aabadmotors` | Shipped `/blog/auto-consultants-palanpur-reecomm-storefronts` |
| 7 | Used Swift in Ahmedabad — Variants & Inspection | `/search/buy-used-maruti-suzuki-swift-cars-ahmedabad` | Shipped `/blog/used-swift-ahmedabad-variants-inspection` |
| 8 | Used Honda City in Surat — Buyer’s Shortlist | `/search/buy-used-honda-city-cars-surat` | Shipped `/blog/used-honda-city-surat-buyers-shortlist` |

Source posts: [`src/components/features/Blog/geoCalendarPosts.js`](../src/components/features/Blog/geoCalendarPosts.js)


## After publish

- [ ] Add article to content sitemap (via existing blog pipeline)
- [ ] Link from related search landing FAQ/body if UI supports related reads
- [ ] Share on GBP post + consultant WhatsApp where relevant
- [ ] GSC URL Inspection on article + money URL

## Ops note

Inventory density in focus cities still decides rankings — content amplifies stock; it does not replace listings.
