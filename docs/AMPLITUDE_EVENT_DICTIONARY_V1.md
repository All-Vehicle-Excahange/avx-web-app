# Amplitude Event Dictionary v1 (Web)

Convention: **snake_case** event names. Do not send PII (phone, email, OTP codes, chat body).

SDK: `@amplitude/unified` via `src/lib/amplitude.js` (`initAll` + autocapture + session replay).

Identity rule: **one person = one Amplitude user** (`setUserId` on login; `reset` on logout). Roles are user properties.

### Shared auth funnel properties

Stored on `useAuthStore.authFunnelContext` when a login gate opens; attached to auth funnel events until login/signup completes, then cleared.

| Property | Values |
|----------|--------|
| `entry_context` | `vehicle_detail` \| `search` \| `home` \| `become_consultant` \| `become_seller` \| `direct` |
| `trigger_action` | `inquiry` \| `wishlist` \| `compare` \| `inspection` \| `chat` \| `consultant_signup` \| `seller_signup` \| `login_click` |
| `user_role_intent` | `buyer` \| `consultant` \| `seller` |
| `user_role` | Actual role from API after success (on `login_completed` / `signup_completed`) |
| `method` | `mobile_otp` \| `google` (normalized) |

---

## Phase 1 — MUST TRACK

| Event | When | Key properties | Wired in |
|-------|------|----------------|----------|
| `session_started` | First client paint of a browser tab session | `path`, `pathname` | `_app.js` |
| `landing_page_viewed` | Initial load + every `routeChangeComplete` | `path`, `pathname` | `_app.js` |
| `homepage_viewed` | Home `/` (also fires wizard `Viewed Home Page` with `prompt_version`) | — | `_app.js` |
| `search_submitted` | Navbar / home filter search | `search_string`, `source`, `city` / `state` (names when known) | `Navbar.jsx`, `VehicleFilterBar.jsx` |
| `search_results_viewed` | Search results data loaded | `search_string`, `results_count`, `search_type`, `city` / `state` (names) | `SearchWithCard.jsx` |
| `filter_applied` | Filters change (after first hydration) | brands, models, fuel, price, `city` / `state` (names, not IDs), etc. | `SearchWithCard.jsx` |
| `vehicle_detail_viewed` | VDP / consult VDP load (once per vehicle id) | `vehicle_id`, `vehicle_name`, `vehicle_type`, `price`, `seller_type`, `city` / `state` (names) | `VehiclDetail.jsx`, `ConsualtVehicleDetails.jsx` |
| `storefront_viewed` | Consultant storefront hero data ready | `consultant_id`, `consultation_name`, `username`, `available_vehicles`, `average_rating` | `StoreFrontHeroSection.jsx` |
| `inquiry_login_required` | Guest taps Send Inquiry | `vehicle_id`, `seller_type`, `source` | `VehicleSummaryRight.jsx` |
| `inquiry_initiated` | User clicks **Send Inquiry** on VDP (guest or logged-in) | `vehicle_id`, `vehicle_name`, `seller_type`, `source`, `is_logged_in` | `VehicleSummaryRight.jsx` |
| `wishlist_login_required` | Guest taps wishlist | `vehicle_id`, `vehicle_name`, `source` | `VehicleCard.jsx`, `VehicleImageGallery.jsx` |
| `login_started` | Login popup opens | `source` + auth funnel props | `LoginPopup.jsx` |
| `login_completed` | Login success (OTP / Google) | `method`, `user_role` + auth funnel props | `LoginPopup.jsx` |
| `signup_completed` | Final successful signup (keep this name) | `method`, `user_role` + auth funnel props + UTMs/referrer via SDK | `SignupPopup.jsx`, `LoginPopup.jsx` (Google phone link), `Register.jsx` |
| `inquiry_submitted` | Inquiry API success | `vehicle_id`, `vehicle_name`, `inquiry_type`, `seller_type` | `SendInquaryPopup.jsx` |
| `inspection_started` | User starts inspection request flow | `vehicle_id`, `inspection_type?`, `source` | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |
| `inspection_schedule_opened` | Video-call schedule UI opens | `vehicle_id`, `source` | `VehicleSpec.jsx` |
| `inspection_slot_selected` | User picks a preferred time slot | `vehicle_id`, `slot_label?`, `source` | `VehicleSpec.jsx` |
| `inspection_payment_started` | Create-order / Razorpay open / wallet pay start | `vehicle_id`, `inspection_id?`, `amount?`, `currency`, `source` | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |
| `inspection_payment_success` | Razorpay / wallet / free inspection success | `vehicle_id`, `inspection_id?`, `amount`, `currency`, `source` | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |
| `inspection_payment_failed` | Razorpay fail / cancel / order fail | `vehicle_id`, `inspection_id?`, `error_type`, `source` | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |
| `inspection_report_available` | Buyer sees report ready on VDP | `vehicle_id`, `inspection_id?`, `source` | `VehicleSpec.jsx` |
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

