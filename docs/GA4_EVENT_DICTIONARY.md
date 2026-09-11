# GA4 Event Dictionary (Web)

Complete catalog of **Google Analytics 4** events fired on the Reecomm website.

SDK: `gtag.js` via [`src/lib/gtag.js`](../src/lib/gtag.js)  
Measurement ID: `NEXT_PUBLIC_GA_ID` (fallback in `_app.js`: `G-F3BG6WGRJK`)

Convention: **snake_case** event names. Do not send PII (phone, email, OTP, chat body).

**Not in this file:** Meta Pixel / Facebook events (`ViewContent`, `Lead`, `Search`, `Inquiry`, etc. via [`src/lib/fpixel.js`](../src/lib/fpixel.js)) and Amplitude events ([`docs/AMPLITUDE_EVENT_DICTIONARY_V1.md`](./AMPLITUDE_EVENT_DICTIONARY_V1.md)).

---

## Master index

| Event | Helper | Page / surface | When it fires |
|-------|--------|----------------|---------------|
| `page_view` (via `config`) | `pageview(url)` | All routes | Initial load + every client route change |
| `view_vehicle` | `trackViewVehicle` | Public VDP | Vehicle overview loaded (once per vehicle id) |
| `inquire_initiated` | `trackInquiryClick` | Public VDP | Send Inquiry **or** Make An Offer CTA clicked |
| `inquiry_submit` | `trackInquirySubmit` | Inquiry / Make Offer popup | Submit API success |
| `view_search_results` | `trackSearchResults` | Navbar, home filter bar, `/search/*` | Search submitted or search results hydrated |

Mark these as **Key events** in GA4 Admin if you use them for conversions (also listed on `/seo-dashboard`):  
`inquire_initiated`, `inquiry_submit`, `view_vehicle`, `view_search_results`.

---

## Shared property notes

| Property | Type | Notes |
|----------|------|--------|
| `vehicle_id` | string | Always stringified UUID/id |
| `vehicle_name` | string | Prefer `year + make + model + variant` |
| `seller_type` | string | e.g. `USER`, `USER_SELLER`, `CONSULTATION`, or API `sellerType` |
| `currency` | string | `INR` on `view_vehicle` |
| `price` | number | Listed price (INR) on `view_vehicle` |

---

## Events

### `page_view` (config / SPA)

| | |
|--|--|
| **Helper** | `pageview(url)` → `gtag('config', GA_ID, { page_path: url })` |
| **Wired in** | [`src/pages/_app.js`](../src/pages/_app.js) on `routeChangeComplete` |
| **Params** | `page_path` (pathname + query) |

Also configured once on boot with `page_path: window.location.pathname`.

---

### `view_vehicle`

| | |
|--|--|
| **Helper** | `trackViewVehicle` |
| **Wired in** | [`VehiclDetail.jsx`](../src/components/features/VehiclDetail/VehiclDetail.jsx) |
| **When** | Public vehicle detail overview ready; once per `vehicle_id` per mount cycle |

| Property | Type | Required |
|----------|------|----------|
| `vehicle_id` | string | yes |
| `vehicle_name` | string | yes |
| `vehicle_type` | string | no |
| `price` | number | no |
| `seller_type` | string | no |
| `currency` | string | always `INR` |

---

### `inquire_initiated`

| | |
|--|--|
| **Helper** | `trackInquiryClick` |
| **Wired in** | [`VehicleSummaryRight.jsx`](../src/components/features/VehiclDetail/VehicleSummaryRight.jsx) |
| **When** | User clicks **Send Inquiry** or **Make An Offer** (before login gate / form) |

| Property | Type | Required |
|----------|------|----------|
| `vehicle_id` | string | yes |
| `vehicle_name` | string | yes |
| `seller_type` | string | no |

Meta custom `Inquiry` fires on successful submit (same path as `Lead`), not on CTA click.

---

### `inquiry_submit`

| | |
|--|--|
| **Helper** | `trackInquirySubmit` |
| **Wired in** | [`SendInquaryPopup.jsx`](../src/components/features/VehiclDetail/SendInquaryPopup.jsx), [`MakeOfferPopup.jsx`](../src/components/features/VehiclDetail/MakeOfferPopup.jsx) |
| **When** | Inquiry or make-offer API succeeds |

| Property | Type | Required | Notes |
|----------|------|----------|--------|
| `vehicle_id` | string | yes | |
| `vehicle_name` | string | yes | |
| `inquiry_type` | string | no | Inquiry type label, or `Make Offer: ₹…` for offers |
| `seller_type` | string | no | |

Meta standard `Lead` and custom `Inquiry` both fire on the same success path (not GA4).

---

### `view_search_results`

| | |
|--|--|
| **Helper** | `trackSearchResults` |
| **Wired in** | [`Navbar.jsx`](../src/components/layout/Navbar.jsx), [`VehicleFilterBar.jsx`](../src/components/features/home/VehicleFilterBar.jsx), [`SearchWithCard.jsx`](../src/components/features/search/SearchWithCard.jsx) |
| **When** | Product search submitted (navbar / home), or search results page data loads |

| Property | Type | Required | Notes |
|----------|------|----------|--------|
| `search_string` | string | yes | Query or brand/model/city label; fallback `vehicle_search` |
| `results_count` | number | no | Set on search results page; often `0` / omitted on submit-only |
| `search_type` | string | no | e.g. `navbar`, `home` / filter source, `search_results_page` |

Meta `Search` may fire alongside navbar/home submits (not GA4).

---

## Funnel map (GA4 only)

```text
page_view
    │
    ├─ view_search_results  (search / browse)
    │
    └─ view_vehicle
           │
           └─ inquire_initiated   (Send Inquiry or Make An Offer CTA)
                  │
                  └─ inquiry_submit   (form or offer success)
```

---

## QA checklist

1. Open GA4 → **Reports → Realtime** (or DebugView with debug mode).
2. Open a VDP → expect `view_vehicle`.
3. Click Send Inquiry → `inquire_initiated`.
4. Complete inquiry → `inquiry_submit` with `inquiry_type`.
5. Click Make An Offer → `inquire_initiated`; submit offer → `inquiry_submit` with `inquiry_type` like `Make Offer: ₹…`.
6. Submit navbar/home search or load `/search/*` → `view_search_results`.
7. Client-navigate between pages → `page_view` / config `page_path` updates.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-09-10 | Initial GA4-only dictionary from `src/lib/gtag.js` call sites |
