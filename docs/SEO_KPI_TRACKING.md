# Reecomm SEO KPI Tracking (90-Day Dashboard)

Use this checklist weekly in **Google Search Console** and **GA4** to measure progress against the SEO & GEO growth plan.

## Setup (one-time)

1. **Google Search Console**: Verify `https://www.reecomm.com` and submit updated sitemap at `https://www.reecomm.com/sitemap.xml`
2. **GA4 Key Events**: In GA4 Admin → Events, mark these as **Key events**:
   - `inquire_initiated`
   - `inquiry_submit`
   - `view_vehicle`
   - `view_search_results`
3. **Bing Webmaster Tools**: Submit the same sitemap for GEO coverage on Bing/Copilot

## Target Keywords (track position weekly)

| Keyword | Target page | Page 1 goal | Horizon |
|---------|-------------|-------------|---------|
| used creta | `/search/buy-used-hyundai-creta-cars-palanpur` | Top 3 | 3 months |
| used toyota cars | `/search/buy-used-toyota-cars` | Top 5 | 6 months |
| used bikes / used bike | `/search/buy-used-two-wheelers-ahmedabad` | Top 5 | 6 months |
| used cars | `/search/buy-used-cars-ahmedabad` | Top 10 | 12 months |
| used cars (national) | `/search/buy-used-cars` | Top 20 | 12 months |

Keyword definitions live in `src/data/seoTargetKeywords.js`.

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

- [ ] GSC → Performance: filter by query; note movement on target keywords
- [ ] GSC → Pages: top landing pages; check indexation of `/search/buy-used-*`
- [ ] GSC → Indexing: fix any "Excluded" pages with inventory (should be indexed)
- [ ] GA4 → Traffic acquisition: Organic Search sessions vs prior week
- [ ] GA4 → Events: `view_search_results`, `inquire_initiated`, `inquiry_submit`
- [ ] GA4 → Pages: 404 views trending down
- [ ] Spot-check: `buy-used-bikes` redirects to `buy-used-two-wheelers` (301)
- [ ] Spot-check: empty city pages show `noindex` in HTML source

## Monthly actions

- Regenerate geo sitemaps: `node src/scripts/generateSitemaps.js`
- Regenerate search index: cron or `node src/scripts/generateSearchIndex.js`
- Review tier-1 city pages (Ahmedabad, Palanpur, Gandhinagar, Visnagar, Kanodar) for inventory depth
- Publish or refresh 1–2 blog guides for GEO (AI-citable FAQs)

## Notes

- Beating OLX nationally on "used cars" in 90 days is unrealistic; focus on **city + model long-tail** wins first.
- Organic Search users show **69% engagement vs 8% Paid Social** in baseline GA4 — prioritize SEO quality over paid volume.