---

## Phase 3 — Buyer signup depth

| Event | When | Key properties | Wired in |
|-------|------|----------------|----------|
| `otp_requested` | Send-OTP API success | `flow` (`signup` \| `login` \| `mobile_verification`) + auth funnel | `SignupPopup.jsx`, `LoginPopup.jsx`, `Register.jsx` |
| `otp_submitted` | User submits 6-digit OTP | `flow` + auth funnel | same |
| `otp_verified` | Verify-OTP / signup-login API success | `flow` + auth funnel | same |
| `otp_failed` | Send or verify OTP error | `flow`, `stage` (`request` \| `verify`), `error_type` (never raw OTP) | same |
| `mobile_verification_started` | Google auth succeeded; phone OTP step shown | auth funnel | `SignupPopup.jsx`, `LoginPopup.jsx`, `Register.jsx` |
| `mobile_verification_completed` | Phone linked / verified after Google | auth funnel | same |
| `mobile_verification_failed` | Phone OTP fail in Google flow | `error_type` + auth funnel | same |
| `profile_setup_started` | Complete Profile popup opens | auth funnel | `CompleteProfilePopup.jsx` |
| `profile_setup_completed` | Profile meta save success | auth funnel | `CompleteProfilePopup.jsx` |
| `preferences_started` | Preferences UI opens (city/brand prefs) | auth funnel | `PreferencesPopup.jsx` |
| `preferences_completed` | Preferences save success | auth funnel | `PreferencesPopup.jsx` |

Note: Complete Profile is demographic/location meta; buyer search preferences live in `PreferencesPopup` (separate step). Do not send phone/email/OTP codes.

---

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
3. **Auth gate (legacy):** `inquiry_login_required` / `wishlist_login_required` → `login_started` → `login_completed` / `signup_completed`
4. **Buyer signup (OTP):** `login_started` → `otp_requested` → `otp_submitted` → `otp_verified` → `profile_setup_started` → `profile_setup_completed` → `preferences_started` → `preferences_completed` → `signup_completed`
5. **Buyer signup (Google):** `login_started` → `mobile_verification_started` → `otp_requested` → `otp_submitted` → `otp_verified` / `mobile_verification_completed` → `profile_setup_*` → `preferences_*` → `signup_completed`
6. **Inspection P0:** `vehicle_detail_viewed` → `inspection_started` → `inspection_schedule_opened` (video only) → `inspection_slot_selected` (video only) → `inspection_payment_started` → `inspection_payment_success` / `inspection_payment_failed` → `inspection_report_available`
7. **Consultant acquisition:** `become_consultant_page_viewed` → `plan_selected` → `subscription_payment_success` → `seller_panel_accessed`

---

## Backlog (not wired)

Wishlist success, compare add, chat opened, download-app CTA, KYC steps, listing created, PPC ad click detail, Web→App deep-link attribution.
