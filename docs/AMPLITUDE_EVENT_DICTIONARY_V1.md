# Amplitude Event Dictionary v1 (Web)

Complete catalog of Amplitude events wired on the Reecomm website.

Convention: **snake_case** event names. Do not send PII (phone, email, OTP codes, chat body).

SDK: `@amplitude/unified` via [`src/lib/amplitude.js`](../src/lib/amplitude.js) (`initAll` + autocapture + session replay).

Identity rule: **one person = one Amplitude user** (`setUserId` on login; `reset` on logout). Roles are user properties.

**Location rule:** send human-readable `city` / `state` names (e.g. `"Ahmedabad"`, `"Gujarat"`). Do **not** send `city_id` / `state_id` on new events. Legacy `city_id` may still appear in Amplitude’s schema from old `filter_applied` data.

**Vehicle rule:** whenever `vehicle_id` is sent, also send `vehicle_name` (year + make + model + variant when available).

---

## Shared property sets

### Auth funnel (attached until login/signup completes)

Stored on `useAuthStore.authFunnelContext` when a login gate opens; cleared after success.

| Property | Type | Values / examples |
|----------|------|-------------------|
| `entry_context` | string | `vehicle_detail` \| `search` \| `home` \| `become_consultant` \| `become_seller` \| `direct` |
| `trigger_action` | string | `inquiry` \| `wishlist` \| `compare` \| `inspection` \| `chat` \| `consultant_signup` \| `seller_signup` \| `login_click` |
| `user_role_intent` | string | `buyer` \| `consultant` \| `seller` |
| `user_role` | string | Actual API role after success (e.g. `USER`, `CONSULTATION`, `USER_SELLER`) |
| `method` | string | `mobile_otp` \| `google` (normalized) |

### Inspection shared

| Property | Type | Values / examples |
|----------|------|-------------------|
| `vehicle_id` | string | Vehicle UUID/id as string |
| `vehicle_name` | string | e.g. `2020 Maruti Swift VXI` (year make model variant) |
| `inspection_id` | string | Inspection request id (when known) |
| `amount` | number | Price paid / charged (INR) |
| `currency` | string | Usually `INR` |
| `source` | string | `vdp` \| `inspection_modal` |
| `inspection_type` | string | `REPORT_ONLY` \| `VIDEO_CALL_WITH_REPORT` |

---

## Master index

