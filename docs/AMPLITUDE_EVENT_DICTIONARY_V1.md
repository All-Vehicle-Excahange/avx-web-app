# Amplitude Event Dictionary v1 (Web)

Convention: **snake_case** event names. Do not send PII (phone, email, OTP, chat body).

SDK: `@amplitude/unified` via `src/lib/amplitude.js` (`initAll` + autocapture + session replay).

Identity rule: **one person = one Amplitude user** (`setUserId` on login; `reset` on logout). Roles are user properties.

---

## Phase 1 — MUST TRACK

| Event | When | Key properties | Wired in |
|-------|------|----------------|----------|
| `session_started` | First client paint of a browser tab session | `path`, `pathname` | `_app.js` |
| `landing_page_viewed` | Initial load + every `routeChangeComplete` | `path`, `pathname` | `_app.js` |
| `homepage_viewed` | Home `/` (also fires wizard `Viewed Home Page` with `prompt_version`) | — | `_app.js` |
| `search_submitted` | Navbar / home filter search | `search_string`, `source` | `Navbar.jsx`, `VehicleFilterBar.jsx` |
| `search_results_viewed` | Search results data loaded | `search_string`, `results_count`, `search_type` | `SearchWithCard.jsx` |
| `filter_applied` | Filters change (after first hydration) | brands, models, fuel, price, city, etc. | `SearchWithCard.jsx` |
| `vehicle_detail_viewed` | VDP / consult VDP load (once per vehicle id) | `vehicle_id`, `vehicle_name`, `vehicle_type`, `price`, `seller_type` | `VehiclDetail.jsx`, `ConsualtVehicleDetails.jsx` |
| `storefront_viewed` | Consultant storefront hero data ready | `consultant_id`, `consultation_name`, `username`, `available_vehicles`, `average_rating` | `StoreFrontHeroSection.jsx` |
| `inquiry_login_required` | Guest taps Send Inquiry | `vehicle_id`, `seller_type`, `source` | `VehicleSummaryRight.jsx` |
| `inquiry_initiated` | User clicks **Send Inquiry** on VDP (guest or logged-in) | `vehicle_id`, `vehicle_name`, `seller_type`, `source`, `is_logged_in` | `VehicleSummaryRight.jsx` |
| `wishlist_login_required` | Guest taps wishlist | `vehicle_id`, `source` | `VehicleCard.jsx`, `VehicleImageGallery.jsx` |
| `login_started` | Login popup opens | `source` | `LoginPopup.jsx` |
| `login_completed` | Login success (OTP / Google) | `method`, `user_role` | `LoginPopup.jsx` |
| `signup_completed` | Signup success | `method` | `SignupPopup.jsx`, `LoginPopup.jsx` (Google phone link) |
| `inquiry_submitted` | Inquiry API success | `vehicle_id`, `vehicle_name`, `inquiry_type`, `seller_type` | `SendInquaryPopup.jsx` |
| `inspection_payment_success` | Razorpay / wallet inspection pay success | `vehicle_id`, `inspection_id?`, `amount`, `currency` | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |
| `become_consultant_page_viewed` | Become consultant page mount | `content_name` | `become-consultant/index.js` |
| `plan_selected` | User chooses a consultant plan | `plan_id`, `plan_name`, `billing_cycle` | `FullPricing.jsx`, `Subscription.jsx` |
| `subscription_payment_success` | Subscription Razorpay success | `plan_id`, `plan_name`, `billing_cycle`, `value`, `currency` | `FullPricing.jsx`, `Subscription.jsx` |
| `seller_panel_accessed` | Consult dashboard layout (logged in) | `path`, `user_role` | `DashboardLayout.jsx` |

---

## Phase 2 — Inquiry depth + engagement

| Event | When | Key properties | Wired in |
|-------|------|----------------|----------|
| `inquiry_form_opened` | Send Inquiry popup mounts | `vehicle_id`, `seller_type`, `source` | `SendInquaryPopup.jsx` |
| `inquiry_type_selected` | User picks inquiry type | `inquiry_type`, `vehicle_id`, `seller_type` | `SendInquaryPopup.jsx` |
| `inquiry_form_abandoned` | Close without successful submit | `inquiry_type?`, `had_type`, `duration_ms` | `SendInquaryPopup.jsx` |
| `page_left` | Route leave / tab hide / unload (once per visit; ignore &lt;1s; cap 30m) | `pathname`, `path`, `duration_ms`, `reason` | `_app.js` |

### Identity / acquisition

| Action | Behavior |
|--------|----------|
| Login / session restore | `identifyUser` → `setUserId` + `user_role` / `account_type` |
| Logout | `resetUser` → `amplitude.reset()` |
| First-touch UTMs | `setOnce` user props from `utm_*`, `gclid`, `fbclid`, `landing_path`, `referrer` |
| Preferred market | `setPreferredLocation` → `preferred_city` / `preferred_state` when search filters apply a location |

---

## How to chart in Amplitude UI (no extra code)

| Metric | Chart |
|--------|--------|
| User count / DAU / WAU | **Users** → Active users |
| Retention | **Retention** on `session_started` or `landing_page_viewed` |
| Total website views | Event Segmentation on `landing_page_viewed` (group by `pathname`) |
| Site-level time spent | **Sessions** → avg / median session duration |
| Time by page | Segmentation on `page_left` → avg/sum `duration_ms` by `pathname` |
| Time / engagement by location | Break down by Amplitude IP `country` / `region` / `city`, or user property `preferred_city` / `preferred_state` |

---

## Funnels to build in Amplitude UI

1. **Buyer discovery:** `homepage_viewed` → `search_submitted` → `search_results_viewed` → `vehicle_detail_viewed` → `inquiry_initiated` → `inquiry_form_opened` → `inquiry_type_selected` → `inquiry_submitted`
2. **Inquiry drop-off:** `inquiry_form_opened` → `inquiry_form_abandoned`
3. **Auth gate:** `inquiry_login_required` / `wishlist_login_required` → `login_started` → `login_completed` / `signup_completed`
4. **Inspection:** `vehicle_detail_viewed` → `inspection_payment_success`
5. **Consultant acquisition:** `become_consultant_page_viewed` → `plan_selected` → `subscription_payment_success` → `seller_panel_accessed`

---

## Backlog (not wired)

Wishlist success, compare add, chat opened, download-app CTA, KYC steps, listing created, PPC ad click detail, Web→App deep-link attribution.
