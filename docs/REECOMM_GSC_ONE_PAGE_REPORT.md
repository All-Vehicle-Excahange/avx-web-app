# Reecomm GSC — one-page performance report

**Source:** Google Search Console export (Web / text) · **Last 3 months** · India primary  
**SERP page** ≈ `ceil(avg position ÷ 10)` · Page 1 = positions 1–10  
**Note:** Query×page pairs are inferred from separate Queries + Pages exports (GSC UI export does not join them in one file).

**Week-1 action checklist:** [`WEEK_1_SEO_CHECKLIST.md`](./WEEK_1_SEO_CHECKLIST.md) (indexing triage + daily tasks).

---

## 1. Headline performance

| Metric | Value | Read |
|--------|------:|------|
| India clicks / impressions | **786** / **29,845** | Almost all traffic is India |
| India CTR / avg position | **2.63%** / **29.9** | Average = **SERP page ~3** |
| Chart period (92 days) | **795** clicks / **31.4k** impressions | Stable but deep rankings |
| Mobile vs desktop | 596 clk @ 2.25% CTR · 195 clk @ 4.09% CTR | Mobile = volume; desktop = better CTR |
| Query rows on page 1 | **26** queries → **507** clicks | Nearly all clicks come from page 1 |
| Query rows on page 3+ | **795** queries → **~20k** impressions / **9** clicks | Visibility without clicks |

**Bottom line:** Reecomm wins **brand + consultant-name** searches on page 1. Competitive **city “used cars”** hubs get impressions on pages **4–5** and almost never click. Model×city (Fortuner / Hilux / Hycross) sits around **page 2–3** — closest non-brand opportunity.

---

## 2. Keywords that work (page 1) → where we land

| Keyword | Clicks | Imp. | Avg pos | SERP | Typical landing |
|---------|------:|-----:|--------:|-----:|-----------------|
| `reecomm` | 476 | 657 | 1.0 | **1** | `/` (also about/download/start) |
| `aabad motors` | 23 | 129 | 2.8 | **1** | `/auto-consultant/aabadmotors487206` *(digit URL wins)* + clean `aabadmotors` |
| `rameshwar auto consult` | 1 | 58 | 8.7 | **1** | `/auto-consultant/rameshwarautoconsult` |
| `sikotar motors` | 1 | 53 | 9.2 | **1** | `/auto-consultant/sikotarmotors` |
| `janvi motors` | 1 | 28 | 8.5 | **1** | `/auto-consultant/janvimotors` |
| `falak car` / `alen motors` | 1 each | 4–8 | 3–9 | **1** | Matching storefronts |
| `auto consultant near me` | 1 | 4 | 4.8 | **1** | Consult / storefront surfaces |
| `dream motors` / `prime motors` | 0 | 24–37 | ~9 | **1** | Storefronts (impressions only) |

**Local vehicle details (page 1 clicks):** Palanpur / Kanodar / Visnagar Creta, Amaze, Scorpio VDPs — e.g. Creta Chhapi Palanpur (**12 clicks**, pos ~5.6 → page 1).

---

## 3. Landing pages that get traffic

| Page | Clicks | Imp. | Pos → SERP | Role |
|------|------:|-----:|-----------:|------|
| `https://www.reecomm.com/` | 541 | 1,081 | 4.6 → **1** | Brand |
| `/auto-consultant/aabadmotors487206` | 54 | 255 | 3.4 → **1** | Consultant (wrong slug still #1) |
| Creta VDP (Chhapi Palanpur) | 12 | 39 | 5.6 → **1** | Local listing |
| `/aboutus`, `/download`, `/consult/discovery` | 7–11 | 267–793 | ~3–9 → **1** | Brand/nav |
| `/auto-consultant/aabadmotors` | 8 | 163 | 5.8 → **1** | Clean storefront (loses to digit URL) |
| Fortune / Naam / Sikotar / Janvi storefronts | 3–6 | 37–98 | ~7–11 → **1–2** | Consultant names |
| `/search/buy-used-cars-surat` | 1 | **1,898** | 40 → **4** | City hub (wasted) |
| `/search/buy-used-cars-pune` | 1 | **1,438** | 47 → **5** | City hub (wasted) |
| `/search/buy-used-cars-ahmedabad` | 1 | 57 | 30 → **3** | Focus GEO (thin) |

---

## 4. Not page 1 yet (high impressions, ~0 clicks)

### City GEO hubs — pages **4–5**
| Query | Imp. | Pos | SERP | Landing pattern |
|-------|-----:|----:|-----:|-----------------|
| used cars in surat (+ variants) | 150–443 each | ~39–43 | **4–5** | `/search/buy-used-cars-surat` |
| used cars in pune (+ variants) | 100–337 | ~45–53 | **5–6** | `/search/buy-used-cars-pune` |
| Bangalore / Kolkata / Chennai / Jaipur hubs | hundreds | ~43–53 | **5–6** | Matching city search landings |
| used cars in vadodara / rajkot | 60–80+ | ~27–35 | **3–4** | City hubs |

### Model × city — pages **2–3** (best non-brand bets)
| Query | Imp. | Pos | SERP |
|-------|-----:|----:|-----:|
| used fortuner in ahmedabad | 42 | 22.3 | **3** |
| used fortuner in hyderabad / bangalore | 46 | ~22–26 | **3** |
| toyota hilux second hand / used | 22–31 | ~19–21 | **2–3** |
| used hycross / innova hycross delhi–mumbai | 50–67 | ~23–26 | **3** |
| used ertiga in ahmedabad | 38 | 28 | **3** |

### Price / new-car queries (weak fit)
`punch ev price ahmedabad`, `hilux price in ahmedabad` → positions **50–70** (page 6–8). Do not prioritize for used-car inventory SEO.

---

## 5. What to improve to reach page 1

1. **Fix Aabad cannibalization** — 301 `aabadmotors487206` → `aabadmotors`; GSC Request indexing only on the clean URL (digit URL currently takes most clicks).
2. **Scale what already ranks** — consultant **brand-name** queries are page 1. Off-site: GBP website = clean storefront URL, NAP, reviews. Keep logos + live stock.
3. **Push model×city already on page 2–3** — Fortuner / Hilux / Hycross / Ertiga city landings (esp. Ahmedabad). Request indexing; internal links from VDPs → brand×city hub; keep count + starting-price meta + CDN images.
4. **Stocked GEO hubs only** — Ahmedabad / Palanpur / Siddhpur / Visnagar / Surat *if inventory is real*. Do not expect page 1 on empty metro “used cars in pune/bangalore” while sitting at pos 45–50.
5. **Stop burning crawl on empty metros** — Surat/Pune hubs have ~3k combined impressions and ~2 clicks. Prefer inventory-backed model×city over head “used cars {metro}”.
6. **Local VDP quality** — Palanpur listings already convert on page 1; keep SSR title/description/CDN cover correct so Images + snippets match the car.
7. **Images** — this export is Web-only (`Search appearance` empty). Pull a separate GSC **Image** report after CDN schema deploy; finish CloudFront EXIF rotation so covers aren’t sideways.
8. **Weekly check** — re-export GSC or run `npm run report:seo-gsc`; watch Fortuner Ahmedabad / Hilux / clean Aabad / `buy-used-cars-ahmedabad` for position movement toward ≤10.

---

## 6. One-line strategy

**Defend page-1 brand + consultant names → consolidate clean storefront URLs → climb model×city (page 2–3 → 1) with stock → ignore empty national city head terms until inventory and local links exist.**
