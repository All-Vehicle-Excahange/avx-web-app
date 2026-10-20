# Reecomm — Complete Leaderboard & Consultant Growth Guide Specification

## 1. Executive Summary & Product Architecture

Reecomm’s supply-side platform is built around verified automotive consultants. To drive healthy competition, showcase platform liquidity, and provide consultants with clear, actionable playbooks to grow their business, we define a unified 3-part experience:

1. **Screen 1 — Homepage & "Become a Consultant" Leaderboard Preview Section**
   - Placed directly after the **"Built for Professional Automotive Consultants"** (`WhoItsFor`) section on `/become-consultant` and `/consult`, plus on the homepage vehicle discovery feed.
   - Highlights top 3 verified leaders of the current month.
   - Transparent, privacy-preserving: displays verified inquiry counts, business names, and cities.
   - Includes quick growth teaser cards ("Want More Buyer Inquiries?") with CTA to the full growth guide.
   - Features prominent **"View Full Leaderboard"** CTA button routing to the full leaderboard page.
   - Role-aware CTA: Prospective consultants see *"Become a Consultant"*, while existing logged-in consultants see *"Improve My Inquiries"* or *"Go to Consultant Dashboard"*.

2. **Screen 2 — Full Leaderboard Page (`/leaderboard` & `/consult/leaderboard`)**
   - Comprehensive multi-dimension rankings with interactive filters:
     - **Time Period**: `This Month`, `Last Month`, `All Time`.
     - **Location / City**: `All Cities`, `Palanpur`, `Himatnagar`, `Siddhpur`, `Unjha`, `Ahmedabad`, etc.
     - **Metric Selector**: `Qualified Inquiries` (default), with clear indicators if `Active Listings` or `Response Rate` are toggled.
   - **Podium Showcase**: Top 3 performers visually highlighted with rank medals (#1 Gold, #2 Silver, #3 Bronze).
   - **Consultant Rankings Table / Cards**: Full paginated/incremental list with rank, business name, verified badge, location, and inquiry volume.
   - **"How to Improve Your Ranking"**: Direct tactical guide embedded on the page with 4 core pillars.
   - **Pro & Premium Upgrade Banner**: Clear positioning of business tier benefits without misleading guarantees.
   - **Strict Privacy Safeguard Notice**: Explicit callout that buyer identities, phone numbers, and individual lead records remain 100% confidential.

3. **Screen 3 — Consultant Growth Centre ("Get More Inquiries" — `/consult/grow-your-business`)**
   - A practical growth center for automotive consultants.
   - **Interactive Inquiry Growth Checklist**: 5 high-impact actionable items with completion tracking.
   - **6 Deep-Dive Growth Tips**: Each with direct deep-links to Reecomm dashboard tools:
     1. *Price Your Vehicles Fairly* &rarr; Inventory pricing flow
     2. *Focus on In-Demand Vehicles* &rarr; Inventory market insights
     3. *Create Complete Listings* &rarr; Incomplete listings filter
     4. *Respond to Buyers Quickly* &rarr; Inquiries dashboard
     5. *Build Buyer Trust* &rarr; Storefront profile editor
     6. *Keep Inventory Updated* &rarr; Vehicle management
   - **Plan-Aware Upgrade Placement**:
     - Basic tier: "Ready to Take Your Business Further?" &rarr; Pro & Premium feature comparison.
     - Pro tier: Upgrade to Premium prompt.
     - Premium tier: Growth optimization & "View My Analytics".
   - **Trust & Compliance Disclaimer**: Clear disclosure that inquiry volume is market-driven and not artificially guaranteed.

---

## 2. Screen 1: Leaderboard Preview Specification

### Placement
- **Target Location**: `/become-consultant` and `/consult` immediately following the `<WhoItsFor />` ("Built for Professional Automotive Consultants") component. Also embeddable on the homepage (`/`).

### Visual Wireframe
```
+-----------------------------------------------------------------------------------+
|  [Eyebrow Badge] CONSULTANT RECOGNITION                                          |
|  Top Consultants on Reecomm                                                      |
|  Real inquiries. Real opportunities. Growing together.                           |
|  "This Month's Leaders — Updated periodically based on verified buyer inquiries" |
|                                                                                   |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | #01                |  | #02                |  | #03                |           |
|  | Apex Motors        |  | Gujarat Auto Deals |  | Royal Auto Link    |           |
|  | Palanpur           |  | Himatnagar         |  | Siddhpur           |           |
|  | 48 Inquiries       |  | 39 Inquiries       |  | 31 Inquiries       |           |
|  +--------------------+  +--------------------+  +--------------------+           |
|                                                                                   |
|                   [ Primary CTA: View Full Leaderboard -> ]                       |
|                                                                                   |
|  -------------------------------------------------------------------------------  |
|                                                                                   |
|  Want More Buyer Inquiries?                                                       |
|  Improve your listings, respond faster and give buyers more reasons to contact you|
|                                                                                   |
|  [Price Fairly]      [Demand Stock]      [Fast Response]     [Complete Details]   |
|  Competitive prices  Popular local models Reply promptly     Photos & exact specs |
|                                                                                   |
|                         [ Explore All Growth Tips -> ]                            |
|                                                                                   |
|  -------------------------------------------------------------------------------  |
|                                                                                   |
|  Take Your Vehicle Business Online                                                |
|  Join Reecomm, showcase your inventory & connect with verified buyers.            |
|  [ Become a Consultant / Go to Dashboard ]                                        |
+-----------------------------------------------------------------------------------+
```

### Behavior & States
- **Real verified aggregation**: Inquiry counts aggregate authentic inquiries generated on the platform.
- **Empty State**: If zero verified data exists for the selected timeframe, displays an honest empty state: *"Leaderboard updates as inquiries occur this cycle"*.
- **Role Detection**:
  - Unauthenticated / Buyer: Shows *"Become a Consultant"*, triggers consultant onboarding.
  - Authenticated Consultant: Shows *"Go to Consultant Dashboard"* or *"Improve My Inquiries"*.

---

## 3. Screen 2: Full Leaderboard Page Specification

### Route
- `/leaderboard` and `/consult/leaderboard`

### Wireframe & Components
```
+-----------------------------------------------------------------------------------+
| REECOMM / CONSULTANT GROWTH                                                       |
| Reecomm Leaderboard                                                               |
| Recognising consultants. Celebrating growth. Creating opportunities.              |
| See how consultants are performing on Reecomm through verified inquiry activity.  |
|                                                                                   |
| [Filters Bar]                                                                     |
| Time Period: [This Month | Last Month | All Time]                                 |
| City:        [All Cities | Palanpur | Himatnagar | Siddhpur | Unjha | Ahmedabad]  |
| Rank By:     [Qualified Inquiries v]                                              |
|                                                                                   |
| =============================== PODIUM ========================================== |
|            [2nd Place]             [1st Place]             [3rd Place]            |
|        Gujarat Auto Deals          Apex Motors           Royal Auto Link          |
|            Himatnagar               Palanpur                Siddhpur              |
|           39 Inquiries            48 Inquiries            31 Inquiries            |
|               🥈                      🥇                      🥉                  |
| ================================================================================= |
|                                                                                   |
| [Rankings Table / List]                                                           |
| Rank | Consultant & Business       | Location     | Inquiries | Verified Badge    |
| 1    | Apex Motors                 | Palanpur     | 48        | [Verified]        |
| 2    | Gujarat Auto Deals          | Himatnagar   | 39        | [Verified]        |
| 3    | Royal Auto Link             | Siddhpur     | 31        | [Verified]        |
| 4    | Shree Umiya Automobiles     | Unjha        | 27        | [Verified]        |
| 5    | Banas Auto Consultant       | Palanpur     | 24        | [Verified]        |
| 6    | North Gujarat Motors        | Mehsana      | 21        | [Verified]        |
| 7    | Marutinandan Auto           | Visnagar     | 18        | [Verified]        |
| 8    | Sabar Car Zone              | Himatnagar   | 16        | [Verified]        |
|                                                                                   |
| [How to Improve Your Ranking - 4 Pillars]                                         |
| 1. Competitive Pricing   2. Relevant Inventory   3. Complete Listings  4. Speed   |
| [ View All Growth Tips Button ]                                                   |
|                                                                                   |
| [Ready to Grow with Reecomm? Plan CTA]                                            |
| [Privacy Notice: Buyer contact details and records remain 100% confidential]       |
+-----------------------------------------------------------------------------------+
```

---

## 4. Screen 3: "Get More Inquiries" Growth Centre

### Route
- `/consult/grow-your-business`

### Feature Set
1. **Interactive Growth Checklist (0 of 5 Completed)**
   - [ ] Review vehicle prices
   - [ ] Complete vehicle details
   - [ ] Update available inventory
   - [ ] Check new inquiries
   - [ ] Review storefront details
2. **6 Tactical Action Cards with Dashboard Deep Links**:
   - `Price Your Vehicles Fairly` &rarr; `/consult/dashboard/inventory`
   - `Focus on In-Demand Vehicles` &rarr; `/consult/dashboard/inventory`
   - `Create Complete Listings` &rarr; `/consult/dashboard/inventory?filter=incomplete`
   - `Respond to Buyers Quickly` &rarr; `/consult/dashboard/inquiries`
   - `Build Buyer Trust` &rarr; `/consult/dashboard/storefront`
   - `Keep Inventory Updated` &rarr; `/consult/dashboard/inventory`
3. **Plan-Aware Dynamic Upsell Card**:
   - Compares Basic vs. Pro vs. Premium with honest value propositions.
4. **Trust Disclaimer**:
   - Transparent platform terms adhering to anti-deceptive guidelines.

---

## 5. Analytics & Event Tracking Matrix

| Event Name | Trigger | Properties |
| :--- | :--- | :--- |
| `leaderboard_preview_viewed` | Section scrolls into viewport | `page_location`, `current_user_role` |
| `leaderboard_view_full_clicked` | "View Full Leaderboard" clicked | `source_section`, `current_user_role` |
| `leaderboard_filter_changed` | Time period, city, or metric changed | `filter_type`, `filter_value` |
| `growth_guide_viewed` | Growth guide page opens | `current_plan`, `source` |
| `growth_checklist_item_toggled`| Checklist item checkbox clicked | `item_id`, `completed_count` |
| `growth_action_clicked` | Growth tip CTA clicked | `action_type`, `destination_route` |
| `consultant_upgrade_clicked` | Upgrade CTA clicked | `current_plan`, `target_plan` |