| Event | Page / surface | Description |
|-------|----------------|-------------|
| `session_started` | Any (first paint) | Once per browser tab session |
| `landing_page_viewed` | Any route | Page view on load + every client route change |
| `homepage_viewed` | `/` | Home page viewed |
| `Viewed Home Page` | `/` | Same home view (wizard verify name; includes `prompt_version`) |
| `page_left` | Any route | Dwell ended (route leave / tab hide / unload) |
| `search_submitted` | Home filter bar, Navbar | User submits a product/consultant search |
| `search_results_viewed` | `/search/*` | Search results data loaded |
| `filter_applied` | `/search/*` | User changes filters (after first hydration) |
| `vehicle_detail_viewed` | VDP / consult VDP | Vehicle detail opened (once per vehicle id) |
| `storefront_viewed` | Consultant storefront | Storefront hero ready |
| `inquiry_login_required` | VDP | Guest taps Send Inquiry |
| `inquiry_initiated` | VDP | Send Inquiry clicked (guest or logged-in) |
| `wishlist_login_required` | Search card / VDP gallery | Guest taps wishlist |
| `inquiry_form_opened` | VDP inquiry popup | Inquiry form mounts |
| `inquiry_type_selected` | VDP inquiry popup | User picks inquiry type |
| `inquiry_form_abandoned` | VDP inquiry popup | Closed without successful submit |
| `inquiry_submitted` | VDP inquiry popup | Inquiry API success |
| `login_started` | Login popup (global / local) | Login UI opens |
| `login_completed` | Login popup | Login success |
| `signup_completed` | Signup / Login (Google phone) / Register | Final successful signup |
| `otp_requested` | Auth popups / Register | Send-OTP API success |
| `otp_submitted` | Auth popups / Register | User submits 6-digit OTP |
| `otp_verified` | Auth popups / Register | OTP verify / account create success |
| `otp_failed` | Auth popups / Register | Send or verify OTP error |
| `mobile_verification_started` | Auth (Google) | Google ok; phone OTP step shown |
| `mobile_verification_completed` | Auth (Google) | Phone linked after Google |
| `mobile_verification_failed` | Auth (Google) | Phone OTP fail |
| `profile_setup_started` | Complete Profile popup | Profile popup opens |
| `profile_setup_completed` | Complete Profile popup | Profile meta save success |
| `preferences_started` | Preferences popup | Prefs UI opens |
| `preferences_completed` | Preferences popup | Prefs save success |
| `inspection_started` | VDP / inspection modal | Inspection request flow starts |
| `inspection_schedule_opened` | VDP | Video-call schedule UI opened |
| `inspection_slot_selected` | VDP | Preferred time slot picked |
| `inspection_payment_started` | VDP / inspection modal | Payment / order start |
| `inspection_payment_success` | VDP / inspection modal | Payment or free confirm success |
| `inspection_payment_failed` | VDP / inspection modal | Payment cancel / fail / order fail |
| `inspection_report_available` | VDP | Buyer can open report |
| `become_consultant_page_viewed` | `/become-consultant` | Page mount |
| `plan_selected` | Pricing / Subscription | User chooses a plan |
| `subscription_payment_success` | Pricing / Subscription | Subscription Razorpay success |
| `seller_panel_accessed` | `/consult/dashboard/*` | Consult dashboard layout (logged in) |

---

## Detailed catalog

### Session & pages

#### `session_started`

| | |
|--|--|
| **Description** | First client analytics paint for this browser tab session (once per tab via `sessionStorage`). |
| **Where / page** | Global (`_app.js`) — any route |
| **When triggered** | App mounts on client |
| **Wired in** | `_app.js` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `path` | string | `/search/used-cars-in-ahmedabad` | Full path + query when available |
| `pathname` | string | `/` | Next.js pathname |

#### `landing_page_viewed`

| | |
|--|--|
| **Description** | Page view for analytics / site traffic. |
| **Where / page** | Global — every route |
| **When triggered** | Initial load + every `routeChangeComplete` |
| **Wired in** | `_app.js` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `path` | string | `/vehicles/123` or route URL | |
| `pathname` | string | `/vehicles/[id]` style path | |

#### `homepage_viewed`

| | |
|--|--|
| **Description** | User is on the marketing home page. |
| **Where / page** | `/` |
| **When triggered** | Home path on load or navigation to `/` |
| **Wired in** | `_app.js` |

Also fires companion event **`Viewed Home Page`** with `prompt_version: "BA400.4"` (wizard verify name).

#### `page_left`

| | |
|--|--|
| **Description** | Time spent on the previous page visit ended. |
| **Where / page** | Global — any route |
| **When triggered** | Route change, tab hide, or `beforeunload` (once per visit; ignores &lt;1s; caps at 30m) |
| **Wired in** | `_app.js` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `pathname` | string | `/search/...` | |
| `path` | string | Full path | |
| `duration_ms` | number | `45000` | Milliseconds on page |
| `reason` | string | `route_change` \| `visibility_hidden` \| `beforeunload` | |

---

### Search & discovery

#### `search_submitted`

