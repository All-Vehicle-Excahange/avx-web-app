# GEO off-site execution brief (on-site ready)

Code/site NAP is aligned so GBP and citations can match Reecomm exactly. **Google Business Profile claim, reviews, and JustDial listings must be completed in Google / directory UIs** (cannot be automated from this repo).

## Canonical NAP (copy into GBP / directories)

| Field | Value |
|-------|--------|
| Name | Reecomm / Reecomm Technologies Pvt. Ltd. |
| Phone | +91 84601 60697 |
| Address | First Floor, Loriya Complex, Part B/D, Survey No 268/2, Chhapi, Palanpur Ahmedabad Highway, Banas Kantha, Pin 385210 |
| Website | https://www.reecomm.com |
| Deep link (HQ posts) | https://www.reecomm.com/search/buy-used-cars-palanpur |
| Aabad storefront | https://www.reecomm.com/auto-consultant/aabadmotors |

## On-site completed

- [x] Footer NAP matches address above ([`src/components/layout/Footer.jsx`](../src/components/layout/Footer.jsx))
- [x] Contact page phone/address match
- [x] Organization JSON-LD streetAddress expanded to full NAP ([`src/pages/index.js`](../src/pages/index.js), [`src/lib/searchLandingSeo.js`](../src/lib/searchLandingSeo.js))
- [x] Aabad digit slug 301 → `/auto-consultant/aabadmotors` ([`next.config.mjs`](../next.config.mjs))
- [x] Money landings + calendar blogs queued for Indexing API

## Manual ops (do in Google / directories)

Follow full checklist: [`GEO_OFFSITE_GBP_CHECKLIST.md`](./GEO_OFFSITE_GBP_CHECKLIST.md)

1. Claim / verify HQ GBP → paste NAP above → category Used Car Dealer / Automobile Consultant
2. Website = `https://www.reecomm.com` + weekly posts linking Palanpur / Creta money URLs
3. Aabad (and priority dealers): GBP website = storefront URL
4. Ask for real reviews after closed deals; respond within 48h
5. Match NAP on JustDial / Sulekha / social profiles
6. Target: referring domains 58 → 80+

## All consultant storefronts (GBP / citations)

For each row: set Google Business Profile **Website** to the storefront URL. Match business name on JustDial / social bios. Ask for real reviews using the exact name.

| Consultant | City | Storefront URL |
| --- | --- | --- |
| Aabad Motors | Palanpur | https://www.reecomm.com/auto-consultant/aabadmotors |
| Alen Motor | Palanpur | https://www.reecomm.com/auto-consultant/alenmotor |
| Aman Motors | Banas Kantha | https://www.reecomm.com/auto-consultant/amanmotors |
| Car Bazar Auto Consultant | Kanodar | https://www.reecomm.com/auto-consultant/carbazar |
| Chehar Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/cheharauto |
| Dream Motors | Palanpur | https://www.reecomm.com/auto-consultant/dreammotors777018 |
| Elite Motor | Palanpur | https://www.reecomm.com/auto-consultant/elitemotor |
| Falak Car Auto Consultant | Kanodar | https://www.reecomm.com/auto-consultant/falakcar |
| Fortune Auto Consultant | Ahmedabad | https://www.reecomm.com/auto-consultant/fortuneauto683178 |
| Gajanand Auto Consultant | Unjha | https://www.reecomm.com/auto-consultant/gajanandautoconsultant |
| Janvi Motors | Siddhpur | https://www.reecomm.com/auto-consultant/janvimotors |
| Jay Hanuman Auto Consultant | Jalor | https://www.reecomm.com/auto-consultant/jayhanumanautoconsultant |
| Kz Auto Consultant | Siddhpur | https://www.reecomm.com/auto-consultant/kzautoconsultant |
| Mira Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/miraautoconsult |
| Ms Auto Consultant | Siddhpur | https://www.reecomm.com/auto-consultant/msautoconsultant |
| My India Auto Consultant | Himatnagar | https://www.reecomm.com/auto-consultant/myindiaautoconsult |
| Naam Motors | Visnagar | https://www.reecomm.com/auto-consultant/naammotors663505 |
| New Prince Motor | Palanpur | https://www.reecomm.com/auto-consultant/newprincemotor |
| New Tiranga Car Care Auto Consultant | Kanodar | https://www.reecomm.com/auto-consultant/newtirangacarcare |
| Raj Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/mahesh |
| Royal Motors | Ahmedabad | https://www.reecomm.com/auto-consultant/royalmotors373813 |
| Safar Cars Auto Consultant | Kanodar | https://www.reecomm.com/auto-consultant/safarcars |
| Safeline Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/safelineauto |
| Sahara Motor | Palanpur | https://www.reecomm.com/auto-consultant/saharamotor |
| Sairam Auto Consultant Unjha | Unjha | https://www.reecomm.com/auto-consultant/sairamautoconsultunjha |
| Sar Hind Auto Consultant | Himatnagar | https://www.reecomm.com/auto-consultant/sarhind |
| Sheth Motors | Himatnagar | https://www.reecomm.com/auto-consultant/shethmotors |
| Shiv Krupa Auto Consultant | Tharad | https://www.reecomm.com/auto-consultant/shivkrupaautoconsult |
| Shree Lakhapir Auto Consultant | Tharad | https://www.reecomm.com/auto-consultant/shreelakhapir |
| Shree Motors | Palanpur | https://www.reecomm.com/auto-consultant/shreemotors |
| Sigma Motors | Himatnagar | https://www.reecomm.com/auto-consultant/sigmamotors |
| Sk Motors | Palanpur | https://www.reecomm.com/auto-consultant/skmotors |
| Super Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/superautoconsult |
| Yesauto Auto Consultant | Palanpur | https://www.reecomm.com/auto-consultant/yesauto |

Generated from `seo_consultant_targets.json` (34 dealers). Re-run `npm run generate:consultant-targets` after new consultants join.