| | |
|--|--|
| **Description** | User explicitly submits a search from navbar or home filter bar. |
| **Where / page** | Home `/` (VehicleFilterBar), global Navbar |
| **When triggered** | Search submit / suggestion / brand pick that navigates to results |
| **Wired in** | `Navbar.jsx`, `VehicleFilterBar.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `search_string` | string | `Maruti \| car \| Ahmedabad, Gujarat` | Fallback `vehicle_search` |
| `source` | string | `navbar`, `filter_bar`, `filter_bar_filters`, `filter_bar_consult`, `filter_bar_suggestion`, `filter_bar_brand`, `filter_bar_query`, `filter_bar_submit` | |
| `vehicle_type` | string | optional | Rarely set |
| `brand` | string | optional | Rarely set |
| `location` | string | `Ahmedabad, Gujarat` | Combined label when known |
| `city` | string | `Ahmedabad` | Name, not id |
| `state` | string | `Gujarat` | Name, not id |

#### `search_results_viewed`

| | |
|--|--|
| **Description** | Search results payload finished loading. |
| **Where / page** | `/search/*` |
| **When triggered** | `searchData` available in SearchWithCard |
| **Wired in** | `SearchWithCard.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `search_string` | string | `Maruti Swift Ahmedabad` | Built from brand/model/city |
| `results_count` | number | `42` | |
| `search_type` | string | `search_results_page` | |
| `city` | string | `Ahmedabad` | Selected city name |
| `state` | string | `Gujarat` | Selected state name |

#### `filter_applied`

| | |
|--|--|
| **Description** | User changed search filters (debounced; skips first hydration). |
| **Where / page** | `/search/*` |
| **When triggered** | Filter state changes after first paint |
| **Wired in** | `SearchWithCard.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `brands` | array | maker ids or names | From payload |
| `models` | array | model ids or names | |
| `fuel_types` | array | `PETROL`, `DIESEL`, … | Uppercase |
| `transmission_types` | array | `MANUAL`, `AUTOMATIC`, … | |
| `body_types` | array | body type strings | |
| `year` | number/string | e.g. `2019` | When set |
| `city` | string | `Ahmedabad` | Name (not `city_id`) |
| `state` | string | `Gujarat` | Name (not `state_id`) |
| `min_price` | number | `100000` | |
| `max_price` | number | `800000` | |
| `km_distance` | number | max km driven when set | |
| `seller_type` | string | seller filter when set | |
| `avx_assured` | boolean | Assured filter | |

Also updates Identify `preferred_city` / `preferred_state` when city/state names are present.

#### `vehicle_detail_viewed`

| | |
|--|--|
| **Description** | Vehicle detail page viewed (once per vehicle id per mount). |
| **Where / page** | VDP (`/vehicles/...` or consult vehicle detail) |
| **When triggered** | Overview (and consult summary when needed) ready |
| **Wired in** | `VehiclDetail.jsx`, `ConsualtVehicleDetails.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | `"12345"` | |
| `vehicle_name` | string | `2020 Maruti Swift VXI` | Year make model variant |
| `vehicle_type` | string | API vehicle type | |
| `price` | number | `450000` | |
| `seller_type` | string | `USER`, `CONSULTATION`, … | |
| `city` | string | `Ahmedabad` | From address / cityName |
| `state` | string | `Gujarat` | |
| `currency` | string | `INR` | Always |

#### `storefront_viewed`

| | |
|--|--|
| **Description** | Consultant public storefront hero is ready. |
| **Where / page** | Consultant storefront |
| **When triggered** | Hero section data ready |
| **Wired in** | `StoreFrontHeroSection.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `consultant_id` | string | id | |
| `consultation_name` | string | Display name | |
| `username` | string | Storefront username | |
| `available_vehicles` | number | count | |
| `average_rating` | number | e.g. `4.5` | |

---

### Inquiry & wishlist

#### `inquiry_login_required`

| | |
|--|--|
| **Description** | Guest tried to inquire and was asked to log in. |
| **Where / page** | VDP (VehicleSummaryRight) |
| **When triggered** | Send Inquiry while logged out |
| **Wired in** | `VehicleSummaryRight.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | `2020 Maruti Swift …` | |
| `seller_type` | string | Owner role / seller type | |
| `source` | string | `vdp` (default) | |

#### `inquiry_initiated`

| | |
|--|--|
| **Description** | User clicked Send Inquiry (before/at auth gate). |
| **Where / page** | VDP |
| **When triggered** | Inquiry CTA click |
| **Wired in** | `VehicleSummaryRight.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | `2020 Maruti Swift …` | |
| `seller_type` | string | | |
| `source` | string | `vdp` | |
| `is_logged_in` | boolean | `true` / `false` | |

#### `wishlist_login_required`

| | |
|--|--|
| **Description** | Guest tapped wishlist heart and must log in. |
| **Where / page** | Search results cards; VDP image gallery |
| **When triggered** | Wishlist click while logged out |
| **Wired in** | `VehicleCard.jsx`, `VehicleImageGallery.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | `2020 Maruti Swift VXI` | Year make model variant |
| `source` | string | `search` \| `vdp` | |

#### `inquiry_form_opened`

| | |
|--|--|
| **Description** | Inquiry form popup opened. |
| **Where / page** | VDP inquiry modal |
| **When triggered** | Popup mounts |
| **Wired in** | `SendInquaryPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | | |
| `seller_type` | string | | |
| `source` | string | `vdp` | |

#### `inquiry_type_selected`

| | |
|--|--|
| **Description** | User selected an inquiry type option. |
| **Where / page** | VDP inquiry modal |
| **When triggered** | Type option click |
| **Wired in** | `SendInquaryPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | | |
| `inquiry_type` | string | Option `value` from UI | |
| `seller_type` | string | | |

#### `inquiry_form_abandoned`

| | |
|--|--|
| **Description** | Inquiry form closed without a successful submit. |
| **Where / page** | VDP inquiry modal |
| **When triggered** | Close / unmount without submit |
| **Wired in** | `SendInquaryPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | | |
| `inquiry_type` | string | Last selected type if any | |
| `had_type` | boolean | Whether a type was selected | |
| `duration_ms` | number | Time form was open | |
| `seller_type` | string | | |
| `source` | string | `vdp` | |

#### `inquiry_submitted`

| | |
|--|--|
| **Description** | Inquiry successfully submitted to API. |
| **Where / page** | VDP inquiry modal |
| **When triggered** | Submit success |
| **Wired in** | `SendInquaryPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `vehicle_id` | string | | |
| `vehicle_name` | string | | |
| `inquiry_type` | string | e.g. `General Inquiry` | |
| `seller_type` | string | | |

---

### Auth & signup

Auth events also receive shared **auth funnel** props when context was set at the login gate.

#### `login_started`

| | |
|--|--|
| **Description** | Login popup opened. |
| **Where / page** | Global/local Login popup (any page that opens auth) |
| **When triggered** | `isOpen` becomes true |
| **Wired in** | `LoginPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `source` | string | `login_popup` | |
| + auth funnel | | See shared set | |

#### `login_completed`

| | |
|--|--|
| **Description** | Existing user logged in successfully. |
| **Where / page** | Login popup |
| **When triggered** | OTP login or Google (no phone step) success |
| **Wired in** | `LoginPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `method` | string | `mobile_otp` \| `google` | |
| `user_role` | string | From API | |
| + auth funnel | | | |

#### `signup_completed`

| | |
|--|--|
| **Description** | Final successful signup (keep this name). |
| **Where / page** | Signup popup, Login Google→phone, consultant Register |
| **When triggered** | Account created / Google signup complete |
| **Wired in** | `SignupPopup.jsx`, `LoginPopup.jsx`, `Register.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `method` | string | `mobile_otp` \| `google` | |
| `user_role` | string | From API / `CONSULTATION` on Register | |
| + auth funnel | | | |
| UTMs / referrer | | Via SDK / first-touch Identify | Not duplicated as event props |

#### `otp_requested` / `otp_submitted` / `otp_verified` / `otp_failed`

| | |
|--|--|
| **Description** | Mobile OTP funnel steps. |
| **Where / page** | Login / Signup popups; consultant Register |
| **When triggered** | Send OTP success; user submits OTP; verify success; send/verify error |
| **Wired in** | `LoginPopup.jsx`, `SignupPopup.jsx`, `Register.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `flow` | string | `signup` \| `login` \| `mobile_verification` | |
| `stage` | string | `request` \| `verify` | `otp_failed` only |
| `error_type` | string | `send_failed`, `verify_failed`, `not_registered`, … | Never raw OTP |
| + auth funnel | | | |

#### `mobile_verification_started` / `_completed` / `_failed`

| | |
|--|--|
| **Description** | Google auth required phone OTP linking. |
| **Where / page** | Login / Signup / Register |
| **When triggered** | Google returns `requiresPhoneVerification`; phone linked; phone OTP fail |
| **Wired in** | `LoginPopup.jsx`, `SignupPopup.jsx`, `Register.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `method` | string | Always `google` | |
| `error_type` | string | On failed only | |
| + auth funnel | | | |

#### `profile_setup_started` / `profile_setup_completed`

| | |
|--|--|
| **Description** | Demographic/location Complete Profile step. |
| **Where / page** | Complete Profile popup (post-signup / incomplete meta) |
| **When triggered** | Popup opens; meta save success |
| **Wired in** | `CompleteProfilePopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| + auth funnel | | When still present | No PII fields |

#### `preferences_started` / `preferences_completed`

| | |
|--|--|
| **Description** | Buyer search preferences (city/brand/budget etc.). |
| **Where / page** | Preferences popup (Navbar / wishlist flows) |
| **When triggered** | Popup opens; prefs save success |
| **Wired in** | `PreferencesPopup.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| + auth funnel | | When still present | Separate from Complete Profile |

---

### Inspection

#### `inspection_started`

| | |
|--|--|
| **Description** | User started the inspection request flow. |
| **Where / page** | VDP Inspect section; inspection request modal |
| **When triggered** | Modal/flow opens for a new or pending payment request |
| **Wired in** | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| Shared inspection props | | `source`: `vdp` \| `inspection_modal` | |
| `inspection_type` | string | `REPORT_ONLY` \| `VIDEO_CALL_WITH_REPORT` | |

#### `inspection_schedule_opened`

| | |
|--|--|
| **Description** | Video-call schedule UI became active. |
| **Where / page** | VDP Inspect modal |
| **When triggered** | User selects video inspection type |
| **Wired in** | `VehicleSpec.jsx` |

Uses shared inspection props (`source: vdp`, type `VIDEO_CALL_WITH_REPORT`).

#### `inspection_slot_selected`

| | |
|--|--|
| **Description** | User picked a preferred time slot. |
| **Where / page** | VDP Inspect modal |
| **When triggered** | Time select change |
| **Wired in** | `VehicleSpec.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| Shared inspection props | | | |
| `slot_label` | string | Selected option label | Prefer label over raw time |

#### `inspection_payment_started` / `inspection_payment_success` / `inspection_payment_failed`

| | |
|--|--|
| **Description** | Inspection payment lifecycle. |
| **Where / page** | VDP Inspect; inspection modal |
| **When triggered** | Order/Razorpay/wallet start; success; cancel/fail/order fail |
| **Wired in** | `VehicleSpec.jsx`, `InspectionRequestModal.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| Shared inspection props | | | |
| `error_type` | string | `sdk_load_failed`, `cancelled`, `razorpay_failed`, `order_failed`, `wallet_failed` | Failed only |

#### `inspection_report_available`

| | |
|--|--|
| **Description** | A report URL is available for the buyer on VDP. |
| **Where / page** | VDP Inspect section |
| **When triggered** | Once when report URL becomes present |
| **Wired in** | `VehicleSpec.jsx` |

Uses shared inspection props (`source: vdp`).

---

### Consultant acquisition

#### `become_consultant_page_viewed`

| | |
|--|--|
| **Description** | Become-consultant landing viewed. |
| **Where / page** | `/become-consultant` |
| **When triggered** | Page mount |
| **Wired in** | `become-consultant/index.js` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `content_name` | string | `Become a Consultant` | |

#### `plan_selected`

| | |
|--|--|
| **Description** | User chose a consultant subscription plan. |
| **Where / page** | `/consult/pricing`, subscription screens |
| **When triggered** | Upgrade / select plan click (when logged in) |
| **Wired in** | `FullPricing.jsx`, `Subscription.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `plan_id` | string | Tier id | |
| `plan_name` | string | Tier title | |
| `billing_cycle` | string | `MONTHLY` \| `YEARLY` | |

#### `subscription_payment_success`

| | |
|--|--|
| **Description** | Consultant subscription payment succeeded. |
| **Where / page** | Pricing / Subscription Razorpay handler |
| **When triggered** | Razorpay success callback |
| **Wired in** | `FullPricing.jsx`, `Subscription.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `plan_id` | string | | |
| `plan_name` | string | | |
| `billing_cycle` | string | `MONTHLY` \| `YEARLY` | |
| `value` | number | Amount | |
| `currency` | string | `INR` | |

#### `seller_panel_accessed`

| | |
|--|--|
| **Description** | Logged-in user entered consult dashboard shell. |
| **Where / page** | `/consult/dashboard/*` |
| **When triggered** | Dashboard layout mount while authenticated |
| **Wired in** | `DashboardLayout.jsx` |

| Property | Type | Values / examples | Notes |
|----------|------|-------------------|-------|
| `path` | string | Current dashboard path | |
| `user_role` | string | From auth user | |

---

## Identity / acquisition (not events)

| Action | Behavior |
|--------|----------|
| Login / session restore | `identifyUser` → `setUserId` + `user_role` / `account_type` |
| Logout | `resetUser` → `amplitude.reset()` |
| First-touch UTMs | `setOnce` user props: `utm_*`, `gclid`, `fbclid`, `landing_path`, `referrer` |
| Preferred market | `setPreferredLocation` → `preferred_city` / `preferred_state` when search applies location |

---

## How to chart in Amplitude UI (no extra code)

| Metric | Chart |
|--------|--------|
| User count / DAU / WAU | **Users** → Active users |
| Retention | **Retention** on `session_started` or `landing_page_viewed` |
| Total website views | Event Segmentation on `landing_page_viewed` (group by `pathname`) |
| Site-level time spent | **Sessions** → avg / median session duration |
| Time by page | Segmentation on `page_left` → avg/sum `duration_ms` by `pathname` |
| Time / engagement by location | IP `country` / `region` / `city`, or user props `preferred_city` / `preferred_state`; event props `city` / `state` on search/VDP |

---

## Funnels to build in Amplitude UI

1. **Buyer discovery:** `homepage_viewed` → `search_submitted` → `search_results_viewed` → `vehicle_detail_viewed` → `inquiry_initiated` → `inquiry_form_opened` → `inquiry_type_selected` → `inquiry_submitted`
2. **Inquiry drop-off:** `inquiry_form_opened` → `inquiry_form_abandoned`
3. **Auth gate:** `inquiry_login_required` / `wishlist_login_required` → `login_started` → `login_completed` / `signup_completed`
4. **Buyer signup (OTP):** `login_started` → `otp_requested` → `otp_submitted` → `otp_verified` → `profile_setup_started` → `profile_setup_completed` → `preferences_started` → `preferences_completed` → `signup_completed`
5. **Buyer signup (Google):** `login_started` → `mobile_verification_started` → `otp_requested` → `otp_submitted` → `otp_verified` / `mobile_verification_completed` → `profile_setup_*` → `preferences_*` → `signup_completed`
6. **Inspection P0:** `vehicle_detail_viewed` → `inspection_started` → `inspection_schedule_opened` (video only) → `inspection_slot_selected` (video only) → `inspection_payment_started` → `inspection_payment_success` / `inspection_payment_failed` → `inspection_report_available`
7. **Consultant acquisition:** `become_consultant_page_viewed` → `plan_selected` → `subscription_payment_success` → `seller_panel_accessed`

---

## Backlog (not wired)

Wishlist success, compare add, chat opened, download-app CTA, KYC steps, listing created, PPC ad click detail, Web→App deep-link attribution.
